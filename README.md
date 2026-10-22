# Portfolio de Tahiry Ramambazafy

Site statique réalisé avec Astro. Le contenu du profil, des projets, des expériences et des compétences se modifie dans `src/data/portfolio.js`.

## Démarrer en local

```sh
npm install
npm run dev
```

## Générer le site

```sh
npm run build
```

Le CV téléchargeable est servi depuis `public/cv-tahiry-ramambazafy.pdf`.

Les couvertures des projets sont générées depuis la première page de leurs PDF :

```sh
npm run covers
```

L'image de partage pour LinkedIn, X et autres réseaux se régénère avec :

```sh
npm run og
```

Le résultat est écrit dans `public/og-image.jpg` (1200 × 627 px, JPEG), donc servi à l'adresse `/og-image.jpg`. Les balises Open Graph et Twitter Card sont déclarées dans `src/pages/index.astro`.
