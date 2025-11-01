import { Console } from "@woowacourse/mission-utils";

class InputView {
  static async inputPurchaseAmount() {
    const input = await Console.readLineAsync("구입 금액을 입력해 주세요.\n");
    return input.trim();
  }
}

export default InputView;
