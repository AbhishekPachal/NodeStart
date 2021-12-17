const { createLogger, format, transports } = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const colors = {
	trace: 'white',
	debug: 'blue',
	info: 'green',
	warn: 'yellow',
	crit: 'red',
	fatal: 'red',
};

const options = (prefix) => ({
	level: 'debug',
	format: format.combine(
		format.label({ label: path.basename(prefix) }),
		format.colorize({ colors }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
	),
	transports: [
		new transports.Console(),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%/verbose.log',
			datePattern: 'DD-MM-YYYY',
			level: 'debug',
			format: format.combine(format.uncolorize()),
			maxSize: '20m',
    		maxFiles: '14d'
		}),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%/errors.log',
			datePattern: 'DD-MM-YYYY',
			level: 'error',
			format: format.combine(format.uncolorize()),
			maxSize: '20m',
    		maxFiles: '14d'
		}),
	],
});

// prettier-disable
const logger = (prefix) => createLogger(options(prefix));

module.exports = logger;