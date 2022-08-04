import template from "@babel/template";
import { PluginObj } from "@babel/core";

const buildShortcodeFunction = (file: string, line: string, code: string) => {
  return template.ast(
    `
window.dt("${file}","${line}","${code}",${code});
`
  );
};

export default (babel): PluginObj => {
  babel.cache(true);

  return {
    visitor: {
      Program(path, state) {
        path.traverse({
          enter(path) {
            const leadingComments = path.node.leadingComments || [];
            const innerComments = path.node.innerComments || [];
            const trailingComments = path.node.trailingComments || [];

            const file = state.file.opts.filename || "UNKNOWN";

            if (leadingComments.length > 0) {
              for (const comment of leadingComments) {
                if (comment?.value.includes(" dt ")) {
                  const line = `${comment.loc?.start.line || "??"}`;

                  const code = comment.value.split(" ")[2];
                  const fnCode = buildShortcodeFunction(file, line, code);

                  path.insertBefore(fnCode);
                }
              }
            }

            if (trailingComments.length > 0) {
              for (const comment of trailingComments) {
                if (comment?.value.includes(" dt ")) {
                  const line = `${comment.loc?.start.line || "??"}`;
                  const code = comment.value.split(" ")[2];
                  const fnCode = buildShortcodeFunction(file, line, code);
                  path.insertBefore(fnCode);
                }
              }
            }

            if (innerComments.length > 0) {
              for (const comment of innerComments) {
                if (comment?.value.includes(" dt ")) {
                  const line = `${comment.loc?.start.line || "??"}`;

                  const code = comment.value.split(" ")[2];
                  const fnCode = buildShortcodeFunction(file, line, code);

                  const node = path.node;

                  if (node.type === "BlockStatement") {
                    node.body.unshift(fnCode as any);
                  }
                }
              }
            }
          },
        });
      },
    },
  };
};
