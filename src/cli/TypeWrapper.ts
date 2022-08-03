import { EventMessage } from "./TypeInspector";
import notifier from "node-notifier";

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
  path: string;
  line: string;
  constructor(event: EventMessage) {
    this.id = event.codeString;
    this.path = event.file;
    this.path = event.line;
    this.values = [event.codeValue];
    this.currentType = "";
  }

  addValue(value) {
    // console.log(
    //   `TypeWrapper: add another runtime value for id ${this.id}:`,
    //   value
    // );

    if (!this.values.includes(value)) {
      this.values.push(value);
      this.generateType();
    } else {
      // console.log("skipping duplicated value");
    }
  }

  generateType() {
    // console.log(`TypeWrapper: generateType for id:${this.id}:`);

    const types: string[] = [];

    for (const value of this.values) {
      const type = typeExtractor(value);

      if (!types.includes(type)) {
        types.push(type);
      }
    }

    const result = types.join(" | ");

    this.currentType = result;
    notifier.notify(`${this.id}:${result}`);
  }
}
