import tokenizer from 'json-to-var';

import color from './color.json';
import font from './font.json';
import breakpoints from './breakpoints.json';

const inputs = [
  color,
  font,
  breakpoints
];

const jsVars = tokenizer.toJs(inputs);
const scssVars = tokenizer.toScss(inputs);

tokenizer.makeFile('./assets/ts', 'tokens.ts', jsVars);
tokenizer.makeFile('./assets/scss', 'tokens.scss', scssVars);