import { Console } from "@woowacourse/mission-utils";

class InputView {
  static async inputPurchaseAmount() {
    const input = await Console.readLineAsync("구입 금액을 입력해 주세요.\n");
    return input.trim();
  }

  static async inputWinningNumbers() {
    const input = await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
    return input.trim();
  }

  static async inputBonusNumber() {
    const input = await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
    return input.trim();
  }
}

export default InputView;
