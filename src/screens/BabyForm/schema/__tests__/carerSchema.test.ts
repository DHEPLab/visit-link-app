import i18n from "@/i18n";
import { ValidationError } from "yup";
import { carerSchema } from "../carerSchema";

describe("carerSchema", () => {
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
        familyTies: "father",
        phone: "12345678999",
        wechat: "wechat",
      };
      const schema = carerSchema(i18n.getFixedT(null, "CreateCarer"));
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
