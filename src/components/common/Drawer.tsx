import { Link } from "react-router-dom";
import { MENUS } from "../../constants/category";

interface IDrawer {
  readonly closeOverlay: () => void;
}

const Drawer = ({ closeOverlay }: IDrawer): JSX.Element => {
  const { HOME, ...menuItems } = MENUS;
  const menus = Object.entries(menuItems).map(([name, title]) => ({ name: name.toLowerCase(), title }));

  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        {menus.map((menu) => {
          return (
            <li key={menu.name}>
              <Link
                to={`/${menu.name}`}
                onClick={closeOverlay}
                className="text-gray-700 active:!text-white dark:!text-white"
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Drawer;
