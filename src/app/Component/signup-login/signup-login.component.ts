import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel, SignUpModel } from '../../Model/class';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';
import { ToastrService } from 'ngx-toastr';
import { KeycloakAuthService } from '../../Services/keycloak-auth.service';

@Component({
  selector: 'app-signup-login',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './signup-login.component.html',
  styleUrl: './signup-login.component.css'
})
export class SignupLoginComponent {
  private readonly router = inject(Router);
  private readonly mixpanelService = inject(MixpanelService);
  private readonly toastr = inject(ToastrService);
  private readonly keycloakAuthService = inject(KeycloakAuthService);

  isSignDivVisiable: boolean = true;
  signUpobj: SignUpModel = new SignUpModel();
  loginobj: LoginModel = new LoginModel();

  showSuccess(): void {
    this.toastr.success('Registration Success', 'Toastr fun!', {
      positionClass: 'toast-top-center'
    });
  }

  onRegister(): void {
    const localUser = localStorage.getItem('trackpanel18users');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpobj);
      this.mixpanelService.trackEvent('SignUp', { email: this.signUpobj.email });
      localStorage.setItem('trackpanel18users', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpobj);
      this.mixpanelService.trackEvent('SignUp', { email: this.signUpobj.email });
      localStorage.setItem('trackpanel18users', JSON.stringify(users));
    }
    this.toastr.success('Registration Success');
    this.showSuccess();
    const localUserref = localStorage.getItem('trackpanel18users');
    if (localUserref != null) {
      const users = JSON.parse(localUserref);
      const isUserPresent = users.find((user: SignUpModel) => user.email == this.signUpobj.email && user.password == this.signUpobj.password);
      if (isUserPresent != undefined) {
        this.mixpanelService.identifyUser(this.signUpobj.email, isUserPresent.name);
        this.mixpanelService.trackEvent('Login', { email: this.signUpobj.email, eventType: 'Signup' });
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.toastr.success('Registration Success');
        this.router.navigate(['/products']);
      } else {
        alert('No user found');
      }
    }
  }

  onLogin(): void {
    alert('signin');
    const localUser = localStorage.getItem('trackpanel18users');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      const isUserPresent = users.find((user: SignUpModel) => user.email == this.loginobj.email && user.password == this.loginobj.password);
      if (isUserPresent != undefined) {
        this.mixpanelService.identifyUser(this.loginobj.email, isUserPresent.name);
        this.mixpanelService.trackEvent('Login', { email: this.loginobj.email, eventType: 'login' });
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.isSignDivVisiable = false;
        this.toastr.success('Login Success');
        this.showSuccess();
        this.router.navigate(['/products']);
      } else {
        alert('No user found');
      }
    }
  }

  onKeycloakAuthRedirect(): void {
    this.keycloakAuthService.authenticateWithKeycloak();
  }
}


