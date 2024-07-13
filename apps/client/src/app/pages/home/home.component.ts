import InputFileUploadComponent from '@/client/src/app/components/input-file-upload/input-file-upload.component';
import { PostDto } from '@/server/src/app/post/post.dto';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    InputFileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(15)]],
    content: ['', [Validators.required, Validators.maxLength(100)]],
    files: [[] as File[], []],
    file: [undefined, []],
  });
  get id() {
    return this.route.snapshot.params['id'];
  }
  posts: PostDto[] = [];
  ngOnInit(): void {
    if (this.id) {
      this.http
        .get<PostDto>(`http://localhost:3000/api/v1/posts/${this.id}`)
        .subscribe({
          next: (res) => {
            console.log('hi', res);
            this.form.patchValue(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
    this.http.get<PostDto[]>('http://localhost:3000/api/v1/posts').subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  submit() {
    const body = this.form.value;
    this.http
      .post<PostDto>(
        `http://localhost:3000/api/v1/posts/${this.id ? this.id : ''}`,
        body
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  remove(id: string) {
    this.http.delete(`http://localhost:3000/api/v1/posts/${id}`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
