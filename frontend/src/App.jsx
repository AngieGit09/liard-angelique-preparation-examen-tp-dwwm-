import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="my-4">
        <Router />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
