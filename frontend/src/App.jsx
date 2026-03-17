import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./router";

function App() {
  return (
    // BrowserRouter active la navigation entre les pages sans rechargement
    <BrowserRouter>
      <Header />

      <main className="my-4">
        {/* Affiche les pages définies dans le système de routes */}
        <Router />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
