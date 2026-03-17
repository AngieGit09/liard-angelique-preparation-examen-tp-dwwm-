// ===== TEST COMPONENT CATEGORY CARD =====
// Vérifie que le composant affiche correctement les informations de base.
// Ici, on teste que le titre de la catégorie est bien rendu.

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CategoryCard from "./CategoryCard";

describe("CategoryCard", () => {
  it("affiche le titre de la catégorie", () => {
    render(
      // BrowserRouter nécessaire car le composant utilise Link
      <BrowserRouter>
        <CategoryCard
          title="Meubles vintage"
          image="/test.jpg"
          link="/categorie/vintage"
        />
      </BrowserRouter>,
    );

    // Vérifie que le titre est présent dans le DOM
    expect(screen.getByText("Meubles vintage")).toBeDefined();
  });
});
