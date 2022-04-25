import React from "react";
import Image from "next/image";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Seo from "../../components/Seo";
import Layout from "../../components/Layout";
import NextImage from "../../components/Image";

import { fetchAPI, getStrapiURL } from "../../lib/api";

const Article = ({ article, categories }) => {
    /*  declares SEO of the article */
    const seo = {
        metaTitle: article.attributes.title,
        metaDescription: article.attributes.description,
        shareImage: article.attributes.image,
        article: true,
    };

    return (
        <Layout categories={categories.data}>
            <Seo seo={seo} />

            <section className="customGridPost grid gap-10px grid-cols-[1fr] lg:gap-x-10px lg:gap-y-50px lg:grid-cols-[1fr,12fr,1fr] mx-5 lg:mx-[200px] my-auto py-5">
                <h1 className="text-slate-700 dark:text-slate-300 lg:grid-cols-1">
                    {article.attributes.title}
                </h1>

                {article.attributes.description && (
                    <blockquote className="bg-gray-100 dark:bg-gray-700 p-5 border-l-2 lg:border-l-4 border-solid border-blue-400 dark:border-yellow-400 w-full xl:w-6/12">
                        <p>{article.attributes.description}</p>
                    </blockquote>
                )}

                <div className="xl:max-w-2xl xl:h-full xl:relative xl:left-2/4 xl:-translate-x-2/4">
                    <NextImage image={article.attributes.image} />
                </div>

                <ReactMarkdown
                    components={{
                        p: ({ node, children }) => {
                            if (node.children[0].tagName === "img") {
                                const image = node.children[0];
                                return (
                                    <div className="image">
                                        <Image
                                            priority
                                            src={image.properties.src}
                                            alt={image.properties.alt}
                                            layout="responsive"
                                            objectFit="contain"
                                            width="600"
                                            height="300"
                                        />
                                    </div>
                                );
                            }
                            // Return default child if it's not an image
                            return (
                                <p className="text-md lg:text-xl text-justify">
                                    {children}
                                </p>
                            );
                        },
                    }}
                >
                    {article.attributes.content}
                </ReactMarkdown>

                <hr className="divide-y divide-solid w-24" />

                <p className="text-sm">
                    <Moment format="MMM Do YYYY">
                        {article.attributes.published_at}
                    </Moment>
                </p>
            </section>
        </Layout>
    );
};

/* the article’s path needs to be defined using its slug */
export async function getStaticPaths() {
    const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

    return {
        paths: articlesRes.data.map((article) => ({
            params: {
                slug: article.attributes.slug,
            },
        })),
        fallback: false,
    };
}

/* define the props & to fetch the date of the article and the categories */
export async function getStaticProps({ params }) {
    const articlesRes = await fetchAPI("/articles", {
        filters: {
            slug: params.slug,
        },
        populate: ["image", "category"],
    });
    const categoriesRes = await fetchAPI("/categories");

    return {
        props: { article: articlesRes.data[0], categories: categoriesRes },
        revalidate: 1,
    };
}

export default Article;
