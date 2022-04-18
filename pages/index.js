import React from "react";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage, global }) => {
    return (
        <Layout categories={categories}>
            <Seo seo={homepage.attributes.seo} />
            {/* show an icon instead of texts */}
            <div data-src={global.attributes.favicon} />

            <div className="lg:mx-[10%] lg:py-12">
                <h1 className="text-slate-700 dark:text-slate-300 text-center lg:py-8">
                    {homepage.attributes.hero.title}
                </h1>
                <Articles articles={articles} />
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
