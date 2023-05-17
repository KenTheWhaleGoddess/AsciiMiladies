import { Alchemy, Network } from "alchemy-sdk";
import Jimp from "jimp";

import * as fs from "fs";
import asciify from "./asciify.js";
import puppeteer from "puppeteer";
import "json";
const MILADY = "0x5Af0D9827E0c53E4799BB226655A1de152A425a5";

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
const settings = {
  apiKey: "ALCHEMY_PRIVATE_KEY", // Replace with your Alchemy API key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);


var options = {
  fit: "none",
  width: 50,
  height: 62,
  color: true,
};


// Launch a headless browser instance
const browser = await puppeteer.launch({ headless: true });

const width = 1200;
const height = 1250;
// console.log("ASCII", asciified);

for (let i=0; i < 10000; i++){
  const id = i;
  const nftMetadata = await alchemy.nft.getNftMetadata(MILADY, id.toString());
  const rawMetadata = nftMetadata.rawMetadata;
  const image = rawMetadata.image;
  const page = await browser.newPage();

  // Set the viewport size to match the desired output size of the image
  await page.setViewport({ width: width, height: height });
  const [asciified, colors] = await asciify(image, options);

  // Navigate to a blank page
  // console.log("COLORS", colors);
  let aura;
  if ((await JSON.stringify(rawMetadata)).includes("alien")) {
    aura = ["#597d7d", "alien"];
  } else {
    const n = Math.random() * 100;
    if (n < 25) {
      aura = ["#FFFFFF", "light"];
    } else if (n < 50) {
      aura = ["#000000", "dark"];
    } else if (n < 60) {
      aura = ["#861A1A", "ngmeow"];
    } else if (n < 70) {
      aura = ["#0C8439", "wagmeow"];
    } else if (n < 80) {
      aura = ["#D8A4C4", "pinku"];
    } else if (n < 90) {
      aura = ["#c9a904", "won_forever"];
    } else {
      aura = ["#b01581", "♡ ♡ ♡"];
    }
  }
  await page.goto("about:blank");
  await page.evaluate(
    (asciiArt, colorMap, height, width, color) => {
      // Create a new canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      document.body.appendChild(canvas);
      ctx.fillStyle = color;
      ctx.fillRect(0,0,width,height);
      // Draw the text onto the canvas
      ctx.font = "bold 20px monospace";

      const centerX = width / 2;
      const centerY = height / 2;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const lines = asciiArt.split("\n");

      const lineHeight = 20; // Set the line height to match the font size
      const startY = centerY - (lines.length / 2) * lineHeight;
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        let x = 0;
        while (line) {
          const colorMatch = line.match(/^(\d+)/);
          if (colorMatch) {
            const c = colorMatch[0];
            if (colorMap[c]) {
              const rgbColor = [colorMap[c].r, colorMap[c].g, colorMap[c].b];
              ctx.fillStyle = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 1.0)`;
            } else {
              ctx.fillStyle = `black`;
            }
            line = line.substring(c.toString().length);
          } else {
            const char = line[0];
            ctx.fillText(char, x, y);
            x += ctx.measureText(char).width;
            line = line.substring(1);
          }
        }
      });
    },
    asciified,
    colors,
    height,
    width,
    aura[0]
  );
  rawMetadata.attributes?.push({"value": aura[1],"trait_type":"Aura"})

  fs.writeFile("output/json/" + id.toString() + ".json", JSON.stringify(rawMetadata), (err) => {
    if (err) {
      console.error(err);
    }
  });
  // Take a screenshot of the canvas and save it as a PNG image
  await page.screenshot({
    path: "output/img/" + id.toString() + ".png",
    type: "png",
    clip: { x: 10, y: 10, width: width-10, height: height-20 },
  });

}
// Close the browser instance
await browser.close();
