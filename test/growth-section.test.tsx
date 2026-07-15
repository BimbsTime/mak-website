import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GrowthSectionV2 } from "@/components/growth-section-v2";

describe("GrowthSectionV2", () => {
  it("renders the project pipeline slides", () => {
    const { container } = render(<GrowthSectionV2 />);

    expect(screen.getByRole("heading", { name: /commercial development/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /non-urban expansion/i })).toBeInTheDocument();

    const slides = container.querySelectorAll("article");
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveAttribute("data-growth-card");
    expect(container.querySelector("[data-growth-image]")).toBeInTheDocument();
    expect(container.querySelector("[data-growth-content]")).toBeInTheDocument();
  });

  it("uses a touch-swipable mobile track without scroll snapping", () => {
    const { container } = render(<GrowthSectionV2 />);

    const pinnedSection = screen.getByRole("region", { name: /project pipeline/i });
    expect(pinnedSection.className).toContain("overflow-x-auto");
    expect(container.querySelector(".snap-start")).not.toBeInTheDocument();
  });
});
