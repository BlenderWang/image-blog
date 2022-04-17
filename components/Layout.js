import Nav from "./Nav";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout = ({ children, categories, seo }) => (
    <>
        <Nav categories={categories} />
        {children}
        <Footer />
        <ScrollToTopButton />
    </>
);

export default Layout;
