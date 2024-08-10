import { HttpException, HttpStatus } from '@nestjs/common';
import { createError, ERROR } from './error';

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    const response = createError(ERROR.USER_NOT_FOUND, {
      userId,
    });
    super(response, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    const response = createError(ERROR.USER_ALREADY_EXISTS, { email });
    super(response, HttpStatus.BAD_REQUEST);
  }
}
