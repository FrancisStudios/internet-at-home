import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router) { }

  isLogin = false;
  isVerfiying = true;
  isVerified = false;
  isFailed = false;
  dispatchedFrom: string = '';
  private routeSubscription: any;

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.dispatchedFrom = params['from'];

      //dispatch action to load the details here.
      console.log(this.dispatchedFrom);
      switch(this.dispatchedFrom){
        case 'duegev-wiki':
          if(this.isVerified) this.router.navigate(['/duegev-wiki']);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
