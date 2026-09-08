const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_PHONE_LENGTH = 30;
const MAX_NOTES_LENGTH = 2000;
const MAX_OPTION_LENGTH = 100;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface GetStartedFormData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  need: string;
  goals: string[];
  design: string;
  budget: string;
  timeline: string;
}

export interface ValidationResult {
  success: boolean;
  data?: ContactFormData;
  error?: string;
}

export interface GetStartedValidationResult {
  success: boolean;
  data?: GetStartedFormData;
  error?: string;
}

function stripControlChars(value: string): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return stripControlChars(value).trim().slice(0, maxLength);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactForm(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const { name, email, message } = body as Record<string, unknown>;

  const sanitizedName = sanitizeText(name, MAX_NAME_LENGTH);
  const sanitizedEmail = sanitizeText(email, MAX_EMAIL_LENGTH);
  const sanitizedMessage = sanitizeText(message, MAX_MESSAGE_LENGTH);

  if (!sanitizedName) {
    return { success: false, error: "Name is required." };
  }

  if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
    return { success: false, error: "A valid email address is required." };
  }

  if (!sanitizedMessage) {
    return { success: false, error: "Message is required." };
  }

  return {
    success: true,
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    },
  };
}

function sanitizeStringArray(value: unknown, maxLength: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => sanitizeText(item, maxLength))
    .filter(Boolean);
}

export function validateGetStartedForm(body: unknown): GetStartedValidationResult {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;

  const sanitizedName = sanitizeText(record.name, MAX_NAME_LENGTH);
  const sanitizedEmail = sanitizeText(record.email, MAX_EMAIL_LENGTH);
  const sanitizedPhone = sanitizeText(record.phone, MAX_PHONE_LENGTH);
  const sanitizedNotes = sanitizeText(record.notes, MAX_NOTES_LENGTH);
  const sanitizedNeed = sanitizeText(record.need, MAX_OPTION_LENGTH);
  const sanitizedDesign = sanitizeText(record.design, MAX_OPTION_LENGTH);
  const sanitizedBudget = sanitizeText(record.budget, MAX_OPTION_LENGTH);
  const sanitizedTimeline = sanitizeText(record.timeline, MAX_OPTION_LENGTH);
  const sanitizedGoals = sanitizeStringArray(record.goals, MAX_OPTION_LENGTH);

  if (!sanitizedName) {
    return { success: false, error: "Name is required." };
  }

  if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
    return { success: false, error: "A valid email address is required." };
  }

  if (!sanitizedNeed) {
    return { success: false, error: "Project type is required." };
  }

  if (sanitizedGoals.length === 0) {
    return { success: false, error: "At least one goal is required." };
  }

  if (!sanitizedDesign) {
    return { success: false, error: "Design direction is required." };
  }

  if (!sanitizedBudget) {
    return { success: false, error: "Budget range is required." };
  }

  if (!sanitizedTimeline) {
    return { success: false, error: "Timeline is required." };
  }

  return {
    success: true,
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone || undefined,
      notes: sanitizedNotes || undefined,
      need: sanitizedNeed,
      goals: sanitizedGoals,
      design: sanitizedDesign,
      budget: sanitizedBudget,
      timeline: sanitizedTimeline,
    },
  };
}
