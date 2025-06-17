// /types/images.d.ts

// Definição para imagens WebP
declare module "*.webp" {
    const content: String;
    export default content;
  }
  
  // Definição para imagens PNG
  declare module "*.png" {
    const content: string;
    export default content;
  }
  
  // Definição para imagens JPG/JPEG
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpeg" {
    const content: string;
    export default content;
  }
  
  // Definição para imagens GIF
  declare module "*.gif" {
    const content: string;
    export default content;
  }
  
  // Definição para SVG
  // Opção 1: SVG como string
  declare module "*.svg" {
    const content: string;
    export default content;
  }
  
  // Opção 2: SVG como componente React (descomente se preferir usar SVGs como componentes)
  // declare module "*.svg" {
  //   import * as React from 'react';
  //   const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  //   export default ReactComponent;
  // }
  
  // Definição para imagens ICO
  declare module "*.ico" {
    const content: string;
    export default content;
  }
  
  // Definição para imagens AVIF (se você usar este formato)
  declare module "*.avif" {
    const content: string;
    export default content;
  }