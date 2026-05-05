# Gwen ha Star — Guide d'ajout de features

## Ajouter un nouveau service au hub

### 1. Ajouter le service dans `app/star/page.tsx`

Dans le tableau `services`, ajoute une entrée :
```typescript
{
  id: 'mon-service',           // identifiant unique
  title: 'Mon Service',        // nom affiché
  description: 'Description',  // sous-titre
  icon: IconName,              // icône depuis lucide-react
  color: '#hexcolor',          // couleur accent
  href: '/mon-service',        // URL de destination
  role: 'all',                 // 'all' ou 'superuser'
}
```

Importe l'icône en haut du fichier :
```typescript
import { IconName } from 'lucide-react'
```

### 2. Ajouter le reverse proxy dans Nginx

Dans `/etc/nginx/sites-available/nitro`, ajoute un bloc :
```nginx
location /mon-service {
    proxy_pass http://localhost:PORT;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Recharge Nginx :
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 3. Créer la page dans Next.js (optionnel)

Si tu veux une page dédiée avec header Gwen ha Star :
```bash
mkdir -p ~/gwen-ha-star/app/star/mon-service
# Créer page.tsx avec iframe ou contenu custom
```

### 4. Lancer le service via Docker (optionnel)

Dans `~/docker/docker-compose.yml` :
```yaml
  mon-service:
    image: image/docker:latest
    container_name: mon-service
    restart: unless-stopped
    ports:
      - "PORT:PORT"
```
```bash
docker compose -f ~/docker/docker-compose.yml up -d mon-service
```

### 5. Rebuilder et redémarrer
```bash
cd ~/gwen-ha-star && npm run build && sudo systemctl restart gwen-ha-star
```

---

## Services actuels

| Service | Port | Docker | Rôle |
|---|---|---|---|
| Next.js (portail) | 3000 | Non | all |
| Jellyfin | 8096 | Oui | all |
| Uptime Kuma | 3001 | Oui | all |
| Dashdot | 3002 | Oui | superuser |
| Ollama | 11434 | Non | all |
| Neko | 3003 | Oui | all |
| Sunshine | 47990 | Non | superuser |
| Filebrowser | 8080 | Non | all |

---

## Ajouter un titre débloquable

Dans Supabase → SQL Editor :
```sql
insert into titles (slug, label_fr, label_en, description_fr, description_en, category, rarity)
values ('mon-titre', 'Mon Titre', 'My Title', 'Description FR', 'Description EN', 'gaming', 'rare');
```

Raretés disponibles : `common`, `rare`, `epic`, `legendary`

Pour débloquer un titre à un user :
```sql
insert into profile_titles (profile_id, title_slug)
values ('UUID_DU_USER', 'mon-titre');
```

---

## Variables d'environnement

Fichier : `~/gwen-ha-star/.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

## Commandes utiles
```bash
# Voir tous les services actifs
sudo systemctl status gwen-ha-star cloudflared nginx
docker ps

# Logs du portail
journalctl -u gwen-ha-star -f

# Logs Sunshine
cat /tmp/sunshine.log

# Rebuild après modif
cd ~/gwen-ha-star && npm run build && sudo systemctl restart gwen-ha-star

# Profils CPU
alias perf='sudo system76-power profile performance'
alias bal='sudo system76-power profile balanced'
alias batt='sudo system76-power profile battery'
```
