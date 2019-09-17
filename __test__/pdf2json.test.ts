import Pdf2Json from "../src";

test("Init library", () => {
  const pdf2Json = new Pdf2Json();
  expect(pdf2Json).not.toBe(null);
});
