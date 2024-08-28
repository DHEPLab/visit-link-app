import { pullAt } from "../array";

describe("array utils", () => {
  describe("pullAt", () => {
    it("should removes elements from array corresponding to indexes and returns an array of removed elements.", () => {
      expect(pullAt([1, 2], 1)).toStrictEqual([1]);
      expect(pullAt(["a", "b", "c", "d"], 1)).toStrictEqual(["a", "c", "d"]);
    });

    it("should not change the input parameter reference", () => {
      let strings = ["a", "b", "c", "d"];
      expect(pullAt(strings, [1, 3])).toStrictEqual(["a", "c"]);
      expect(strings).toStrictEqual(["a", "b", "c", "d"]);
    });
  });
});
