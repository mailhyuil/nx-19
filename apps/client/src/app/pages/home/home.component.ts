import InputFileUploadComponent from '@/client/src/app/components/input-file-upload/input-file-upload.component';
import { PostService } from '@/client/src/app/services/post.service';
import { PostDto } from '@/server/src/app/post/post.dto';
import { Component, inject, signal } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestComponent } from '../../components/test/test.component';
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
    TestComponent,
  ],
})
export class HomeComponent {
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
  post = signal<PostDto | undefined>(undefined);
  posts = signal<PostDto[]>([]);

  constructor() {
    this.postService.findById(this.id).subscribe({
      next: (post) => {
        if (post) {
          this.post.set(post);
          this.form.patchValue(post);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.postService.findAll().subscribe((posts) => {
      this.posts.set(posts);
    });
  }

  submit() {
    const body = this.form.getRawValue();
    this.postService.create(body, this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.posts;
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
