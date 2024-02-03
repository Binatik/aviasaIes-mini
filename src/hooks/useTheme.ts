import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useTheme() {
  const [theme, setTheme] = useState(Cookies.get("theme") || "light");

  useEffect(() => {
    Cookies.set("theme", theme, { expires: 60000 });
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export { useTheme };
