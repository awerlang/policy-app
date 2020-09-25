import 'jest-preset-angular';
import 'jest'

console.log = jest.fn()
console.error = jest.fn()

Error.stackTraceLimit = 5
