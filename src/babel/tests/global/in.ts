const hamada = () => {};
const functions = 3;
const code = 3;
const code_after = 1;
const code_before = 1;
// hi1
// hi2
// hi3
// spy variable_global
hamada();

function test() {
  // spy variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    // spy omg.variable_constructor
    code;
  }

  method2() {
    // spy code_after
    code_after;
  }

  method2d() {
    /* spy code_after_star */
    code_after;
  }

  method3() {
    code_before;
    // spy code_before
  }

  method4() {
    // spy no_code
  }

  method25() {
    /* spy no_code_star */
  }

  method36() {
    // spy no_code_1
    // spy no_code_2
    // spy no_code_3
  }
}

export {};

// spy last
