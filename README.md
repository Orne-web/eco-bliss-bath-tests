
# Eco Bliss Bath – Tests automatisés

## Présentation du projet

Ce dépôt contient les tests automatisés de l'application e-commerce Eco Bliss Bath, réalisés dans le cadre d'un projet de formation OpenClassrooms.

Les tests sont développés avec Cypress 13.17.0 et sont séparés du code source de l'application.

## Objectifs

- Vérifier les fonctionnalités essentielles du site.
- Tester les principales routes de l'API.
- Contrôler les mécanismes de validation face à certaines injections XSS.
- Identifier et documenter les anomalies.

## Stratégie de test

### 1. Smoke tests

Les smoke tests vérifient rapidement les fonctionnalités essentielles du parcours d'achat :

- Affichage du formulaire de connexion.
- Présence du bouton « Ajouter au panier » pour un utilisateur connecté.
- Affichage de la disponibilité d'un produit.
- Présence du champ de sélection de quantité.

La connexion et le panier sont prioritaires, car ils permettent à l'utilisateur de réaliser un achat.

### 2. Tests API

Les tests API vérifient notamment :

- La récupération de la liste des produits.
- La récupération des détails d'un produit.
- La gestion d'un produit inexistant.
- Les restrictions d'accès sans authentification.
- La consultation du panier d'un utilisateur connecté.
- L'ajout d'un produit disponible au panier.
- Le refus attendu d'un produit en rupture de stock.

### 3. Tests de sécurité XSS

Deux tests vérifient des comportements liés à la sécurité :

- Le rejet d'une valeur HTML/JavaScript dans le champ quantité du panier.
- L'absence d'exécution de JavaScript injecté dans les commentaires.

Ces tests ciblent des scénarios précis et ne constituent pas un audit complet de sécurité.

## Prérequis

- Node.js et npm.
- Docker Desktop.
- Le frontend et le backend Eco Bliss Bath démarrés.
- Un compte utilisateur de test valide.

Adresses utilisées :

- Frontend : http://localhost:4200
- API : http://localhost:8081

## Installation

Cloner ce dépôt :

```bash
git clone https://github.com/Orne-web/eco-bliss-bath-tests.git
```

Entrer dans le dossier :

```bash
cd eco-bliss-bath-tests
```

Installer les dépendances :

```bash
npm install
```

## Configuration

Créer un fichier `cypress.env.json` à la racine du projet :

```json
{
  "testUsername": "EMAIL_DU_COMPTE_DE_TEST",
  "testPassword": "MOT_DE_PASSE_DU_COMPTE_DE_TEST"
}
```

Remplacer les valeurs d'exemple par les identifiants d'un compte de test.

Ce fichier est exclu du dépôt Git grâce au `.gitignore`.

## Exécution des tests

Exécuter tous les tests :

```bash
npx cypress run --browser electron
```

Exécuter uniquement les smoke tests :

```bash
npx cypress run --spec "cypress/e2e/smoke.cy.js" --browser electron
```

Exécuter uniquement les tests API :

```bash
npx cypress run --spec "cypress/e2e/api.cy.js" --browser electron
```

Exécuter les tests XSS :

```bash
npx cypress run --spec "cypress/e2e/xss*.cy.js" --browser electron
```

Sous Windows PowerShell, utiliser `npx.cmd` si l'exécution de `npx` est bloquée.

## Résultats des tests

Résultats des dernières exécutions individuelles :

| Catégorie | Réussis | Échoués |
|---|---:|---:|
| Smoke tests | 4 | 0 |
| Tests API | 8 | 1 |
| Tests XSS | 2 | 0 |
| Total | 14 | 1 |

## Anomalie identifiée – BUG-001

**Description :** l'API accepte une demande d'ajout au panier d'un produit en rupture de stock.

- Résultat attendu : refus de la requête avec un code d'erreur adapté.
- Résultat observé : réponse HTTP 200.
- Conséquence potentielle : incohérence dans la gestion du stock.

Le test reste volontairement en échec afin de signaler cette anomalie.

## Organisation du projet

```text
eco-bliss-bath-tests/
├── cypress/
│   ├── e2e/
│   └── support/
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Rapport de tests

Un rapport de tests détaillé complète ce projet. Il présente les cas de test, les résultats attendus et obtenus ainsi que les anomalies identifiées.
