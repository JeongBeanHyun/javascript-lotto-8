import { Console } from "@woowacourse/mission-utils";

class InputView {
  static async inputPurchaseAmount() {
    const input = await Console.readLineAsync("\n구입금액을 입력해 주세요.\n");
    return input.trim();
  }

  static async inputWinningNumbers() {
    const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
    return input.trim();
  }

  static async inputBonusNumber() {
    const input = await Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    return input.trim();
  }
}

export default InputView;
