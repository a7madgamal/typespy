import { TypeWrapper } from "./TypeWrapper";

export type EventMessage = { id: string; value: any };

export class TypeInspector {
  calls: TypeWrapper[];
  constructor() {
    this.calls = [];
  }

  onPostHandler(request, response) {
    const body = request.body;
    console.log("post /value", { body });
    // // const decoded = JSON.parse(body);
    // // console.log("post decoded value:", { decoded });

    this.add(body);
  }

  add(event: EventMessage) {
    console.log("Adding event:", event);

    const old = this.calls.find((e) => e.id === event.id);

    if (old) {
      console.log("Found old one:", old);

      old.addValue(event.value);
    } else {
      this.calls.push(new TypeWrapper(event));
    }

    console.log("current State:");

    for (const call of this.calls) {
      console.log(call.printType());
    }
  }
}
