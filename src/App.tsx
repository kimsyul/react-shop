import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { useRef, useCallback } from "react";

const App = (): JSX.Element => {
  const $hamburger = useRef<HTMLInputElement>(null);

  const closeOverlay = useCallback(() => {
    $hamburger?.current?.click();
  }, []);

  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" ref={$hamburger} />
      <section className="drawer-content">
        <Nav />
        <section className="main mt-16">
          <Router />
        </section>
        <Footer />
      </section>
      <Drawer closeOverlay={closeOverlay} />
    </BrowserRouter>
  );
};

export default App;
