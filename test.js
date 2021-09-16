import test from 'ava';
import sliceLocatorString from './index.js';

test('Error: without parameter', t => {
	t.throws(() => {
		sliceLocatorString();
	}, {
		instanceOf: TypeError,
		message: 'Expected a string in the first parameter, got undefined',
	});
});

test('Error: first parameter is not a String', t => {
	t.throws(() => {
		sliceLocatorString(123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a string in the first parameter, got number',
	});
});

test('Error: second parameter is not a Object', t => {
	t.throws(() => {
		sliceLocatorString('Hello', 123);
	}, {
		instanceOf: TypeError,
		message: 'Expected a object in the second parameter, got number',
	});
});

test('Error: beginLine option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginLine: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the beginLine option, got string',
	});
});

test('Error: beginColumn option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginColumn: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the beginColumn option, got string',
	});
});

test('Error: endLine option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {endLine: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the endLine option, got string',
	});
});

test('Error: endColumn option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {endColumn: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the endColumn option, got string',
	});
});

test('Error: offsetLine option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {offsetLine: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the offsetLine option, got string',
	});
});

test('Error: offsetColumn option is not a number', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {offsetColumn: 'AAA'});
	}, {
		instanceOf: TypeError,
		message: 'Expected a number in the offsetColumn option, got string',
	});
});

test('Error: inconsistency between the beginLine and offsetLine options', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginLine: 1, offsetLine: 3});
	}, {
		instanceOf: TypeError,
		message: 'The beginLine option (= 1) must be greater than or equal to offsetLine option (= 3)',
	});
});

test('Error: inconsistency between the endLine and offsetLine options', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginLine: 4, endLine: 1, offsetLine: 3});
	}, {
		instanceOf: TypeError,
		message: 'The endLine option (= 1) must be greater than or equal to offsetLine option (= 3)',
	});
});

test('Error: inconsistency between the beginColumn and offsetColumn options', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginColumn: 1, offsetColumn: 3});
	}, {
		instanceOf: TypeError,
		message: 'The beginColumn option (= 1) must be greater than or equal to offsetColumn option (= 3)',
	});
});

test('Error: inconsistency between the endColumn and offsetColumn options', t => {
	t.throws(() => {
		sliceLocatorString('Hello', {beginColumn: 4, endColumn: 1, offsetColumn: 3});
	}, {
		instanceOf: TypeError,
		message: 'The endColumn option (= 1) must be greater than or equal to offsetColumn option (= 3)',
	});
});

test('Empty string without option', t => {
	t.is(sliceLocatorString(''), '');
});

test('Empty string with all location options', t => {
	const options = {beginLine: 0, beginColumn: 0, endLine: 0, endColumn: 0};
	t.is(sliceLocatorString('', options), '');
});

test('Empty string with all inconsistent location options', t => {
	const options = {beginLine: 4, beginColumn: 6, endLine: 1, endColumn: 2};
	t.is(sliceLocatorString('', options), '');
});

test('Empty string with all inconsistent offset options', t => {
	const options = {beginLine: 0, beginColumn: 0, endLine: 0, endColumn: 0, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('', options), '');
});

test('Empty string with all inconsistent options', t => {
	const options = {beginLine: 4, beginColumn: 6, endLine: 1, endColumn: 2, offsetLine: 9, offsetColumn: 9};
	t.is(sliceLocatorString('', options), '');
});

test('Empty string with offsetLine option negative', t => {
	const options = {beginLine: 0, beginColumn: 0, endLine: 0, endColumn: 0, offsetLine: -1};
	t.is(sliceLocatorString('', options), '');
});

test('Filled string without option', t => {
	const sameString = '0123456789';
	t.is(sliceLocatorString(sameString), sameString);
});

test('Filled string with all location options', t => {
	const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5};
	t.is(sliceLocatorString('0123456789', options), '5');
});

test('Filled string with all inconsistent location options', t => {
	const options = {beginLine: 4, beginColumn: 6, endLine: 1, endColumn: 2};
	t.is(sliceLocatorString('0123456789', options), '');
});

test('Filled string with offsetLine option negative', t => {
	const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetLine: -1};
	t.is(sliceLocatorString('0123456789', options), '');
});

test('Filled string with offsetColumn option negative', t => {
	const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetColumn: -1};
	t.is(sliceLocatorString('0123456789', options), '6');
});

test('Error: Filled string with offsetLine option big positive', t => {
	t.throws(() => {
		const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetLine: 100};
		sliceLocatorString('0123456789', options);
	}, {
		instanceOf: TypeError,
		message: 'The beginLine option (= 0) must be greater than or equal to offsetLine option (= 100)',
	});
});

test('Error: Filled string with offsetColumn option big positive', t => {
	t.throws(() => {
		const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetColumn: 100};
		sliceLocatorString('0123456789', options);
	}, {
		instanceOf: TypeError,
		message: 'The beginColumn option (= 5) must be greater than or equal to offsetColumn option (= 100)',
	});
});

test('Filled string with offsetLine option big negative', t => {
	const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetLine: -100};
	t.is(sliceLocatorString('0123456789', options), '');
});

test('Filled string with offsetColumn option big negative', t => {
	const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetColumn: -100};
	t.is(sliceLocatorString('0123456789', options), '');
});

test('Error: Filled string with all inconsistent offset options *', t => {
	t.throws(() => {
		const options = {beginLine: 0, beginColumn: 5, endLine: 0, endColumn: 5, offsetLine: 1, offsetColumn: 1};
		sliceLocatorString('0123456789', options);
	}, {
		instanceOf: TypeError,
		message: 'The beginLine option (= 0) must be greater than or equal to offsetLine option (= 1)',
	});
});

test('Error: Filled string with all inconsistent options', t => {
	t.throws(() => {
		const options = {beginLine: 4, beginColumn: 6, endLine: 1, endColumn: 2, offsetLine: 9, offsetColumn: 9};
		sliceLocatorString('0123456789', options);
	}, {
		instanceOf: TypeError,
		message: 'The beginLine option (= 4) must be greater than or equal to offsetLine option (= 9)',
	});
});

test('String multiline without option with \\n in the string', t => {
	const sameString = '123456\nabcdef';
	t.is(sliceLocatorString(sameString), sameString);
});

test('String multiline without option with \\r in the string', t => {
	const sameString = '123456\rabcdef';
	t.is(sliceLocatorString(sameString), sameString);
});

test('String multiline without option with \\r\\n in the string', t => {
	const sameString = '123456\r\nabcdef';
	t.is(sliceLocatorString(sameString), sameString);
});

test('String with other option', t => {
	const options = {beginLine: 1, beginColumn: 1, endLine: 1, endColumn: 6};
	t.is(sliceLocatorString('123456\r\nabcdef\nABCDEF\nGHIJKL\n\nMNOPQR', options), 'bcdef\n');
});

test('String with other option and offset', t => {
	const options = {beginLine: 2, beginColumn: 2, endLine: 2, endColumn: 7, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('123456\r\nabcdef\nABCDEF\nGHIJKL\n\nMNOPQR', options), 'bcdef\n');
});

test('String with column reverse location', t => {
	const options = {beginLine: 2, beginColumn: 7, endLine: 2, endColumn: 2, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('123456\r\nabcdef\nABCDEF\nGHIJKL\n\nMNOPQR', options), '');
});

test('String with line reverse location', t => {
	const options = {beginLine: 2, beginColumn: 2, endLine: 1, endColumn: 7, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('123456\r\nabcdef\nABCDEF\nGHIJKL\n\nMNOPQR', options), '');
});

test('String with line and column reverse location', t => {
	const options = {beginLine: 2, beginColumn: 7, endLine: 1, endColumn: 2, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('123456\r\nabcdef\nABCDEF\nGHIJKL\n\nMNOPQR', options), '');
});

test('String without options endLine, endColumn, offsetLine, offsetColumn and without \\n in last line', t => {
	const options = {beginLine: 3, beginColumn: 5};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), '4\nLine 5\n\nLine 7');
});

test('String without options endLine, endColumn, offsetLine, offsetColumn and with \\n in last line', t => {
	const options = {beginLine: 3, beginColumn: 5};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7\n', options), '4\nLine 5\n\nLine 7\n');
});

test('String without options offsetLine, offsetColumn and without \\n in last line', t => {
	const options = {beginLine: 4, beginColumn: 6, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), '4\nLine 5\n\nLine 7');
});

test('String without options offsetLine, offsetColumn and with \\n in last line', t => {
	const options = {beginLine: 4, beginColumn: 6, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7\n', options), '4\nLine 5\n\nLine 7\n');
});

test('String without options BeginLine, BeginColumn, offsetLine, offsetColumn and without \\n in first character', t => {
	const options = {endLine: 4, endColumn: 4};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine ');
});

test('endColumn greater length line', t => {
	const options = {endLine: 4, endColumn: 10};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5\n');
});

test('endColumn equal length line', t => {
	const options = {endLine: 4, endColumn: 6};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5\n');
});

test('endColumn lower length line', t => {
	const options = {endLine: 4, endColumn: 5};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5');
});

test('endColumn greater length line and offset 1', t => {
	const options = {endLine: 5, endColumn: 11, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5\n');
});

test('endColumn equal length line and offset 1', t => {
	const options = {endLine: 5, endColumn: 7, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5\n');
});

test('endColumn lower length line and offset 1', t => {
	const options = {endLine: 5, endColumn: 6, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine 4\nLine 5');
});

test('String without options BeginLine, BeginColumn, offsetLine, offsetColumn and with \\n in first character', t => {
	const options = {endLine: 4, endColumn: 4};
	t.is(sliceLocatorString('\nLine 2\nLine 3\n\nLine 5\nLine 6\n\nLine 8\n', options), '\nLine 2\nLine 3\n\nLine ');
});
test('String without options BeginLine, BeginColumn and without \\n in first character', t => {
	const options = {endLine: 4, endColumn: 5, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('Line 1\nLine 2\n\nLine 4\nLine 5\n\nLine 7', options), 'Line 1\nLine 2\n\nLine ');
});

test('String without options BeginLine, BeginColumn and with \\n in first character', t => {
	const options = {endLine: 4, endColumn: 5, offsetLine: 1, offsetColumn: 1};
	t.is(sliceLocatorString('\nLine 2\nLine 3\n\nLine 5\nLine 6\n\nLine 8\n', options), '\nLine 2\nLine 3\n\n');
});
