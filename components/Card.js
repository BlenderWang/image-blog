import React from "react";
import Link from "next/link";
import NextImage from "./Image";

const Card = ({ article }) => {
    return (
        <Link href={`/article/${article.attributes.slug}`}>
            <a className="hover:underline-offset-4 transition ease-in-out duration-300">
                <div className="break-inside-avoid relative transform opacity-100">
                    <div className="">
                        <NextImage image={article.attributes.image} />
                    </div>

                    <div className="invisible lg:visible absolute inset-0 flex flex-col justify-center items-center transition duration-200 ease-in opacity-0 hover:opacity-100">
                        <div className="absolute inset-0 bg-slate-900 opacity-50"></div>

                        <p id="category" className="text-xl text-yellow-100">
                            {article.attributes.category.data.attributes.name}
                        </p>

                        <p id="title" className="text-3xl text-white">
                            {article.attributes.title}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;
