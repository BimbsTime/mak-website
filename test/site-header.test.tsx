import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("toggles the residential submenu inside the mobile overlay", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByLabelText("Open navigation menu"));
    fireEvent.click(screen.getByRole("button", { name: /residential/i }));

    const mobileSubmenu = screen.getByRole("button", { name: /residential/i }).closest("div");
    expect(mobileSubmenu).not.toBeNull();
    expect(within(mobileSubmenu as HTMLElement).getByText("Urban Residential")).toBeInTheDocument();
    expect(within(mobileSubmenu as HTMLElement).getByText("Non-urban Residential")).toBeInTheDocument();
  });

  it("links the logo home and desktop nav to coming soon routes", () => {
    render(<SiteHeader activeNavKey="hospitality" />);

    expect(screen.getByRole("link", { name: "MĀK" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /commercial/i })).toHaveAttribute(
      "href",
      "/coming-soon?tab=commercial",
    );
  });

  it("renders the residential desktop submenu links", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Urban Residential" })).toHaveAttribute(
      "href",
      "/coming-soon?tab=residential",
    );
    expect(screen.getByRole("link", { name: "Non-urban Residential" })).toHaveAttribute(
      "href",
      "/coming-soon?tab=residential",
    );
  });
});
