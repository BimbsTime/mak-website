import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders the key editorial sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /considered places\.\s*composed to endure\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /the practice/i })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /core identity\s*&\s*approach/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /connect with mak/i })).toBeInTheDocument();
  });
});
