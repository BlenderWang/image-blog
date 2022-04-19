import React, { useState } from "react";
import Link from "next/link";

import Hamburger from "./Hamburger";
import ThemeToggle from "./ThemeToggle";

const Nav = ({ categories }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <>
            <nav className="flex lg:justify-between items-center lg:space-x-4 px-5 lg:mx-[10%] lg:mt-5 xl:mx-[3%]">
                <>
                    <ul className="lg:px-3 py-12 text-slate-700 dark:text-white font-medium hover:text-purple-500 dark:hover:text-blue-400 transition ease-in-out duration-300 active:text-grey-300 dark:active:text-grey-100">
                        <li>
                            <Link href="/">
                                <a>{`Shirley Wang`}</a>
                            </Link>
                        </li>
                    </ul>
                </>

                <Hamburger onClick={handleToggle} />

                <>
                    <ul
                        className={
                            navbarOpen
                                ? "bg-white dark:bg-slate-700 absolute w-full h-screen top-0 left-0 z-10 flex flex-col justify-evenly items-center opacity-100 transition duration-300 ease"
                                : "hidden lg:flex opacity-0 lg:opacity-100"
                        }
                    >
                        {categories.map((category) => {
                            return (
                                <li key={category.id} className="lg:mx-3">
                                    <Link
                                        href={`/category/${category.attributes.slug}`}
                                    >
                                        <a className="uppercase hover:text-purple-500 hover:underline-offset-4 dark:text-white dark:hover:text-blue-400 transition ease-in-out duration-300 active:text-grey-300">
                                            {category.attributes.name}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </>
            </nav>
        </>
    );
};

export default Nav;
