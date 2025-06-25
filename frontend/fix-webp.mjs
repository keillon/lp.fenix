import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const publicDir = './public';

async function fixWebpImages() {
  try {
    const files = await fs.readdir(publicDir);
    const webpFiles = files.filter(file => file.endsWith('.webp'));
    
    for (const file of webpFiles) {
      const filePath = path.join(publicDir, file);
      const tempPath = path.join(publicDir, `temp_${file}`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 85 })
          .toFile(tempPath);
        
        await fs.unlink(filePath);
        await fs.rename(tempPath, filePath);
        
        console.log(`✅ Corrigido: ${file}`);
      } catch (err) {
        console.error(`❌ Erro ao processar ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.error('Erro ao ler diretório:', err);
  }
}

fixWebpImages(); 