import React from "react";

const Hamburger = () => {
    return (
        <div className="space-y-2 absolute right-8">
            <span className="block lg:invisible w-8 h-0.5 bg-gray-600"></span>
            <span className="block lg:invisible w-5 h-0.5 bg-gray-600"></span>
        </div>
    );
};

export default Hamburger;
