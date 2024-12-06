const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");
const { stdout, stderr } = require("process");

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
      console.error("Erreur lors de la lecture de dossier :", err);
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
              console.error("Erreur lors du déplacement du fichier");
            } else {
              console.log(`Fichier déplacé : ${file} -> ${folderName}`);
            }
          });
        }
      }
    });
  });
}

function scheduleTask() {
  const scriptPath = path.resolve(process.argv[1]);

  // Command for macOS/Linux
  const cronCommand = `node ${scriptPath}`;
  const cronJob = `*/30 * * * * ${cronCommand}`;

  const platform = process.platform;
  if (platform === "win32") {
    // Command for Windows Task Scheduler
    const taskName = "OrganizeDownloads";
    const taskCommand = `schtasks /create /tn "${taskName}" /tr "node ${scriptPath}" /sc hourly /mo 6 /f`;
    exec(taskCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors de la planification de la tâche :", stderr);
      } else {
        console.log("Tâche planifiée avec succès", stdout);
      }
    });
  } else {
    // Command for macOS/Linux using cron
    const addCronCommand = `crontab -l 2>/dev/null | { cat; echo "${cronJob}"; } | crontab -`;

    exec(addCronCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors de la configuration de cron :", stderr);
      } else {
        console.log("Tâche cron ajoutée avec succès");
      }
    });
  }
}

function startInteraction() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Voulez-vous réorganiser vos téléchargements automatiquement toutes les 6h ? (Oui/Non) : ",
    (answer) => {
      if (answer.toLowerCase() === "oui") {
        console.log("Configuration de la tâche automatique...");
        scheduleTask();
        organizeDownloads();
      } else {
        console.log("Réorganisation annnulée.");
      }
      rl.close();
    }
  );
}

startInteraction();
