import React, { useState } from "react";
import Link from "next/link";

import Hamburger from "./Hamburger";

const Nav = ({ categories }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <>
            <nav className="flex lg:justify-between items-center lg:space-x-4 px-5 lg:mx-[10%] lg:mt-5">
                <>
                    <ul className="lg:px-3 py-12 text-slate-700 font-medium hover:text-blue-300 hover:underline-offset-4 transition ease-in-out duration-300 active:text-grey-300">
                        <li>
                            <Link href="/">
                                <a>{`Shirley Wang`}</a>
                            </Link>
                        </li>
                    </ul>
                </>

                <Hamburger onClick={handleToggle} />

                <>
                    <ul className={navbarOpen ? "showNavbar" : "hideNavbar"}>
                        {categories.map((category) => {
                            return (
                                <li key={category.id} className="lg:mx-3">
                                    <Link
                                        href={`/category/${category.attributes.slug}`}
                                    >
                                        <a className="hover:text-blue-300 hover:underline-offset-4 transition ease-in-out duration-300 active:text-grey-300">
                                            {category.attributes.name}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </>
            </nav>
        </>
    );
};

export default Nav;
