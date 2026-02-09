import { formatCurrency } from "../scripts/utils/money.js";

describe("formatCurrency", () => {
  it("formats cents as dollars and cents", () => {
    expect(formatCurrency(0)).toEqual("$0.00");
    expect(formatCurrency(123456)).toEqual("$1234.56");
  });
});
