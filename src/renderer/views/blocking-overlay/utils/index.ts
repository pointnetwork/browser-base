// import { reduce } from 'lodash';
// @ts-ignore
const Trianglify = require('trianglify');

const defaultOptions = {
  width: 2000,
  height: 2000,
  cellSize: 150,
  variance: 10,
  xColors: 'random',
  yColors: 'match',
  fill: true,
  // palette: Trianglify.colorbrewer,
  colorSpace: 'lab',
  // colorFunction: Trianglify.colorFunctions.interpolateLinear(0.5),
  strokeWidth: 0,
};

export const createOverlayCanvas = (
  seed: string,
  height: number,
  width: number,
): HTMLCanvasElement => {
  const options = { ...defaultOptions, seed, height, width };
  const pattern = Trianglify(options);
  return pattern.toCanvas();
};

// export const generateLinearGradient = (hash: string) => {
//   const numbers = hash.replaceAll(/[A-F0]/g, '');
//   const res = reduce(
//     numbers,
//     (tot, v, i) => {
//       const num = Number(v);
//       if (i % 3 === 0) return tot + num;
//       else if (i % 3 === 1) return Math.abs(tot - num);
//       return tot * num;
//     },
//     0,
//   );
//   const deg = res % 90;
//   return `repeating-linear-gradient(
//     ${deg}deg,
//     #${hash.substr(0, 6)},
//     #${hash.substr(6, 6)} 10px,
//     #${hash.substr(12, 6)} 10px,
//     #${hash.substr(18, 6)} 20px
//   );`;
// };
