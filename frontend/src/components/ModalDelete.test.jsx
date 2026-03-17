// ===== TEST COMPONENT MODAL DELETE =====
// Vérifie le bon fonctionnement de la modale de suppression
// Ici, on teste que l’action de confirmation déclenche bien la fonction attendue

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ModalDelete from "./ModalDelete";

describe("ModalDelete", () => {
  it("appelle onConfirm quand on clique sur confirmer", () => {
    // Mock de la fonction onConfirm
    const onConfirm = vi.fn();

    render(
      <ModalDelete isOpen={true} onClose={() => {}} onConfirm={onConfirm} />,
    );

    // Sélection du bouton "Confirmer"
    const button = screen.getByText("Confirmer");

    // Simulation du clic utilisateur
    fireEvent.click(button);

    // Vérifie que la fonction a bien été appelée
    expect(onConfirm).toHaveBeenCalled();
  });
});
