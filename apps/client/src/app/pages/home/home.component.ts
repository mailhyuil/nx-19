import InputFileUploadComponent from '@/client/src/app/components/input-file-upload/input-file-upload.component';
import { PostService } from '@/client/src/app/services/post.service';
import { PostDto } from '@/server/src/app/post/post.dto';
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
  postService = inject(PostService);
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
      this.postService.findById(this.id).subscribe({
        next: (res) => {
          console.log('hi', res);
          this.form.patchValue(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    this.postService.findAll().subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  submit() {
    const body = this.form.getRawValue();

    this.postService.create(body, this.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  remove(id: string) {
    this.postService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
