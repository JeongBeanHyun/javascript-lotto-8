import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";

class LottoGenerator {
  static generateOne() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    return new Lotto(numbers);
  }

  static generateMany(count) {
    const tickets = [];
    for (let i = 0; i < count; i++) {
      tickets.push(LottoGenerator.generateOne());
    }
    return tickets;
  }
}

export default LottoGenerator;
