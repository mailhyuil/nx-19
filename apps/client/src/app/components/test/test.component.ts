import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, inject, input } from '@angular/core';
import { TEST_A_SERVICE, TestAService } from './test-a.service';
import { TEST_B_SERVICE, TestBService } from './test-b.service';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: TEST_A_SERVICE,
      useClass: TestAService,
    },
    {
      provide: TEST_B_SERVICE,
      useClass: TestBService,
    },
  ],
})
export class TestComponent implements OnInit {
  type = input(TEST_A_SERVICE);
  injector = inject(Injector);
  testService?: TestService;
  TEST_A_SERVICE = TEST_A_SERVICE;
  TEST_B_SERVICE = TEST_B_SERVICE;
  ngOnInit(): void {
    const type = this.type();
    if (type) {
      this.testService = this.injector.get<TestService>(type);
    }
  }
  test() {
    this.testService?.doSomething();
  }
}
