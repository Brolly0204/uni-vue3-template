import * as math from 'mathjs';
/** 加法 */
export const add = (num1: number, num2: number) => {
  return math.add(math.bignumber(num1), math.bignumber(num2));
};

/** 减法 */
export const subtract = (num1: number, num2: number) => {
  return math.subtract(math.bignumber(num1), math.bignumber(num2));
};

/** 乘法 */
export const multiply = (num1: number, num2: number) => {
  return math.multiply(math.bignumber(num1), math.bignumber(num2));
};

/** 除法 */
export const divide = (num1: number, num2: number) => {
  return math.divide(math.bignumber(num1), math.bignumber(num2));
};
