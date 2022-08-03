import React, { useState, useEffect } from "react";
import { render, Text } from "ink";
import { init } from "./server";

const typeInspector = init();

const App = () => {
  const [typesList, setTypesList] = useState<{ id: string; type: string }[]>(
    []
  );

  useEffect(() => {
    typeInspector.injectOnUpdateListener((calls) => {
      setTypesList(
        calls.map((c) => {
          return { type: c.currentType, id: c.id };
        })
      );
    });
  }, []);

  const list = typesList.map((type) => (
    <Text color="green" key={type.id}>
      {type.id} has type {type.type}
    </Text>
  ));

  return (
    <>
      <Text color="yellow">Current Types:</Text>
      {list}
    </>
  );
};

render(<App />);
