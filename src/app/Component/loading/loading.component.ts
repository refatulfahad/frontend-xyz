import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakAuthService } from '../../Services/keycloak-auth.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly keycloakAuthService = inject(KeycloakAuthService);

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.keycloakAuthService.exchangeCodeForToken(code).subscribe({
        next: (res) => {
          localStorage.setItem('loggedUser', JSON.stringify(res));
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error exchanging code for token:', err);
        }
      });
    }
  }
}
