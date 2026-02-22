// PAGE ADMIN - GESTION DES MESSAGES
// Version simple avec modale suppression

import { useEffect, useState } from "react";
import ModalDelete from "../components/ModalDelete";

function AdminMessages() {
  // STATES

  const [messages, setMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // CHARGEMENT DES MESSAGES

  useEffect(() => {
    fetch("http://localhost/renomeuble/backend/api/admin/messages/index.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // SUPPRESSION MESSAGE

  const deleteMessage = async () => {
    const formData = new FormData();
    formData.append("id", messageToDelete);

    await fetch(
      "http://localhost/renomeuble/backend/api/admin/messages/delete.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    // Mise à jour locale du state
    setMessages((prev) => prev.filter((m) => m.id !== messageToDelete));

    // Fermeture modale
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  // RENDER

  return (
    <section className="container py-5">
      <h1 className="mb-5 text-center">Messages reçus</h1>

      {/* Liste des messages */}
      {messages.length === 0 && (
        <p className="text-center">Aucun message reçu.</p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="p-4 mb-4 rounded shadow-sm"
          style={{ backgroundColor: "var(--bs-secondary)" }}
        >
          <h5>
            {msg.prenom} {msg.nom}
          </h5>

          <p>
            <strong>Email :</strong> {msg.email}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date(msg.created_at).toLocaleDateString("fr-FR")}
          </p>

          <p>{msg.message}</p>

          <div className="d-flex gap-3 mt-3">
            {/* Répondre via mailto */}
            <a
              href={`mailto:${msg.email}?subject=Réponse à votre message`}
              className="btn btn-primary"
            >
              Répondre
            </a>

            {/* Supprimer (ouvre modale) */}
            <button
              className="btn btn-danger"
              onClick={() => {
                setMessageToDelete(msg.id);
                setShowDeleteModal(true);
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}

      {/* ===== MODALE CONFIRMATIO ===== */}

      <ModalDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteMessage}
      />
    </section>
  );
}

export default AdminMessages;
