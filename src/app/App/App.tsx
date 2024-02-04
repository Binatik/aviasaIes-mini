import { Logo } from "../../ui/Logo/Logo";
import { useTheme } from "../../hooks/useTheme";
import { Aviasales } from "../../module/AviasaIes/Aviasales";
import "normalize.css";
import "./App.scss";

const App = () => {
  useTheme();

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Logo mode="primary" href="../" />
        </div>
      </header>
      <main>
        <Aviasales />
      </main>
    </>
  );
};

export default App;
