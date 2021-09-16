const messageWithOffset = (options, locationName, locationOffset) => `The ${locationName} option (= ${options[locationName]}) must be greater than or equal to ${locationOffset} option (= ${options[locationOffset]})`;

const initOptions = (options, stringLines) => {
	options = {
		// If beginLine is undefined, initialize to:zero + offsetLine (offsetLine should be defined and is a number, otherwise offsetLine is ignored)
		beginLine: (options.offsetLine && typeof options.offsetLine === 'number') ? 0 + options.offsetLine : 0,
		// If beginColumn is undefined, initialize to: zero + offsetColumn (offsetColumn should be defined and is a number, otherwise offsetColumn is ignored)
		beginColumn: (options.offsetColumn && typeof options.offsetColumn === 'number') ? 0 + options.offsetColumn : 0,
		// If endLine is undefined, initialize to: Number of lines in the string - 1 + offsetLine (offsetLine should be defined and is a number, otherwise offsetLine is ignored)
		endLine: (options.offsetLine && typeof options.offsetLine === 'number') ? stringLines.length - 1 + options.offsetLine : stringLines.length - 1,
		// If endColumn is undefined, initialize to: Length of last line in the string + offsetColumn (offsetColumn should be defined and is a number, otherwise offsetColumn is ignored)
		endColumn: (options.offsetColumn && typeof options.offsetColumn === 'number') ? stringLines[stringLines.length - 1].length + options.offsetColumn : stringLines[stringLines.length - 1].length,
		// If offsetLine is undefined, initialize to: zero
		offsetLine: 0,
		// If offsetColumn is undefined, initialize to: zero
		offsetColumn: 0,
		// Overwrites default properties with properties already defined in the options object
		...options,
	};

	return options;
};

const checkAndInitOptions = (options, stringLines) => {
	if (options && typeof options !== 'object') {
		throw new TypeError(`Expected a object in the second parameter, got ${typeof options}`);
	}

	options = initOptions(options, stringLines);

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
		throw new TypeError(messageWithOffset(options, 'beginLine', 'offsetLine'));
	}

	if (options.endLine - options.offsetLine < 0) {
		throw new TypeError(messageWithOffset(options, 'endLine', 'offsetLine'));
	}

	if (options.beginColumn - options.offsetColumn < 0) {
		throw new TypeError(messageWithOffset(options, 'beginColumn', 'offsetColumn'));
	}

	if (options.endColumn - options.offsetColumn < 0) {
		throw new TypeError(messageWithOffset(options, 'endColumn', 'offsetColumn'));
	}

	return options;
};

export default function sliceLocation(input, options = {}) {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string in the first parameter, got ${typeof input}`);
	}

	if (input === '') {
		return '';
	}

	const stringLines = input.split(/(.*\r\n|.*\n|.*\r)/m).filter(element => element !== '');
	options = checkAndInitOptions(options, stringLines);

	let beginIndex = 0;
	let endIndex = 0;
	for (const [numberLineCurrent, element] of stringLines.entries()) {
		// Determine begin index for slice
		if (numberLineCurrent <= options.beginLine - options.offsetLine) {
			beginIndex += numberLineCurrent === options.beginLine - options.offsetLine ? options.beginColumn - options.offsetColumn : element.length;
		}

		// Determine end index for slice
		if (numberLineCurrent <= options.endLine - options.offsetLine) {
			endIndex += numberLineCurrent === options.endLine - options.offsetLine ? Math.min(options.endColumn - options.offsetColumn + 1, element.length) : element.length;
		}

		// Ends the loop when we have reached the last desired line
		if (numberLineCurrent === options.endLine - options.offsetLine) {
			break;
		}
	}

	return input.slice(beginIndex, endIndex);
}
