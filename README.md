# Organisateur de Téléchargements

## Présentation

Ce script organise automatiquement vos fichiers téléchargés dans le dossier **Téléchargements** en les triant par types de fichiers dans des sous-dossiers dédiés.

Il supporte plusieurs catégories comme les **images**, **documents**, **vidéos**, et bien d'autres.

Vous pouvez utiliser cet outil pour garder votre dossier Téléchargements propre et organisé en un seul clic !

---

## Fonctionnalités

- Classe les fichiers par catégories :

- **Images** : `.jpg`, `.png`, `.webp`, etc.

- **Documents** : `.pdf`, `.docx`, `.xlsx`, etc.

- **Vidéos** : `.mp4`, `.mov`, `.avi`, etc.

- **Musique** : `.mp3`, `.wav`, etc.

- **Archives** : `.zip`, `.rar`, `.7z`, etc.

- Crée automatiquement des dossiers pour chaque type de fichier, si nécessaire.

- Fonctionne sous **Windows**, **macOS**, et **Linux**.

- Invite l'utilisateur à confirmer avant d'effectuer la réorganisation.

---

## Prérequis

- **Node.js** (si vous utilisez le script brut).

- Sinon, téléchargez la version **exécutable** pour éviter d'installer Node.js.

---

## Installation

### Étape 1 : Cloner ou télécharger le dépôt

```bash

git  clone  https://github.com/votre-utilisateur/organize-downloads.git

cd  organize-downloads
```

### Étape 2 : Choisir votre méthode

Option 1 : Utiliser Node

- Assurez-vous d'avoir **Node.js** installé sur votre système.
- Lancez le script avec :

```bash
node organize.js
```

Option 2 : Utiliser l'exécutable

- Téléchargez l'exécutable correspondant à votre système d'exploitation depuis les [Releases](https://github.com/votre-utilisateur/organize-downloads/releases).
- Lancez simplement l'exécutable téléchargé.

### Utilisation

- Lancez le script ou l'éxécutable.
- Un message s'affichera pour demander confirmation :

```bash
Voulez-vous réorganiser vos téléchargements ? (oui/non)
```

- Tapez `oui` pour démarrer la réorganisation ou `non` pour annuler.
- Une fois terminé, vous verrez un message confirmant le déplacement des fichiers.

### Notes

- - Si vous utilisez la version exécutable sous Windows, un message de sécurité peut apparaître. Pour l’éviter, il est nécessaire de signer numériquement le fichier (voir [Authentification Windows](#authentification-pour-windows)).
- - Pour éviter de déplacer des fichiers importants par erreur, assurez-vous que votre dossier Téléchargements ne contient que des fichiers à organiser.

### Contributions

Les contributions sont les bienvenues !  
N'hésitez pas à ouvrir une issue ou une pull request pour proposer des améliorations ou signaler des problèmes.
