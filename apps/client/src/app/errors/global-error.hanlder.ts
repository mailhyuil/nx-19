import { ErrorHandler, Injectable } from '@angular/core';
import { UserFriendlyError } from './user-friendly.error';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof UserFriendlyError) {
      alert(error.message);
    }
  }
}
