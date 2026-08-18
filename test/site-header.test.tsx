import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/site-header";
import { useMobileMenuStore } from "@/hooks/use-mobile-menu-store";

describe("SiteHeader", () => {
  beforeEach(() => {
    useMobileMenuStore.setState({ isOpen: false, residentialExpanded: false });
  });

  it("opens the mobile overlay menu", () => {
    render(<SiteHeader activeNavKey="hospitality" />);

    fireEvent.click(screen.getByLabelText("Open navigation menu"));

    expect(screen.getByLabelText("Close navigation menu")).toBeInTheDocument();
  });

  it("renders the new section links inside the mobile overlay", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByLabelText("Open navigation menu"));

    expect(screen.getAllByRole("link", { name: "Our Verticals" }).at(-1)).toHaveAttribute("href", "/#verticals");
    expect(screen.getAllByRole("link", { name: "Identity & Approach" }).at(-1)).toHaveAttribute("href", "/#approach");
    expect(screen.getAllByRole("link", { name: "Project Pipeline" }).at(-1)).toHaveAttribute("href", "/#growth");
    expect(screen.getAllByRole("link", { name: "Contact Us" }).at(-1)).toHaveAttribute("href", "/#contact");
  });

  it("links the logo home and partners to the coming soon route", () => {
    render(<SiteHeader activeNavKey="hospitality" />);

    expect(screen.getByRole("link", { name: "MĀK" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Strategic Partners" })).toHaveAttribute(
      "href",
      "/coming-soon?tab=partners",
    );
  });

  it("replaces the old navigation labels", () => {
    render(<SiteHeader />);

    expect(screen.queryByRole("link", { name: "Residential" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Commercial" })).not.toBeInTheDocument();
  });
});
