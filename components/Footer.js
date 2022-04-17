import React from "react";

const Footer = () => {
    return (
        <footer className="flex justify-center items-center pb-12 dark:text-slate-300">
            <small>&copy; Shirley Wang {new Date().getFullYear()}</small>
        </footer>
    );
};

export default Footer;
