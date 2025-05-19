import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {debugger
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.productService.exchangeCodeForToken(code).subscribe({
        next: (res) => {
          console.log('Token received:', res);
          debugger
          localStorage.setItem('loggedUser', JSON.stringify(res));
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error exchanging code for token:', err);
        }
      });
      // const pageSize = 10, pageIndex = 0;
      // const skip = pageIndex * pageSize;
      // const apiUrl = `/products?limit=${pageSize}&skip=${skip}&select=brand,title,category,description,price,images,stock`;
      // this.http.get(`${apiUrl}`).subscribe((response: any) => {
      //   debugger;
      // });
    }
  }
}
