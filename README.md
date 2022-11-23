# Voting session Dapp

Projet Dapp avec un front fait en React et un back avec un contrat Solidity.

Le front permet d'intéragir avec le contract par le biais d'une interface web.

Toutes les fonctionnalités du contrat sont utilisable via le front.

## Links

Voici la [vidéo démo]() de la Dapp !  
Voici le [lien de déploiement]() de la Dapp !

## Composants

L'interface est découpé en plusieurs composants :

- App => Composant racine qui dispose les sous composants
- Account => Affiche l'adresse du compte connecté
- Winner => Affiche la proposal gagnante
- AdminPanel => Le panneau d'interaction du compte admin
- VoterPanel => Le panneau d'interaction d'un voter
- VotersList => La liste des voters enregistrés
- ProposalsList => La liste des proposals enregistrés

## Déploiement

A déployer sur Goerli puis un quelconque herbergeur

## Utilisation

git clone
dans truffle, ganache ouvert
npm install et truffle migrate
dans client
npm install et npm start