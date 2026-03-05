import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ModalDelete from "../components/ModalDelete";
import {
  getAdminMessages,
  deleteAdminMessage,
} from "../services/messages.service";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // chargement messages
  useEffect(() => {
    getAdminMessages().then(setMessages);
  }, []);

  // suppression message
  const handleDelete = async () => {
    await deleteAdminMessage(messageToDelete);

    setMessages((prev) => prev.filter((m) => m.id !== messageToDelete));

    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin">Retour vers le dashboard</Link>
      </div>

      <h1 className="text-center mb-5">Messages reçus</h1>

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
            <a
              href={`mailto:${msg.email}?subject=Réponse à votre message`}
              className="btn btn-primary"
            >
              Répondre
            </a>

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

      <ModalDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default AdminMessages;
