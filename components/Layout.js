import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children, categories, seo }) => (
    <>
        <Nav categories={categories} />
        {children}
        <Footer />
    </>
);

export default Layout;
