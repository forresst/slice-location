export interface sliceOptions {
	beginLine?: number;
	beginColumn?: number;
	endLine?: number;
	endColumn?: number;
	offsetLine?: number;
	offsetColumn?: number;
}

/**
Shortcut for `Object.prototype.hasOwnProperty.call(object, property)`.
@example
```
import sliceLocation from 'slice-location';

const inputString = `Line 1
Line 2

Line 4
Line 5

Line 7
`;

const options = {beginLine: 4, beginColumn: 1, endLine: 5, endColumn: 2, offsetLine: 1, offsetColumn: 1};
console.log(sliceLocation(inputString, options));
//=> Line 4
//=> Li
```
*/
export default function sliceLocation(input: string, options: sliceOptions): string;
