import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ModalDelete from "./ModalDelete";

describe("ModalDelete", () => {
  it("appelle onConfirm quand on clique sur confirmer", () => {
    const onConfirm = vi.fn();

    render(
      <ModalDelete isOpen={true} onClose={() => {}} onConfirm={onConfirm} />,
    );

    const button = screen.getByText("Confirmer");

    fireEvent.click(button);

    expect(onConfirm).toHaveBeenCalled();
  });
});
