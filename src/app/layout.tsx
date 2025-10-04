// Este arquivo foi simplificado para ser compatível com o ambiente de visualização,
// removendo as dependências específicas do Next.js que causavam erros de compilação
// e corrigindo o erro de aninhamento DOM do React.
import React from 'react';

// Dados de metadados simples
const metadata = {
  title: 'SiteBoost - I.A. Landing Pages',
  description: 'Geração de código web de alta performance.',
};

// O componente de Layout deve retornar um elemento React válido (como uma <div> ou Fragment)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // O React não permite que um componente retorne <html>, <head> ou <body> diretamente.
  // Retornamos um Fragment, que é um container invisível, e injetamos scripts essenciais.
  return (
    <React.Fragment>
      {/* IMPORTANTE: Injetamos tags de <script> e <style> diretamente no Fragment 
        para garantir que o Tailwind, Three.js e Tone.js sejam carregados ANTES 
        do componente principal (children) ser inicializado.
      */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Bibliotecas para Fundo Animado e Som */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/tone@14.7.58/build/Tone.min.js"></script>
      
      {/* Inclui o Tailwind CSS e a fonte global */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        /* Aplicamos estilos globais que seriam injetados no <html> ou <body> */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif; 
          background-color: #03000f;
          color: #fff;
          margin: 0;
          scroll-behavior: smooth; /* Mantém o efeito smooth scroll */
        }
      `}</style>
      
      {/* O componente filho (app/page.tsx) é renderizado aqui. */}
      <div className="min-h-screen">
          {children}
      </div>
    </React.Fragment>
  );
}
