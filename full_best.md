# Gwen-Ha-Star / Admin Architecture & Project Structure

## Objectif du document

Ce document décrit la structure de la partie admin de Gwen-Ha-Star, ainsi que la logique globale du projet autour du site principal, du dashboard privé, du monitoring, et des services du réseau.

Il sert de référence :
- pour retrouver rapidement l’organisation du projet,
- pour guider le refactor de la partie admin,
- pour faciliter la reprise par un autre développeur,
- pour éviter de mélanger le site public avec le cockpit d’administration.

---

## Vue d’ensemble

Le projet est pensé en trois couches principales :

1. **Le site principal**
   - interface publique ou semi-publique,
   - pages visibles par les utilisateurs normaux,
   - contenu produit / vitrine / accès standard.

2. **Le cockpit admin**
   - espace réservé aux superusers,
   - gestion des utilisateurs,
   - supervision du serveur,
   - raccourcis vers les services,
   - intégration ou accès rapide au monitoring.

3. **Le monitoring spécialisé**
   - Uptime Kuma comme outil dédié,
   - supervision, alertes, historique,
   - page de statut,
   - vue de santé des services.

L’idée est de garder chaque couche bien séparée pour que le projet reste clair, robuste et simple à faire évoluer.

---

## Philosophie d’architecture

Le principe de base est simple :

- **public** pour le site principal,
- **admin** pour l’exploitation et la gestion,
- **monitoring** pour la supervision dédiée.

Cette séparation est importante parce qu’elle évite :
- les pages trop chargées,
- les responsabilités mélangées,
- les imports confus,
- les effets de bord entre les parties du projet,
- les refactors difficiles à maintenir.

Le dashboard admin ne doit pas devenir un copier-coller du monitoring.  
Le monitoring ne doit pas devenir un fourre-tout d’administration.  
Chaque outil doit garder son rôle.

---

## Structure cible

La structure recommandée est la suivante :

```txt
app/
  page.tsx
  login/
    page.tsx
  admin/
    page.tsx
    users/
      page.tsx
    monitoring/
      page.tsx
    services/
      page.tsx
    system/
      page.tsx
    settings/
      page.tsx
    _components/
    _actions/
    _lib/
```

### Rôle des dossiers

#### `app/`
Contient les routes publiques et le cœur du site principal.

#### `app/login/`
Contient l’authentification et les routes liées à la connexion.

#### `app/admin/`
Contient tout le cockpit réservé à l’administration.

#### `app/admin/users/`
Gestion des utilisateurs, rôles, permissions, invitations, profils.

#### `app/admin/monitoring/`
Vue admin de monitoring, avec accès à Kuma ou résumé de son état.

#### `app/admin/services/`
État et raccourcis vers les services du réseau :
- Ollama,
- Open WebUI,
- Jellyfin,
- Dashdot,
- Uptime Kuma,
- ttyd,
- Neko,
- Excalidraw,
- CyberChef,
- autres services internes.

#### `app/admin/system/`
Métriques et informations système :
- CPU,
- RAM,
- disque,
- uptime,
- réseau,
- charge,
- infos machine.

#### `app/admin/settings/`
Paramètres du cockpit admin :
- préférences d’affichage,
- configuration de base,
- options internes.

#### `app/admin/_components/`
Composants réutilisés uniquement dans l’admin.

#### `app/admin/_actions/`
Actions serveur, mutations, appels sécurisés, logique métier côté admin.

#### `app/admin/_lib/`
Helpers, utilitaires, fonctions locales, logique interne.

---

## Ce qui doit aller dans l’admin

Tout ce qui est lié à l’exploitation du serveur ou à la gestion du projet doit vivre dans `app/admin/`, notamment :

- dashboard admin,
- accès superuser,
- gestion des users,
- supervision du réseau,
- vue globale du serveur,
- cartes d’état,
- navigation rapide vers les outils,
- accès aux logs ou à des résumés système,
- liens internes,
- bloc monitoring.

L’objectif est que le cockpit admin soit la page de référence pour piloter le serveur et le projet.

---

## Ce qui doit rester hors admin

Tout ce qui est orienté utilisateur standard doit rester hors de la partie admin :

- home publique,
- login,
- pages produit,
- pages marketing,
- pages accessibles à tous,
- expérience utilisateur classique.

Si une page n’est pas spécifiquement réservée à l’exploitation, elle n’a probablement rien à faire dans `app/admin/`.

---

## Gestion de Kuma

Uptime Kuma reste un outil dédié au monitoring.

Le dashboard admin peut :
- montrer un résumé de Kuma,
- afficher un statut global,
- intégrer un bouton ou un lien direct,
- afficher une alerte si un service est down.

Mais Kuma lui-même doit rester l’outil de supervision principal, avec ses propres vues, checks, alertes et historique.

### Bon usage

- **Dashboard admin** = point d’entrée et cockpit.
- **Kuma** = supervision et statut.
- **Lien entre les deux** = résumé, redirection, widgets.

### Ce qu’il vaut mieux éviter

- dupliquer toute l’UI de Kuma dans le dashboard,
- réinventer la logique de monitoring,
- fusionner les responsabilités.

---

## Services du réseau

Le projet inclut plusieurs services Docker ou applicatifs internes.  
Le dashboard admin peut devenir le point central qui les regroupe.

Exemples de services déjà présents ou envisagés :

- Ollama,
- Open WebUI,
- Uptime Kuma,
- Dashdot,
- Jellyfin,
- ttyd,
- Excalidraw,
- CyberChef,
- Neko.

### Ce que le dashboard doit faire pour ces services

- afficher s’ils sont accessibles,
- fournir un accès rapide,
- montrer des infos utiles,
- donner une vue d’ensemble du stack,
- centraliser la navigation.

### Ce que le dashboard ne doit pas faire

- remplacer leur interface métier,
- dupliquer leur logique,
- casser leur autonomie.

Le cockpit admin est un hub, pas un clone.

---

## Authentification et accès

L’accès à la partie admin est protégé.

La logique attendue est la suivante :

1. L’utilisateur se connecte.
2. Son profil est chargé.
3. Son rôle est vérifié.
4. Si le rôle n’est pas `superuser`, l’accès est refusé ou redirigé.
5. Sinon, il accède au dashboard admin.

### Règles importantes

- La vérification du rôle doit se faire dès l’entrée dans la zone admin.
- Le site public ne doit pas dépendre de cette logique admin.
- Les composants admin ne doivent pas être rendus accessibles par accident.

---

## Migration depuis l’existant

Quand on refactor la partie admin, il est normal de déplacer les anciens éléments dans le bon dossier.

### À déplacer vers `app/admin/`

- anciennes pages de dashboard,
- widgets système,
- vues de monitoring,
- blocs réservés aux superusers,
- composants de gestion,
- raccourcis internes,
- pages d’état du serveur.

### À garder dans le site principal

- home,
- login,
- pages publiques,
- parcours utilisateur normal,
- routes non-admin.

Cette migration est volontaire : elle améliore la lisibilité et la maintenabilité.

---

## Convention de nommage

### Routes
- `page.tsx` pour une route.
- `layout.tsx` si un layout commun est nécessaire.

### Composants internes
- `*.tsx` dans `_components/`.

### Logique serveur
- `*.action.ts` dans `_actions/`.

### Helpers
- `*.ts` dans `_lib/`.

### Dossiers privés
- les dossiers commençant par `_` ne doivent pas générer de route.

---

## Organisation recommandée des responsabilités

### Site public
Contient :
- accueil,
- login,
- navigation publique,
- expérience standard.

### Admin
Contient :
- supervision,
- gestion des users,
- vue système,
- raccourcis vers les services,
- monitoring,
- réglages.

### Monitoring
Contient :
- Kuma,
- résumé de santé,
- alertes,
- page de statut,
- historique des incidents.

Cette répartition garde le projet lisible même quand il grandit.

---

## Structure de travail conseillée

Quand une nouvelle fonctionnalité apparaît, il faut se poser trois questions :

1. Est-ce visible par tout le monde ?
2. Est-ce réservé aux superusers ?
3. Est-ce du monitoring pur ?

### Réponse possible

- Si c’est public → `app/`.
- Si c’est admin → `app/admin/`.
- Si c’est du monitoring spécialisé → Kuma ou `app/admin/monitoring/`.

Cette règle simple aide à savoir où mettre chaque chose.

---

## Exemples de routes possibles

Voici une base d’URLs logique :

- `/` → page principale
- `/login` → authentification
- `/admin` → cockpit admin
- `/admin/users` → gestion des utilisateurs
- `/admin/services` → services du réseau
- `/admin/system` → infos machine
- `/admin/monitoring` → vue Kuma / supervision
- `/admin/settings` → paramètres du cockpit

---

## Exemples d’usage du dashboard admin

Le dashboard peut afficher :

- identité de l’utilisateur connecté,
- rôle et statut,
- état des principaux services,
- accès rapide à Jellyfin / Open WebUI / Kuma / Dashdot,
- métriques système,
- blocs de surveillance,
- raccourcis d’admin,
- alertes critiques,
- liens internes utiles,
- état général du réseau.

L’idée est de faire un cockpit utile au quotidien, pas juste une page décorative.

---

## Bonnes pratiques de maintenance

### À faire
- garder les responsabilités séparées,
- garder les composants proches de leur usage,
- documenter les nouvelles routes,
- éviter la duplication de logique,
- garder la zone admin cohérente.

### À éviter
- mélanger admin et public,
- réécrire Kuma dans le dashboard,
- importer de la logique admin dans le site principal,
- mettre des widgets partout sans structure,
- multiplier les chemins improvisés.

---

## Évolutions possibles

La zone admin pourra évoluer vers :

- une vraie page de supervision serveur,
- des cartes de status plus détaillées,
- une vue réseau plus riche,
- des actions rapides sur les containers,
- des infos de santé avancées,
- une page de monitoring dédiée,
- des sections par machine ou par service,
- une interface de maintenance plus poussée.

Cette architecture est pensée pour rester simple aujourd’hui et extensible demain.

---

## Intention finale du projet

### Gwen-Ha-Star
Le projet principal.

### `app/admin`
Le cockpit privé.

### Uptime Kuma
Le monitoring spécialisé.

### Docker / services internes
Le réseau de services à piloter depuis l’admin.

### Séparation claire
La base d’un projet propre, maintenable et facile à reprendre.

---

## Rappel pour les contributeurs

Si vous travaillez sur ce projet :

- respectez la séparation public/admin,
- ne mélangez pas le monitoring et la gestion,
- gardez les composants administratifs dans `app/admin/`,
- documentez les nouvelles routes et sections,
- évitez les dépendances croisées inutiles.

Le but est de conserver un système lisible, robuste et agréable à faire évoluer.