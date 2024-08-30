import { babySchema } from "../babySchema";

describe("babySchema", () => {
  it.each([
    { name: "小明", result: true },
    { name: "小明小明小明小明小明小", result: false },
    { name: "John Doe", result: true },
    { name: "Jean-Luc Picard", result: false },
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
      const schema = babySchema(jest.fn().mockImplementation((v) => v) as any);
      expect(schema.isValidSync({ ...baby, name })).toBe(result);
    },
  );
});
