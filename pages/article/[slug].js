import React from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Seo from "../../components/Seo";
import Layout from "../../components/Layout";

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
    /*  declares the image and SEO of the article */
    const imageUrl = getStrapiMedia(article.attributes.image);

    const seo = {
        metaTitle: article.attributes.title,
        metaDescription: article.attributes.description,
        shareImage: article.attributes.image,
        article: true,
    };

    return (
        <Layout categories={categories.data}>
            <Seo seo={seo} />
            <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={imageUrl}
                data-srcset={imageUrl}
                data-uk-img
            >
                <h1>{article.attributes.title}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <ReactMarkdown children={article.attributes.content} />
                    <hr className="uk-divider-small" />
                    <div
                        className="uk-grid-small uk-flex-left"
                        data-uk-grid="true"
                    >
                        <div className="uk-width-expand">
                            <p className="uk-text-meta uk-margin-remove-top">
                                <Moment format="MMM Do YYYY">
                                    {article.attributes.published_at}
                                </Moment>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
