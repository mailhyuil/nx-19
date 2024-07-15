import { Injectable, InjectionToken } from '@angular/core';
import { TestService } from './test.service';
export const TEST_A_SERVICE = new InjectionToken<TestAService>(
  'TEST_A_SERVICE',
);

@Injectable()
export class TestAService extends TestService {
  test(): void {
    console.log('test-a');
  }
}
