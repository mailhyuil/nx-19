import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = error.getStatus();
    const errorResponse = error.getResponse();
    const message = error.message;
    const cause = error.cause;
    const stack = error.stack;

    const json = {
      statusCode,
      path: req.url,
      timestamp: new Date().toISOString(),
      message,
      context: {
        body: req.body,
        query: req.query,
        params: req.params,
        error: errorResponse,
      },
    };
    res.status(statusCode).json(json);
    console.error(
      `MESSAGE: ${json.message}\nPATH: ${json.path}\nTIMESTAMP: ${
        json.timestamp
      }\nCONTEXT: ${JSON.stringify(
        json.context,
      )}\nSTACK: ${stack}\nCAUSE: ${cause}`,
    );
  }
}
