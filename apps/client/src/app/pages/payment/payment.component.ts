import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowService } from '../../services/flow.service';
import { FormEscrowComponent } from './components/form-escrow/form-escrow.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormEscrowComponent,
  ],
  providers: [FlowService],
})
export class PaymentComponent {
  isEscrowAvailable = false;
  isSMSCertificationRequired = false;
  isPINRequired = false;
  router = inject(Router);
  route = inject(ActivatedRoute);
  flowService = inject(FlowService);
  fb = inject(NonNullableFormBuilder);
  // state
  form = this.fb.group({});
  async submit() {
    if (this.isEscrowAvailable) {
      await this.flowService.start('/escrow'); // 에스크로 흐름 시작하기
    }
    if (this.isSMSCertificationRequired) {
      await this.flowService.start('/sms'); // SMS 인증 흐름 시작하기
    }
    if (this.isPINRequired) {
      await this.flowService.start('/payment-password'); // 결제 비밀번호 입력 흐름 시작하기
    }
    await this.confirm();
  }
  async confirm() {
    const body = this.form.value;
    console.log(body);
  }
}
