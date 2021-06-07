export class ResultCombined {
  constructor(
    public solutionId: string = '',
    public testCaseId: string = '',
    public taskId: string = '',
    public executionTime: number = 0,
    public memoryUsage: number = 0,
    public outputCorrectness: string = '',
    public code: string = '',
    public language: string = '',
    public taskName: string = '',
    public solutionName: string = '',
    public input: string = '',
    public output: string = ''
  ) {}
}
