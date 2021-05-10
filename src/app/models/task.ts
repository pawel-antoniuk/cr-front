import { TestCase } from "./test-case";

export class Task {
  public id!: number;
  public name!: string;
  public description!: string;
  public testCases!: TestCase[];
}
