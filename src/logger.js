"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogarMethod = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
// Caminho do diretório de log
const logDirectory = './logs';
// Garante que o diretório exista; se não existir, cria-o
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const pathLogger = path_1.default.join(logDirectory, 'log.log');
const LogarMethod = function logarMetodo(options) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        if (metodoOriginal) {
            descriptor.value = function (...args) {
                var _a, _b, _c;
                const prefix = (options === null || options === void 0 ? void 0 : options.prefix) || "";
                const suffix = (options === null || options === void 0 ? void 0 : options.suffix) || "";
                const logInput = (_a = options === null || options === void 0 ? void 0 : options.logInput) !== null && _a !== void 0 ? _a : true;
                const logOutput = (_b = options === null || options === void 0 ? void 0 : options.logOutput) !== null && _b !== void 0 ? _b : true;
                const logExecutionTime = (_c = options === null || options === void 0 ? void 0 : options.logExecutionTime) !== null && _c !== void 0 ? _c : true;
                const logFilePath = (options === null || options === void 0 ? void 0 : options.logFilePath) || pathLogger;
                const logMessage = [];
                if (logInput) {
                    logMessage.push(`${prefix}Antes da execução do método ${String(propertyKey)}`);
                    logMessage.push(`${prefix}Parâmetros: ${JSON.stringify(args)}`);
                }
                const startTime = Date.now();
                const resultado = metodoOriginal.apply(this, args);
                const endTime = Date.now();
                if (logOutput) {
                    logMessage.push(`${prefix}Depois da execução do método ${String(propertyKey)}`);
                    logMessage.push(`${prefix}Resultado: ${JSON.stringify(resultado)}`);
                }
                if (logExecutionTime) {
                    logMessage.push(`${prefix}Tempo de execução: ${endTime - startTime} ms`);
                }
                logMessage.push(`${prefix}${suffix}`);
                // Escreve no arquivo de log usando fs.appendFileSync
                fs.appendFileSync(logFilePath, logMessage.join('\n') + '\n');
                // Imprime as mensagens no console
                console.log(logMessage.join('\n'));
                return resultado;
            };
        }
        return descriptor;
    };
};
exports.LogarMethod = LogarMethod;
