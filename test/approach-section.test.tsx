import React from "react";
import { describe, expect, it } from "vitest";

import { getApproachActiveIndex } from "@/components/approach-section";

describe("getApproachActiveIndex", () => {
  it("defaults to the first point before the section has progressed", () => {
    expect(getApproachActiveIndex(-0.25, 3)).toBe(0);
    expect(getApproachActiveIndex(0.1, 3)).toBe(0);
  });

  it("advances through the three approach points as scroll progress increases", () => {
    expect(getApproachActiveIndex(0.34, 3)).toBe(1);
    expect(getApproachActiveIndex(0.67, 3)).toBe(2);
    expect(getApproachActiveIndex(1.5, 3)).toBe(2);
  });
});
