import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GrowthSection, isGrowthTrackFullyVisible } from "@/components/growth-section";

describe("GrowthSection", () => {
  it("renders the project pipeline slides", () => {
    const { container } = render(<GrowthSection />);

    expect(screen.getByRole("heading", { name: /commercial development/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /non-urban expansion/i })).toBeInTheDocument();

    const slides = container.querySelectorAll("article");
    expect(slides).toHaveLength(2);
    expect(slides[0]?.className).toContain("snap-start");
  });

  it("requires a deeper fully-visible frame for faster wheel gestures", () => {
    expect(isGrowthTrackFullyVisible({ top: 10, bottom: 790 }, 800, 20)).toBe(true);
    expect(isGrowthTrackFullyVisible({ top: 10, bottom: 790 }, 800, 320)).toBe(false);
  });
});
