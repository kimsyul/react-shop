import { Link } from "react-router-dom";
import { ICartItems } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useAddToCart, useRemoveFromCart } from "../../hooks/useCart";

type TCartItems = {
  data: ICartItems;
} & typeof defaultProps;

const defaultProps = {
  data: {},
};

const CartList = ({ data }: TCartItems): JSX.Element => {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  return (
    <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
      <Link to={`/product/${data.id}`}>
        <figure className="W-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
          <img src={data.image} alt={data.title} className="object-contain w-full h-48" />
        </figure>
      </Link>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          <Link to={`/product/${data.id}`} className="link link-hover">
            {data.title}
          </Link>
        </h2>
        <p className="mt-2 mb-4 text-3xl">
          {" "}
          {toCurrencyFormat(data.price)} <span className="text-2xl">({toCurrencyFormat(data.price / data.count)})</span>
        </p>
        <div className="card-actions">
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => removeFromCart(data.id)}>
              -
            </button>
            <button className="btn bnt-ghost no-animation">{data.count}</button>
            <button className="btn btn-primary" onClick={() => addToCart(data.id)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  ); /* 카트 리스트 화면을 구성 해보세요. */
};

export default CartList;
