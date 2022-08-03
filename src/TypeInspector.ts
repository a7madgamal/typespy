import { TypeWrapper } from "./TypeWrapper";

export type EventMessage = { id: string; value: any };

function isEventMessage(event): event is EventMessage {
  if ("id" in event && "value" in event) {
    return true;
  } else {
    console.log("❌ unexpected event type: ", { event });
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
    // console.log(" > TypeInspector: post /value", { event });
    if (isEventMessage(event)) {
      this.add(event);
    } else {
      console.log({ event });
      throw new Error("Invalid event");
    }
  }

  add(event: EventMessage) {
    console.log("Adding event:", event);

    const old = this.calls.find((e) => e.id === event.id);

    if (old) {
      // console.log("Found old one:", old);

      old.addValue(event.value);
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
