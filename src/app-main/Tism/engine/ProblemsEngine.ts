export type ProblemEngineConstructorArgs = {
  firstNumber: number;
  secondNumber: number;
  operator: string;
}
export class ProblemsEngine {
  private firstNumber: number;
  private secondNumber: number;
  private operator: string;

  public constructor(args: ProblemEngineConstructorArgs) {
    const {firstNumber, secondNumber, operator} = args;

    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    this.operator = operator;
  }

  public checkAnswer(text: string): boolean {
    if (text.length > 15) return false;
    const correctAnswer = this.evaluateProblem();
    const numericAnswer = parseInt(text);
    // Validate as a number
    const parsedAnswer = `${numericAnswer}`;
    if (parsedAnswer !== text) {
      throw new Error(`checkAnswer(): Number could could not be parsed - ${text}`);
    }
    return (numericAnswer === correctAnswer);
  }

  public evaluateProblem(): number {
    const answer = calculate(this.firstNumber, this.secondNumber, this.operator);
    switch(this.operator) {
      case '+':
        return answer;
      case '-':
        return this.secondNumber;
      case 'x':
        return answer;
      case '÷':
        return this.secondNumber;
      default:
        throw new Error('evaluateProblem(): Invalid Operator');
    }
  }

  public toString(): string {
    if (!this.isReady()) return 'Get ready...'
    const answer = calculate(this.firstNumber, this.secondNumber, this.operator);
    switch(this.operator) {
      case '+':
      case 'x':
        return `${this.firstNumber} ${this.operator} ${this.secondNumber} = ?`;
      case '-':
      case '÷':
        return `${answer} ${this.operator} ${this.firstNumber} = ?`;;
      default:
        throw new Error('evaluateProblem(): Invalid Operator');
    }
  }

  public isReady(): boolean {
    return this.evaluateProblem() !== -1;
  }

  public toAnswerString(): string {
    const answer = calculate(this.firstNumber, this.secondNumber, this.operator);
    switch(this.operator) {
      case '+':
      case 'x':
        return `${this.firstNumber} ${this.operator} ${this.secondNumber} = ${answer}`;
      case '-':
      case '÷':
        return `${answer} ${this.operator} ${this.firstNumber} = ${this.secondNumber}`;
      default:
        throw new Error('evaluateProblem(): Invalid Operator');
    }
  }

  public toSubmissionString(answerText: string): string {
    const answer = calculate(this.firstNumber, this.secondNumber, this.operator);
    switch(this.operator) {
      case '+':
      case 'x':
        return `${this.firstNumber} ${this.operator} ${this.secondNumber} = ${answerText}`;
      case '-':
      case '÷':
        return `${answer} ${this.operator} ${this.firstNumber} = ${answerText}`;
      default:
        throw new Error('evaluateProblem(): Invalid Operator');
    }
  }

  public problemArgs(): ProblemEngineConstructorArgs {
    return {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operator: this.operator
    }
  }

}

const calculate = (firstNumber:number, secondNumber:number, operator: string): number => {
  switch(operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber + secondNumber;
    case 'x':
      return firstNumber * secondNumber;
    case '÷':
      return firstNumber * secondNumber;
    default:
      throw new Error('Invalid Operator');
  }

}
