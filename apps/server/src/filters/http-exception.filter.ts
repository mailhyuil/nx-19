import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR, isERROR } from '../errors/error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = error.getStatus();
    const response = error.getResponse() as string | ERROR;
    const message = error.message;
    const cause = error.cause;
    const stack = error.stack;

    const errorResponse = {
      statusCode,
      path: req.url,
      timestamp: new Date().toISOString(),
      message,
      error: isERROR(response)
        ? response
        : ({
            type: 'system',
            code: 9999,
            message: response,
          } as ERROR),
    };

    res.status(statusCode).json(errorResponse);

    this.logger.error(
      `
MESSAGE: ${errorResponse.message}
PATH: ${errorResponse.path}
TIMESTAMP: ${errorResponse.timestamp}
STACK: ${stack}
CAUSE: ${cause}
`,
    );
  }
}
