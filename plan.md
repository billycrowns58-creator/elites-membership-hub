# Plan de mise en œuvre - Application "LES ÉLITES"

Application mobile moderne pour la gestion des cotisations et des membres, avec un design premium (Noir, Or, Blanc).

## Portée et Objectifs
- **Utilisateurs** : Membres, Agents, Administrateurs.
- **Fonctionnalités clés** : Inscription/Connexion, Gestion du profil, Paiements Mobile Money (Simulés), Tableau de bord Administrateur (Code d'accès: BBG15), Système de parrainage.
- **Persistence** : Utilisation du `localStorage` pour simuler une base de données (conformément aux contraintes de session).

## Architecture Technique
- **Frontend** : React avec Vite, Tailwind CSS.
- **UI/UX** : Thème premium (Noir #000000, Or #D4AF37, Blanc #FFFFFF), Framer Motion pour les animations.
- **État/Données** : Hooks personnalisés pour gérer les données dans le `localStorage`.

## Phases d'implémentation

### Phase 1 : Configuration et Design Système (frontend_engineer)
- Configurer les variables de couleur Tailwind (Noir, Or, Blanc).
- Mettre en place la structure des dossiers (`src/components`, `src/hooks`, `src/pages`, `src/types`).
- Définir les interfaces TypeScript pour les Membres, Transactions, et Notifications.

### Phase 2 : Authentification et Navigation (frontend_engineer)
- Créer la page d'accueil avec les 3 boutons : Rejoindre, Connexion, Admin (Accès restreint).
- Implémenter le flux d'inscription (Nom, Tél, Mdp, Adresse, Sexe, Date de naissance, Photo).
- Implémenter la connexion (Téléphone/Email) et le choix du rôle (Membre, Agent, Admin).
- Gérer l'état de l'utilisateur connecté dans le `localStorage`.

### Phase 3 : Espace Membre et Parrainage (frontend_engineer)
- Développer le tableau de bord Membre : Profil, Montant total, Historique.
- Carte de membre numérique générée dynamiquement.
- Système de parrainage : Génération de lien/code et compteur d'invités.
- Système de notifications (Mock/Alertes locales).

### Phase 4 : Paiement Mobile Money (Simulé) (frontend_engineer)
- Interface de paiement (Airtel, Orange, M-Pesa).
- Formulaire de saisie du montant (USD/CDF).
- Simulation de transaction avec génération de reçu automatique.
- Enregistrement dans l'historique local.

### Phase 5 : Administration (BBG15) (frontend_engineer)
- Créer le portail administrateur protégé par le code `BBG15`.
- Tableau de bord : Statistiques globales (Membres, Total collecté).
- Gestion des membres : Liste, Recherche, Validation des adhésions, Blocage.
- Exportation simulée (Génération de vue imprimable ou formatage pour copie).

### Phase 6 : Polissage et Finalisation (quick_fix_engineer)
- Ajouter des animations fluides entre les pages.
- Vérifier la réactivité mobile.
- Traduction complète en français et vérification du design premium.

## Questions Ouvertes / Risques
- **Sécurité** : Le code `BBG15` est stocké côté client (contrainte session).
- **Persistence** : Les données seront perdues si le cache du navigateur est vidé (limitation du `localStorage`).
