# CV interactif

Une seule direction : feuille blanche, palette bleu-gris et présentation de CV. Le portfolio existant garde son entrée et ses styles. Aucune dépendance ajoutée.

## Prévisualisation

```sh
npm run dev -- --host 127.0.0.1 --port 5174
```

Ouvrir `/cv/`. Le bandeau de travail a été retiré : la page commence directement par le CV. Le choix FR/EN et le téléchargement du PDF français se trouvent sous le sommaire latéral sur ordinateur, et dans le sommaire repliable sur mobile. Les anciennes URL `?direction=papier`, `?direction=editorial` et `?direction=technique` redirigent vers la présentation unique, sans perdre les éventuels liens vers des fiches.

Les fiches de poste, de projet et de certificat sont adressables par URL. Exemple : `/cv/?experience=orisha-lead&projet=cicd`. Le bouton précédent du navigateur, Échap et la navigation clavier sont pris en charge.

Le sélecteur FR/EN traduit l'interface, les expériences, les projets, les sources et les formations. La langue est partageable par URL (`?lang=en`), prioritaire sur la préférence mémorisée localement. Le changement conserve la recherche, les filtres, la page des projets et la rubrique de la fiche ouverte. La langue HTML, le titre et la description de page sont actualisés. Le CV PDF original demeure français ; les documents justificatifs ne sont pas modifiés.

## Structure

- Profil, portrait recadré en CSS et coordonnées avec pictogrammes. OVHcloud est indiqué comme employeur courant depuis le 1er septembre 2026. Aucune proposition de services ni disponibilité commerciale.
- Expériences regroupées par employeur. Orisha présente deux postes reliés par une chronologie ; les fiches permettent de passer de l'un à l'autre.
- Dix projets personnels, trois projets Epitech et un projet École 89, séparés des projets d'entreprise. Les projets non publiés peuvent être ajoutés sans URL.
- Catalogue de projets avec une seule recherche bilingue insensible à la casse et aux accents (nom, description, école, technologies), puis pagination par quatre. Le tri `updated_at` GitHub décroissant reste automatique et n'ajoute pas de contrôle à comprendre. Les dates ont été vérifiées le 31 août 2026 et ne se synchronisent pas automatiquement. `updated_at` est la date de mise à jour du dépôt, pas `pushed_at` ni la date du dernier commit. Le CV web non publié n'hérite pas artificiellement de la date de son dépôt : il reste identifié comme prototype local, après les projets datés. Les projets scolaires affichent discrètement le logo Epitech ou École 89 devant le titre ; les projets personnels n'ont pas de libellé répétitif.
- Compétences associées automatiquement aux données des expériences et projets renseignés. Un clic affiche les sources et distingue pratique professionnelle, README, langage principal GitHub et déclaration dans le CV. Aucun niveau de maîtrise n'est déduit. Un filtre conserve les deux étapes de l'évolution chez Orisha.
- Formation, Learning Expedition et galerie photo.
- Six certificats HackerRank avec petites vignettes, agrandissement et accès aux PDF originaux.
- Sommaire mobile repliable, sans bandeau horizontal débordant.
- Fiches centrées, avec en-tête employeur/poste/dates et rubriques stables : vue d'ensemble, missions, projets ; contexte, résultat et technologies pour un projet professionnel. La pagination adaptative reste à l'intérieur de chaque rubrique, sans mêler des contenus de nature différente. Un paragraphe trop long est réparti intégralement sur plusieurs pages, sans réduire la police ni couper le texte. Les certificats et projets personnels gardent des fiches classiques avec sections explicites.

## Contenu et ressources

Le CV français fourni est daté du 20 février 2026 et identique à `public/CV.pdf`. Thomas a actualisé son parcours en septembre 2026 : Yunohit s'est terminé le 31 août 2026 et son poste de développeur logiciel chez OVHcloud, dans l'équipe Public Cloud Integration, a commencé le 1er septembre 2026. La période freelance passée reste une expérience historique.

Les PDF HackerRank ont été récupérés depuis le commit `1fc224efd5bdcbeb8c880e79932e1bcd84062dd9`, et leurs noms, dates et identifiants ont été vérifiés sur les pages rendues. Les aperçus PNG dans `public/cv/certificates/` sont dérivés de ces originaux, chargés à la demande du défilement. Les PDF originaux font environ 7,3 Mo chacun et ne sont chargés que lorsqu'un lien est ouvert.

Les logos Orisha et HackerRank viennent du commit `76cadd828756837196faa6ceee71e9d6393261ad`, Epitech et École 89 du commit `746c9037ada9f9eee8b86fea8bf806e75b1f2f9b`. La photo et le logo Yunohit étaient déjà présents. Le logo Reemo provient de https://reemo.io/assets/reemo.svg (géométrie conservée, métadonnées Adobe retirées). L'activité indépendante utilise un pictogramme générique de mallette. Le verrouillage horizontal OVHcloud provient de la médiathèque officielle ; il est affiché sans modification, avec une largeur minimale de 120 px et masqué dans les fiches trop étroites plutôt que réduit sous cette limite.

Les anciens visuels de projets du modèle tiers conservé dans l'historique ne sont pas attribués à Thomas. Les dépôts publics de Bxota ont été consultés le 31 août 2026. Les sujets GitHub identifient les trois projets Epitech et MovieShowTracker pour l'École 89. Les README de plants, env-guard et System-Monitor précisent leur stack ; pour les autres dépôts, seul le langage principal vérifié est repris. Il s'agit d'un instantané éditorial local : aucune synchronisation automatique avec GitHub ni requête API lors de la consultation. Les descriptions de projets sans README restent volontairement courtes.

Ajouter d'autres projets d'école dans `independentProjects` avec `context: 'École'` et leur établissement dans `school`. `url` est facultatif. `evidence` et `evidenceUrl` permettent de documenter la provenance des technologies sans attribuer des compétences non vérifiées.

## Photos de Cotonou

Quatre photos fournies par Thomas sont intégrées : délégation Epitech, visite de l'ASIN, conférence à Cotonou et vue de Cotonou au coucher du soleil. Elles peuvent être agrandies, parcourues avec les flèches et fermées avec Échap. Les légendes et textes alternatifs sont traduits en anglais.

La galerie sert des WebP responsive : 480, 960 et 1440 px pour les trois grandes photos, et 450 px pour la photo de délégation dont c'est la définition d'origine. Le navigateur choisit la variante adaptée à l'écran grâce à `srcset` ; les dimensions déclarées évitent les décalages de mise en page. L'ensemble public pèse environ 780 Ko, contre 9,2 Mo pour les JPEG d'origine.

Les fichiers publics ne contiennent ni EXIF ni coordonnées GPS. Les JPEG d'origine sont préservés localement dans `assets/cv-source/cotonou/` ; ce dossier est ignoré par Git afin qu'ils ne soient ni versionnés ni déployés.

## Organisation et validation

- `src/cv/data.ts` : expériences, groupes d'employeurs, projets, certifications, photos.
- `src/cv/CvApp.vue` : page et navigation des fiches.
- `src/cv/ExperienceList.vue` : employeurs et évolutions internes.
- `src/cv/ExperiencePages.vue` et `ExperienceBlock.vue` : pagination adaptative des fiches.
- `src/cv/ProjectBrowser.vue` : recherche, filtres, tri et pagination des projets.
- `src/cv/github-dates.ts` : instantané des dates `updated_at` des dépôts sélectionnés.
- `src/cv/i18n.ts` et `translations.en.ts` : langue partagée, formatage des dates et traduction anglaise.
- `src/cv/skills.ts` : association des compétences aux sources et normalisation des noms.
- `src/cv/TravelGallery.vue` : galerie et aperçu local.
- `src/cv/dialog.ts` : boucle de focus clavier.
- `src/cv/cv.css` : feuille responsive, corps de lecture 16–17 px, réduction des animations.

`npm run build` vérifie TypeScript puis produit le portfolio et `dist/cv/index.html`. Contrôles navigateur effectués à 320×568, 390×844, 768×1024, 1024×720, 1440×900, 844×390 et 568×320 : absence de débordement, visibilité intégrale du contenu de chaque page des cinq postes et de quatre projets professionnels, menu repliable, sources des compétences, projets GitHub, certificats et focus clavier.

La dernière passe couvre ces sept formats en français et en anglais : chaque onglet et chaque page des fiches contrôlées, conservation du texte lors du découpage, tri chronologique, 14 projets sans doublon, recherche sans accents, cas sans résultat, réinitialisation, conservation d'état au changement de langue, préférence mémorisée, liens profonds et navigation clavier des onglets. Les éléments de mesure invisibles et inertes sont exclus de la boucle de focus.

Le prototype reste en `noindex, nofollow`, ce qui n'est pas une protection d'accès. Rien n'a été publié. La homepage propose désormais un bouton « CV interactif » vers `/cv/`. La suppression des derniers outils de travail sera traitée après validation.
