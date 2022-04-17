import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* eslint-disable-next-line */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Staatliches"
                    />
                </Head>
                <body className="bg-white dark:bg-slate-800 dark:text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
