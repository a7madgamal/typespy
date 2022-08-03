"use strict";
exports.__esModule = true;
var template_1 = require("@babel/template");
var buildShortcodeFunction = function (file, line, code) {
    return template_1["default"].ast("\nwindow.dt(\"".concat(file, "\",\"").concat(line, "\",\"").concat(code, "\",").concat(code, ");\n"));
};
module.exports = function (babel) {
    babel.cache(true);
    return {
        visitor: {
            Program: function (path, state) {
                path.traverse({
                    enter: function (path) {
                        var _a;
                        var leadingCommentsList = path.node.leadingComments || [];
                        if (leadingCommentsList.length > 0) {
                            var prevComment = leadingCommentsList.at(-1);
                            if (prevComment === null || prevComment === void 0 ? void 0 : prevComment.value.includes(" dt ")) {
                                var file = state.file.opts.filename || "UNKNOWN";
                                var line = "".concat(((_a = path.node.loc) === null || _a === void 0 ? void 0 : _a.start.line) || "??");
                                var code = prevComment.value.split(" ")[2];
                                var node = buildShortcodeFunction(file, line, code);
                                path.insertBefore(node);
                            }
                        }
                    }
                });
            }
        }
    };
};
