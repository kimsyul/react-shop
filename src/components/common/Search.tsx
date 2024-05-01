import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { IProduct, productsList } from "../../store/products";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import CONSTANTS from "../../constants/constants";

const Search = () => {
  const navigate = useNavigate();
  const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const products: IProduct[] = "hasValue" === ProductsLoadable.state ? ProductsLoadable.contents : [];
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [filterItems, setFilterItems] = useState(products);
  const $search = useRef<HTMLInputElement>(null);
  const $searchedItem = ".js-searchedItem";

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);
  }, []);

  const goLink = useCallback(
    (id: number) => {
      setSearch("");
      navigate(`/product/${id}`);
    },
    [products],
  );

  const goSearchList = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const $target = event.target as HTMLLIElement;
      const $next = $target.nextElementSibling as HTMLLIElement;
      if (CONSTANTS.KEY.ARROW_DOWN === event.key) {
        event.preventDefault();
        if (null === $next || null === $next.querySelector($searchedItem)) {
          return;
        }
        ($next.querySelector($searchedItem) as HTMLButtonElement).focus();
      } else if (CONSTANTS.KEY.ENTER === event.key) {
        event.preventDefault();
        $next && $next.click();
      }
    },
    [products],
  );

  const changeTarget = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const $target = event.target as HTMLLIElement;
      if (CONSTANTS.KEY.ARROW_UP === event.key) {
        event.preventDefault();
        const $prev = ($target.parentElement as HTMLLIElement).previousElementSibling;
        if (null === $prev) {
          $search?.current?.focus();
          return;
        }
        ($prev.querySelector($searchedItem) as HTMLButtonElement).focus();
      } else if (CONSTANTS.KEY.ARROW_DOWN === event.key) {
        event.preventDefault();
        const $next = ($target.parentElement as HTMLLIElement).nextElementSibling;
        if (!$next) {
          return;
        }
        ($next.querySelector($searchedItem) as HTMLButtonElement).focus();
      }
    },
    [products],
  );

  const toggleSearch = () => {
    $search?.current?.classList.toggle("-z-10");
    $search?.current?.classList.toggle("translate-y-full");
    $search?.current?.classList.toggle("!opacity-100");
    $search?.current?.blur();
    setSearch("");
    setFilterItems([]);
  };

  useEffect(() => {
    if (products.length <= 0) {
      return;
    }
    setFilterItems(
      products.filter((product) => {
        if ("" === search) {
          return;
        }
        return product.title.toLowerCase().includes(search.toLowerCase());
      }),
    );
  }, [search, products]);

  useEffect(() => {
    if ("hasValue" === ProductsLoadable.state) {
      setDisabled(false);
    }
  }, [ProductsLoadable.state]);

  return (
    <div className="dropdown">
      <button
        type="button"
        onClick={toggleSearch}
        className="flex sm:hidden w-10 sm:w-auto mx-0 sm:mx-2 sm:px-2 btn-ghost js-search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-gray-700 dark:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="검색"
        disabled={disabled}
        ref={$search}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={goSearchList}
        className="fixed left-0 top-4 -z-10 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded-sm"
      />
      <ul className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-hidden">
        {filterItems.map((product) => {
          return (
            <li key={product.id}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  goLink(product.id);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  goLink(product.id);
                }}
                onKeyDown={changeTarget}
                className="text-left js-searchedItem"
              >
                <span className="text-gray-600 dark:text-white line-clamp-2">{product.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
