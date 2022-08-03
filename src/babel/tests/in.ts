const hamada = () => {};
const functions = 3;
const code = 3;
const t = 1;
// hi1
// hi2
// hi3
// dt variable_global
hamada();

function test() {
  // dt variable_fn.test.f
  functions;
}

class omg {
  constructor() {
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
