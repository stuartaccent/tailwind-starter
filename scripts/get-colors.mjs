import * as fs from "fs";
import colors from "tailwindcss/colors.js";

function isGetter(obj, prop) {
  return !!Object.getOwnPropertyDescriptor(obj, prop)['get']
}

function hexToRgb(hex) {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16))
}

function getTailwindColors() {
  let sass = `// This file is automatically generated, do not edit \n`;
  for (let key in colors) {
    if (colors.hasOwnProperty(key) && !isGetter(colors, key)) {
      let property = colors[key];

      if (typeof property === 'object' && property !== null) {
        for (let subKey in property) {
          if (property.hasOwnProperty(subKey)) {
            let rgb = hexToRgb(property[subKey]);
            sass += `$${key}-${subKey}: ${rgb.join(" ")};\n`;
          }
        }
      } else if (property.startsWith('#')) {
        let rgb = hexToRgb(property);
        sass += `$${key}: ${rgb.join(" ")};\n`;
      } else {
        sass += `$${key}: ${property};\n`;
      }

    }
  }
  return sass;
}

let coloursData = getTailwindColors();
fs.writeFile('scss/themes/_colors.scss', coloursData, function (err, file) {
  if (err) throw err;
})
