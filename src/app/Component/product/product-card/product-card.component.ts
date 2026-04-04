import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { MixpanelService } from '../../../Shared/Services/mixpanel.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../State/product.action';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() cardClick = new EventEmitter<number>();
  @Output() deleted = new EventEmitter<void>();
  count: number = 1;

  constructor(
    private readonly cartService: CartService,
    private readonly mixpanelService: MixpanelService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly store: Store,
    private readonly productService: ProductService
  ) {}

  addToCart(cartItem: any, event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, this.count);
    this.toastr.success('Addtocart Success');
    this.store.dispatch(addToCart({ cartItem }));
  }

  onCardClick(): void {
    this.cardClick.emit(this.product.id);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/products/edit', this.product.id]);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
