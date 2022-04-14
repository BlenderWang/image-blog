import React from "react";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage, global }) => {
    return (
        <Layout categories={categories}>
            <Seo seo={homepage.attributes.seo} />
            <div data-src={global.attributes.favicon} />
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1 className="text-blue-500">
                        {homepage.attributes.hero.title}
                    </h1>
                    <Articles articles={articles} />
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    // Run API calls in parallel
    const [articlesRes, categoriesRes, homepageRes, globalRes] =
        await Promise.all([
            fetchAPI("/articles", { populate: ["image", "category"] }),
            fetchAPI("/categories", { populate: "*" }),
            fetchAPI("/homepage", {
                populate: {
                    hero: "*",
                    seo: { populate: "*" },
                },
            }),
            fetchAPI("/global", {
                populate: {
                    favicon: "*",
                },
            }),
        ]);

    return {
        props: {
            articles: articlesRes.data,
            categories: categoriesRes.data,
            homepage: homepageRes.data,
            global: globalRes.data,
        },
        revalidate: 1,
    };
}

export default Home;
