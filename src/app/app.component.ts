import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LayoutComponent } from './Component/layout/layout.component';
import { SignupLoginComponent } from './Component/signup-login/signup-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SignupLoginComponent,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isLoggedIn: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      const loggedUser = localStorage.getItem('loggedUser');
      this.isLoggedIn = !!loggedUser;

      // if (!this.isLoggedIn) {
      //   this.router.navigate(['/signup-login']);
      // }
    }
  }
}
