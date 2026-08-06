import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GrowthSectionV2 } from "@/components/growth-section-v2";

describe("GrowthSectionV2", () => {
  it("renders the project pipeline cards in a vertical stack", () => {
    const { container } = render(<GrowthSectionV2 />);

    expect(screen.getByRole("heading", { name: /commercial development/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /residential development/i })).toBeInTheDocument();

    const slides = container.querySelectorAll("article");
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveAttribute("data-growth-card");
    expect(container.querySelector("[data-growth-image]")).toBeInTheDocument();
    expect(container.querySelector("[data-growth-content]")).toBeInTheDocument();
  });

  it("does not render a horizontal slider or explore buttons", () => {
    const { container } = render(<GrowthSectionV2 />);

    const pipeline = screen.getByLabelText(/project pipeline/i);
    expect(pipeline.className).not.toContain("overflow-x-auto");
    expect(container.querySelector(".snap-start")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /explore/i })).not.toBeInTheDocument();
  });
});
