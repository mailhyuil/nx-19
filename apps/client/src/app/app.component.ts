import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import InputFileUploadComponent from './components/input-file-upload/input-file-upload.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    InputFileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    files: [[] as File[], []],
    file: [undefined, []],
  });
  submit() {
    const body = this.form.value;
    console.log(body);
  }
}
