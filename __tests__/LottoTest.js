import { ERROR_MESSAGE } from "../src/errorMessage";
import Lotto from "../src/Lotto";

describe("로또 클래스 예외 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGE.INVALID_LOTTO_LENGTH);
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBER);
  });

  test.each([
    [[0, 2, 3, 4, 5, 6]],
    [[1, 2, 3, 4, 5, 47]],
    [[-1, 2, 3, 4, 5, 6]],
  ])("로또 번호 범위가 1~45가 아닌 경우 예외가 발생한다.", (lotto) => {
    expect(() => new Lotto(lotto)).toThrow(ERROR_MESSAGE.INVALID_RANGE);
  });

  test("경계값 1과 45는 허용된다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 45])).not.toThrow();
  });
});

describe("로또 정상 생성 테스트", () => {
  test("정상 입력이면 객체 생성되고 오름차순 정렬되어 저장된다.", () => {
    const lotto = new Lotto([6, 1, 3, 7, 2, 11]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 6, 7, 11]);
  });

  test("로또 길이는 항상 6이다.", () => {
    const lotto = new Lotto([11, 2, 6, 9, 43, 3]);
    expect(lotto.getNumbers()).toHaveLength(6);
  });
});
