import { Logo } from "../../ui/Logo/Logo";
import { Button } from "../../ui/Button/Button";
import { useTheme } from "../../hooks/useTheme";
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
        <div className="box__container">
          <div className="box__sort">
            <Button mode="primary" wide type="active" disabled>
              Самый дешевый
            </Button>
            <Button mode="primary" wide>
              Самый быстрый
            </Button>
            <Button mode="primary" wide>
              Оптимальный
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
