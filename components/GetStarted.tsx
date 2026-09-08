"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import {
  BUDGET_OPTIONS,
  CONFIRMATION_STEPS,
  DESIGN_OPTIONS,
  GOAL_OPTIONS,
  NEED_OPTIONS,
  TIMELINE_OPTIONS,
  TOTAL_STEPS,
} from "@/lib/get-started";
import { defaultTransition, fadeUp } from "@/lib/motion";

type FormStatus = "idle" | "submitting" | "success" | "error" | "rate-limited";

interface FormErrors {
  name?: string;
  email?: string;
}

interface Answers {
  need: string | null;
  goals: string[];
  design: string | null;
  budget: string | null;
  timeline: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const INITIAL_ANSWERS: Answers = {
  need: null,
  goals: [],
  design: null,
  budget: null,
  timeline: null,
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full rounded-card border border-border bg-bg px-4 py-3 text-body text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2";

function optionButtonClass(selected: boolean): string {
  return `w-full rounded-pill px-4 py-3 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
    selected
      ? "bg-coral-tint text-foreground ring-2 ring-coral"
      : "bg-bg text-foreground border border-border hover:border-coral"
  }`;
}

const stepTitles: Record<number, string> = {
  1: "What do you need?",
  2: "What's your goal?",
  3: "Pick a design direction",
  4: "Which investment range feels right?",
  5: "When do you need it?",
  6: "Final details",
};

export default function GetStarted() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  const resetFlow = useCallback(() => {
    setStep(1);
    setStatus("idle");
    setErrors({});
    setServerMessage("");
    setAnswers(INITIAL_ANSWERS);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    resetFlow();
  }, [resetFlow]);

  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, closeModal]);

  const canAdvance = (): boolean => {
    switch (step) {
      case 1:
        return answers.need !== null;
      case 2:
        return answers.goals.length > 0;
      case 3:
        return answers.design !== null;
      case 4:
        return answers.budget !== null;
      case 5:
        return answers.timeline !== null;
      default:
        return true;
    }
  };

  const validateFinalStep = (): FormErrors => {
    const newErrors: FormErrors = {};
    const name = answers.name.trim();
    const email = answers.email.trim();

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      setErrors({});
      setServerMessage("");
    }
  };

  const toggleGoal = (goal: string) => {
    setAnswers((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage("");

    const validationErrors = validateFinalStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim() || undefined,
          notes: answers.notes.trim() || undefined,
          need: answers.need,
          goals: answers.goals,
          design: answers.design,
          budget: answers.budget,
          timeline: answers.timeline,
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setStatus("rate-limited");
        setServerMessage(
          data.error ||
            "Too many requests. Please wait a few minutes before trying again."
        );
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setServerMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage("Something went wrong. Please try again.");
    }
  };

  const modalMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 12 },
      };

  return (
    <>
      <section
        id="get-started"
        className="relative overflow-hidden bg-coral px-6 py-24 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-16"
        aria-labelledby="get-started-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(10 10 10) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <span
          className="pointer-events-none absolute right-8 top-8 font-mono text-sm text-bg/25 select-none"
          aria-hidden="true"
        >
          {"</>"}
        </span>

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={prefersReducedMotion ? false : fadeUp.hidden}
            whileInView={fadeUp.visible}
            viewport={{ once: true, margin: "-80px" }}
            transition={transition}
          >
            <h2
              id="get-started-heading"
              className="font-heading text-[clamp(2.25rem,5vw+0.5rem,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bg"
            >
              Have an idea worth building?
            </h2>
            <p className="mt-6 text-lg text-bg/80">
              Let&apos;s talk about what it could look like.
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={prefersReducedMotion ? false : fadeUp.hidden}
            whileInView={fadeUp.visible}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
          >
            <Button
              type="button"
              variant="inverse"
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 text-base"
            >
              Let&apos;s talk
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-5 sm:items-center sm:p-6">
            <motion.button
              type="button"
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              aria-label="Close dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              onClick={closeModal}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="get-started-modal-title"
              className="relative flex max-h-[min(92vh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-card bg-bg shadow-[0_24px_80px_rgb(0,0,0,0.18)]"
              {...modalMotion}
              transition={transition}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/10 to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex shrink-0 items-center justify-between border-b border-border px-6 py-5 sm:px-6">
                <div>
                  <p id="get-started-modal-title" className="text-sm font-medium text-foreground">
                    Step {status === "success" ? TOTAL_STEPS : step} of {TOTAL_STEPS}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-border/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-7 sm:px-6">
                {status === "success" ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-coral-tint">
                      <Sparkles className="h-5 w-5 text-coral" aria-hidden="true" />
                    </div>
                    <h3 className="text-card-title text-foreground">Thanks!</h3>
                    <p className="mt-3 text-body text-muted">
                      Here&apos;s what happens next:
                    </p>
                    <ol className="mt-6 space-y-3 text-left text-body text-foreground">
                      {CONFIRMATION_STEPS.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-semibold text-ink">
                            {index + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                    <Button
                      type="button"
                      onClick={closeModal}
                      className="mt-8 w-full sm:w-auto"
                    >
                      Done
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      className="mb-6 flex gap-1"
                      role="progressbar"
                      aria-valuenow={step}
                      aria-valuemin={1}
                      aria-valuemax={TOTAL_STEPS}
                      aria-label={`Step ${step} of ${TOTAL_STEPS}`}
                    >
                      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            index < step ? "bg-coral" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>

                    <h3 className="text-card-title text-foreground">
                      {stepTitles[step]}
                    </h3>
                    {step === 2 && (
                      <p className="mt-1 text-sm text-muted">
                        Choose any that apply
                      </p>
                    )}

                    <div className="mt-5">
                      {step === 1 && (
                        <div className="space-y-2" role="group" aria-label="Project type">
                          {NEED_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={optionButtonClass(answers.need === option)}
                              aria-pressed={answers.need === option}
                              onClick={() =>
                                setAnswers((prev) => ({ ...prev, need: option }))
                              }
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-2" role="group" aria-label="Project goals">
                          {GOAL_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={optionButtonClass(
                                answers.goals.includes(option)
                              )}
                              aria-pressed={answers.goals.includes(option)}
                              onClick={() => toggleGoal(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-2" role="group" aria-label="Design direction">
                          {DESIGN_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={optionButtonClass(answers.design === option)}
                              aria-pressed={answers.design === option}
                              onClick={() =>
                                setAnswers((prev) => ({ ...prev, design: option }))
                              }
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-2" role="group" aria-label="Budget range">
                          {BUDGET_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={optionButtonClass(answers.budget === option)}
                              aria-pressed={answers.budget === option}
                              onClick={() =>
                                setAnswers((prev) => ({ ...prev, budget: option }))
                              }
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-2" role="group" aria-label="Timeline">
                          {TIMELINE_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={optionButtonClass(
                                answers.timeline === option
                              )}
                              aria-pressed={answers.timeline === option}
                              onClick={() =>
                                setAnswers((prev) => ({ ...prev, timeline: option }))
                              }
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 6 && (
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                          <div>
                            <label htmlFor="name" className="sr-only">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Name"
                              value={answers.name}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className={inputClasses}
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && (
                              <p
                                id="name-error"
                                className="mt-1.5 text-sm text-red-600"
                                role="alert"
                              >
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className="sr-only">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email"
                              value={answers.email}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className={inputClasses}
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && (
                              <p
                                id="email-error"
                                className="mt-1.5 text-sm text-red-600"
                                role="alert"
                              >
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="phone" className="sr-only">
                              Phone (optional)
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="Phone (optional)"
                              value={answers.phone}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className={inputClasses}
                            />
                          </div>

                          <div>
                            <label htmlFor="notes" className="sr-only">
                              Anything else?
                            </label>
                            <textarea
                              id="notes"
                              name="notes"
                              placeholder="Anything else?"
                              rows={3}
                              maxLength={2000}
                              value={answers.notes}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  notes: e.target.value,
                                }))
                              }
                              className={`${inputClasses} min-h-[88px] resize-y`}
                            />
                          </div>

                          {serverMessage && (
                            <p className="text-sm text-red-600" role="alert">
                              {serverMessage}
                            </p>
                          )}

                          <div className="flex items-center justify-between gap-4 pt-1">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={status === "submitting"}
                            >
                              {status === "submitting"
                                ? "Sending…"
                                : "Send project details"}
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>

                    {step < 6 && (
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleBack}
                          disabled={step === 1}
                          aria-disabled={step === 1}
                          className={
                            step === 1 ? "pointer-events-none opacity-40" : ""
                          }
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!canAdvance()}
                          aria-disabled={!canAdvance()}
                          className={
                            !canAdvance() ? "pointer-events-none opacity-40" : ""
                          }
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
