import { BrowserRouter, Routes, Route } from "react-router-dom";

// Police Roboto
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Styles
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/modal.css";
import "./styles/products.css";
import "./styles/best_seller.css";
import "./styles/cards.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/admin.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import CardGestion from "./components/CardGestion";
import CategoryCardAdmin from "./components/CategoryCardAdmin";
import Modal from "./components/Modal";
import ModalCategory from "./components/ModalCategory";
import ModalProduct from "./components/ModalProduct";
import ModalDelete from "./components/ModalDelete";

// Pages
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGestion from "./pages/AdminGestion";
import AdminCategories from "./pages/AdminCategories";
import SearchResult from "./pages/SearchResult";
import NotFound from "./pages/NotFound";
import AdminMessages from "./pages/AdminMessages";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/categorie/:slug" element={<Category />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions" element={<MentionsLegales />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/gestion" element={<AdminGestion />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/recherche" element={<SearchResult />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          {/* Toujours en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
