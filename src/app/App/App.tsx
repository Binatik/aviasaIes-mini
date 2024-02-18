import { Logo } from "../../ui/Logo/Logo";
import { useTheme } from "../../hooks/useTheme";
import { AviasalesPage } from "../../page/Aviasales/Aviasales";
import "normalize.css";
import "./App.scss";
import { useState } from "react";

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
        <AviasalesPage />
      </main>
    </>
  );
};

export default App;
