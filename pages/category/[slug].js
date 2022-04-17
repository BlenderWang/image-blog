import Seo from "../../components/Seo";
import Layout from "../../components/Layout";
import Articles from "../../components/Articles";

import { fetchAPI } from "../../lib/api";

const Category = ({ category, categories }) => {
    const seo = {
        metaTitle: category.attributes.name,
        metaDescription: `All ${category.attributes.name} articles`,
    };

    return (
        <Layout categories={categories.data}>
            <Seo seo={seo} />
            <section className="lg:mx-[10%] lg:py-12">
                <h1 className="text-slate-700 dark:text-slate-300 text-center lg:py-8">
                    {category.attributes.name}
                </h1>
                <Articles articles={category.attributes.articles.data} />
            </section>
        </Layout>
    );
};

export async function getStaticPaths() {
    const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

    return {
        paths: categoriesRes.data.map((category) => ({
            params: {
                slug: category.attributes.slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const matchingCategories = await fetchAPI("/categories", {
        filters: { slug: params.slug },
        populate: {
            articles: {
                populate: "*",
            },
        },
    });
    const allCategories = await fetchAPI("/categories");

    return {
        props: {
            category: matchingCategories.data[0],
            categories: allCategories,
        },
        revalidate: 1,
    };
}

export default Category;
