import ResultService from "../src/service/ResultService";

describe("당첨 결과 판별 테스트", () => {
  const winning = [1, 2, 3, 4, 5, 6];
  const bonus = 7;
  const tickets = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [1, 2, 3, 4, 5, 11],
    [1, 2, 3, 4, 10, 11],
    [1, 2, 3, 10, 11, 12],
    [1, 2, 10, 11, 12, 13],
  ];

  test("등수별 당첨 개수를 집계한다.", () => {
    const summary = ResultService.summarizeRanks(tickets, winning, bonus);
    expect(summary).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
  });

  test("총 당첨금을 계산한다.", () => {
    const summary = ResultService.summarizeRanks(tickets, winning, bonus);
    const total = ResultService.calculateTotalPrize(summary);
    expect(total).toBe(2000000000 + 30000000 + 1500000 + 50000 + 5000);
  });

  test("소수 둘째 자리에서 반올림하여 수익률을 반환한다.", () => {
    const totalPrize = 5000;
    const purchaseAmount = 8000;
    const rate = ResultService.calculateEarningRate(totalPrize, purchaseAmount);
    expect(rate).toBe(62.5);
  });
});
