import { inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlTree,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  private pageCount: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscriptions: Subscription[] = [];

  async start(url: string | UrlTree) {
    // pageCount를 초기화해요.
    this.pageCount = 0;
    // listener를 붙여요. 반환받은 반환한 클린업 함수는 end 안에서 호출해요.
    const sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.pageCount++;
      });
    this.subscriptions.push(sub);
    this.router.navigate([url], {
      relativeTo: this.route,
    });
  }

  async end() {
    if (this.pageCount > 0) {
      await this.router.navigate(['..']);
    }
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
