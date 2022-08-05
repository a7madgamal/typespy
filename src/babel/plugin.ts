import template from '@babel/template';
import { PluginObj } from '@babel/core';
// todo fix later
// import { FN_NAME, MAGIC_WORD } from "../constants";
const MAGIC_WORD = 'spy';
const FN_NAME = '_______typespy';

const buildShortcodeFunction = (file: string, line: string, code: string) => {
  return template.ast(
    `
window.${FN_NAME}("${file}","${line}","${code}",${code});
`,
  );
};

export default (babel): PluginObj => {
  babel.cache(true);

  return {
    visitor: {
      Program(path, state) {
        path.traverse({
          enter(path) {
            const magicWord = ` ${MAGIC_WORD} `;
            const leadingComments = (path.node.leadingComments || []).filter(
              (comment) => comment?.value.includes(magicWord),
            );
            const innerComments = (path.node.innerComments || []).filter(
              (comment) => comment?.value.includes(magicWord),
            );
            const trailingComments = (path.node.trailingComments || []).filter(
              (comment) => comment?.value.includes(magicWord),
            );

            const file = state.file.opts.filename || 'UNKNOWN';

            for (const comment of leadingComments) {
              const line = `${comment.loc?.start.line || '??'}`;

              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(file, line, code);

              path.insertBefore(fnCode);
            }

            for (const comment of trailingComments) {
              const line = `${comment.loc?.start.line || '??'}`;
              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(file, line, code);

              path.insertBefore(fnCode);
            }

            for (const comment of innerComments) {
              const line = `${comment.loc?.start.line || '??'}`;

              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(file, line, code);

              const node = path.node;

              if (node.type === 'BlockStatement') {
                node.body.unshift(fnCode as any);
              }
            }
          },
        });
      },
    },
  };
};
