function Contact() {
  return (
    <section className="container py-5">
      {/* H1 */}
      <h1 className="text-center mb-5">Les informations utiles</h1>

      {/* ==== INFOS ==== */}
      <div className="row justify-content-between align-items-start text-center text-md-start g-4 mb-5">
        {/* Adresse */}
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

        {/* Map */}
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

      {/* === CONTACT === */}
      <div className="text-center mb-4">
        <h2 className="h4 fw-semibold mb-3">Nous contacter</h2>

        <p>
          Vous êtes à la recherche de bien pour votre intérieur ou vous voulez
          céder un de vos biens, nous sommes là pour vous n'hésitez pas à
          prendre contact avec nous.
        </p>
      </div>

      {/* ==== FORMULAIRE === */}
      <div
        className="mx-auto p-4 rounded"
        style={{ backgroundColor: "var(--bs-secondary)", maxWidth: "900px" }}
      >
        <h2 className="text-center h5 mb-4">Nous écrire</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre nom"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre prénom"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Téléphone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre numéro de téléphone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Votre adresse mail"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Catégorie</label>
            <select className="form-select">
              <option>J’ai un produit à vendre</option>
              <option>Je souhaite acheter</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Votre message"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button className="btn btn-primary px-5 py-3 rounded-pill text-uppercase">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
