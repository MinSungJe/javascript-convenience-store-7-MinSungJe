import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const mockNowDate = (date = null) => {
  const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, 'now');
  mockDateTimes.mockReturnValue(new Date(date));
  return mockDateTimes;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach((exp) => {
    expect(received).toContain(exp);
  });
};

const expectLogContainsWithoutSpacesAndEquals = (received, expects) => {
  const processedReceived = received.replace(/[\s=]/g, '');
  expects.forEach((exp) => {
    expect(processedReceived).toContain(exp);
  });
};

const runExceptions = async ({
  inputs = [],
  inputsToTerminate = [],
  expectedErrorMessage = '',
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringContaining(expectedErrorMessage)
  );
};

const run = async ({
  inputs = [],
  inputsToTerminate = [],
  expected = [],
  expectedIgnoringWhiteSpaces = [],
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const app = new App();
  await app.run();

  const output = getOutput(logSpy);

  // then
  if (expectedIgnoringWhiteSpaces.length > 0) {
    expectLogContainsWithoutSpacesAndEquals(
      output,
      expectedIgnoringWhiteSpaces
    );
  }
  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

const INPUTS_TO_TERMINATE = ['[비타민워터-1]', 'N', 'N'];

describe('편의점', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('파일에 있는 상품 목록 출력', async () => {
    await run({
      inputs: ['[콜라-1]', 'N', 'N'],
      expected: [
        // /* prettier-ignore */
        '- 콜라 1,000원 10개 탄산2+1',
        '- 콜라 1,000원 10개',
        '- 사이다 1,000원 8개 탄산2+1',
        '- 사이다 1,000원 7개',
        '- 오렌지주스 1,800원 9개 MD추천상품',
        '- 오렌지주스 1,800원 재고 없음',
        '- 탄산수 1,200원 5개 탄산2+1',
        '- 탄산수 1,200원 재고 없음',
        '- 물 500원 10개',
        '- 비타민워터 1,500원 6개',
        '- 감자칩 1,500원 5개 반짝할인',
        '- 감자칩 1,500원 5개',
        '- 초코바 1,200원 5개 MD추천상품',
        '- 초코바 1,200원 5개',
        '- 에너지바 2,000원 5개',
        '- 정식도시락 6,400원 8개',
        '- 컵라면 1,700원 1개 MD추천상품',
        '- 컵라면 1,700원 10개',
      ],
    });
  });

  test('여러 개의 일반 상품 구매', async () => {
    await run({
      inputs: ['[비타민워터-3],[물-2],[정식도시락-2]', 'N', 'N'],
      expectedIgnoringWhiteSpaces: ['내실돈18,300'],
    });
  });

  test('출력 예시랑 같은 상황의 테스트케이스입니다.', async () => {
    await run({
      inputs: [
        '[콜라-3],[에너지바-5]',
        'Y',
        'Y',
        '[콜라-10]',
        'Y',
        'N',
        'Y',
        '[오렌지주스-1]',
        'Y',
        'Y',
        'N',
      ],
      expectedIgnoringWhiteSpaces: [
        '내실돈9,000',
        '내실돈8,000',
        '내실돈1,800',
      ],
    });
  });

  test('멤버십 할인은 최대 8000원까지입니다.', async () => {
    await run({
      inputs: ['[정식도시락-8]', 'Y', 'N'],
      expectedIgnoringWhiteSpaces: ['멤버십할인-8,000', '내실돈43,200'],
    });
  });

  test('기간에 해당하지 않는 프로모션 적용', async () => {
    mockNowDate('2024-02-01');

    await run({
      inputs: ['[감자칩-2]', 'N', 'N'],
      expectedIgnoringWhiteSpaces: ['내실돈3,000'],
    });
  });

  test('재고 수량을 초과한 경우', async () => {
    await runExceptions({
      inputs: ['[컵라면-12]', 'N', 'N'],
      inputsToTerminate: INPUTS_TO_TERMINATE,
      expectedErrorMessage:
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
    });
  });

  test('존재하지 않은 상품을 조회한 경우', async () => {
    await runExceptions({
      inputs: ['[민성제-1]', 'N', 'N'],
      inputsToTerminate: INPUTS_TO_TERMINATE,
      expectedErrorMessage:
        '[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.',
    });
  });

  test('입력한 형식이 잘못된 경우', async () => {
    await runExceptions({
      inputs: ['컵라면-12', 'N', 'N'],
      inputsToTerminate: INPUTS_TO_TERMINATE,
      expectedErrorMessage:
        '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
    });
  });

  test('Y, N를 입력하지 않은 경우', async () => {
    await runExceptions({
      inputs: ['[컵라면-1]', 'YES', 'N'],
      inputsToTerminate: INPUTS_TO_TERMINATE,
      expectedErrorMessage: '[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.',
    });
  });
});
