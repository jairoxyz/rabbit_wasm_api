import fetch from 'node-fetch';
import sharp from 'sharp';
import { writeFileSync } from 'fs';

async function getImageData(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  const image = sharp(Buffer.from(buffer));
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const base64Image = Buffer.from(buffer).toString('base64');
  const base64Data = `data:image/png;base64,${base64Image}`;

  return { data: new Uint8ClampedArray(data), b64Data: base64Data, width: info.width, height: info.height };
}

async function main() {
  const url = 'https://venusembed.site/images/image.png?v=0.1.0';
  const { data, b64Data, width, height } = await getImageData(url);
  const dataArray = Array.from(data).join(', ');

  // Write the Uint8ClampedArray to a text file
  writeFileSync('imageData.txt', `Pixel Data:\n${dataArray}\n\nBase64 Image Data:\n${b64Data}`);
  console.log('Image data written to imageData.txt');
}

main().catch(console.error);
