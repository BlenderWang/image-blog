import { useEffect, useState } from "react";

function useDarkMode() {
    const [theme, setTheme] = useState(
        typeof window !== "undefined" ? localStorage.theme : "light"
    );

    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }
    }, [colorTheme, theme]);

    /* returning colorTheme and setTheme in order to be able to access and edit the theme */
    return [colorTheme, setTheme];
}

export default useDarkMode;
