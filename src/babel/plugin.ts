import template from "@babel/template";
import { PluginObj } from "@babel/core";

const buildShortcodeFunction = (file: string, line: string, code: string) => {
  return template.ast(
    `
window.dt("${file}","${line}","${code}",${code});
`
  );
};

module.exports = (babel): PluginObj => {
  babel.cache(true);

  return {
    visitor: {
      Program(path, state) {
        path.traverse({
          enter(path) {
            const leadingCommentsList = path.node.leadingComments || [];

            if (leadingCommentsList.length > 0) {
              const prevComment = leadingCommentsList.at(-1);

              if (prevComment?.value.includes(" dt ")) {
                const file = state.file.opts.filename || "UNKNOWN";
                const line = `${path.node.loc?.start.line || "??"}`;

                const code = prevComment.value.split(" ")[2];
                const node = buildShortcodeFunction(file, line, code);

                path.insertBefore(node);
              }
            }
          },
        });
      },
    },
  };
};
