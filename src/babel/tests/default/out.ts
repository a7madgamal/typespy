const hamada = () => {};

const functions = 3;
const code = 3;
const code_after = 1;

window._typespy_({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
  line: '9',
  codeString: 'variable_global',
  codeValue: variable_global,
});

const code_before = 1; // hi1
// hi2
// hi3
// spy variable_global

window._typespy_({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
  line: '9',
  codeString: 'variable_global',
  codeValue: variable_global,
});

hamada();

function test() {
  window._typespy_({
    file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
    line: '13',
    codeString: 'variable_fn.test.f',
    codeValue: variable_fn.test.f,
  });

  // spy variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '19',
      codeString: 'omg.variable_constructor',
      codeValue: omg.variable_constructor,
    });

    // spy omg.variable_constructor
    code;
  }

  method2() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '24',
      codeString: 'code_after',
      codeValue: code_after,
    });

    // spy code_after
    code_after;
  }

  method2d() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '29',
      codeString: 'code_after_star',
      codeValue: code_after_star,
    });

    /* spy code_after_star */
    code_after;
  }

  method3() {
    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '35',
      codeString: 'code_before',
      codeValue: code_before,
    });

    code_before; // spy code_before
  }

  method4() {
    // spy no_code

    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '39',
      codeString: 'no_code',
      codeValue: no_code,
    });
  }

  method25() {
    /* spy no_code_star */

    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '43',
      codeString: 'no_code_star',
      codeValue: no_code_star,
    });
  }

  method36() {
    // spy no_code_1
    // spy no_code_2
    // spy no_code_3

    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '49',
      codeString: 'no_code_3',
      codeValue: no_code_3,
    });

    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '48',
      codeString: 'no_code_2',
      codeValue: no_code_2,
    });

    window._typespy_({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
      line: '47',
      codeString: 'no_code_1',
      codeValue: no_code_1,
    });
  }
}

window._typespy_({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/default/in.ts',
  line: '55',
  codeString: 'last',
  codeValue: last,
});

export {}; // spy last
