import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { IProduct, productsList } from "../../store/products";
import { MENUS } from "../../constants/category";
import ProductsLoad from "../products/ProductsLoad";
import ProductList from "../products/ProductList";

type TItemsProps = {
  title?: string;
  limit?: number;
  data?: Array<IProduct>;
  scroll?: boolean;
} & typeof defaultProps;

const defaultProps = {
  title: "",
  limit: 4,
  data: [],
  scroll: false,
};

const ItemList = ({ title, limit, scroll }: TItemsProps): JSX.Element => {
  const ProductList = React.lazy(() => import("../products/ProductList"));
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  let products: IProduct[] = "hasValue" === ProductsLoadable.state ? ProductsLoadable.contents : [];
  switch (title) {
    case MENUS.FASHION:
      products = products
        .filter((item) => item.category === "men's clothing" || item.category === "women's clothing")
        .slice(0, limit);
      break;
    case MENUS.ACCESSORY:
      products = products.filter((item) => item.category === "jewelery").slice(0, limit);
      break;
    case MENUS.DIGITAL:
      products = products.filter((item) => item.category === "electronics").slice(0, limit);
      break;
    default:
      products = products;
      break;
  }
  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll={scroll}>
        <Suspense fallback={<ProductsLoad limit={limit} />}>
          <ProductList products={products} limit={limit} />
        </Suspense>
      </div>
    </>
  );
};

ItemList.defaultProps = defaultProps;

export default ItemList;
