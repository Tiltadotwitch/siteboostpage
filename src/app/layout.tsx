import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Configuração da fonte Inter (padrão do Next.js)
const inter = Inter({ subsets: ['latin'] });

// Metadados da aplicação
export const metadata: Metadata = {
  title: 'SiteBoost - Landing Page de Conversão',
  description: 'Landings Pages de alta conversão, projetadas com design Black/Roxo para velocidade e performance máxima.',
};

/**
 * Componente RootLayout.
 * Define a estrutura básica de HTML, Head e Body para toda a aplicação.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Estas tags são OBRIGATÓRIAS no Root Layout do Next.js
    <html lang="pt"> 
      {/* A classe 'antialiased' e a fonte do Next.js são aplicadas aqui.
        Este 'className' deve ser o único na tag <body>. 
      */}
      <body className={inter.className + " font-sans antialiased"}>
        {children}
      </body>
    </html>
  );
}