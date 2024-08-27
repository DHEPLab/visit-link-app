import { useMethods } from "./CreateBabyStep2";

describe("<CreateBabyStep2 />", () => {
  const { familyTies, handleNextStep, pullAt, keepMasterCarerUnique, create } =
    useMethods();
  it("should pull at element", () => {
    expect(pullAt([1, 2], 1)).toStrictEqual([1]);
  });

  it("should keep master carer unique", () => {
    const carer = [
      {
        master: true,
      },
      {
        master: true,
      },
    ];
    expect(keepMasterCarerUnique(carer, 1)).toStrictEqual([
      {
        master: false,
      },
      {
        master: true,
      },
    ]);
  });

  it("should create new carer", () => {
    const carers = [
      {
        name: "carer1",
      },
    ];
    expect(create(carers, { name: "carer2" })).toStrictEqual([
      {
        name: "carer1",
      },
      {
        name: "carer2",
      },
    ]);
  });

  it("should stop navigate when there is no master carer", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    handleNextStep(navigation, {}, [{ master: false }]);
    expect(navigation.navigate).not.toBeCalled();
  });

  it("should navigate with params", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const baby = { name: "baby" };
    const carers = [{ master: true }];
    handleNextStep(navigation, baby, carers);
    expect(navigation.navigate).toBeCalledWith("CreateBabyStep3", {
      baby,
      carers,
    });
  });

  it("should get all family ties", () => {
    const carers = [
      {
        id: 1,
        familyTies: "MONTHER",
      },
      {
        id: 2,
        familyTies: "FATHER",
      },
    ];
    expect(familyTies(carers)).toStrictEqual(["MONTHER", "FATHER"]);
    expect(familyTies(carers, "FATHER")).toStrictEqual(["MONTHER"]);
  });
});
