import * as info from './info.js'
import fs from 'fs'
import Canvas from 'canvas'
import Mark from 'markup-js'
import fetch from 'node-fetch'
import sharp from 'sharp'

const avatar = info.rollDice()
console.log(avatar)

const canvas = Canvas.createCanvas(640, 732);
const ctx = canvas.getContext("2d");

const webpImg = Buffer.from(await (await fetch(info.gachaUrlOf(avatar))).arrayBuffer())
const pngBuf = await sharp(webpImg).toFormat('png').toBuffer()
const bgImg = await Canvas.loadImage(pngBuf)

const ratio = 732/1024
ctx.drawImage(bgImg, 0, 0, 2048, 1024, -320, 0, 2048 * ratio, 1024 * ratio);

ctx.save();
ctx.globalCompositeOperation = "destination-out";

const gradient = ctx.createLinearGradient(0, 0, 640, 0);

gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.0)");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 640, 732);
ctx.restore();

if (fs.existsSync('./public')) {
  await fs.promises.rmdir('./public', { recursive: true });
}

await fs.promises.mkdir("./public/.github/workflows", { recursive: true });
const stream = fs.createWriteStream("./public/image.png");
canvas.createPNGStream().pipe(stream);


const raw = (await fs.promises.readFile("./src/README.md")).toString();
const context = {
  generate_date: new Date(),
  avatar,
};

await fs.promises.writeFile("./public/README.md", Mark.up(raw, context));
await fs.promises.copyFile(
  './src/schedule.yml',
  './public/.github/workflows/schedule.yml'
);
