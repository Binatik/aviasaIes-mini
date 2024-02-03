import { Logo } from "../../ui/Logo/Logo";
import "normalize.css";
import "./App.scss";

const App = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo mode="primary" href="../" />
      </div>
    </header>
  );
};

export default App;
