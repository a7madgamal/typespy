const hamada = () => {};

const functions = 3;
const code = 3;
window.dt(
  "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
  "8",
  "variable_global",
  variable_global
);
const t = 1; // hi1
// hi2
// hi3
// dt variable_global

window.dt(
  "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
  "8",
  "variable_global",
  variable_global
);
hamada();

function test() {
  window.dt(
    "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
    "12",
    "variable_fn.test.f",
    variable_fn.test.f
  );
  // dt variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "18",
      "omg.variable_constructor",
      omg.variable_constructor
    );
    // dt omg.variable_constructor
    code;
  }

  method2() {
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "23",
      "code_after",
      code_after
    );
    // dt code_after
    code_after;
  }

  method2d() {
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "28",
      "code_after_star",
      code_after_star
    );

    /* dt code_after_star */
    code_after;
  }

  method3() {
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "34",
      "code_before",
      code_before
    );
    code_before; // dt code_before
  }

  method4() {
    // dt no_code

    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "38",
      "no_code",
      no_code
    );
  }

  method25() {
    /* dt only_comment */

    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "42",
      "only_comment",
      only_comment
    );
  }

  method36() {
    // dt line1
    // dt line2
    // dt line3

    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "48",
      "line3",
      line3
    );
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "47",
      "line2",
      line2
    );
    window.dt(
      "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
      "46",
      "line1",
      line1
    );
  }
}

window.dt(
  "/Users/ahmedhassanein/personal/type-inspector/src/babel/tests/in.ts",
  "54",
  "last",
  last
);
export {}; // dt last
