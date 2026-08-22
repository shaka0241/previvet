import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("une clases simples", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("tailwind-merge resuelve conflictos: gana la última", () => {
    expect(cn("text-primary", "text-white")).toBe("text-white");
    expect(cn("bg-secondary", "bg-primary/90")).toBe("bg-primary/90");
    expect(cn("px-6 py-3 px-4")).toBe("py-3 px-4");
  });

  it("no toca clases no conflictivas", () => {
    expect(cn("rounded-md border-2", "border-white")).toBe(
      "rounded-md border-2 border-white",
    );
  });
});
