import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  escapeHtml,
  validateContactForm,
  validateGetStartedForm,
  type GetStartedFormData,
} from "@/lib/validation";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function buildGetStartedEmailHtml(data: GetStartedFormData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "-";
  const safeNotes = data.notes
    ? escapeHtml(data.notes).replace(/\n/g, "<br>")
    : "-";
  const safeNeed = escapeHtml(data.need);
  const safeGoals = data.goals.map(escapeHtml).join(", ");
  const safeDesign = escapeHtml(data.design);
  const safeBudget = escapeHtml(data.budget);
  const safeTimeline = escapeHtml(data.timeline);

  return `
    <h2>New Get Started submission</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <hr>
    <p><strong>Project type:</strong> ${safeNeed}</p>
    <p><strong>Goals:</strong> ${safeGoals}</p>
    <p><strong>Design direction:</strong> ${safeDesign}</p>
    <p><strong>Budget:</strong> ${safeBudget}</p>
    <p><strong>Timeline:</strong> ${safeTimeline}</p>
    <p><strong>Additional notes:</strong></p>
    <p>${safeNotes}</p>
  `;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Please wait a few minutes before trying again.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const isGetStarted =
    body &&
    typeof body === "object" &&
    "need" in body &&
    "goals" in body;

  const validation = isGetStarted
    ? validateGetStartedForm(body)
    : validateContactForm(body);

  if (!validation.success || !validation.data) {
    return NextResponse.json(
      { error: validation.error || "Validation failed." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey || !contactEmail) {
    console.log("Email service not configured. Submission logged:", validation.data);
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(resendApiKey);

  let subject: string;
  let html: string;
  let replyTo: string;

  if (isGetStarted) {
    const data = validation.data as GetStartedFormData;
    subject = `New project inquiry from ${data.name}`;
    html = buildGetStartedEmailHtml(data);
    replyTo = data.email;
  } else {
    const { name, email, message } = validation.data as {
      name: string;
      email: string;
      message: string;
    };
    subject = `Portfolio contact from ${name}`;
    replyTo = email;
    html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
