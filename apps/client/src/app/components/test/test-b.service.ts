import { Injectable, InjectionToken } from '@angular/core';
import { TestService } from './test.service';
export const TEST_B_SERVICE = new InjectionToken<TestBService>(
  'TEST_B_SERVICE',
);

@Injectable()
export class TestBService extends TestService {
  test(): void {
    console.log('test-b');
  }
}
