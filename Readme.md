# Documentação da Biblioteca Decorators-Logger

A biblioteca LogDecorator é uma ferramenta simples e flexível para adicionar logs a métodos em TypeScript. Ela permite que você personalize facilmente o formato e o conteúdo dos logs, bem como o destino para onde os logs serão gravados. A biblioteca usa decorators para simplificar a aplicação de logger aos métodos desejados.

## Instalação

Para instalar a biblioteca, utilize o seguinte comando npm:

```bash
npm i @makerjuniorpereira/maker-logger
```

## Uso Básico

Aqui está um exemplo de uso básico da biblioteca:

```typescript
import { LogarMethod } from '@makerjuniorpereira/maker-logger/src/logger';

// ...

class Exemplo {
  @LogarMethod({ prefix: "[LOG]: ", suffix: " Fim do Log", logFilePath: 'logs/log.log' })
  metodoExemplo(param1: string, param2: number): string {
    return `Resultado: ${param1} - ${param2}`;
  }
}

const exemplo = new Exemplo();
exemplo.metodoExemplo("Olá", 42);
```

Neste exemplo, a classe `Exemplo` contém um método `metodoExemplo` decorado com `@LogarMethod`, que adicionará logs antes e depois da execução do método. O arquivo de log será criado no caminho especificado em `logFilePath` (por padrão, no diretório 'logs').

## Opções do Decorator
##### Não se esqueça de alterar em seu *tsconfig.json*
```
"experimentalDecorators": true
```


O decorator `@LogarMethod` aceita várias opções para personalizar o comportamento do logger. Aqui estão as opções disponíveis:

- `prefix?: string`: Adiciona um prefixo às mensagens de log (padrão: vazio).
- `suffix?: string`: Adiciona um sufixo às mensagens de log (padrão: vazio).
- `logInput?: boolean`: Define se os parâmetros de entrada do método devem ser registrados (padrão: true).
- `logOutput?: boolean`: Define se o resultado do método deve ser registrado (padrão: true).
- `logExecutionTime?: boolean`: Define se o tempo de execução do método deve ser registrado (padrão: true).
- `logFilePath?: string`: Define o caminho do arquivo de log (padrão: 'logs/log.log').

## Exemplo de Personalização

Você pode personalizar ainda mais a biblioteca adicionando suas próprias opções ou modificando o decorator de acordo com suas necessidades específicas. Aqui está um exemplo de personalização:

```typescript
import { LogarMethod } from '@makerjuniorpereira/maker-logger/src/logger';

const LogarComPrefixo = function(options?: { customPrefix: string }): MethodDecorator {
  return LogarMethod({
    prefix: options?.customPrefix || "[CUSTOM LOG]: ",
    suffix: " Fim do Log",
    logFilePath: 'logs/custom-log.log'
  });
};

class Exemplo {
  @LogarComPrefixo({ customPrefix: "[LOG] - Personalizado: " })
  metodoExemplo(param1: string, param2: number): string {
    return `Resultado: ${param1} - ${param2}`;
  }
}

const exemplo = new Exemplo();
exemplo.metodoExemplo("Olá", 42);
```

Neste exemplo, um novo decorator `LogarComPrefixo` é criado para adicionar um prefixo personalizado às mensagens de log.

## Conclusão

A biblioteca LogDecorator oferece uma solução fácil e eficiente para adicionar logs a métodos em seus projetos TypeScript. Personalize as opções conforme necessário para atender aos requisitos específicos do seu aplicativo. Se precisar de mais informações, consulte a documentação da API ou entre em contato com a comunidade de desenvolvedores.

[Mente Maker]()

[![Vídeo de Exemplo](https://yt3.googleusercontent.com/_9ySzLdgPWVtE0yyiSIHlw5yejMDBHiryy-nVxDIqObvVoO-BGLm72NJVV0LENmrJrMTFoRC=s176-c-k-c0x00ffffff-no-rj)](https://www.youtube.com/channel/UCdHR_M4vqK1rtKo56RMQ9tQ)
