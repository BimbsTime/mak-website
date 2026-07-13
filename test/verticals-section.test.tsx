import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VerticalsSection } from "@/components/verticals-section";

describe("VerticalsSection", () => {
  it("defaults the residential card as the active slide", () => {
    render(<VerticalsSection />);

    const residentialCard = screen.getByRole("heading", { name: "Residential" }).closest("article");
    expect(residentialCard).toHaveAttribute("data-active", "true");
  });

  it("moves the active state to the hovered slide and resets on leave", () => {
    const { container } = render(<VerticalsSection />);

    const residentialCard = screen.getByRole("heading", { name: "Residential" }).closest("article");
    const hospitalityCard = screen.getByRole("heading", { name: "Hospitality" }).closest("article");
    expect(residentialCard).toHaveAttribute("data-active", "true");

    fireEvent.mouseEnter(hospitalityCard as HTMLElement);
    expect(hospitalityCard).toHaveAttribute("data-active", "true");
    expect(residentialCard).toHaveAttribute("data-active", "false");

    const carouselRow = container.querySelector("#verticals .no-scrollbar > div");
    expect(carouselRow).not.toBeNull();
    fireEvent.mouseLeave(carouselRow as HTMLElement);

    expect(residentialCard).toHaveAttribute("data-active", "true");
    expect(hospitalityCard).toHaveAttribute("data-active", "false");
  });
});
