// Unit tests for base64 decoder
import { base64Decode } from './base64.js';

// Helper function to convert string to Uint8Array for comparison
function stringToBytes(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

// Helper function to compare Uint8Arrays
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Test cases
const testCases = [
  {
    name: 'Simple text',
    input: 'SGVsbG8gV29ybGQ=',
    expected: 'Hello World'
  },
  {
    name: 'Text with no padding',
    input: 'SGVsbG8=',
    expected: 'Hello'
  },
  {
    name: 'Text with double padding',
    input: 'SGk=',
    expected: 'Hi'
  },
  {
    name: 'Empty string',
    input: '',
    expected: ''
  },
  {
    name: 'Binary data',
    input: 'AAECAwQFBgcICQ==',
    expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    name: 'All base64 characters',
    input: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    expected: [
      0,
      16,
      131,
      16,
      81,
      135,
      32,
      146,
      139,
      48,
      211,
      143,
      65,
      20,
      147,
      81,
      85,
      151,
      97,
      150,
      155,
      113,
      215,
      159,
      130,
      24,
      163,
      146,
      89,
      167,
      162,
      154,
      171,
      178,
      219,
      175,
      195,
      28,
      179,
      211,
      93,
      183,
      227,
      158,
      187,
      243,
      223,
      191
    ]
  },
  {
    name: 'Game Boy ROM header example',
    input: 'w4DCgcOIAQEjRcOJISYH3sPJI8OdPxjD0Q==',
    expected: [
      0xc3,
      0x80,
      0xc2,
      0x81,
      0xc3,
      0x88,
      0x01,
      0x01,
      0x23,
      0x45,
      0xc3,
      0x89,
      0x21,
      0x26,
      0x07,
      0xde,
      0xc3,
      0xc9,
      0x23,
      0xc3,
      0x9d,
      0x3f,
      0x18,
      0xc3,
      0xd1
    ]
  }
];

// Run tests
console.log('Running base64 decoder tests...\n');

let passed = 0;
let failed = 0;

testCases.forEach(test => {
  try {
    const result = base64Decode(test.input);

    let expected;
    if (typeof test.expected === 'string') {
      expected = stringToBytes(test.expected);
    } else {
      expected = new Uint8Array(test.expected);
    }

    if (arraysEqual(result, expected)) {
      console.log(`✓ ${test.name}`);
      passed++;
    } else {
      console.log(`✗ ${test.name}`);
      console.log(`  Expected: [${Array.from(expected).join(', ')}]`);
      console.log(`  Got:      [${Array.from(result).join(', ')}]`);
      failed++;
    }
  } catch (error) {
    console.log(`✗ ${test.name} - Error: ${error.message}`);
    failed++;
  }
});

// Test against native atob for comparison
console.log('\nComparing with native atob()...\n');

const atobTestCases = ['SGVsbG8gV29ybGQ=', 'VGhpcyBpcyBhIHRlc3Q=', 'QmFzZTY0IGVuY29kaW5n', 'AAECAwQFBgcICQ=='];

atobTestCases.forEach(input => {
  try {
    // Our decoder
    const ourResult = base64Decode(input);

    // Native atob
    const atobResult = atob(input);
    const atobBytes = new Uint8Array(atobResult.length);
    for (let i = 0; i < atobResult.length; i++) {
      atobBytes[i] = atobResult.charCodeAt(i);
    }

    if (arraysEqual(ourResult, atobBytes)) {
      console.log(`✓ Match with atob: "${input.substring(0, 20)}..."`);
    } else {
      console.log(`✗ Mismatch with atob: "${input}"`);
      console.log(
        `  Our decoder: [${Array.from(ourResult)
          .slice(0, 10)
          .join(', ')}...]`
      );
      console.log(
        `  atob:        [${Array.from(atobBytes)
          .slice(0, 10)
          .join(', ')}...]`
      );
    }
  } catch (error) {
    console.log(`✗ Error comparing with atob: ${error.message}`);
  }
});

console.log(`\nTests complete: ${passed} passed, ${failed} failed`);

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.runBase64Tests = () => {
    console.log('Tests completed. Check console for results.');
  };
}
