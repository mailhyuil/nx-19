import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlowService implements OnDestroy {
  private pageCount: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async start(url: string) {
    this.pageCount = 0;

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
      window.history.go(-this.pageCount);
    }
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
