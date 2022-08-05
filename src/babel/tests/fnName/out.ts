const hamada = () => {};

const functions = 3;
const code = 3;
const code_after = 1;
const code_before = 1; // hi1
// hi2
// hi3
// magicWord variable_global

hamada();

function test() {
  // magicWord variable_fn.test.f
  functions;
}

class omg {
  constructor() {
    // magicWord omg.variable_constructor
    code;
  }

  method2() {
    // magicWord code_after
    code_after;
  }

  method2d() {
    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '29',
      codeString: 'code_after_star',
      codeValue: code_after_star,
    });

    /* spy code_after_star */
    code_after;
  }

  method3() {
    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '35',
      codeString: 'code_before',
      codeValue: code_before,
    });
    code_before; // spy code_before
  }

  method4() {
    // spy no_code

    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '39',
      codeString: 'no_code',
      codeValue: no_code,
    });
  }

  method25() {
    /* spy no_code_star */

    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '43',
      codeString: 'no_code_star',
      codeValue: no_code_star,
    });
  }

  method36() {
    // spy no_code_1
    // spy no_code_2
    // spy no_code_3

    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '49',
      codeString: 'no_code_3',
      codeValue: no_code_3,
    });
    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '48',
      codeString: 'no_code_2',
      codeValue: no_code_2,
    });
    window.fnName({
      file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
      line: '47',
      codeString: 'no_code_1',
      codeValue: no_code_1,
    });
  }
}

window.fnName({
  file: '/Users/ahmedhassanein/personal/typespy/src/babel/tests/fnName/in.ts',
  line: '55',
  codeString: 'last',
  codeValue: last,
});
export {}; // spy last
