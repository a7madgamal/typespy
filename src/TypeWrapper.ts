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
  currentType: string;
  constructor(event: EventMessage) {
    this.id = event.id;
    this.values = [event.value];
    this.currentType = "";
  }

  addValue(value) {
    console.log(
      `TypeWrapper: add another runtime value for id ${this.id}:`,
      value
    );

    if (!this.values.includes(value)) {
      this.values.push(value);
      this.generateType();
    } else {
      console.log("skipping duplicated value");
    }
  }

  generateType() {
    // console.log(`TypeWrapper: generateType for id:${this.id}:`);

    const types: string[] = [];

    for (const value of this.values) {
      types.push(typeExtractor(value));
    }

    const result = types.join(" | ");

    this.currentType = result;
  }
}
