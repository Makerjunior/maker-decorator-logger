type LogarMetodoOptions = {
    prefix?: string;
    suffix?: string;
    logInput?: boolean;
    logOutput?: boolean;
    logExecutionTime?: boolean;
    logFilePath?: string;
};
declare const LogarMethod: (options?: LogarMetodoOptions) => MethodDecorator;
export { LogarMethod };
