import ItemList from "../components/common/ItemList";
import Slider from "../components/common/Slider";
import { MENUS } from "../constants/category";

const Index = (): JSX.Element => {
  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <ItemList title={MENUS.FASHION} scroll={true} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <ItemList title={MENUS.ACCESSORY} scroll={true} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemList title={MENUS.ACCESSORY} scroll={true} />
      </section>
    </>
  );
};

export default Index;
