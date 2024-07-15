import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlowService } from '../../../../services/flow.service';

@Component({
  selector: 'app-form-escrow',
  templateUrl: './form-escrow.component.html',
  styleUrls: ['./form-escrow.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FormEscrowComponent {
  flowService = inject(FlowService);
  submit() {
    // do something
    this.flowService.end();
  }
}
