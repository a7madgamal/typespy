import { EventMessage } from "../cli/ServerHandler";

export async function typespy(
  file: string,
  line: string,
  codeString: string,
  codeValue
) {
  try {
    const message: EventMessage = { file, line, codeString, codeValue };

    // todo: pass url from plugin
    await fetch("http://10.0.2.2:4444/values", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    // @ts-expect-error log
    console.$log("❌ dt call failed", message);
    throw error;
  }
}
