// Layout Minimalista Final
// Remove tags que o Next.js lida automaticamente para evitar conflitos de aninhamento DOM.

// Metadados do site. São apenas informações.
export const metadata = {
  title: 'SiteBoost Brasil | Geração de Landing Pages com IA',
  description: 'Crie landing pages de alta conversão em minutos usando inteligência artificial.',
};

/**
 * Componente principal de Layout (RootLayout).
 *
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Conteúdo da página atual (page.tsx)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // A tag <html> é obrigatória.
    <html lang="pt-BR">
      {/* O Next.js trata o <head> com o objeto metadata. Omitimos tags manuais. */}
      
      {/* A tag <body> é obrigatória.
          Aplicamos o estilo base (fonte e altura mínima) diretamente aqui.
      */}
      <body 
        style={{ fontFamily: 'Inter, sans-serif' }} 
        className="min-h-screen"
      >
        {/* O children (seu page.tsx) será renderizado aqui. */}
        {children}
      </body>
    </html>
  );
}
