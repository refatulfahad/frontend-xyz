// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { MixpanelService } from '../Shared/Services/mixpanel.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {

//   constructor(
//     private mixpanelService: MixpanelService
//   ){}

//   addProductToCart(product: any, quantity: number) {
//     throw new Error('Method not implemented.');
//   }
//   private cart: any = JSON.parse(localStorage.getItem('cartItems') || '[]');
//   private totalPrice = 0;
//   private cartCount : number = 0;
 
//   addToCart(product: any, count: number) {
    
//     this.mixpanelService.trackEvent('AddToCart', { Title: product.title, Quantity: count});
//     const existingProduct = this.cart.find((item:any) => item.title === product.title);
    
//     if (existingProduct) {
//       existingProduct.count += count;  
//     } else {
//       const cartItem = {
//         title: product.title,
//         category: product.category,
//         price: product.price,
//         count: count,
//         images: product.images,
//       };
//       this.cart.push(cartItem);
//       localStorage.setItem('cartItems',JSON.stringify(this.cart));
//     }
//     this.updateCartCount();
//     this.calculateTotal();
//   }

  
//   getCartItems() {
//     return this.cart;
//   }

//   updateCartCount() {
//     const totalCount = this.cart.reduce((acc:any, item:any) => acc + item.count, 0);
//     this.cartCount=totalCount;
//   }

//   calculateTotal() {
//     this.totalPrice = this.cart.reduce((acc:any, item:any) => acc + item.price * item.count, 0);
//   }


//   getTotalPrice() {
//     return this.totalPrice;
//   }

//   getTotalCount() {
//     return this.cartCount;
//   }
//   removeProductFromCart(product: any) {
//     this.cart = this.cart.filter((item: { title: any; }) => item.title !== product.title);
//     localStorage.setItem('cartItems',JSON.stringify(this.cart));
//     this.getCartItems();
//   }

//   clearCart() {
//     this.cart = [];
//   }

//   incrementQuantity(id: number){
//     let item = this.cart.find((i: { id: number; })=>i.id ===id);
//     if(item){
//       item.count++;
//     }
//   }

//   decrementQuantity(id: number){
//     let item = this.cart.find((i: { id: number; })=>i.id ===id);
//     if(item){
//       item.count--;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { MixpanelService } from '../Shared/Services/mixpanel.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartSubject.asObservable();
  private totalPrice = 0;

  constructor(private mixpanelService: MixpanelService) {
    this.cartSubject.next(this.getTotalCount());
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getTotalCount() {
    const cart = this.getCartItems();
    return cart.reduce((totalCount:any, item:any) => totalCount + item.count, 0);
  }

  addToCart(product: any, count: number) {
    const cart = this.getCartItems();
    const existingProduct = cart.find((item: any) => item.title === product.title);
    
    if (existingProduct) {
      existingProduct.count += count;
    } else {
      const cartItem = {
        title: product.title,
        category: product.category,
        price: product.price,
        count: count,
        images: product.images,
      };
      cart.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    this.cartSubject.next(this.getTotalCount()); 
    this.mixpanelService.trackEvent('AddToCart', { Title: product.title, Quantity: product.quantity });
  }
  getTotalPrice() {
    const cart = this.getCartItems();
    return cart.reduce((totalPrice:any, item:any) => totalPrice + item.price * item.count, 0);
  }
  clearCart() {
    localStorage.removeItem('cartItems');
    this.cartSubject.next(0); 
  }
  removeProductFromCart(product: any) {
    let cart = this.getCartItems();
    cart = cart.filter((item: any) => item.title !== product.title);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    this.cartSubject.next(this.getTotalCount()); 
  }
}
