import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApproachSection } from "@/components/approach-section";

describe("ApproachSection", () => {
  it("renders every approach principle and its copy without interactive reveal controls", () => {
    const { container } = render(<ApproachSection />);

    expect(screen.getByRole("heading", { name: /integrated capability/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /architectural intent/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /integrated capability/i })).not.toBeInTheDocument();

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(container.querySelectorAll("[data-approach-point]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-approach-scroll-zone]")).toHaveLength(0);
  });
});
