"use strict";
exports.__esModule = true;
var template_1 = require("@babel/template");
var buildShortcodeFunction = function (id, value) {
    return template_1["default"].ast("window.dt(\"".concat(id, "\",\"").concat(value, "\");\n"));
};
module.exports = function (_a) {
    var t = _a.types;
    return {
        name: "typedetector",
        visitor: {
            Program: function (path, state) {
                path.traverse({
                    enter: function (path) {
                        var _a;
                        var leadingCommentsList = path.node.leadingComments || [];
                        if (leadingCommentsList.length > 0) {
                            var prevComment = leadingCommentsList.at(-1);
                            if (prevComment === null || prevComment === void 0 ? void 0 : prevComment.value.includes(" dt ")) {
                                var file = state.file.opts.filename;
                                var location_1 = "".concat(file, ":").concat((_a = path.node.loc) === null || _a === void 0 ? void 0 : _a.start.line);
                                var passedIdentText = prevComment.value.split(" ")[2];
                                var node = buildShortcodeFunction(location_1, passedIdentText);
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
                    }
                });
            }
        }
    };
};
