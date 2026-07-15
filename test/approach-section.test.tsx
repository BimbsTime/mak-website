import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApproachSection } from "@/components/approach-section";

describe("ApproachSection", () => {
  it("renders the compact approach list and continuous video media", () => {
    const { container } = render(<ApproachSection />);

    expect(screen.getByRole("button", { name: /integrated capability/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /spatial intent/i })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /micro-hospitality/i })).toHaveAttribute("aria-pressed", "false");

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(container.querySelectorAll("[data-approach-point]")).toHaveLength(3);
    expect(container.querySelectorAll("[data-approach-scroll-zone]")).toHaveLength(3);
  });
});
