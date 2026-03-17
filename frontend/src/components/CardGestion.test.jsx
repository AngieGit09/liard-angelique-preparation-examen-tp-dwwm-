// ===== TEST COMPONENT CARD GESTION =====
// Vérifie que les informations du produit sont correctement affichées.
// Ici, on teste le formatage du prix en euros.

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardGestion from "./CardGestion";

describe("CardGestion", () => {
  it("affiche le prix formaté en euros", () => {
    const product = {
      title: "Chaise vintage",
      category: "Chaise",
      price: 120,
      description: "Chaise ancienne",
      date: "2024",
      image: null,
      photosCount: 2,
    };

    render(
      <CardGestion product={product} onDelete={() => {}} onEdit={() => {}} />,
    );

    // Vérifie que le prix est bien formaté (ex: 120,00 €)
    expect(screen.getByText("120,00 €")).toBeDefined();
  });
});
