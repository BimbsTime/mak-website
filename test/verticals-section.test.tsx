import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VerticalsSection } from "@/components/verticals-section";

describe("VerticalsSection", () => {
  it("defaults the residential card as the active slide", () => {
    render(<VerticalsSection />);

    const residentialCard = screen.getByRole("heading", { name: "Residential" }).closest("article");
    expect(residentialCard).toHaveAttribute("data-active", "true");
  });

  it("moves the active state to the hovered slide and resets on leave", () => {
    vi.useFakeTimers();
    const { container } = render(<VerticalsSection />);

    const residentialCard = screen.getByRole("heading", { name: "Residential" }).closest("article");
    const hospitalityCard = screen.getByRole("heading", { name: "Hospitality" }).closest("article");
    expect(residentialCard).toHaveAttribute("data-active", "true");

    fireEvent.mouseEnter(hospitalityCard as HTMLElement);
    expect(hospitalityCard).toHaveAttribute("data-active", "true");
    expect(residentialCard).toHaveAttribute("data-active", "false");

    const carouselScroller = container.querySelector("#verticals .no-scrollbar");
    expect(carouselScroller).not.toBeNull();
    fireEvent.mouseLeave(carouselScroller as HTMLElement);
    act(() => {
      vi.runAllTimers();
    });

    expect(residentialCard).toHaveAttribute("data-active", "true");
    expect(hospitalityCard).toHaveAttribute("data-active", "false");
    vi.useRealTimers();
  });
});
