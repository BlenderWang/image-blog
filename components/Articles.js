import React from "react";
import Card from "./Card";

const Articles = ({ articles }) => {
    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 lg:gap-2 md:gap-1 lg:w-[1024px] xl:w-[1560px] mx-auto space-y-3 pb-28">
                <>
                    {articles.map((article, i) => {
                        return (
                            <Card
                                article={article}
                                key={`${article.attributes.slug}`}
                            />
                        );
                    })}
                </>
            </div>
        </>
    );
};

export default Articles;
