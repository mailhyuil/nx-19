import {
  CreatePostDto,
  PostDto,
  UpdatePostDto,
} from '@/server/src/app/post/post.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, shareReplay, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly API_ENDPOINT = 'posts';
  private readonly clearCache$ = new Subject<void>();
  private cache$?: Observable<PostDto[]>;

  ngOnDestroy() {
    this.clearCache$.next();
    this.clearCache$.complete();
  }

  findAll() {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<PostDto[]>(`${this.API_ENDPOINT}`)
        .pipe(shareReplay(1), takeUntil(this.clearCache$));
    }
    return this.cache$;
  }

  findById(id: string) {
    return this.http.get<PostDto>(`${this.API_ENDPOINT}/${id}`);
  }

  create(body: CreatePostDto, id?: string) {
    return this.http.post<PostDto>(`${this.API_ENDPOINT}${id ? id : ''}`, body);
  }

  update(id: string, body: UpdatePostDto) {
    return this.http.patch<PostDto>(`${this.API_ENDPOINT}/${id}`, body);
  }

  delete(id: string) {
    return this.http.delete<PostDto>(`${this.API_ENDPOINT}/${id}`);
  }

  clearCache() {
    this.cache$ = undefined;
    this.clearCache$.next();
  }

  refresh() {
    this.clearCache();
    return this.findAll();
  }
}
