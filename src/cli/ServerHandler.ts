import { isEventMessage } from "../helpers/typescript";
import { TypeWrapper } from "./TypeWrapper";

export type EventMessage = {
  file: string;
  line: string;
  codeString: string;
  codeValue: any;
};

export class ServerHandler {
  typeWrappers: TypeWrapper[];
  onUpdateListener: (calls: TypeWrapper[]) => void;
  constructor() {
    this.typeWrappers = [];
  }

  onPostHandler(request, response) {
    const event = request.body;

    if (isEventMessage(event)) {
      this.add(event);
    } else {
      console.log({ event });
      throw new Error("Invalid event");
    }
  }

  add(event: EventMessage) {
    const old = this.typeWrappers.find(
      (e) => e.id === event.codeString && e.file === event.file
    );

    if (old) {
      old.addValue(event.codeValue);
    } else {
      this.typeWrappers.push(new TypeWrapper(event));
    }

    for (const tw of this.typeWrappers) {
      tw.generateType();
    }

    this.onUpdateListener(this.typeWrappers);
  }

  reset() {
    console.log("resetting TI");

    this.typeWrappers = [];
    this.onUpdateListener(this.typeWrappers);
  }

  injectOnUpdateListener(listener: (typeWrappers: TypeWrapper[]) => void) {
    this.onUpdateListener = listener;
  }
}
