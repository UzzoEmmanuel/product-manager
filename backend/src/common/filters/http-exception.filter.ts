import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'],
      details: typeof exceptionResponse === 'object' ? exceptionResponse['details'] : undefined,
    };

    this.logger.error(
      `${request.method} ${request.url} ${status} ${JSON.stringify(exceptionResponse)}`,
      exception instanceof Error ? exception.stack : '',
      'HttpExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
