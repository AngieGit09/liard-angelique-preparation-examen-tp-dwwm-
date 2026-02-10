import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/categorie/:slug" element={<Category />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mentions" element={<MentionsLegales />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
