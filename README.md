<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-0.182-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Chart.js-4.4-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🛡️ CyberRange STANLEY</h1>

<p align="center">
  <strong>Plateforme de compétition Capture The Flag (CTF)</strong><br/>
  Interface moderne de supervision et de gestion d'un CyberRange pour des exercices de cybersécurité.
</p>

---

## 📋 À propos

**CyberRange STANLEY** est une interface web conçue pour piloter et superviser des compétitions de type CTF (Capture The Flag). Elle offre une expérience immersive grâce à une visualisation 3D des infrastructures, un suivi en temps réel des scores et des progressions, ainsi qu'un tableau de bord complet pour les organisateurs et participants.

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🔐 **Authentification** | Page de connexion sécurisée avec animation de chargement |
| 📊 **Dashboard** | Vue d'ensemble avec statistiques clés, graphiques et indicateurs temps réel |
| 📜 **Briefing** | Page de briefing de mission pour les participants |
| 🎯 **Challenges** | Liste et gestion des défis CTF par catégorie |
| 🏆 **Scoreboard** | Classement en temps réel des équipes participantes |
| 📈 **Progression** | Suivi détaillé de la progression avec graphiques interactifs |
| 🖥️ **Hardware** | Monitoring des infrastructures avec visualisation 3D du bâtiment |
| 🔔 **Notifications** | Système de notifications en temps réel avec historique |
| 🖼️ **Splash Screen** | Écran d'accueil animé au lancement |
| 🔲 **Mode plein écran** | Support du mode fullscreen pour l'immersion |

## 🛠️ Stack Technique

- **Framework** — [React 18](https://react.dev/) avec JSX
- **Build Tool** — [Vite 5](https://vitejs.dev/)
- **Routing** — [React Router v6](https://reactrouter.com/)
- **3D** — [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei)
- **Graphiques** — [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Icônes** — [Lucide React](https://lucide.dev/)
- **Polices** — [Google Fonts (Roboto)](https://fonts.google.com/specimen/Roboto)

## 📁 Structure du projet

```
STANLEY/
├── public/
│   └── tactical_map.png        # Carte tactique du CyberRange
├── src/
│   ├── components/
│   │   ├── BarChart.jsx         # Graphique en barres
│   │   ├── Building3DViewer.*   # Visualisation 3D du bâtiment
│   │   ├── Card.*               # Composant carte réutilisable
│   │   ├── FloorPlanMap.*       # Plan d'étage interactif
│   │   ├── Header.*             # Barre de navigation
│   │   ├── LineChart.jsx        # Graphique linéaire
│   │   ├── NotificationPopup.*  # Popups de notification
│   │   ├── NotificationHistory.*# Historique des notifications
│   │   ├── Splash.*             # Écran de chargement
│   │   └── StatCard.*           # Carte de statistiques
│   ├── context/
│   │   ├── FullscreenContext.jsx # Gestion du mode plein écran
│   │   ├── NotificationContext.jsx # Gestion des notifications
│   │   └── UserContext.jsx      # Contexte utilisateur
│   ├── pages/
│   │   ├── Login.*              # Page de connexion
│   │   ├── Dashboard.*          # Tableau de bord principal
│   │   ├── Briefing.*           # Briefing de mission
│   │   ├── Challenges.*         # Liste des challenges
│   │   ├── Scoreboard.*         # Classement
│   │   ├── Progress.*           # Progression des équipes
│   │   └── Hardware.*           # Monitoring infrastructure
│   ├── App.jsx                  # Composant racine + routing
│   ├── App.css                  # Styles globaux de l'app
│   ├── main.jsx                 # Point d'entrée React
│   └── index.css                # Styles de base
├── index.html                   # Template HTML
├── vite.config.js               # Configuration Vite
└── package.json                 # Dépendances et scripts
```

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- npm ou yarn

### Lancer le projet

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-utilisateur/STANLEY.git
cd STANLEY

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

L'application s'ouvre automatiquement sur [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
npm run build
npm run preview
```

## 🎨 Aperçu

> _Ajoutez ici des captures d'écran de l'application pour illustrer l'interface._
>
> ```
> ![Dashboard](./screenshots/dashboard.png)
> ![Challenges](./screenshots/challenges.png)
> ![Hardware 3D](./screenshots/hardware-3d.png)
> ```

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une **issue** ou une **pull request**.

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'feat: ajout de ma fonctionnalité'`)
4. Pushez sur la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<p align="center">
  Fait avec ❤️ pour la cybersécurité — <strong>CyberRange STANLEY</strong>
</p>
