import { Link, useParams } from "react-router-dom";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilValueLoadable } from "recoil";
import { useAddToCart } from "../../hooks/useCart";
import { IProduct, productsList } from "../../store/products";
import ProductsViewLoad from "./ProductsViewLoad";
import BreadCrumb from "../common/Breadcrumb";
import Rating from "../common/Rating";

const ProductView = (): JSX.Element => {
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const products: IProduct[] = "hasValue" === ProductsLoadable.state ? ProductsLoadable.contents : [];
  const productParam = useParams();
  const product: IProduct = products.find((item) => productParam.id === item.id.toString())!;
  const addToCart = useAddToCart();

  if ("loading" === ProductsLoadable.state) {
    return <ProductsViewLoad />;
  }
  return (
    <div>
      <BreadCrumb category={product.category} crumb={product.title} />
      <div className="lg:flex lg:item-center mt-6 md:mt-14 px-2 lg:px-0">
        <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
          <img src={product.image} alt={product.title} className="object-contain w-full h-72" />
        </figure>
        <div className="card-body px-1 lg:px-12">
          <h2 className="card-title">
            {product.title}
            <span className="badge badge-accent ml-2">NEW</span>
          </h2>
          <p>{product.description}</p>
          <Rating rate={product?.rating?.rate} count={product?.rating?.count} />
          <p className="mt-2 mb-4 text-3xl">{toCurrencyFormat(product.price)}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => addToCart(product.id?.toString())}>
              장바구니에 담기
            </button>
            <Link to="/cart" className="btn btn-outline ml-1">
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
