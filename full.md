# Gwen-Ha-Star / Admin Architecture

## Vision générale

Ce projet est organisé autour de deux grandes zones :

- le **site principal** de Gwen-Ha-Star,
- le **cockpit admin** réservé aux superusers.

L’objectif est de garder le produit principal propre et lisible, tout en ayant une base solide pour l’administration, le monitoring, la gestion des utilisateurs et les accès rapides aux services du réseau.

La partie admin ne doit pas être mélangée avec l’expérience utilisateur standard. Elle vit dans une zone dédiée, avec ses propres routes, ses propres composants, et sa propre logique métier.

---

## Philosophie d’architecture

Le projet suit un principe simple :

- **public** pour tout ce qui est visible par les utilisateurs normaux,
- **admin** pour tout ce qui est réservé à l’exploitation, à la supervision et à la gestion,
- **monitoring externe** pour les outils spécialisés comme Uptime Kuma.

Cette séparation évite :
- les pages trop chargées,
- les imports confus,
- la duplication de logique,
- les effets de bord entre le produit public et la partie admin.

L’admin est un module à part entière, pas un simple sous-bloc du site principal.

---

## Structure recommandée

La structure cible est la suivante :

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
    system/
      page.tsx
    _components/
    _actions/
    _lib/
```

### Rôle des dossiers

- `app/` : site principal, routes publiques et expérience standard.
- `app/login/` : authentification.
- `app/admin/` : cockpit admin réservé.
- `app/admin/monitoring/` : accès dédié à la supervision et à Kuma.
- `app/admin/users/` : gestion des utilisateurs et rôles.
- `app/admin/services/` : raccourcis et état des services du réseau.
- `app/admin/system/` : métriques serveur et état machine.
- `app/admin/_components/` : composants internes à l’admin.
- `app/admin/_actions/` : actions serveur et mutations admin.
- `app/admin/_lib/` : helpers, utils et logique locale.

---

## Ce qui va dans l’admin

Tout ce qui est réservé au superuser doit aller dans `app/admin/`, notamment :

- dashboard admin,
- gestion des utilisateurs,
- édition des rôles,
- état du serveur,
- accès aux services internes,
- résumé d’Uptime Kuma,
- liens vers les outils du réseau,
- cartes de supervision,
- widgets techniques.

L’idée est que l’admin soit le point d’entrée opérationnel du serveur.

---

## Ce qui reste hors admin

Doit rester en dehors de l’admin :

- la home publique,
- les pages marketing ou produit,
- le login,
- les pages utilisateur normales,
- tout ce qui est commun à tous les visiteurs.

Si une page n’est pas spécifique à l’exploitation du système, elle n’a probablement rien à faire dans `app/admin/`.

---

## Gestion de Kuma

Uptime Kuma est utilisé comme **outil spécialisé de monitoring**.

Il ne doit pas être réimplémenté dans le dashboard admin.

Le bon usage est :
- afficher dans l’admin un résumé ou un lien vers Kuma,
- garder Kuma comme interface dédiée à la supervision,
- laisser Kuma gérer ses checks, son historique, ses alertes et sa page de statut.

Le dashboard admin sert à orchestrer, pas à dupliquer Kuma.

---

## Gestion réseau et services

Le cockpit admin peut intégrer une vue sur les services du réseau, par exemple :

- Ollama,
- Open WebUI,
- Uptime Kuma,
- Dashdot,
- Jellyfin,
- ttyd,
- Excalidraw,
- CyberChef,
- Neko.

Le but n’est pas de refaire chaque outil, mais d’offrir un espace central pour :
- voir leur état,
- ouvrir rapidement leur interface,
- accéder aux infos utiles,
- garder un point d’administration unique.

---

## Authentification et permissions

L’accès à `app/admin/` doit être protégé.

Principe attendu :
1. l’utilisateur se connecte,
2. son profil est chargé,
3. son rôle est vérifié,
4. si le rôle n’est pas `superuser`, accès refusé ou redirection,
5. sinon, accès au dashboard admin.

La vérification de rôle doit être appliquée dès l’entrée dans la zone admin, et non dispersée dans chaque sous-page.

---

## Déplacement de l’existant

Quand on isole la partie admin, il est normal de déplacer les anciens éléments admin vers le nouveau dossier.

À déplacer si nécessaire :
- anciennes pages dashboard,
- widgets système,
- composants liés au monitoring,
- UI de gestion des users,
- raccourcis internes,
- blocs d’état des services.

À conserver côté public :
- pages utilisateur,
- login,
- home,
- pages produit.

Cette migration est volontaire : elle permet de stabiliser la structure du projet avant d’ajouter de nouvelles fonctionnalités.

---

## Convention de nommage

### Routes
- `page.tsx` pour les routes.
- `layout.tsx` si un layout commun est utile.

### Composants internes
- `*.tsx` dans `_components/`.

### Logique serveur
- `*.action.ts` dans `_actions/`.

### Helpers et utils
- `*.ts` dans `_lib/`.

### Dossiers privés
- les dossiers commençant par `_` ne doivent pas créer de route.

---

## Règle pratique de maintenance

Si tu hésites à placer un fichier, pose-toi cette question :

**est-ce que ce code sert au site public ou au cockpit admin ?**

- Si c’est public, il reste hors `app/admin/`.
- Si c’est réservé à l’exploitation, il va dans `app/admin/`.

Cette règle évite 90 % des mélanges inutiles.

---

## Évolutions futures

La zone admin peut évoluer vers :

- un panneau de configuration plus riche,
- une vue globale du serveur,
- des actions rapides sur les services,
- une supervision avancée,
- des liens dynamiques selon l’état du réseau,
- une page dédiée au monitoring distant,
- des vues par machine ou par service.

Le but est de construire une base simple maintenant, mais extensible plus tard.

---

## Résumé d’intention

- **Gwen-Ha-Star** = produit principal.
- **`/admin`** = cockpit privé.
- **Kuma** = monitoring spécialisé.
- **Services réseau** = accès rapide depuis l’admin.
- **Séparation nette** = code plus propre, maintenance plus simple.

---

## Note pour les contributeurs

Si tu modifies la partie admin :
- respecte la séparation public/admin,
- n’ajoute pas de logique admin dans les routes publiques,
- garde les composants proches de leur usage,
- documente les nouvelles sous-routes,
- évite les dépendances croisées inutiles entre le site principal et le cockpit.

L’objectif est que l’admin reste un module clair, robuste et facile à faire évoluer.