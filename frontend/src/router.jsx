import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGestion from "./pages/AdminGestion";
import AdminCategories from "./pages/AdminCategories";
import AdminMessages from "./pages/AdminMessages";
import SearchResult from "./pages/SearchResult";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/categorie/:slug" element={<Category />} />
      <Route path="/produit/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/politique-confidentialite"
        element={<PolitiqueConfidentialite />}
      />
      <Route path="/mentions" element={<MentionsLegales />} />
      <Route path="/cgu" element={<CGU />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/gestion" element={<AdminGestion />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/messages" element={<AdminMessages />} />

      {/* Auth */}
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Search */}
      <Route path="/recherche" element={<SearchResult />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
