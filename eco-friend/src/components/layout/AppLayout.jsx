import Header from "./Header";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;