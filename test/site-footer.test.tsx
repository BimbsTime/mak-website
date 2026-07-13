import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("renders disabled legal labels without links", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.queryByRole("link", { name: /privacy/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /terms/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /rera disclosure/i })).not.toBeInTheDocument();
    expect(screen.getByText("Privacy")).toHaveAttribute("aria-disabled", "true");
  });
});
