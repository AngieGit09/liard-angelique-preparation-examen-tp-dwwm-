// ===== PAGE ADMIN - GESTION DES MESSAGES =====
// Permet d'accéder aux messages reçus

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ModalDelete from "../components/ModalDelete";
import {
  getAdminMessages,
  deleteAdminMessage,
} from "../services/messages.service";

function AdminMessages() {
  // Liste des messages récupérés depuis le backend
  const [messages, setMessages] = useState([]);
  // Gestion de la modale de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Chargement des messages au montage du composant
  useEffect(() => {
    getAdminMessages().then(setMessages);
  }, []);

  // Suppression d’un message (appel API + mise à jour du state)
  const handleDelete = async () => {
    await deleteAdminMessage(messageToDelete);

    // Met à jour la liste sans recharger la page
    setMessages((prev) => prev.filter((m) => m.id !== messageToDelete));

    // Reset de la modale
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Navigation retour vers le dashboard admin */}
        <Link to="/admin">Retour vers le dashboard</Link>
      </div>

      <h1 className="text-center mb-5">Messages reçus</h1>

      {/* Cas où aucun message */}
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
            {/* Formatage de la date pour affichage FR */}
            {new Date(msg.created_at).toLocaleDateString("fr-FR")}
          </p>

          <p>{msg.message}</p>

          <div className="d-flex gap-3 mt-3">
            {/* Ouvre le client mail avec l'adresse du message */}
            <a
              href={`mailto:${msg.email}?subject=Réponse à votre message`}
              className="btn btn-primary"
            >
              Répondre
            </a>

            {/* Prépare la suppression avec confirmation */}
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

      {/* Modale de confirmation avant suppression */}
      <ModalDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default AdminMessages;
