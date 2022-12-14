import { ServerHandler } from '../cli/ServerHandler';
import stringifyObject from 'stringify-object';

function sleep(ms: number = 250) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getFnTree = (fn: Function) => {
  const tree = [fn.name];
  // @ts-expect-error works :P
  tree.push(fn.__proto__?.name);
  // @ts-expect-error works :P
  tree.push(fn.__proto__?.__proto__?.name);
  // @ts-expect-error works :P
  tree.push(fn.__proto__?.__proto__?.__proto__?.name);
  // @ts-expect-error works :P
  tree.push(fn.__proto__?.__proto__?.__proto__?.__proto__?.name);
  // @ts-expect-error works :P
  tree.push(fn.__proto__?.__proto__?.__proto__?.__proto__?.__proto__?.name);
  tree.push(
    // @ts-expect-error works :P
    fn.__proto__?.__proto__?.__proto__?.__proto__?.__proto__?.__proto__?.name,
  );
  tree.push(
    // @ts-expect-error works :P
    fn.__proto__?.__proto__?.__proto__?.__proto__?.__proto__?.__proto__
      ?.__proto__?.name,
  );
  return tree.filter((t) => t).join(' extends ');
};
const stringifyOptions = {
  indent: '  ',
  singleQuotes: false,
  transform: (object, property, originalResult) => {
    const test = originalResult.split('"');

    if (test[0] === '"') test[0] = '';
    if (test[test.length - 1] === '"') test[test.length - 1] = '';

    return test.join('');
  },
};

export const typeExtractor = (value: unknown): string => {
  switch (typeof value) {
    case 'boolean':
      return 'boolean';
    case 'number':
      return 'number';
    case 'string':
      return `string`;
    case 'object':
      if (value === null) {
        return 'null';
      } else if (Array.isArray(value)) {
        const typeHolder = [];
        for (const childValue of value) {
          const childType = typeExtractor(childValue);
          typeHolder.push(childType);
        }

        const rawResult = stringifyObject(typeHolder, stringifyOptions);
        const newLineResult = rawResult.replaceAll('\\n', '\n');

        return newLineResult;
      } else {
        const typeHolder = {};

        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            const childValue = value[key];
            const childType = typeExtractor(childValue);

            typeHolder[key] = childType;
          }
        }

        const rawResult = stringifyObject(typeHolder, stringifyOptions);
        const newLineResult = rawResult.replaceAll('\\n', '\n');

        return newLineResult;
      }

    case 'function':
      // todo: extract function shape?
      return `Function [${getFnTree(value)}]`;
    case 'undefined':
      return 'undefined';
    default:
      throw new Error(`Unknown type: ${typeof value}`);
  }
};

export const valuePrinter = (value) => {
  switch (typeof value) {
    case 'boolean':
    case 'number':
      return `${value}`;
    case 'string':
      return `"${value}"`;
    case 'object':
      if (value === null) {
        return 'null';
      }
      return JSON.stringify(value, null, 2);
    case 'function':
      return `function [${value.name}]`;
    case 'undefined':
      return 'undefined';
    default:
      throw new Error(`Unknown type: ${typeof value}`);
  }
};

export const runInTestMode = (typeInspector: ServerHandler) => {
  setTimeout(async () => {
    class l0 {}
    class l1 extends l0 {}
    class l2 extends l1 {}
    class l3 extends l2 {}
    class l4 extends l3 {}
    class l5 extends l4 {}
    class l6 extends l5 {}

    typeInspector.add({
      file: '/ahmed/test/undefined.js',
      line: '10',
      codeString: 'undefined',
      codeValue: undefined,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/null.js',
      line: '10',
      codeString: 'null',
      codeValue: null,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/string.js',
      line: '10',
      codeString: 'string',
      codeValue: '15',
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/duplicate_line.js',
      line: '11',
      codeString: 'string',
      codeValue: 'same file and id but diff line 1',
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/duplicate_line.js',
      line: '15',
      codeString: 'string',
      codeValue: 'same file and id but diff line 2',
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/duplicate_line.js',
      line: '15',
      codeString: 'string',
      codeValue: true,
    });
    await sleep();

    typeInspector.add({
      file: '/ahmed/test/same_codeString_but_different_file_name.js',
      line: '10',
      codeString: 'string',
      codeValue: 'same codeString different file_name',
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/different_codeString_but_same_file_name.js',
      line: '10',
      codeString: 'string_diff',
      codeValue: '16',
    });
    typeInspector.add({
      file: '/ahmed/test/different_codeString_but_same_file_name.js',
      line: '10',
      codeString: 'string_diff new',
      codeValue: {},
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/number.js',
      line: '100',
      codeString: 'number',
      codeValue: 15,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/anon function.js',
      line: '100',
      codeString: 'anon function',
      codeValue: () => {},
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/named function.js',
      line: '100',
      codeString: 'named function',
      codeValue: function named() {},
    });
    await sleep();

    typeInspector.add({
      file: '/ahmed/test/object.js',
      line: '100',
      codeString: 'empty object',
      codeValue: {},
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/object.js',
      line: '100',
      codeString: 'basic object',
      codeValue: {
        _null: null,
        undef: undefined,
        bool: true,
        _string: 'hi',
        _number: 5,
        anonfunction: () => {},
        namefunction: function fnName() {},
      },
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l0.js',
      line: '100',
      codeString: 'l0',
      codeValue: l0,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l1.js',
      line: '100',
      codeString: 'l1',
      codeValue: l1,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l2.js',
      line: '100',
      codeString: 'l2',
      codeValue: l2,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l3.js',
      line: '100',
      codeString: 'l3',
      codeValue: l3,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l4.js',
      line: '100',
      codeString: 'l4',
      codeValue: l4,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l5.js',
      line: '100',
      codeString: 'l5',
      codeValue: l5,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/l6.js',
      line: '100',
      codeString: 'l6',
      codeValue: l6,
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/deep.js',
      line: '100',
      codeString: 'deep',
      codeValue: {
        level1: {
          level2: {
            bool: true,
            cls: l4,
            arr_diff: [{ test: 1 }, 12, 'string'],
            arr_num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            arr_str: ['hi', 'only', 'strings'],
            arr_cls: [l1, l2, l3, l4],
            arr_empty: [],
            level3: {
              level4: {
                level5: { level6: { test: { test: {} } } },
                id: 'value',
              },
            },
          },
        },
      },
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/deep.js',
      line: '100',
      codeString: 'deep',
      codeValue: {
        test: {
          test: { test: { test: { test: { test: { test: { test: {} } } } } } },
        },
      },
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/deep.js',
      line: '100',
      codeString: 'deep',
      codeValue: {
        test: {
          test: { test: { test: { test: { test: { test: { test: {} } } } } } },
        },
      },
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/deep.js',
      line: '100',
      codeString: 'deep',
      codeValue: {
        test: {
          test: { test: { test: { test: { test: { test: { test: {} } } } } } },
        },
      },
    });
    await sleep();
    typeInspector.add({
      file: '/ahmed/test/deep.js',
      line: '100',
      codeString: 'deep',
      codeValue: {
        test: {
          test: { test: { test: { test: { test: { test: { test: {} } } } } } },
        },
      },
    });
  }, 5000);
};
