import React from 'react';

// O componente layout será simplificado para apenas injetar estilos e renderizar o conteúdo.
// O ambiente de execução (Canvas) já fornece as tags <html> e <body>.

/**
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Conteúdo da página aninhada (o page.tsx).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Injeção de Meta Tags e Estilos Globais no Head (Simulação) */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SiteBoost Brasil | Geração de Landing Pages com IA</title>
      
      {/* Link para a fonte Inter */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Estilos aplicados ao <body> via tag <style> */}
      <style dangerouslySetInnerHTML={{__html: `
          body {
              font-family: 'Inter', sans-serif;
              /* Fundo escuro conforme o tema da landing page */
              background-color: #0F172A; 
              margin: 0; /* Garante que o fundo cubra toda a tela */
          }
        `}} 
      />
      
      {/* O conteúdo da página (page.tsx) é retornado dentro de um Fragmento.
          A classe 'antialiased' ajuda na renderização da fonte.
      */}
      <div className="antialiased">
        {children}
      </div>
    </>
  )
}
