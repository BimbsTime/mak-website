import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a validation message for an invalid phone number", () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Full name*"), { target: { value: "Full Name" } });
    fireEvent.change(screen.getByLabelText("Phone number*"), { target: { value: "98765" } });
    fireEvent.change(screen.getByLabelText("Email address*"), { target: { value: "name@gmail.com" } });
    fireEvent.click(screen.getByRole("button", { name: /request details/i }));

    expect(screen.getByText("Please enter a valid number")).toBeInTheDocument();
  });

  it("shows a thank-you state after a valid submit", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Full name*"), { target: { value: "Full Name" } });
    fireEvent.change(screen.getByLabelText("Phone number*"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByLabelText("Email address*"), { target: { value: "name@gmail.com" } });
    fireEvent.click(screen.getByRole("button", { name: /request details/i }));

    expect(screen.getByLabelText("Submitting form")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByRole("button", { name: /thank you!/i })).toBeInTheDocument();
  });
});
