import path from "path";
import fs from "fs";
const topDir = path.dirname(__dirname);

if (!fs.existsSync(path.join(topDir, "public", "tinymce"))) {
  fs.mkdirSync(path.join(topDir, "public", "tinymce"));
}

const nodepath = path.join(topDir, "node_modules", "tinymce");
const destpath = path.join(topDir, "public", "tinymce");
console.log(nodepath, destpath);
fs.copyFile(nodepath, destpath, (err) => {
  console.log(err);
});
