import React from "react";

const Hamburger = ({ onClick }) => {
    return (
        <div
            className="space-y-2 z-20 absolute right-5 top-12"
            onClick={onClick}
        >
            <span className="block lg:invisible w-8 h-0.5 bg-gray-600 dark:bg-white"></span>
            <span className="block lg:invisible w-5 h-0.5 bg-gray-600 dark:bg-white"></span>
        </div>
    );
};

export default Hamburger;
