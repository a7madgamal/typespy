#!/usr/bin/env node

import React, { useState, useEffect } from "react";
import { render, Text } from "ink";
import { init } from "./server";

const typeInspector = init();

const App = () => {
  const [typesList, setTypesList] = useState<
    { id: string; type: string; path: string }[]
  >([]);

  useEffect(() => {
    typeInspector.injectOnUpdateListener((calls) => {
      setTypesList(
        calls.map((c) => {
          return { type: c.currentType, id: c.id, path: c.path };
        })
      );
    });
  }, []);

  const list = typesList.map((type) => (
    <Text color="green" key={type.id}>
      {type.id}
      <Text color="gray"> has type </Text>
      <Text color="blue">{type.type}</Text>
      <Text color="gray">
        {" >> "} {type.path}
      </Text>
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
