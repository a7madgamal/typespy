import template from '@babel/template';
import { PluginObj } from '@babel/core';
// todo fix later
// import { FN_NAME, MAGIC_WORD } from "../constants";

const buildShortcodeFunction = (
  global: string,
  fnName: string,
  file: string,
  line: string,
  code: string,
) => {
  return template.ast(
    `
${global}.${fnName}(
  {
    file:"${file}",
    line: "${line}",
    codeString: "${code}",
    codeValue: ${code}
});
`,
  );
};

export default (babel, opts): PluginObj => {
  babel.cache(true);

  const global = opts.global || 'window';
  const magicWord = opts.magicWord || 'spy';
  const fnName = opts.fnName || '_typespy_';

  return {
    visitor: {
      Program(path, state) {
        path.traverse({
          enter(path) {
            const magicWordTest = ` ${magicWord} `;
            const leadingComments = (path.node.leadingComments || []).filter(
              (comment) => comment?.value.includes(magicWordTest),
            );
            const innerComments = (path.node.innerComments || []).filter(
              (comment) => comment?.value.includes(magicWordTest),
            );
            const trailingComments = (path.node.trailingComments || []).filter(
              (comment) => comment?.value.includes(magicWordTest),
            );

            const file = state.file.opts.filename || 'UNKNOWN';

            for (const comment of leadingComments) {
              const line = `${comment.loc?.start.line || '??'}`;

              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(
                global,
                fnName,
                file,
                line,
                code,
              );

              path.insertBefore(fnCode);
            }

            for (const comment of trailingComments) {
              const line = `${comment.loc?.start.line || '??'}`;
              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(
                global,
                fnName,
                file,
                line,
                code,
              );

              path.insertBefore(fnCode);
            }

            for (const comment of innerComments) {
              const line = `${comment.loc?.start.line || '??'}`;

              const code = comment.value.split(' ')[2];
              const fnCode = buildShortcodeFunction(
                global,
                fnName,
                file,
                line,
                code,
              );

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
