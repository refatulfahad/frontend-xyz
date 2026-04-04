export class SignUpModel {
    name: string;
    email: string;
    password: string;
    constructor(){
      this.name = "";
      this.email= "";
      this.password= "";
    }
  }

  export class LoginModel {
    email: string;
    password: string;
    constructor(){
      this.email= "";
      this.password= "";
    }
  }

  export interface CartItem {
    id: number;
    title: string;
    price: number;
    count: number;
    category?: string;
    images?: string[];
  }

  export interface CartStore {
    cartCount: number;
    totalPrice: number;
    cartItems: CartItem[];
  }

  export interface Product {
    id: number;
    name?: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
  }

  export interface ProductsResponse {
    products: Product[];
    total: number;
  }

  export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  }

  export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    id_token?: string;
  }
  