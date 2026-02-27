// ========= PAGE POLITIQUE DE CONFIDENTIALITE =========
// Page expliquant la collecte et le traitement des données personnelles
// conformément au Règlement Général sur la Protection des Données (RGPD).

function PolitiqueConfidentialite() {
  return (
    <section className="container py-5">
      {/* Titre principal */}
      <h1 className="text-center mb-5">Politique de confidentialité</h1>

      {/* Introduction */}
      <p className="mb-4">
        La présente politique de confidentialité a pour objectif d’informer les
        utilisateurs du site RénoMeuble sur la manière dont leurs données
        personnelles sont collectées, utilisées et protégées lors de leur
        navigation sur le site.
      </p>

      {/* Données collectées */}
      <h2 className="h5 text-start mb-3">Données collectées</h2>
      <p className="mb-4">
        Lors de l’utilisation du formulaire de contact, les informations
        suivantes peuvent être collectées :
        <br />
        – Adresse email
        <br />– Message transmis par l’utilisateur
      </p>

      {/* Finalité */}
      <h2 className="h5 text-start mb-3">Finalité du traitement</h2>
      <p className="mb-4">
        Les données collectées sont utilisées uniquement afin de répondre aux
        demandes envoyées via le formulaire de contact et assurer le suivi des
        échanges avec les utilisateurs.
      </p>

      {/* Base légale */}
      <h2 className="h5 text-start mb-3">Base légale</h2>
      <p className="mb-4">
        Le traitement des données repose sur le consentement de l’utilisateur,
        exprimé lors de l’envoi du formulaire de contact.
      </p>

      {/* Durée conservation */}
      <h2 className="h5 text-start mb-3">Durée de conservation</h2>
      <p className="mb-4">
        Les données personnelles sont conservées pour une durée maximale de 12
        mois à compter du dernier échange, sauf obligation légale contraire.
      </p>

      {/* Destinataires */}
      <h2 className="h5 text-start mb-3">Destinataires des données</h2>
      <p className="mb-4">
        Les données collectées sont exclusivement destinées à l’équipe
        RénoMeuble et ne sont en aucun cas vendues, échangées ou transmises à
        des tiers.
      </p>

      {/* Sécurité */}
      <h2 className="h5 text-start mb-3">Sécurité des données</h2>
      <p className="mb-4">
        RénoMeuble met en œuvre les mesures techniques et organisationnelles
        nécessaires afin d’assurer la sécurité et la confidentialité des données
        personnelles contre toute perte, accès non autorisé ou divulgation.
      </p>

      {/* Droits utilisateurs */}
      <h2 className="h5 text-start mb-3">Droits des utilisateurs</h2>
      <p className="mb-4">
        Conformément au RGPD, chaque utilisateur dispose d’un droit d’accès, de
        rectification, de suppression et d’opposition concernant ses données
        personnelles. Ces droits peuvent être exercés en contactant :
        <br />
        <a href="mailto:renomeuble@mail.fr">renomeuble@mail.fr</a>
      </p>

      {/* Cookies */}
      <h2 className="h5 text-start mb-3">Cookies</h2>
      <p>
        Le site RénoMeuble peut utiliser des cookies techniques nécessaires au
        bon fonctionnement du site. Aucun cookie publicitaire ou de suivi
        statistique n’est utilisé sans le consentement préalable de
        l’utilisateur.
      </p>
    </section>
  );
}

export default PolitiqueConfidentialite;
