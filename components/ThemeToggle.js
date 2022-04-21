import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const ThemeToggle = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <SunIcon
                    className="w-6 h-6 text-yellow-500 transition ease-in-out duration-300 hover:pointer hover:text-yellow-200"
                    role="button"
                    onClick={() => setTheme("light")}
                />
            );
        } else {
            return (
                <MoonIcon
                    className="w-6 h-6 text-slate-500 transition ease-in-out duration-300 hover:pointer hover:text-blue-500"
                    role="button"
                    onClick={() => setTheme("dark")}
                />
            );
        }
    };

    return <div>{renderThemeChanger()}</div>;
};

export default ThemeToggle;
