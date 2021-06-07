import { TestCase } from "./test-case";

export class Task {
  constructor(
  public id: string = '',
  public name: string = '',
  public description: string = '',
  public creationDate: Date = new Date(),
  ) {}
}
