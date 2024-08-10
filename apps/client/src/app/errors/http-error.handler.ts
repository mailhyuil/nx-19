import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from './error-message';
import { UserFriendlyError } from './user-friendly.error';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  router = inject(Router);
  handleError(httpError: HttpErrorResponse) {
    const status: number = httpError.status;
    const error: any = httpError.error;
    if (status === 401) {
      this.handleUnauthorized();
    }
    if (status === 498) {
      this.handleInvalidToken();
    }
    throw new UserFriendlyError(ErrorMessage[error.code]);
  }

  private async handleInvalidToken() {
    // auth를 clear
    // refresh token으로 access token을 요청
    // access token을 이용해 me를 요청
    // me를 받아서 auth store에 저장
    // 실패하면 login 페이지로 이동
    return;
  }

  private async handleUnauthorized(): Promise<void> {
    // auth를 clear
    // login 페이지로 이동
    return;
  }
}
