export async function dt(
  file: string,
  line: string,
  codeString: string,
  codeValue
) {
  // console.log({ file, line, codeString, codeValue });

  try {
    await fetch("http://10.0.2.2:4444/values", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file, line, codeString, codeValue }),
    });
  } catch (error) {
    // @ts-expect-error log
    console.$log("❌ dt call failed", { file, line, codeString, codeValue });
    throw error;
  }
}
