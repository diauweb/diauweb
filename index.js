const info = require("./info");
const fs = require("fs");
const Canvas = require("canvas");

let bg = info.shuffleBg();
let stand = info.shuffleStand();

console.log(bg);
console.log(stand);

const canvas = Canvas.createCanvas(640, 732);
const ctx = canvas.getContext("2d");

const bgURL = "http://priconesd.nekonikoban.org/stand/bg/";
const standURL = "http://priconesd.nekonikoban.org/stand/img/";

(async () => {
  const bgImg = await Canvas.loadImage(`${bgURL}${bg.image}`);
  const standBase = await Canvas.loadImage(
    `${standURL}${stand.key}/${stand.base}`
  );
  const standFace = await Canvas.loadImage(
   `${standURL}${stand.key}/${stand.face}`
  );

  let x = standBase.naturalWidth / 2 - 640 / 2;

  ctx.drawImage(bgImg, 0, 0, 640, 732, 0, 0, 640, 732);

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const gradient = ctx.createLinearGradient(0, 0, 640, 0);
  gradient.addColorStop(.3, "rgba(255, 255, 255, 1.0)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 640, 732);
  ctx.restore();

  const radio = 640 / standBase.naturalWidth
  const hpaint = standBase.naturalHeight * radio
  ctx.drawImage(standBase, 
    0, 0, standBase.naturalWidth, standBase.naturalHeight, 
    0, 732 - hpaint, 640, hpaint);
  ctx.drawImage(standFace, 
    0, 0, standFace.naturalWidth, standFace.naturalHeight, 
    0, 732 - hpaint, 640, hpaint);

  const stream = fs.createWriteStream("./public/image.png");
  canvas.createPNGStream().pipe(stream);
})();
