const hamada = () => {};

const functions = 3;
const code = 3;
const code_after = 1;

window._typespy_({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
  line: '9',
  codeString: 'variable_global',
  codeValue: variable_global,
});

const code_before = 1; // hi1
// hi2
// hi3
// magicWord variable_global

window._typespy_({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
  line: '9',
  codeString: 'variable_global',
  codeValue: variable_global,
});

hamada();

function test() {
  window._typespy_({
    file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
    line: '13',
    codeString: 'variable_fn.test.f',
    codeValue: variable_fn.test.f,
  });

  // magicWord variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
      line: '19',
      codeString: 'omg.variable_constructor',
      codeValue: omg.variable_constructor,
    });

    // magicWord omg.variable_constructor
    code;
  }

  method2() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
      line: '24',
      codeString: 'code_after',
      codeValue: code_after,
    });

    // magicWord code_after
    code_after;
  }

  method2d() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/magicWord/in.ts',
      line: '29',
      codeString: 'code_after_star',
      codeValue: code_after_star,
    });

    /* magicWord code_after_star */
    code_after;
  }

  method3() {
    code_before; // spy code_before
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

export {}; // spy last
