import i18n from "@/i18n";
import { ValidationError } from "yup";
import { carerSchema } from "../carerSchema";

describe("carerSchema", () => {
  const baby = {
    name: "tester",
    familyTies: "father",
    phone: "12345678999",
    wechat: "wechat",
  };

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

  it.each(["12345678901", "19999999999", "1".repeat(20), "1"])(
    "should return true for valid phone number: %s",
    (phone) => {
      const schema = carerSchema(i18n.getFixedT(null, "CreateCarer"));
      expect(schema.isValidSync({ ...baby, phone })).toBeTruthy();
    },
  );

  it.each(["1".repeat(21), "abcdefghijk"])(
    "should return false for invalid phone number: %s",
    (phone) => {
      const schema = carerSchema(i18n.getFixedT(null, "CreateCarer"));
      expect(schema.isValidSync({ ...baby, phone })).toBeFalsy();

      try {
        schema.validateSync({ ...baby, phone });
      } catch (error) {
        expect((error as ValidationError).message).toEqual(
          "Only allow 5-20 numbers",
        );
      }
    },
  );
});
