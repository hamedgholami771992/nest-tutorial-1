import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, //adds the capability for access to route's metadata
    private readonly configService: ConfigService  //we should not use process.env directly
  ){}  
  canActivate(  
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {  //it returns a boolean to indicate whether a request can proceed or not
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) //the 2th parameter tells that we want to access the metadata of handler
    if(isPublic){
      return true
    }
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Authorization')
    return authHeader === this.configService.get("API_KEY");
  }
} 
