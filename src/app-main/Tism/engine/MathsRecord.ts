import {ProblemEngineConstructorArgs, ProblemsEngine} from "./ProblemsEngine";
type ResponseRecord = {
  date: Date;
  response: number;
}
type ProblemRecord = {
  problem: ProblemEngineConstructorArgs;
  responses: ResponseRecord[];
}
export class MathsRecord {
  private recordsMap: Map<string, ProblemRecord>;

  public constructor() {
    this.recordsMap = new Map();
  }
  public recordResponse(problem: ProblemsEngine, response: number) {
    const problemString = problem.toString();
    let problemRecord: ProblemRecord = this.recordsMap.get(problemString) || {
      problem: problem.problemArgs(),
      responses: []
    };
    if (!this.recordsMap.has(problemString)) {
      this.recordsMap.set(problemString, problemRecord);
    }

    const responseRecord: ResponseRecord = {
      date: new Date(),
      response
    };

    problemRecord.responses.push(responseRecord);
  }

  public toString() {
    this.recordsMap.entries()
    return Array.from(this.recordsMap.entries()).map(([key, record]) => {
      const problem = new ProblemsEngine(record.problem);
      return record.responses.map((response) => {
        const isCorrect = problem.checkAnswer(`${response.response}`);
        const dateTime = response.date.toISOString();

        return `${dateTime} ${key} ${isCorrect ? 'CORRECT' : response.response}`;
      })
        .join('\n');
    })
      .join('\n');
  }
}

// const a = {
//   problem: {
//     firstNumber: 3,
//     secondNumber: 4,
//     operator: '+'
//   },
//   responses: [
//     {
//       date: '2023-06-09 15:07:31',
//       response: 7
//     }
//   ]
// }
