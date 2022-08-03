import template from "@babel/template";
import { PluginObj } from "@babel/core";

const buildShortcodeFunction = (id: string, value: string) => {
  return template.ast(
    `window.dt("${id}","${value}");
`
  );
};

module.exports = ({ types: t }): PluginObj => {
  return {
    name: "typedetector",
    visitor: {
      Program(path, state) {
        path.traverse({
          enter(path) {
            const leadingCommentsList = path.node.leadingComments || [];

            if (leadingCommentsList.length > 0) {
              const prevComment = leadingCommentsList.at(-1);

              if (prevComment?.value.includes(" dt ")) {
                let file = state.file.opts.filename;
                const location = `${file}:${path.node.loc?.start.line}`;

                const passedIdentText = prevComment.value.split(" ")[2];
                const node = buildShortcodeFunction(location, passedIdentText);
                // const callExp = t.callExpression(
                //   t.memberExpression(t.identifier('window'), t.identifier('dt')),
                //   [
                //     {
                //       type: 'StringLiteral',
                //       location,
                //     },
                //     t.identifier(passedIdentText),
                //   ],
                // );

                // const expStatement = t.expressionStatement(callExp);
                path.insertBefore(node);
              }
            }
          },
        });
      },
    },
  };
};
