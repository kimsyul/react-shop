import BreadCrumb from "../components/common/Breadcrumb";
import ItemList from "../components/common/ItemList";
import { MENUS } from "../constants/category";

const Digital = (): JSX.Element => {
  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.DIGITAL} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemList title="디지털" limit={8} />
      </article>
    </section>
  );
};

export default Digital;
