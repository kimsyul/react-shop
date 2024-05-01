import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import CartList from "./CartList";
import ProductsViewLoad from "../products/ProductsViewLoad";
import { useRecoilValueLoadable } from "recoil";
import { ICartItems, cartList, cartTotal } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";

const CartView = (): JSX.Element => {
  const cartLoadable = useRecoilValueLoadable<ICartItems[]>(cartList);
  const cartItems: ICartItems[] = "hasValue" === cartLoadable.state ? cartLoadable.contents : [];
  const totalPrice = useRecoilValueLoadable(cartTotal).contents || 0;

  if ("loading" === cartLoadable.state) {
    return <ProductsViewLoad />;
  }

  return (
    <>
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {cartItems.length <= 0 && (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        )}
        <div className="lg:flex justify-between mb-20">
          <div>
            {0 < cartItems.length
              ? cartItems.map((cart: ICartItems) => {
                  return <CartList key={cart.id} data={cart} />;
                })
              : ""}
          </div>
          <div className="self-start shrink-0 flex items-center mt-10 mb-20">
            <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(totalPrice)}</span>
            <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
              구매하기
            </label>
          </div>
        </div>
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
