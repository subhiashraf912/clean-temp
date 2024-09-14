// cleanTemp.js
const fs = require("fs");
const path = require("path");

// Get the path to the %temp% directory
const tempDir = path.join(process.env.LOCALAPPDATA, "Temp");

// Function to clean the temp directory
function cleanTempDirectory() {
  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(tempDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Failed to get file stats:", err);
          return;
        }

        if (stats.isFile()) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Failed to delete file:", err);
            } else {
              console.log(`Deleted file: ${filePath}`);
            }
          });
        } else if (stats.isDirectory()) {
          fs.rmdir(filePath, { recursive: true }, (err) => {
            if (err) {
              console.error("Failed to delete directory:", err);
            } else {
              console.log(`Deleted directory: ${filePath}`);
            }
          });
        }
      });
    });
  });
}

// Initial cleanup
cleanTempDirectory();

// Set interval to clean every 2 minutes (120,000 milliseconds)
setInterval(cleanTempDirectory, 120000);

console.log("Temp folder cleaner started. Cleaning every 2 minutes...");
