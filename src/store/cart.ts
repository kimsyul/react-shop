import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import ProductList from "../components/products/ProductList";
import { productsList } from "./products";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

export const cartCount = selector<number>({
  key: "cartCount",
  get: ({ get }) => {
    const cartItems = get(cartState)?.items || {};
    return Object.keys(cartItems).reduce((acc: number, index: string) => {
      return acc + cartItems[index].count || 0;
    }, 0);
  },
});

export const cartTotal = selector<number>({
  key: "cartTotal",
  get: ({ get }) => {
    const products = get(productsList);
    const cartItems = get(cartState)?.items || {};
    return (
      Object.keys(cartItems).reduce((acc: number, id: string) => {
        return acc + cartItems[id].count * products[parseInt(id) - 1].price || 0;
      }, 0) || 0
    );
  },
});

export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const products = get(productsList);
    const cartItems = get(cartState)?.items;
    if (!cartItems) return [];

    return Object.keys(cartItems).flatMap((id) => {
      const item = cartItems[id];
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) return [];
      return [
        {
          id: item.id.toString(),
          image: product.image,
          title: product.title,
          count: item.count,
          price: item.count * product.price,
        },
      ];
    });
  },
});

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string) => {
  const tempCart = { ...cart };
  if (tempCart[id].count === 1) {
    delete tempCart[id];
    return tempCart;
  } else {
    return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
  }
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
