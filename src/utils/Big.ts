import B from 'big.js';
import { each, isFinite, isNumber } from 'lodash';

B.NE = -10;
B.PE = 100;

export type BigInput = number | string;

//  for high accuracy
const DEFAULT_PLACES = 20;

//  necessary for decimal precision due to javascript being javascript.
//  ofc.
export const big = (input: BigInput) => {
  const ret = new B(input);
  return ret ? ret : new B('0');
};

export const mod = (input1: BigInput, input2: BigInput) => {
  try {
    return new B(input1).mod(new B(input2)).toFixed(0);
  } catch (ex) {
    console.warn('mod error', input1, input2);
    return '1';
  }
};

// @ts-ignore
export const fixed = (input: BigInput, places: number | void) => {
  try {
    return new B(input).toFixed(isNumber(places) ? places : 2);
  } catch (ex) {
    console.warn(ex);
    return fixed(0, 2);
  }
};

export const gte = (input1: BigInput, input2: BigInput) => {
  return new B(input1).gte(new B(input2));
};

export const gt = (input1: BigInput, input2: BigInput) => {
  return new B(input1).gt(new B(input2));
};

export const add = (
  input1: BigInput,
  input2: BigInput,
  places = DEFAULT_PLACES,
) => {
  try {
    return new B(input1).plus(input2).toFixed(places);
  } catch (ex) {
    // console.warn(`Big error ${input1} * ${input2}`, ex.message);
    return '0';
  }
};

export const sumArray = (inputArray: BigInput[], places = 20) => {
  let sum = 0;
  each(inputArray, (v) => {
    sum = add(sum, v, places);
  });
  return sum;
};

export const minus = (
  input1: BigInput,
  input2: BigInput,
  places = DEFAULT_PLACES,
) => {
  try {
    return new B(input1).minus(input2).toFixed(places);
  } catch (ex) {
    // console.warn(`Big error ${input1} * ${input2}`, ex.message);
    return '0';
  }
};

export const multiply = (
  input1: BigInput,
  input2: BigInput,
  places = DEFAULT_PLACES,
) => {
  try {
    return new B(input1).times(input2).toFixed(places);
  } catch (ex) {
    console.warn(`Big error ${input1} * ${input2}`, ex.message);
    return '0';
  }
};

export const divide = (
  input1: BigInput,
  input2: BigInput,
  places = DEFAULT_PLACES,
) => {
  try {
    if (isZero(input2)) return 'NaN';
    else if (!isFinite(Number(input2)) || !isFinite(Number(input1)))
      return 'NaN';
    return new B(input1).div(input2).toFixed(places);
  } catch (ex) {
    console.warn(`Big error ${input1} / ${input2}`, ex.message);
    return '0';
  }
};

const isZero = (v: any) => Number(v) === 0;
