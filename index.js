'use strict';

const msgWithOffset = (options, locationName, locationOffset) => {
	return `The ${locationName} option (= ${options[locationName]}) must be greater than or equal to ${locationOffset} option (= ${options[locationOffset]})`;
};

const checkAndInitOptions = (input, options, stringLines) => {
	if (options && typeof options !== 'object') {
		throw new TypeError(`Expected a object in the second parameter, got ${typeof options}`);
	}

	options = {
		beginLine: 0,
		beginColumn: 0,
		endLine: stringLines.length - 1,
		endColumn: stringLines[stringLines.length - 1].length - 1,
		offsetLine: 0,
		offsetColumn: 0,
		...options
	};

	if (typeof options.beginLine !== 'number') {
		throw new TypeError(`Expected a number in the beginLine option, got ${typeof options.beginLine}`);
	}

	if (typeof options.beginColumn !== 'number') {
		throw new TypeError(`Expected a number in the beginColumn option, got ${typeof options.beginColumn}`);
	}

	if (typeof options.endLine !== 'number') {
		throw new TypeError(`Expected a number in the endLine option, got ${typeof options.endLine}`);
	}

	if (typeof options.endColumn !== 'number') {
		throw new TypeError(`Expected a number in the endColumn option, got ${typeof options.endColumn}`);
	}

	if (typeof options.offsetLine !== 'number') {
		throw new TypeError(`Expected a number in the offsetLine option, got ${typeof options.offsetLine}`);
	}

	if (typeof options.offsetColumn !== 'number') {
		throw new TypeError(`Expected a number in the offsetColumn option, got ${typeof options.offsetColumn}`);
	}

	if (options.beginLine - options.offsetLine < 0) {
		throw new TypeError(msgWithOffset(options, 'beginLine', 'offsetLine'));
	}

	if (options.endLine - options.offsetLine < 0) {
		throw new TypeError(msgWithOffset(options, 'endLine', 'offsetLine'));
	}

	if (options.beginColumn - options.offsetColumn < 0) {
		throw new TypeError(msgWithOffset(options, 'beginColumn', 'offsetColumn'));
	}

	if (options.endColumn - options.offsetColumn < 0) {
		throw new TypeError(msgWithOffset(options, 'endColumn', 'offsetColumn'));
	}

	return options;
};

module.exports = (input, options) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string in the first parameter, got ${typeof input}`);
	}

	if (input === '') {
		return '';
	}

	const stringLines = input.split(/(.*\r\n|.*\n|.*\r)/m).filter(element => element !== '');
	options = checkAndInitOptions(input, options, stringLines);

	let beginIndex = 0;
	let endIndex = 0;
	for (const [numberLineCurrent, element] of stringLines.entries()) {
		// Determine begin index for slice
		if (numberLineCurrent <= options.beginLine - options.offsetLine) {
			if (numberLineCurrent === options.beginLine - options.offsetLine) {
				beginIndex += options.beginColumn - options.offsetColumn;
			} else {
				beginIndex += element.length;
			}
		}

		// Determine end index for slice
		if (numberLineCurrent <= options.endLine - options.offsetLine) {
			if (numberLineCurrent === options.endLine - options.offsetLine) {
				endIndex += options.endColumn + 1 - options.offsetColumn;
			} else {
				endIndex += element.length;
			}
		}
	}

	return input.slice(beginIndex, endIndex);
};
