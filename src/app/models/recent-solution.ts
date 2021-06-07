export class RecentSolution {
  constructor(
    public id: string = '',
    public name: string = '',
    public taskId: string = '',
    public taskName: string = '',
    // public name: string,
    public code: string = '',
    public language: string = '',
    public creationDate: Date = new Date(),
    public executionTime: number = 0,
    public memoryUsage: number = 0,
    public correctAnswers: number = 0,
    public allAnswers: number = 0,
    public solutionName: string = ''
  ) {}
  }
