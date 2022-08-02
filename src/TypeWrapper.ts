import { EventMessage } from "./TypeInspector";

const typeExtractor = (value: unknown) => {
  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return `string | '${value}'`;
    case "object":
      if (value === null) {
        return "null";
      }
      return JSON.stringify(value);
    case "function":
      return `function [${value.name}]`;
    case "undefined":
      return "undefined";
    default:
      throw new Error("Unknown type");
  }
};

export class TypeWrapper {
  id: string;
  values: any[];
  constructor(event: EventMessage) {
    this.id = event.id;
    this.values = [event.value];
  }

  addValue(value) {
    console.log(
      `TypeWrapper: add another runtime value for id ${this.id}:`,
      value
    );

    this.values.push(value);
    this.printType();
  }

  printType() {
    console.log(`TypeWrapper: printType for id:${this.id}:`);

    const types: string[] = [];

    for (const value of this.values) {
      types.push(typeExtractor(value));
    }

    const result = types.join(" | ");

    return result;
  }
}
