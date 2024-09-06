import { ValidationError } from "yup";
import { babySchema } from "../babySchema";
import i18n from "@/i18n";

describe("babySchema", () => {
  it.each([
    { name: "小明", result: true },
    { name: "小明小明小明小明小明小", result: true },
    { name: "小明".repeat(26), result: false },
    { name: "John Doe", result: true },
    { name: "いしかわおさむ", result: true },
    { name: "탁창욱", result: true },
    { name: "O'Connor", result: true },
    { name: "1234", result: false },
  ])(
    "should valid with result $result with name: $name",
    ({ name, result }) => {
      const baby = {
        name: "tester",
        gender: "male",
        stage: "stage",
      };
      const schema = babySchema(i18n.getFixedT(null, "BabyForm"));
      expect(schema.isValidSync({ ...baby, name })).toBe(result);

      if (!result) {
        try {
          schema.validateSync({ ...baby, name });
        } catch (error) {
          expect((error as ValidationError).message).toEqual(
            "Only allow 1-50 characters without special characters",
          );
        }
      }
    },
  );
});
