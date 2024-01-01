import * as fs from 'fs';
import path from 'path';

// Caminho do diretório de log
const logDirectory = './logs';
// Garante que o diretório exista; se não existir, cria-o
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const pathLogger = path.join(logDirectory, 'log.log');

type LogarMetodoOptions = {
  prefix?: string;
  suffix?: string;
  logInput?: boolean;
  logOutput?: boolean;
  logExecutionTime?: boolean;
  logFilePath?: string;
  // Adicione mais opções conforme necessário
};

const LogarMethod = function logarMetodo(options?: LogarMetodoOptions): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> | void {
    const metodoOriginal = descriptor.value;

    if (metodoOriginal) {
      descriptor.value = function (...args: any[]): any {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";
        const logInput = options?.logInput ?? true;
        const logOutput = options?.logOutput ?? true;
        const logExecutionTime = options?.logExecutionTime ?? true;
        const logFilePath = options?.logFilePath || pathLogger;

        const logMessage: string[] = [];

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
}

export {
  LogarMethod
}
