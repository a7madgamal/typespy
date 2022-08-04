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

  method2() {
    // dt code_after
    code_after;
  }

  method2d() {
    /* dt code_after_star */
    code_after;
  }

  method3() {
    code_before;
    // dt code_before
  }

  method4() {
    // dt no_code
  }

  method25() {
    /* dt only_comment */
  }

  method36() {
    // dt line1
    // dt line2
    // dt line3
  }
}

export {};

// dt last
