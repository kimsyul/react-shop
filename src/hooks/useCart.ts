import { useSetRecoilState } from "recoil";
import { cartState } from "../store/cart";

const useAddToCart = () => {
  const setCart = useSetRecoilState(cartState);

  return (id: string) => {
    setCart((oldCartState) => {
      const newItems = { ...oldCartState.items };
      if (newItems[id]) {
        newItems[id] = { ...newItems[id], count: newItems[id].count + 1 };
      } else {
        newItems[id] = { id: parseInt(id), count: 1 };
      }
      return { ...oldCartState, items: newItems };
    });
  };
};

const useRemoveFromCart = () => {
  const setCart = useSetRecoilState(cartState);

  return (id: string) => {
    setCart((oldCartState) => {
      const newItems = { ...oldCartState.items };
      if (newItems[id] && newItems[id].count > 1) {
        newItems[id] = { ...newItems[id], count: newItems[id].count - 1 };
      } else {
        delete newItems[id];
      }
      return { ...oldCartState, items: newItems };
    });
  };
};

export { useAddToCart, useRemoveFromCart };
