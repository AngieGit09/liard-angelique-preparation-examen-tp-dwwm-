import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CategoryCard from "./CategoryCard";

describe("CategoryCard", () => {
  it("affiche le titre de la catégorie", () => {
    render(
      <BrowserRouter>
        <CategoryCard
          title="Meubles vintage"
          image="/test.jpg"
          link="/categorie/vintage"
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Meubles vintage")).toBeDefined();
  });
});
