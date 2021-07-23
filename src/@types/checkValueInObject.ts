interface isString {
  [key: string]: string;
}
interface isNumber {
  [key: string]: number;
}
interface isBoolean {
  [key: string]: boolean;
}

interface isArrayString {
  [key: string]: Array<string>;
}

interface isArrayNumber {
  [key: string]: Array<number>;
}

interface isArrayBoolean {
  [key: string]: Array<boolean>;
}

interface isArrayObject {
  [key: string]: Array<object>;
}

export {
  isString,
  isNumber,
  isBoolean,
  isArrayString,
  isArrayNumber,
  isArrayBoolean,
  isArrayObject,
};
