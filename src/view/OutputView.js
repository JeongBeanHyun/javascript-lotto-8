import { Console } from "@woowacourse/mission-utils";

class OutputView {
  static printResult(summary) {
    Console.print("\n당첨 통계");
    Console.print("---");

    const result = [
      { label: "3개 일치", prize: "5,000원", rank: 5 },
      { label: "4개 일치", prize: "50,000원", rank: 4 },
      { label: "5개 일치", prize: "1,500,000원", rank: 3 },
      {
        label: "5개 일치, 보너스 볼 일치",
        prize: "30,000,000원",
        rank: 2,
      },
      { label: "6개 일치", prize: "2,000,000,000원", rank: 1 },
    ];

    result.forEach(({ label, prize, rank }) => {
      Console.print(`${label} (${prize}) - ${summary[rank]}개`);
    });
  }

  static printPurchase(count) {
    Console.print("\n" + count + "개를 구매했습니다.");
  }

  static printTickets(tickets) {
    for (const t of tickets) {
      const numbers = t.getNumbers();
      Console.print("[" + numbers.join(", ") + "]");
    }
  }

  static printEarningRate(rate) {
    Console.print(`총 수익률은 ${rate}%입니다.`);
  }
}

export default OutputView;
