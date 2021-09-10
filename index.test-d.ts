import {expectType, expectError} from 'tsd';
import sliceLocation from '.';

const inputString = `Line 1
Line 2

Line 4
Line 5

Line 7
`;

expectType<string>(sliceLocation(inputString, {}));
expectType<string>(sliceLocation(inputString,
	{
		beginColumn: 6,
	}));
expectError(sliceLocation(1, {}));
expectError(sliceLocation({}, {}));
