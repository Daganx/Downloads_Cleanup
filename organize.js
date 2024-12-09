const fs = require("fs");
const path = require("path");
const readline = require("readline");

const DOWNLOAD_FOLDER = path.join(require("os").homedir(), "Downloads");

const FILES_TYPES = {
  Images: [".jpg", ".jpeg", ".png", ".webp", ".avif", ".bmp", ".svg", ".tiff"],
  Documents: [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".pages",
    ".numbers",
    ".xlsx",
    ".pptx",
  ],
  Videos: [".mp4", ".wav", ".mov", ".avi", ".wmv"],
  Music: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  Archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
  Photoshop: [".psd", ".psb", ".abr", ".pat", ".csh", ".asl", ".atn", "ai"],
  Fonts: [".otf", ".ttf", ".woff", ".woff2", "eot"],
};

function organizeDownloads() {
  fs.readdir(DOWNLOAD_FOLDER, (err, files) => {
    if (err) {
      console.error("Erreur lors de la lecture du dossier :", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(DOWNLOAD_FOLDER, file);

      if (fs.lstatSync(filePath).isFile()) {
        const fileExtension = path.extname(file).toLowerCase();

        const folderName = Object.keys(FILES_TYPES).find((type) =>
          FILES_TYPES[type].includes(fileExtension)
        );
        if (folderName) {
          const destinationFolder = path.join(DOWNLOAD_FOLDER, folderName);

          if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder);
          }

          const destinationPath = path.join(destinationFolder, file);
          fs.rename(filePath, destinationPath, (err) => {
            if (err) {
              console.error("Erreur lors du déplacement du fichier :", err);
            } else {
              console.log(`Fichier déplacé : ${file} -> ${folderName}`);
            }
          });
        }
      }
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Voulez-vous réorganiser vos téléchargements ? (oui/non) ",
  (answer) => {
    if (answer.toLowerCase() === "oui") {
      console.log("Réorganisation en cours...");
      organizeDownloads();
    } else {
      console.log("Opération annulée.");
    }
    rl.close();
  }
);
