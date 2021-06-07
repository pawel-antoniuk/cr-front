export class Result {
  constructor(
    public testCaseId: string = '',
    public solutionId: string = '',
    public executionTime: number = 0,
    public memoryUsage: number = 0,
    public outputCorrectness: string = ''
  ) {}
}
