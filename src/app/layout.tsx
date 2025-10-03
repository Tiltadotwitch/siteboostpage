import React, { useState } from 'react';

// --- Ícones Inline (Simulando lucide-react para o ambiente de arquivo único) ---

// Ícone Menu (Hamburguer)
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Ícone Fechar (X)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Ícone Home
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// Ícone Usuário
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Ícone Configurações
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0-2 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0 2-2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// --- Componentes do Layout ---

// Definição de Tipos
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive }) => (
  <a
    href={href}
    onClick={(e) => { e.preventDefault(); console.log(`Navegando para: ${label}`); }}
    className={`
      flex items-center space-x-3 p-3 text-sm font-medium rounded-xl transition-colors
      ${isActive
        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="truncate">{label}</span>
  </a>
);

// Componente Sidebar
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { icon: HomeIcon, label: 'Painel', href: '/dashboard', isActive: true },
    { icon: UsersIcon, label: 'Utilizadores', href: '/users', isActive: false },
    { icon: SettingsIcon, label: 'Configurações', href: '/settings', isActive: false },
  ];

  return (
    <>
      {/* Overlay para mobile quando aberto */}
      <div
        className={`fixed inset-0 z-20 bg-black opacity-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Barra Lateral Principal */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300
          lg:translate-x-0 lg:static lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo/Título */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-extrabold text-blue-700">Meu App</h1>
            <button
              onClick={toggleSidebar}
              className="p-2 lg:hidden text-gray-500 hover:text-gray-700 rounded-full transition-colors"
              aria-label="Fechar Menu"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navegação */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </nav>

          {/* Rodapé da Sidebar */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 p-2">
              Utilizador: Jane Doe
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Componente Header
interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
  <header className="bg-white shadow-md sticky top-0 z-10">
    <div className="flex justify-between items-center h-16 px-4 md:px-6">
      {/* Botão de Menu para Mobile */}
      <button
        onClick={toggleSidebar}
        className="p-2 lg:hidden text-gray-700 hover:text-blue-600 rounded-full transition-colors"
        aria-label="Abrir Menu"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Título da Página (simulado) */}
      <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Painel Principal</h2>

      {/* Ações do Utilizador */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-600 hidden sm:block">Jane Doe</span>
        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          JD
        </div>
      </div>
    </div>
  </header>
);

// Componente MainContent
interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => (
  <main className="flex-1 overflow-y-auto p-4 md:p-8">
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </main>
);

// Componente Principal da Aplicação (App) - Simula o Layout Root
const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // Carrega o script do Tailwind CSS
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Fixa a altura da tela para o layout */
          #root { height: 100vh; }
        `}
      </style>
      
      {/* Estrutura Principal: Flex container de altura total */}
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        
        {/* 1. Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* 2. Conteúdo Principal (Header + Main) */}
        <div className="flex flex-col flex-1 overflow-y-hidden">
          
          {/* 2a. Header */}
          <Header toggleSidebar={toggleSidebar} />
          
          {/* 2b. Main Content Area */}
          <MainContent>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 border-b pb-2">
                Bem-vindo ao Layout de Demonstração
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Cartão de Conteúdo 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Primeiro Componente</h3>
                  <p className="text-gray-600">
                    Esta secção representa onde os componentes específicos da sua página seriam carregados. O layout (Header/Sidebar) permanece constante.
                  </p>
                  <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                    Ver Detalhes
                  </button>
                </div>
                
                {/* Cartão de Conteúdo 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Responsividade</h3>
                  <p className="text-gray-600">
                    O layout é totalmente responsivo: a barra lateral desaparece em ecrãs menores e é acedida pelo ícone de menu.
                  </p>
                  <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    Testar Telemóvel
                  </button>
                </div>
                
                {/* Cartão de Conteúdo 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">Estrutura TSX</h3>
                  <p className="text-gray-600">
                    Usando TypeScript (`.tsx`) para tipagem forte, melhorando a manutenção e a clareza do código.
                  </p>
                  <button className="mt-4 w-full py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
                    Analisar Tipos
                  </button>
                </div>

              </div>
              
              {/* Secção de Texto Longo */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Área de Conteúdo Expansiva</h3>
                <p className="text-gray-700 leading-relaxed">
                  Aqui, pode adicionar qualquer conteúdo específico da sua página. No contexto de uma aplicação real, usaria o conceito de "children" para injetar o componente de página atual dentro desta estrutura de layout. O componente `MainContent` é o equivalente a receber `children` no seu `layout.tsx` do Next.js. Garanta que o conteúdo tenha rolagem vertical suave, pois a barra lateral e o cabeçalho são fixos.
                </p>
                <div className="mt-6 h-48 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    Mais Conteúdo Abaixo da Dobra (Role para Testar)
                </div>
                <p className="text-gray-700 mt-4 leading-relaxed">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, natus. Ut iusto, aperiam quos, debitis culpa asperiores, fugiat mollitia omnis reiciendis obcaecati in?
                </p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                   Tempora, quidem! Inventore dignissimos magnam placeat quo, mollitia dolorem ex? Nostrum, quos. Voluptatum, officia.
                </p>
              </div>

            </div>
          </MainContent>
        </div>
      </div>
    </>
  );
};

export default App;
