import { TypeWrapper } from "./TypeWrapper";

export type EventMessage = {
  file: string;
  line: string;
  codeString: string;
  codeValue: any;
};

function isEventMessage(event): event is EventMessage {
  if (
    "file" in event &&
    "line" in event &&
    "codeString" in event &&
    "codeValue" in event
  ) {
    return true;
  } else {
    console.warn("❌ unexpected event type: ", { event });
    return true;
  }
}

export class TypeInspector {
  calls: TypeWrapper[];
  onUpdateListener: (calls: TypeWrapper[]) => void;
  constructor() {
    this.calls = [];
    this.onUpdateListener = () => {};
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
    const old = this.calls.find((e) => e.id === event.codeString);

    if (old) {
      // console.log("Found old one:", old);

      old.addValue(event.codeValue);
    } else {
      this.calls.push(new TypeWrapper(event));
    }

    for (const call of this.calls) {
      call.generateType();
    }

    this.onUpdateListener(this.calls);
  }

  injectOnUpdateListener(listener: (calls: TypeWrapper[]) => void) {
    this.onUpdateListener = listener;
  }
}
