import { Outlet } from "react-router-dom";
import AppHeader from "../components/header";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <main className="App d-flex flex-column min-vh-100">
      <AppHeader />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
