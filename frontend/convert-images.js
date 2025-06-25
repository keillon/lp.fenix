const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function convertWebpToPng() {
    const files = fs.readdirSync(publicDir);
    const webpFiles = files.filter(file => file.endsWith('.webp'));

    for (const file of webpFiles) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.webp', '.png'));

        try {
            await sharp(inputPath)
                .png()
                .toFile(outputPath);
            console.log(`Converted ${file} to PNG`);
        } catch (error) {
            console.error(`Error converting ${file}:`, error);
        }
    }
}

convertWebpToPng(); 