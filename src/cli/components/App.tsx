import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import { init } from "../server";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { TypeWrapper } from "../TypeWrapper";
import { valuePrinter } from "../../helpers/helpers";

const typeInspector = init();

export const App = () => {
  const [typesList, setTypesList] = useState<TypeWrapper[]>([]);

  useEffect(() => {
    // runInTestMode(typeInspector)
    typeInspector.injectOnUpdateListener((calls) => {
      setTypesList(calls.map((call) => call));
    });
  }, []);

  return (
    <>
      <Gradient name="summer">
        <BigText text="types inspector" align="center" font="chrome" />
      </Gradient>
      <Box
        borderStyle="bold"
        flexDirection="column"
        // height={typesList.length * 30}
      >
        {typesList.length ? (
          typesList.map((type) => (
            <Box borderStyle="single" key={type.id} flexDirection="column">
              <Box>
                <Text>
                  Code with id [
                  <Text color="yellow" bold>
                    {type.id}
                  </Text>
                  ] in file
                  <Text color="blue">{` ${type.file}:${type.line} `}</Text>
                  has type <Text color="green">{type.currentType}</Text>
                </Text>
              </Box>
              <Box>
                {type.values.map((value) => (
                  <Box borderStyle="round" borderColor="gray" key={value.key}>
                    <Text color="magenta">{valuePrinter(value.value)}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        ) : (
          <Text>listening for types...</Text>
        )}
      </Box>
    </>
  );
};
