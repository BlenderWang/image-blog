import React from "react";
import Link from "next/link";

import Hamburger from "./Hamburger";

const Nav = ({ categories }) => {
    return (
        <div>
            <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link href="/">
                                <a>{`Shirley Wang`}</a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <Hamburger />

                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        {categories.map((category) => {
                            return (
                                <li key={category.id}>
                                    <Link
                                        href={`/category/${category.attributes.slug}`}
                                    >
                                        <a className="uk-link-reset">
                                            {category.attributes.name}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
