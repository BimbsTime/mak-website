import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VerticalsSection } from "@/components/verticals-section";

describe("VerticalsSection", () => {
  it("does not mark any slide as active by default", () => {
    render(<VerticalsSection />);

    const aggregationCard = screen.getByRole("heading", { name: "Asset Aggregation" }).closest("article");
    const hospitalityCard = screen.getByRole("heading", { name: "Hospitality" }).closest("article");
    expect(aggregationCard).toHaveAttribute("data-active", "false");
    expect(hospitalityCard).toHaveAttribute("data-active", "false");
  });

  it("moves the active state to the hovered slide and clears active on leave", () => {
    vi.useFakeTimers();
    const { container } = render(<VerticalsSection />);

    const aggregationCard = screen.getByRole("heading", { name: "Asset Aggregation" }).closest("article");
    const hospitalityCard = screen.getByRole("heading", { name: "Hospitality" }).closest("article");
    expect(aggregationCard).toHaveAttribute("data-active", "false");
    expect(hospitalityCard).toHaveAttribute("data-active", "false");

    fireEvent.mouseEnter(hospitalityCard as HTMLElement);
    expect(hospitalityCard).toHaveAttribute("data-active", "true");
    expect(aggregationCard).toHaveAttribute("data-active", "false");

    const carouselScroller = container.querySelector("#verticals .no-scrollbar");
    expect(carouselScroller).not.toBeNull();
    fireEvent.mouseLeave(carouselScroller as HTMLElement);
    act(() => {
      vi.runAllTimers();
    });

    expect(aggregationCard).toHaveAttribute("data-active", "false");
    expect(hospitalityCard).toHaveAttribute("data-active", "false");
    vi.useRealTimers();
  });
});
