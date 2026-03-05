// ========= PAGE CONTACT =========
// Page de contact permettant à l'utilisateur d'envoyer un message via un formulaire.
// Les données sont envoyées à l'API backend et un retour visuel (succès/erreur)
// est affiché selon le résultat de la requête.

import { useState } from "react";
import { sendMessage } from "../services/messages.service";

function Contact() {
  // Etat du formulaire (inputs contrôlés)
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    phone: "",
    category: "J’ai un produit à vendre",
    message: "",
    consent: false,
  });

  // Etats d'interface pour la gestion de l'envoi
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  // Mise à jour générique des champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendMessage(formData);

      setStatus("success");

      setFormData({
        name: "",
        firstname: "",
        email: "",
        phone: "",
        category: "J’ai un produit à vendre",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section className="container py-5">
      {/* Titre principal */}
      <h1 className="text-center mb-5">Les informations utiles</h1>

      {/* ==== INFORMATIONS BOUTIQUE ==== */}
      <div className="row justify-content-between align-items-start text-center text-md-start g-4 mb-5">
        <div className="col-12 col-md-4">
          <h2 className="h4 fw-semibold mb-3">
            Pour venir nous rendre visite et nous contacter :
          </h2>

          <p className="mb-0">
            RénoMeuble <br />
            Nous c'est : Emma et Lucas <br />
            Téléphone : 06 22 45 86 75 <br />
            Adresse mail : renomeuble@mail.fr <br />
            Adresse postale : 5 Avenue du Mont-Blanc <br />
            69000 LYON
          </p>
        </div>

        {/* Google Maps */}
        <div className="col-12 col-md-4">
          <div className="ratio ratio-4x3">
            <iframe
              src="https://www.google.com/maps?q=5+Avenue+du+Mont-Blanc+Lyon&output=embed"
              loading="lazy"
              style={{ border: 0 }}
              title="Carte localisation"
            ></iframe>
          </div>
        </div>

        {/* Horaires */}
        <div className="col-12 col-md-4 text-md-end">
          <h2 className="h4 fw-semibold mb-3">Horaires de notre boutique :</h2>

          <p className="mb-0">
            Lundi 9H00-12H30 14H00-19H00 <br />
            Mardi 9H00-12H30 14H00-19H00 <br />
            Mercredi 9H00-12H30 14H00-19H00 <br />
            Jeudi 9H00-12H30 14H00-19H00 <br />
            Vendredi 9H00-12H30 14H00-19H00 <br />
            Samedi 9H00-19H00 NON STOP <br />
            Dimanche FERMÉ
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="text-center mb-4">
        <h2 className="h4 fw-semibold mb-3">Nous contacter</h2>

        <p>
          Vous êtes à la recherche de bien pour votre intérieur ou vous voulez
          céder un de vos biens, nous sommes là pour vous n'hésitez pas à
          prendre contact avec nous.
        </p>
      </div>

      {/* ==== FORMULAIRE ==== */}
      <div
        className="mx-auto p-4 rounded"
        style={{ backgroundColor: "var(--bs-secondary)", maxWidth: "900px" }}
      >
        <h2 className="text-center h5 mb-4">Nous écrire</h2>

        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Prénom */}
          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              placeholder="Votre prénom"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Téléphone */}
          <div className="mb-3">
            <label className="form-label">Téléphone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Votre numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Votre adresse mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Catégorie */}
          <div className="mb-3">
            <label className="form-label">Catégorie</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option>J’ai un produit à vendre</option>
              <option>Je souhaite acheter</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* RGPD */}
          <div className="form-check mb-4">
            <input
              type="checkbox"
              name="consent"
              className="form-check-input"
              checked={formData.consent}
              onChange={handleChange}
              required
              id="consent"
            />

            <label className="form-check-label" htmlFor="consent">
              J’accepte la{" "}
              <a
                href="/politique-confidentialite"
                target="_blank"
                rel="noopener noreferrer"
              >
                politique de confidentialité
              </a>
            </label>
          </div>

          {/* Bouton */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-5 py-3 rounded-pill text-uppercase"
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>

          {/* Messages */}
          {status === "success" && (
            <p className="text-center mt-3">Message envoyé avec succès !</p>
          )}

          {status === "error" && (
            <p className="text-danger text-center mt-3">
              Une erreur est survenue.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
