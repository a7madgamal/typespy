const hamada = () => {};

const functions = 3;
const code = 3;

window._______typespy(
  "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
  "8",
  "variable_global",
  variable_global
);

const t = 1; // hi1
// hi2
// hi3
// spy variable_global

window._______typespy(
  "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
  "8",
  "variable_global",
  variable_global
);

hamada();

function test() {
  window._______typespy(
    "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
    "12",
    "variable_fn.test.f",
    variable_fn.test.f
  );

  // spy variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "18",
      "omg.variable_constructor",
      omg.variable_constructor
    );

    // spy omg.variable_constructor
    code;
  }

  method2() {
    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "23",
      "code_after",
      code_after
    );

    // spy code_after
    code_after;
  }

  method2d() {
    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "28",
      "code_after_star",
      code_after_star
    );

    /* spy code_after_star */
    code_after;
  }

  method3() {
    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "34",
      "code_before",
      code_before
    );

    code_before; // spy code_before
  }

  method4() {
    // spy no_code

    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "38",
      "no_code",
      no_code
    );
  }

  method25() {
    /* spy no_code_star */

    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "42",
      "no_code_star",
      no_code_star
    );
  }

  method36() {
    // spy no_code_1
    // spy no_code_2
    // spy no_code_3

    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "48",
      "no_code_3",
      no_code_3
    );

    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "47",
      "no_code_2",
      no_code_2
    );

    window._______typespy(
      "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
      "46",
      "no_code_1",
      no_code_1
    );
  }
}

window._______typespy(
  "/Users/ahmedhassanein/personal/typespy/src/babel/tests/in.ts",
  "54",
  "last",
  last
);

export {}; // spy last
