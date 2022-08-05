import { EventMessage } from "../cli/ServerHandler";

export function isEventMessage(event): event is EventMessage {
  if (
    "file" in event &&
    "line" in event &&
    "codeString" in event
    // todo: enable to allow undefined not supported by json
    // "codeValue" in event
  ) {
    return true;
  } else {
    console.error("❌ unexpected event type: ", { event });
    return true;
  }
}
