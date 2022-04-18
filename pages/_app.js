import App from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import React, { createContext, useState, useEffect } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Loader from "../components/Loader";

import "../styles/globals.css";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
    const { global } = pageProps;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            <Head>
                <link
                    rel="shortcut icon"
                    href={getStrapiMedia(global.attributes.favicon)}
                />
            </Head>
            <GlobalContext.Provider value={global.attributes}>
                {loading ? <Loader /> : <Component {...pageProps} />}
            </GlobalContext.Provider>
        </>
    );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);
    // Fetch global site settings from Strapi
    const globalRes = await fetchAPI("/global", {
        populate: {
            favicon: "*",
            defaultSeo: {
                populate: "*",
            },
        },
    });
    // Pass the data to our page via props
    return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
