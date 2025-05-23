// Base64 decoder from viciious
// https://github.com/compiler-explorer/viciious/blob/ce/src/tools/base64.js

const tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef' + 'ghijklmnopqrstuvwxyz0123456789+/';

export function base64Decode(q) {
  // Calculate the output size
  let outputLength = (q.length / 4) * 3;
  if (q[q.length - 1] === '=') outputLength--;
  if (q[q.length - 2] === '=') outputLength--;

  const out = new Uint8Array(outputLength);
  let outIndex = 0;

  while (q.length) {
    const i0 = tokens.indexOf(q[0]);
    const i1 = tokens.indexOf(q[1]);
    const i2 = q[2] !== '=' ? tokens.indexOf(q[2]) : 0;
    const i3 = q[3] !== '=' ? tokens.indexOf(q[3]) : 0;

    const w = (i0 << 18) | (i1 << 12) | (i2 << 6) | (i3 << 0);

    out[outIndex++] = (w >> 16) & 0xff;
    if (q[2] !== '=') out[outIndex++] = (w >> 8) & 0xff;
    if (q[3] !== '=') out[outIndex++] = (w >> 0) & 0xff;

    q = q.substr(4);
  }

  return out;
}
