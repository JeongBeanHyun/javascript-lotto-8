import { MissionUtils } from "@woowacourse/mission-utils";
import LottoGenerator from "../src/domain/LottoGenerator.js";
import Lotto from "../src/domain/Lotto.js";

jest.mock("@woowacourse/mission-utils");

describe("LottoGenerator 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("generateOne()은 Lotto 객체를 반환한다", () => {
    MissionUtils.Random.pickUniqueNumbersInRange.mockReturnValue([
      1, 2, 3, 4, 5, 6,
    ]);

    const lotto = LottoGenerator.generateOne();

    expect(lotto).toBeInstanceOf(Lotto);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("generateMany()는 원하는 개수만큼 Lotto 객체를 생성한다", () => {
    MissionUtils.Random.pickUniqueNumbersInRange.mockReturnValue([
      1, 2, 3, 4, 5, 6,
    ]);

    const tickets = LottoGenerator.generateMany(3);

    expect(tickets).toHaveLength(3);
    tickets.forEach((ticket) => {
      expect(ticket).toBeInstanceOf(Lotto);
    });
  });
});
