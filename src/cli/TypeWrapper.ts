import { EventMessage } from "./ServerHandler";
import notifier from "node-notifier";
import { typeExtractor } from "../helpers/helpers";

export class TypeWrapper {
  id: string;
  values: { key: number; value: any }[];
  currentType: string;
  file: string;
  line: string;
  constructor(event: EventMessage) {
    this.id = event.codeString;
    this.file = event.file;
    this.line = event.line;
    this.values = [{ key: 0, value: event.codeValue }];
    this.currentType = "";
  }

  addValue(value) {
    const key = this.values.length;

    this.values.push({ key, value });
    this.generateType();
    notifier.notify(`Got new value for ${this.id}: ${value}`);
  }

  generateType() {
    const types: string[] = [];

    for (const value of this.values) {
      const type = typeExtractor(value.value);

      if (!types.includes(type)) {
        types.push(type);
      }
    }

    const result = types.join(" | ");

    this.currentType = result;
  }
}
