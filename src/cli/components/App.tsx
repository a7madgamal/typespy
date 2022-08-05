import React, { useState, useEffect } from 'react';
import { Text, Box, Newline } from 'ink';
import { init } from '../server';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { TypeWrapper } from '../TypeWrapper';
import { runInTestMode, valuePrinter } from '../../helpers/helpers';
import { DEFAULT_PORT_NUM } from '../../constants';

let port = DEFAULT_PORT_NUM;

if (process.env.TYPESPY_PORT_NUM) {
  port = parseInt(process.env.TYPESPY_PORT_NUM);
  console.log(`🕵🏻‍♂️ Using non-default port number ${port}`);
}

const typeInspector = init(port);

export const App = () => {
  const [typesList, setTypesList] = useState<TypeWrapper[]>([]);

  useEffect(() => {
    if (process.env.DEMO_MODE) {
      runInTestMode(typeInspector);
    }

    typeInspector.injectOnUpdateListener((calls) => {
      setTypesList(calls.map((call) => call));
    });
  }, []);

  return (
    <>
      <Gradient name="summer">
        <BigText text="typespy" align="center" font="chrome" />
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
          <Text>
            I'm spying on your types (･_├┬┴┬┴
            <Newline />
            add a{' '}
            <Text color="gray" italic>
              {' '}
              // spy code_here{' '}
            </Text>
            comment and restart your application
          </Text>
        )}
      </Box>
    </>
  );
};
