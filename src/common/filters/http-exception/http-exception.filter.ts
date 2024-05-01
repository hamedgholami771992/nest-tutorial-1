import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { object } from 'joi';
import { timestamp } from 'rxjs';



//since we dont need any external providers, we can just bind this filter globally


@Catch(HttpException)    //binds the required meta-data to exception-filter
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()  //gives access to http ctx
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()
    const error = typeof response === 'string' ? { message: exceptionResponse} : (exceptionResponse as object)
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString()
    })
  }
}
