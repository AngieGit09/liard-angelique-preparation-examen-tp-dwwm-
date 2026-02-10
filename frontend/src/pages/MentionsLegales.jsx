function MentionsLegales() {
  return (
    <section className="container py-5">
      {/* Titre principal */}
      <h1 className="text-center mb-5">Mentions légales</h1>

      {/* Introduction */}
      <p className="mb-4">
        Conformément aux dispositions des articles 6-III et 19 de la loi pour la
        Confiance dans l’Économie Numérique, il est porté à la connaissance des
        utilisateurs du site les présentes mentions légales. La connexion et la
        navigation sur le site impliquent l’acceptation intégrale et sans
        réserve des présentes mentions légales.
      </p>

      {/* Éditeur */}
      <h2 className="h5 text-start mb-3">Éditeur du site</h2>
      <p className="mb-4">
        Le site RénoMeuble est édité par Emma et Lucas, entreprise spécialisée
        dans la rénovation de meubles d’occasion, dont le siège social est situé
        au 5 Avenue du Mont-Blanc, 69000 Lyon. Adresse email :
        renomeuble@mail.fr Téléphone : 06 22 45 86 75
      </p>

      {/* Hébergeur */}
      <h2 className="h5 text-start mb-3">Hébergeur</h2>
      <p className="mb-4">
        Le site est hébergé par un prestataire d’hébergement web dont les
        infrastructures sont situées en Europe et conformes aux réglementations
        en vigueur relatives à la protection des données.
      </p>

      {/* Contenu */}
      <h2 className="h5 text-start mb-3">Contenu du site</h2>
      <p className="mb-4">
        Le contenu du site (textes, images, graphismes, logo, etc.) est protégé
        par les lois en vigueur relatives à la propriété intellectuelle. Toute
        reproduction, distribution, modification ou utilisation de ces contenus
        sans autorisation préalable est strictement interdite.
      </p>

      {/* Création */}
      <h2 className="h5 text-start mb-3">Création et développement</h2>
      <p className="mb-4">
        La conception et le développement du site ont été réalisés par l’équipe
        RénoMeuble dans le cadre de la mise en place de sa plateforme de
        présentation et de vente de mobilier rénové.
      </p>

      {/* Données personnelles */}
      <h2 className="h5 text-start mb-3">Données personnelles</h2>
      <p>
        Les informations personnelles collectées sur le site sont utilisées
        uniquement dans le cadre de la relation commerciale avec les
        utilisateurs et ne sont en aucun cas cédées à des tiers. Conformément à
        la réglementation en vigueur, l’utilisateur dispose d’un droit d’accès,
        de rectification et de suppression de ses données personnelles sur
        simple demande.
      </p>
    </section>
  );
}

export default MentionsLegales;
