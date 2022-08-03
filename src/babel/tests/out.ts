const hamada = () => {};

const functions = 3;
const code = 3;
const t = 1; // hi1
// hi2
// hi3
// dt variable_global

window.dt(
  "/Users/ahmedhassanein/personal/type-inspector/babel/tests/in.ts",
  "9",
  "variable_global",
  variable_global
);
hamada();

function test() {
  window.dt(
    "/Users/ahmedhassanein/personal/type-inspector/babel/tests/in.ts",
    "13",
    "variable_fn.test.f",
    variable_fn.test.f
  );
  // dt variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/babel/tests/in.ts",
      "19",
      "omg.variable_constructor",
      omg.variable_constructor
    );
    // dt omg.variable_constructor
    code;
  }

  method() {
    // dt only_comment
  }

  method2() {
    /* dt only_comment */
  }
}
export {};
