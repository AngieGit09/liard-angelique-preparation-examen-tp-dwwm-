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

    expect(screen.getByText("120,00 €")).toBeDefined();
  });
});
