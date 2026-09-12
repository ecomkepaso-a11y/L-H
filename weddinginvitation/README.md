# L&H — Site d'Invitation de Mariage

Site d'invitation pour le mariage de **Larry Chanelle & Hermann**, 11 & 12 Décembre 2026, Yaoundé, Cameroun.

- `frontend/` — Application React (Vite + Tailwind CSS v4 + lucide-react icons)
- `backend/` — API Node.js/Express qui envoie les confirmations RSVP par email (Gmail SMTP via Nodemailer)

---

## 1. Installer et lancer le projet

### Backend (API + envoi d'emails)

```bash
cd backend
npm install
cp .env.example .env
```

Ouvrez `backend/.env` et renseignez :

- `GMAIL_USER` — l'adresse Gmail qui **enverra** les emails
- `GMAIL_APP_PASSWORD` — un **mot de passe d'application** Gmail (pas votre mot de passe normal)
- `RSVP_RECIPIENT_EMAIL` — déjà réglé sur `princefootball020@gmail.com`

**Comment créer un mot de passe d'application Gmail :**
1. Activez la validation en 2 étapes sur le compte Gmail : https://myaccount.google.com/security
2. Allez sur https://myaccount.google.com/apppasswords
3. Créez un mot de passe d'application (type "Mail"), copiez le code à 16 caractères
4. Collez-le dans `GMAIL_APP_PASSWORD` (sans espaces)

Puis démarrez le serveur :

```bash
npm run dev
```

Le serveur tourne sur `http://localhost:4000`.

### Frontend (site web)

Dans un **autre terminal** :

```bash
cd frontend
npm install
npm run dev
```

Le site est disponible sur `http://localhost:5173`. En développement, les appels vers `/api/...` sont automatiquement redirigés vers le backend (voir `frontend/vite.config.js`).

### Vos photos

Vos photos de couple sont déjà intégrées :
- `frontend/public/images/gallery/` — toutes les photos affichées dans la section **Galerie** (avec visualiseur plein écran au clic) et dans "Notre Histoire".
- `frontend/public/images/quotes/` — les 2 photos utilisées dans les grandes citations pleine page juste après l'accueil.
- `frontend/public/images/events/traditional.jpg` — la photo affichée sur la carte "Mariage Traditionnel".
- La photo en silhouette (`gallery/couple-11.jpg`) est utilisée en fond de la section d'accueil.

Pour changer une photo, remplacez le fichier correspondant (gardez le même nom) ou modifiez les chemins dans `frontend/src/weddingConfig.js`.

---

## 2. Personnaliser le contenu

Toutes les informations du mariage (noms, dates, lieux, numéro WhatsApp, texte de l'histoire, citations, etc.) sont centralisées dans :

```
frontend/src/weddingConfig.js
```

Modifiez ce fichier pour changer les dates, lieux, citations, ou le texte — aucun autre fichier n'a besoin d'être touché pour ces changements.

---

## 3. Comment fonctionne le RSVP

1. L'invité remplit le formulaire en 2 étapes (nom/téléphone, puis cérémonies/nombre d'invités/message).
2. S'il coche "Mariage Traditionnel", une question supplémentaire apparaît pour savoir s'il souhaite porter le pagne officiel.
3. Le frontend envoie ces données à `POST /api/rsvp` sur le backend.
4. Le backend valide les données puis envoie un email formaté à `princefootball020@gmail.com` via Gmail SMTP.
5. Aucune donnée n'est stockée en base de données — chaque confirmation arrive uniquement par email, comme demandé.

Le endpoint est protégé par une limite de 5 tentatives par IP toutes les 10 minutes contre les abus.

---

## 4. Sécurité

Le backend inclut déjà :

- **En-têtes de sécurité HTTP** (via `helmet`) sur toutes les réponses.
- **CORS restreint** : seul le domaine défini dans `FRONTEND_ORIGIN` peut appeler l'API (à condition de bien le configurer en production — voir ci-dessous).
- **Limitation de débit** : 5 tentatives de RSVP par adresse IP toutes les 10 minutes, pour empêcher le spam.
- **Validation stricte des champs** : longueur maximale sur le nom, le téléphone et le message ; liste blanche des cérémonies valides ; nombre d'invités limité entre 1 et 20.
- **Protection contre l'injection d'en-têtes email** : les retours à la ligne sont supprimés des champs utilisés dans l'objet de l'email.
- **Échappement HTML** : tout ce que l'invité écrit est échappé avant d'être inséré dans l'email, pour empêcher l'injection de code.
- **Secrets jamais commités** : `.env` est dans `.gitignore`, seul `.env.example` (sans vraies valeurs) est inclus.

**Ce que VOUS devez faire pour rester sécurisé en production :**

1. Ne jamais partager ou committer votre fichier `.env` ou votre mot de passe d'application Gmail.
2. Une fois votre site déployé, remplacer `FRONTEND_ORIGIN` par l'URL réelle de votre site (jamais `*`) dans les variables d'environnement de votre hébergeur backend.
3. Si vous soupçonnez que votre mot de passe d'application a fuité, révoquez-le immédiatement sur https://myaccount.google.com/apppasswords et créez-en un nouveau.

## 5. Déploiement en production (important pour Vercel)

**Point essentiel : Vercel héberge très bien le frontend (React), mais n'est pas l'endroit recommandé pour ce backend.**

Le backend est un serveur Node/Express classique (avec `app.listen`), pensé pour rester actif en continu — c'est ce qui permet à la limitation de débit de fonctionner correctement. Vercel fonctionne différemment : il exécute du code par "fonctions serverless" de courte durée, ce qui n'est pas adapté à ce type de serveur sans réécriture, et casserait la protection anti-spam (chaque invocation repartirait de zéro).

**Architecture recommandée :**

| Partie | Où le déployer | Pourquoi |
|---|---|---|
| `frontend/` | **Vercel** (ou Netlify) | Fait exactement pour du React/Vite statique. Gratuit, HTTPS automatique. |
| `backend/` | **Render, Railway ou Fly.io** | Ce sont des hébergeurs Node.js classiques avec un plan gratuit, parfaits pour un petit serveur Express toujours actif. |

**Étapes :**

1. Déployez `backend/` sur Render (ou Railway/Fly.io) :
   - Créez un nouveau "Web Service" à partir de votre dossier `backend/`.
   - Renseignez les mêmes variables d'environnement que dans `.env.example` (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `RSVP_RECIPIENT_EMAIL`, `FRONTEND_ORIGIN`).
   - Notez l'URL fournie par l'hébergeur, par exemple `https://votre-backend.onrender.com`.
2. Déployez `frontend/` sur Vercel :
   - Importez le dossier `frontend/` comme nouveau projet Vercel.
   - Dans les "Environment Variables" du projet Vercel, ajoutez `VITE_API_URL` avec l'URL de votre backend (celle de l'étape précédente).
   - Déployez. Vercel vous donnera une URL comme `https://votre-site.vercel.app`.
3. Retournez sur Render et mettez à jour `FRONTEND_ORIGIN` avec l'URL Vercel exacte de l'étape 2, puis redéployez le backend pour que le changement prenne effet.
4. Testez le formulaire RSVP sur votre site en production pour confirmer que l'email arrive bien.

Cette séparation (frontend sur Vercel, backend sur Render) est standard, gratuite, et vous évite les soucis de sécurité et de fiabilité liés à faire tourner un serveur Express classique sur une plateforme serverless.

---

## 6. Structure du projet

```
wedding-invitation/
├── frontend/
│   ├── src/
│   │   ├── components/       Navbar, Hero, Celebrations, Message, Countdown,
│   │   │                     OurStory, EventDetails, RSVP, Contact, Footer
│   │   ├── weddingConfig.js  Toutes les infos du mariage (à personnaliser)
│   │   ├── api.js            Client HTTP vers le backend
│   │   ├── App.jsx
│   │   └── index.css         Thème (couleurs, polices)
│   └── public/images/        Mettez hero-couple.jpg ici
└── backend/
    ├── server.js             API Express + envoi d'email Nodemailer
    └── .env.example          Variables d'environnement à configurer
```
