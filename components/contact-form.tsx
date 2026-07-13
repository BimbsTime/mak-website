"use client";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type FormValues = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
};

const initialValues: FormValues = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
};

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name";
  }

  if (!/^\d{10}$/.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "Please enter a valid number";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress.trim())) {
    errors.emailAddress = "Please enter a valid email address";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMessage = useMemo(() => {
    if (errors.phoneNumber) {
      return errors.phoneNumber;
    }

    return Object.values(errors)[0] ?? "";
  }, [errors]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isSubmitting || isSubmitted) {
      return;
    }

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid overflow-hidden bg-[var(--background)] md:grid-cols-[1fr_1.03fr]"
    >
      <div className="flex min-h-[560px] flex-col items-center px-8 py-12 md:min-h-[650px] md:px-[133px] md:py-[70px]">
        <Image src="/images/brand/mak-logo.png" alt="MĀK" width={101} height={48} className="h-12 w-[101px]" />

        <div className="mt-12 flex w-full flex-col gap-10 md:mt-16">
          {[
            { key: "fullName", label: "Full name*", type: "text", autoComplete: "name" },
            { key: "phoneNumber", label: "Phone number*", type: "tel", autoComplete: "tel" },
            { key: "emailAddress", label: "Email address*", type: "email", autoComplete: "email" },
          ].map((field) => {
            const key = field.key as keyof FormValues;
            const hasError = Boolean(errors[key]);

            return (
              <label key={field.key} className="flex flex-col gap-4 md:gap-10">
                <span
                  className={`font-body text-[16px] leading-[18px] ${
                    hasError ? "text-[#a33a3a]" : "text-[#a6a6a6]"
                  }`}
                >
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.key}
                  autoComplete={field.autoComplete}
                  value={values[key]}
                  disabled={isSubmitted}
                  onChange={(event) => handleChange(key, event.target.value)}
                  className={`border-b bg-transparent pb-2 font-body text-[22px] leading-7 text-black outline-none transition-colors placeholder:text-[#d0cbc2] ${
                    hasError ? "border-[#d06464]" : "border-[#a0a0a0] focus:border-black"
                  } ${isSubmitted ? "opacity-75" : ""}`}
                  placeholder=""
                />
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="mt-10 inline-flex h-12 w-full items-center justify-center bg-[var(--brand)] px-8 font-display text-[20px] leading-[21px] font-light text-[#f7f5f2] transition-colors duration-300 hover:bg-[var(--brand-hover)] disabled:cursor-default disabled:hover:bg-[var(--brand)] md:mt-16"
        >
          {isSubmitting ? (
            <LoaderCircle aria-label="Submitting form" className="size-5 animate-spin" strokeWidth={1.5} />
          ) : isSubmitted ? (
            "Thank you!"
          ) : (
            "Request Details"
          )}
        </button>

        <div className="mt-4 min-h-5 text-center font-body text-[16px] leading-[18px] text-[#a33a3a]">
          {submitMessage}
        </div>
      </div>

      <div className="relative hidden min-h-[650px] bg-[#ddd6c8] md:block">
        <Image
          src="/images/contact/panel-image.png"
          alt="Entry view of the branded MĀK Living facade with water feature and curved stone forms."
          fill
          sizes="580px"
          className="object-cover"
        />
      </div>
    </form>
  );
}
