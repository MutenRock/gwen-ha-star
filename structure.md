# Gwen-Ha-Star / Admin Structure

## Objectif

Ce projet sépare clairement :

- le **site principal** de Gwen-Ha-Star,
- la **zone admin** réservée aux superusers,
- les outils de **monitoring** comme Uptime Kuma,
- les composants liés à la gestion interne du serveur et des utilisateurs.

L’idée est de garder le cœur du projet propre, lisible et maintenable, tout en ayant un cockpit d’administration dédié.

---

## Principe général

Le dossier `app/` contient le site public et les routes principales.

La partie admin doit être isolée dans un sous-dossier dédié, par exemple :

```txt
app/
  page.tsx
  login/
  admin/
    page.tsx
    users/
    monitoring/
    services/
```

Cela permet de séparer clairement :
- les pages publiques,
- les pages privées,
- les outils d’administration,
- les vues de monitoring.

---

## Règles de structure

### 1. Le site principal reste dans `app/`

Tout ce qui concerne l’expérience utilisateur classique doit rester dans le flux principal du projet :
- home,
- login,
- pages publiques,
- parcours standard de l’application.

### 2. La zone admin vit dans `app/admin/`

Tout ce qui est réservé à l’administration doit aller dans `app/admin/` :
- dashboard admin,
- gestion des utilisateurs,
- supervision des services,
- raccourcis internes,
- vues réservées aux superusers.

### 3. Uptime Kuma reste un outil séparé

Kuma n’est pas recopié dans le dashboard.

Le dashboard admin peut :
- afficher un résumé,
- proposer un lien rapide,
- intégrer un bloc de statut,
- rediriger vers une vue dédiée.

Mais Kuma reste le service de monitoring à part entière.

### 4. Les fichiers non routables doivent rester privés

Pour les composants, actions et helpers utilisés uniquement par l’admin, on peut utiliser des dossiers privés :

```txt
app/admin/_components/
app/admin/_actions/
app/admin/_lib/
```

Les dossiers commençant par `_` ne doivent pas créer de routes.

---

## Structure recommandée

Exemple de structure cible :

```txt
app/
  page.tsx
  login/
    page.tsx
  admin/
    page.tsx
    monitoring/
      page.tsx
    users/
      page.tsx
    services/
      page.tsx
    _components/
    _actions/
    _lib/
```

---

## Ce qu’il faut déplacer

Quand on refactor la partie admin, on peut déplacer ici :
- les anciennes pages de dashboard,
- les composants de supervision,
- les vues liées aux stats serveur,
- les écrans réservés aux superusers,
- les raccourcis internes,
- les blocs de monitoring.

Tout ce qui n’est pas utile au public ne doit pas rester mélangé avec le site principal.

---

## Ce qu’il faut garder séparé

À laisser en dehors de l’admin :
- les pages publiques,
- le login,
- les pages marketing ou produit,
- les routes utilisateurs classiques,
- tout code partagé qui n’a pas de lien direct avec l’admin.

---

## Authentification

L’accès à l’admin doit rester protégé.

Principe actuel :
- l’utilisateur se connecte,
- le rôle est vérifié dans `profiles`,
- si le rôle n’est pas `superuser`, redirection hors de l’admin,
- sinon accès au dashboard.

Cette logique doit rester au niveau de la zone admin, pas dans le site public.

---

## Convention de nommage

### Pages
- `page.tsx` pour les routes.
- `layout.tsx` si un layout commun est nécessaire.

### Composants internes
- `*.tsx` dans `_components/`.

### Actions serveur
- `*.action.ts` dans `_actions/`.

### Schémas
- `*.schema.ts` si besoin pour Zod ou validation.

---

## Philosophie du projet

Le site principal = produit.

La zone admin = cockpit privé.

Kuma = monitoring spécialisé.

Le but n’est pas de tout mélanger dans une seule page, mais de garder :
- un frontend clair,
- un admin maintenable,
- un monitoring dédié,
- une architecture facile à faire évoluer.

---

## Notes pour les autres devs

Si tu bosses sur la partie admin :
- ne mets pas de logique admin dans les routes publiques,
- ne duplique pas Kuma dans le dashboard,
- garde les composants spécifiques à la feature près de la feature,
- documente chaque nouvelle route admin,
- évite les imports croisés inutiles entre public et admin.

Si un nouveau besoin admin apparaît, la première question à se poser est :
**est-ce une feature du site principal, ou une feature du cockpit privé ?**

Si c’est du cockpit privé, ça va dans `app/admin/`.