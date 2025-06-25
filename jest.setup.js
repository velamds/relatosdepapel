const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// También podemos mantener la importación de jest-dom aquí
require('@testing-library/jest-dom');
