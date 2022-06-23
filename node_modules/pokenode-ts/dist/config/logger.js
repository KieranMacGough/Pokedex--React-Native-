"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponseError = exports.handleResponse = exports.handleRequestError = exports.handleRequest = exports.createLogger = void 0;
const tslib_1 = require("tslib");
const pino_1 = tslib_1.__importDefault(require("pino"));
const createLogger = (options) => (0, pino_1.default)(options);
exports.createLogger = createLogger;
const handleRequest = (config, logger) => {
    var _a;
    logger.info(`[ Request Config ] ${((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || ''} | ${config.url || ''}`);
    return config;
};
exports.handleRequest = handleRequest;
const handleRequestError = (error, logger) => {
    logger.error(`[ Request Error ] CODE ${error.code || 'UNKNOWN'} | ${error.message}`);
    throw error;
};
exports.handleRequestError = handleRequestError;
const handleResponse = (response, logger) => {
    logger.info(response.data);
    return response;
};
exports.handleResponse = handleResponse;
const handleResponseError = (error, logger) => {
    logger.error(`[ Response Error ] CODE ${error.code || 'UNKNOWN'} | ${error.message}`);
    throw error;
};
exports.handleResponseError = handleResponseError;
