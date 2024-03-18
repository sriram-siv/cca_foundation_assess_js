import { describe, expect, it, vi } from "vitest";
import { printShippingCosts } from "../main";

const spyConsole = vi.spyOn(console, "log");

describe("printShippingCosts", () => {
  it("should return results unchanged from initial outputs", async () => {
    await new Promise((res) => setTimeout(res, 1000));

    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to United Kingdom for order total £99.99 is £4.99"
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to United Kingdom for order total £100 is £0"
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to France for order total £100 is £4.99"
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to Albania for order total £99.99 is £9.99"
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to United Kingdom for order total £99.99 is £4.99"
    );
    expect(spyConsole).toHaveBeenCalledWith(
      "Shipping cost to France for order total £99.99 is £8.99"
    );
  });
});
