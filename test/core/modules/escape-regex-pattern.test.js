import { escapeRegexPattern } from '../../../extension/core/modules/escape-regex-pattern.js';

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

describe('escape-regex-pattern.test.js', () => {
  test.each`
    patternRaw | expected    
    ${'.'}     | ${'\\.'}
    ${'*'}     | ${'\\*'}
    ${'+'}     | ${'\\+'}
    ${'-'}     | ${'\\-'}
    ${'?'}     | ${'\\?'}
    ${'^'}     | ${'\\^'}
    ${'$'}     | ${'\\$'}
    ${'{'}     | ${'\\{'}
    ${'}'}     | ${'\\}'}
    ${'('}     | ${'\\('}
    ${')'}     | ${'\\)'}
    ${'|'}     | ${'\\|'}
    ${'['}     | ${'\\['}
    ${']'}     | ${'\\]'}
    ${'\\'}    | ${'\\\\'}
  `('should escape raw string "$patternRaw" to "$expected"', ({ patternRaw, expected }) => {
    expect(escapeRegexPattern(patternRaw)).toBe(expected);
  });

  test('should escape a full link with dots "." and dashes "-"', () => {
    const link = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping';
    expect(escapeRegexPattern(link)).toBe('https://developer\\.mozilla\\.org/en\\-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping');
  });
});
