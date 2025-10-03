import React, { useState, useEffect, useRef, ReactNode } from 'react';
// Importação de todos os ícones necessários
import { Rocket, Sparkles, Menu, X, Timer, Award, DollarSign, Copyright, CheckCircle, Star, Plus, ChevronDown, Mail, Zap } from 'lucide-react';

// =================================================================
// --- 0. Configurações de Dados e Tipos ---
// =================================================================

interface Plan {
    name: string;
    description: string;
    price: string;
    monthlyGens: string;
    features: string[];
    ctaText: string;
    isHighlighted: boolean;
}

const plans: Plan[] = [
    {
        name: "Starter",
        description: "Ideal para começar a testar seus primeiros produtos digitais.",
        price: "19,90",
        monthlyGens: "5 gerações por mês",
        features: [
            "Código JSX/Tailwind Básico",
            "Suporte por e-mail (48h)",
            "Acesso aos templates mais recentes",
            "Otimização de SEO (Básico)",
        ],
        ctaText: "Começar Agora (R$ 19,90)",
        isHighlighted: false,
    },
    {
        name: "Pro",
        description: "O plano que agiliza suas campanhas com alto volume.",
        price: "49,90",
        monthlyGens: "50 gerações por mês",
        features: [
            "Tudo do Starter",
            "Código de Alta Performance (Full Conversion)",
            "Suporte Prioritário (24h)",
            "Acesso a bibliotecas premium (Ex: Icons Pro)",
            "Testes A/B Ilimitados",
        ],
        ctaText: "Escolher o Plano Pro",
        isHighlighted: true,
    },
    {
        name: "Ilimitado",
        description: "Para agências e desenvolvedores que buscam escala total.",
        price: "99,90",
        monthlyGens: "Gerações Ilimitadas",
        features: [
            "Tudo do Pro",
            "Uso Ilimitado da IA",
            "Suporte VIP (Telefone/WhatsApp)",
            "Integração com CRMs e APIs",
            "Workshops Mensais Exclusivos",
        ],
        ctaText: "Garantir Ilimitado",
        isHighlighted: false,
    },
];

const faqs = [
    {
        question: "O SiteBoost realmente gera o código em 2 minutos?",
        answer: "Sim! Nosso modelo de IA é otimizado para transformar sua descrição em código React/JSX e Tailwind CSS em menos de 60 segundos, dependendo da complexidade do pedido. O objetivo é reduzir o tempo de 'dias' para 'minutos'."
    },
    {
        question: "Qual a qualidade do código gerado?",
        answer: "A IA foi treinada com padrões de agências de desenvolvimento de alta performance. O código gerado é limpo, utiliza a metodologia de componentes moderna (React Hooks) e segue as melhores práticas de responsividade e SEO. É código de 'produção', pronto para ir ao ar."
    },
    {
        question: "Preciso saber programar para usar?",
        answer: "Não! Você só precisa descrever o que deseja. No entanto, se você souber React/Tailwind, pode copiar o código gerado e fazer ajustes finos em segundos, aumentando sua produtividade de forma exponencial."
    },
    {
        question: "Posso usar em quantas campanhas eu quiser?",
        answer: "Sim. O código é seu para usar como desejar. Nos planos 'Pro' e 'Ilimitado', você tem créditos suficientes ou ilimitados para testar quantas Landings Pages diferentes precisar."
    }
];

const KIWIFY_LINK = "https://pay.kiwify.com.br/sj7A32E"; // Link centralizado

// =================================================================
// --- 1. Componentes Utilitários (ShadCN/UI Style) ---
// =================================================================

// Componente Básico de Botão
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "highlight";
    children: ReactNode;
}
const Button: React.FC<ButtonProps> = ({ variant = "default", className = "", children, ...props }) => {
    let baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform active:scale-95 shadow-lg whitespace-nowrap";
    let variantStyles = "";

    switch (variant) {
        case "outline":
            variantStyles = "bg-gray-900 border border-purple-500 text-purple-400 hover:bg-purple-900/50";
            break;
        case "highlight":
            // Estilo principal para CTA
            variantStyles = "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-purple-500/50 hover:shadow-lg";
            break;
        case "default":
        default:
            variantStyles = "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/50 hover:shadow-lg";
            break;
    }

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
};

// Componente de Card
const Card: React.FC<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`rounded-xl border p-6 transition-transform hover:shadow-purple-500/20 hover:shadow-xl ${className}`}>
        {children}
    </div>
);
const CardHeader: React.FC<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`mb-4 ${className}`}>
        {children}
    </div>
);
// Adicionado flex-col e flex-grow para garantir que o conteúdo preencha o card (Correção Estrutural)
const CardContent: React.FC<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`flex flex-col h-full ${className}`}>
        {children}
    </div>
);

// Componente de Badge
const Badge: React.FC<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-purple-900 text-purple-300 border border-purple-700 ${className}`}>
        {children}
    </span>
);

// Item de Lista de Funcionalidade
const FeatureItem: React.FC<{ text: string, icon: ReactNode, isAvailable: boolean }> = ({ text, icon, isAvailable }) => (
    <li className={`flex items-start space-x-3 text-left ${isAvailable ? 'text-gray-200' : 'text-gray-500 line-through'}`}>
        <span className={`flex-shrink-0 ${isAvailable ? 'text-green-400' : 'text-gray-500'}`}>
            {icon}
        </span>
        <span>{text}</span>
    </li>
);

// Componente Acordeão de FAQ
const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-700/50">
            <button
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-white hover:text-purple-400 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'rotate-0'}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-400 leading-relaxed pt-2">{answer}</p>
            </div>
        </div>
    );
};

// Componente FAQ Section
const FAQSection: React.FC = () => (
    <section id="faq" className="py-20">
        <h2 className="text-4xl font-extrabold text-center mb-16 animate-fadeIn-medium">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Frequentes</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn-slow">
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    </section>
);


// =================================================================
// --- 2. Componente de Exibição de Código Gerado pela IA ---
// =================================================================

interface CodeDisplayProps {
    code: string;
}
const GeneratedCodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
    if (!code) return null;
    
    // Remove os blocos de código Markdown/JSX
    const cleanCode = code.replace(/```(jsx|tsx|html)?\n|```/g, '').trim();

    return (
        <div className="mt-12 p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl animate-fadeIn-slow">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Código Gerado pela IA (Preview)
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-green-300 whitespace-pre-wrap break-all">
                    {/* Exibe um trecho do código para evitar quebrar o layout com blocos gigantes */}
                    {cleanCode.length > 500 
                        ? cleanCode.substring(0, 500) + '\n\n// ... Conteúdo Gerado Omitido ...\n// Copie o código completo para rodar.'
                        : cleanCode
                    }
                </pre>
            </div>
            {cleanCode.length > 500 && (
                <p className="text-gray-400 text-sm mt-2">
                    Código completo gerado com sucesso. Copie ou salve no seu editor.
                </p>
            )}
        </div>
    );
};

// =================================================================
// --- 3. Lógica de Geração e Chamada da API (Simulada) ---
// =================================================================

// Componente auxiliar para o código MOCK (Definido aqui para evitar erros de escopo na string)
const BenefitCardMock = `
const BenefitCard = ({ Icon, title, description }) => (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-lg text-center transition-all hover:border-purple-500">
        <Icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);
`;

async function generateLandingPage(userDescription: string, setLoading: (s: boolean) => void, setCode: (c: string) => void) {
    if (!userDescription) return;

    setLoading(true);
    setCode(""); 

    try {
        // Simulação da chamada de API
        await new Promise(resolve => setTimeout(resolve, 2500)); 

        // CRITICAL FIX: O mock code agora é mais limpo e usa um nome de componente genérico.
        const mockCode = `
import React from 'react';
import { Mail, Zap, CheckCircle } from 'lucide-react';

/**
 * Landing Page de Alta Conversão para o Produto: ${userDescription}
 * Gerado pela SiteBoost AI.
 */

// Componente Auxiliar (MOCK)
${BenefitCardMock} 

const LandingPageTemplate = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            {/* Seção Hero */}
            <section className="py-20 md:py-32 text-center bg-gray-900">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                        ${userDescription.toUpperCase()} - Desbloqueie Seu Potencial!
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        A solução definitiva para quem busca resultado e eficiência no mercado digital.
                    </p>
                    <a 
                        href="#form" 
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:scale-[1.02] transition duration-300"
                    >
                        <Zap className="w-5 h-5 mr-2" /> Garanta Seu Acesso Imediato
                    </a>
                </div>
            </section>

            {/* Seção de Benefícios */}
            <section className="py-16 bg-gray-800/50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">O que você vai conquistar:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BenefitCard Icon={CheckCircle} title="Velocidade Incomparável" description="Crie, teste e lance páginas em tempo recorde, sem depender de desenvolvedores." />
                        <BenefitCard Icon={Mail} title="Otimização Profunda" description="Conteúdo e estrutura pensados para máxima conversão, aumentando seu ROI." />
                        <BenefitCard Icon={Zap} title="Fácil de Usar" description="Integração perfeita com suas plataformas de pagamento e marketing favoritas." />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPageTemplate;
        `;
        setCode(mockCode);

    } catch (error) {
        console.error("Erro ao gerar página:", error);
        setCode(`Erro: ${error instanceof Error ? error.message : "Falha na comunicação com a API."}`);
    } finally {
        setLoading(false);
    }
}


// =================================================================
// --- 4. Componente do Botão Flutuante (Floating CTA) ---
// =================================================================

const FloatingCTA: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <a 
        href={KIWIFY_LINK} // Usando constante centralizada
        target="_blank" 
        rel="noopener noreferrer" 
        className={isActive ? "preco-ativo" : "preco"}
        aria-label="Garantir a oferta agora"
    >
        {/* Ícone de adição para manter o aspecto de FAB */ }
        <Plus className="w-8 h-8 text-white" />
    </a>
);


// =================================================================
// --- 5. Estilos e Loader (Necessário para Imersiva React/Tailwind) ---
// =================================================================

// FIX: Removido o import do react, pois não é necessário em funções simples.
const TailwindLoader = () => (
    <script src="https://cdn.tailwindcss.com"></script>
);

// Estilos customizados e animações
const Style = () => (
    <style>
        {/* Animações e Estilos Globais */}
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }

        /* Animação do Background Sutil */
        @keyframes background-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .background-animator {
            background-color: #0d0d1a; /* Cor base mais escura */
            background-image: radial-gradient(at 0% 0%, #1a0f30 0%, transparent 50%),
                              radial-gradient(at 100% 100%, #1f143a 0%, transparent 50%);
            background-size: 200% 200%;
            animation: background-pan 30s ease infinite;
        }

        /* Animações de Fade In */
        @keyframes fadeIn-fast { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn-medium { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn-slow { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .animate-fadeIn-fast { animation: fadeIn-fast 0.5s ease-out forwards; opacity: 0; }
        .animate-fadeIn-medium { animation: fadeIn-medium 0.8s ease-out forwards; opacity: 0; }
        .animate-fadeIn-slow { animation: fadeIn-slow 1s ease-out forwards; opacity: 0; }

        /* Estilos para o Botão Flutuante (Floating CTA) */
        .preco {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #8B5CF6; /* Cor base: purple-500 */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
            cursor: pointer;
            z-index: 1000;
            opacity: 0; /* Escondido por padrão */
            transform: translateY(100px);
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        .preco-ativo {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #EC4899; /* Cor ativa: pink-500 */
            background-image: linear-gradient(45deg, #8B5CF6, #EC4899);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
            cursor: pointer;
            z-index: 1000;
            opacity: 1; /* Ativo */
            transform: translateY(0);
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
            animation: pulse-active 1.5s infinite;
        }

        @keyframes pulse-active {
            0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
            100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
        }
        `}
    </style>
);


// =================================================================
// --- 6. Componente Principal da Landing Page ---
// =================================================================

export default function LandingPage() {
    const [userDescription, setUserDescription] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFloatingCtaActive, setIsFloatingCtaActive] = useState(false);
    
    // Variáveis para a animação do título da aba e scroll
    const originalTitle = useRef(typeof document !== 'undefined' ? document.title : 'SiteBoost Brasil');
    const lastScrollTop = useRef(0);
    const scrollTolerance = 20;

    // --- EFEITO 1: Animação do Título da Aba (Tab Title Animator) ---
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const msgs = ["👋 Oii, Volta aqui!", "🚀 Produza e Lucre..."];
        const INTERVAL = 1500;
        let timer: NodeJS.Timeout | number = 0; // Usando number para compatibilidade com setTimeout

        const startCycle = () => {
            clearTimeout(timer);
            let i = 0;
            const cycle = () => {
                document.title = msgs[i];
                i = (i + 1) % msgs.length;
                timer = setTimeout(cycle, INTERVAL);
            };
            cycle(); // Inicia imediatamente
        };

        const stopCycle = () => {
            clearTimeout(timer);
            document.title = originalTitle.current;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) startCycle();
            else stopCycle();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", startCycle); 
        window.addEventListener("focus", stopCycle);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", startCycle);
            window.removeEventListener("focus", stopCycle);
            stopCycle();
        };
    }, []); // Dependências vazias (OK)


    // --- EFEITO 2: Lógica do Botão Flutuante (Scroll Logic) ---
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollDiff = currentScroll - lastScrollTop.current;

            if (Math.abs(scrollDiff) > scrollTolerance) {
                if (scrollDiff > 0 && currentScroll > 400) { // Aumentei o trigger para 400px
                    setIsFloatingCtaActive(true);
                } else if (scrollDiff < 0 || currentScroll <= 400) {
                    setIsFloatingCtaActive(false);
                }
                lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        // 1. Carrega o Tailwind CSS e os Estilos Customizados
        <>
            <TailwindLoader />
            <Style /> 

            {/* --- O CONTAINER PRINCIPAL RECEBE A CLASSE DE ANIMAÇÃO DE FUNDO --- */}
            <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden pt-16 background-animator">
                
                {/* Efeito de Fundo - Gradientes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-3xl absolute top-[-300px] left-[-300px]"></div>
                    <div className="w-[600px] h-[600px] bg-pink-900/30 rounded-full blur-3xl absolute bottom-[-200px] right-[-200px]"></div>
                </div>

                {/* --- HEADER/NAVBAR --- */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center space-x-2 animate-fadeIn-fast" style={{animationDelay: '0.1s'}}>
                            <Rocket className="w-6 h-6 text-purple-500" />
                            <span className="text-xl font-bold">SiteBoost Brasil</span>
                        </div>
                        
                        <nav className="hidden md:flex space-x-6 text-sm font-medium animate-fadeIn-fast" style={{animationDelay: '0.2s'}}>
                            <a href="#geracao" className="text-gray-300 hover:text-purple-400 transition">Geração IA</a>
                            <a href="#planos" className="text-gray-300 hover:text-purple-400 transition">Planos</a>
                            <a href="#funcionalidades" className="text-gray-300 hover:text-purple-400 transition">Funcionalidades</a>
                            <a href="#faq" className="text-gray-300 hover:text-purple-400 transition">FAQ</a>
                            <a href="#depoimentos" className="text-gray-300 hover:text-purple-400 transition">Depoimentos</a>
                        </nav>

                        <div className="hidden md:block animate-fadeIn-fast" style={{animationDelay: '0.3s'}}>
                            <Button className="px-5 py-2 text-sm" variant="outline">Login</Button>
                        </div>

                        <div className="md:hidden">
                            <Button 
                                className="p-2" 
                                variant="outline"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu */}
                <div className={`fixed top-16 left-0 w-full h-auto bg-gray-800 shadow-xl z-40 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <nav className="flex flex-col p-4 space-y-3 text-base">
                        <a href="#geracao" className="block py-2 text-gray-300 hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Geração IA</a>
                        <a href="#planos" className="block py-2 text-gray-300 hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Planos</a>
                        <a href="#funcionalidades" className="block py-2 text-gray-300 hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Funcionalidades</a>
                        <a href="#faq" className="block py-2 text-gray-300 hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                        <a href="#depoimentos" className="block py-2 text-gray-300 hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Depoimentos</a>
                        <Button className="w-full mt-4" variant="outline" onClick={() => setIsMenuOpen(false)}>Login</Button>
                    </nav>
                </div>


                {/* --- MAIN CONTENT / HERO SECTION --- */}
                <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    
                    {/* --- HERO TEXT AND GENERATION INPUT --- */}
                    <section id="geracao" className="text-center mb-20 pt-10">
                        <Badge className="mb-4 animate-fadeIn-fast">🚀 Lançamento: O Futuro da Criação Web</Badge>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight animate-fadeIn-medium" style={{animationDelay: '0.3s'}}>
                            CRIE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">LANDING PAGES</span> EM 2 MINUTOS
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-10 animate-fadeIn-medium" style={{animationDelay: '0.5s'}}>
                            Descreva o seu produto em uma frase e nossa IA faz o resto. Código JSX, otimizado para Tailwind CSS e alta conversão.
                        </p>

                        {/* Campo de Geração (IA) */}
                        <div className="max-w-3xl mx-auto animate-fadeIn-slow" style={{animationDelay: '0.8s'}}>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input
                                    type="text"
                                    placeholder="Ex: Landing page de vendas para meu eBook de Finanças Pessoais"
                                    value={userDescription}
                                    onChange={(e) => setUserDescription(e.target.value)}
                                    className="flex-grow p-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={() => generateLandingPage(userDescription, setIsLoading, setGeneratedCode)}
                                    className="px-8 py-4 text-lg w-full sm:w-auto"
                                    disabled={isLoading || userDescription.length < 5} // Desabilita se a descrição for muito curta
                                    variant="highlight"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <><Sparkles className="w-5 h-5 mr-2" /> Gerar Página</>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Componente que exibe o código gerado */}
                        <GeneratedCodeDisplay code={generatedCode} />

                    </section>


                    {/* --- FUNCIONALIDADES (BENEFÍCIOS) - Cards --- */}
                    <section id="funcionalidades" className="py-20">
                        <h2 className="text-4xl font-extrabold text-center mb-16 animate-fadeIn-medium">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Funcionalidades</span> que Aumentam a Conversão
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            
                            {/* Card 1: Velocidade */}
                            <Card className="bg-gray-800 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.2s'}}>
                                <CardHeader>
                                    <Timer className="w-10 h-10 text-purple-400 mb-2" />
                                    <h3 className="text-xl font-bold">Geração Instantânea</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">Em menos de 60 segundos, tenha um código limpo e pronto para o deploy, otimizado para Next.js e React.</p>
                                </CardContent>
                            </Card>

                            {/* Card 2: Qualidade */}
                            <Card className="bg-gray-800 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.4s'}}>
                                <CardHeader>
                                    <Award className="w-10 h-10 text-pink-400 mb-2" />
                                    <h3 className="text-xl font-bold">Código de Agência</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">Utilizamos padrões de código de alta qualidade, como se fossem escritos por um desenvolvedor sênior.</p>
                                </CardContent>
                            </Card>

                            {/* Card 3: Monetização */}
                            <Card className="bg-gray-800 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.6s'}}>
                                <CardHeader>
                                    <DollarSign className="w-10 h-10 text-yellow-400 mb-2" />
                                    <h3 className="text-xl font-bold">Foco na Venda</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">Nossa IA é treinada com milhares de Landings Pages de alta performance para maximizar a sua taxa de conversão.</p>
                                </CardContent>
                            </Card>
                            
                        </div>
                    </section>


                    {/* --- PLANOS DE PREÇO --- */}
                    <section id="planos" className="py-20">
                        <h2 className="text-4xl font-extrabold text-center mb-16 animate-fadeIn-medium">
                            Escolha o Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Plano</span>
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
                            
                            {plans.map((plan, index) => (
                                <Card
                                    key={plan.name}
                                    className={`
                                        bg-gray-800/70 border-gray-700 backdrop-blur-sm
                                        ${plan.isHighlighted ? 'border-purple-500 shadow-2xl shadow-purple-500/30 lg:scale-[1.05] hover:scale-[1.08]' : 'hover:scale-[1.03]'}
                                        animate-fadeIn-slow
                                        transition-all duration-500
                                    `}
                                    style={{animationDelay: `${0.2 * (index + 1)}s`}}
                                >
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <h3 className={`text-2xl font-bold ${plan.isHighlighted ? 'text-purple-400' : 'text-white'}`}>
                                                {plan.name}
                                            </h3>
                                            {plan.isHighlighted && <Badge className="bg-purple-600">Mais Popular</Badge>}
                                        </div>
                                        <p className="text-sm text-gray-400 h-10 mt-2">{plan.description}</p>
                                    </CardHeader>
                                    {/* Componente CardContent com flex-col h-full para forçar o espaçamento */}
                                    <CardContent className="flex flex-col h-full"> 
                                        <div className="text-center mb-6">
                                            <p className="text-5xl font-extrabold text-white">
                                                R$ {plan.price}
                                                <span className="text-base font-normal text-gray-400">/mês</span>
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">{plan.monthlyGens}</p>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {plan.features.map((feature, i) => (
                                                <FeatureItem 
                                                    key={i} 
                                                    text={feature} 
                                                    icon={<CheckCircle />} 
                                                    isAvailable={true} 
                                                />
                                            ))}
                                        </ul>
                                        
                                        {/* FIX: Adicionado target="_blank" e rel para links externos (Boa Prática) */}
                                        <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer" className='mt-auto'>
                                            <Button 
                                                variant={plan.isHighlighted ? "highlight" : "default"}
                                                className="w-full py-3"
                                            >
                                                {plan.ctaText}
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                    
                    {/* --- FAQ SECTION --- */}
                    <FAQSection />

                    {/* --- DEPOIMENTOS --- */}
                    <section id="depoimentos" className="py-20">
                        <h2 className="text-4xl font-extrabold text-center mb-16 animate-fadeIn-medium">
                            Quem Usa <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Recomenda</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Depoimento 1 */}
                            <Card className="bg-gray-800/80 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.2s'}}>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4 text-yellow-500">
                                        <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <p className="text-gray-300 italic mb-4">"Reduzimos o tempo de criação de Landing Pages de dias para minutos. O código é impecável, limpo e super rápido."</p>
                                    <div className="text-sm font-medium text-white">
                                        João F. - CEO, Agência Digital X
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Depoimento 2 */}
                            <Card className="bg-gray-800/80 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.4s'}}>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4 text-yellow-500">
                                        <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <p className="text-gray-300 italic mb-4">"A qualidade do código React/Tailwind é surpreendente. Agora podemos focar 100% na copy e não na codificação."</p>
                                    <div className="text-sm font-medium text-white">
                                        Mariana S. - Freelancer Web
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Depoimento 3 */}
                            <Card className="bg-gray-800/80 border-gray-700 animate-fadeIn-slow" style={{animationDelay: '0.6s'}}>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4 text-yellow-500">
                                        <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <p className="text-gray-300 italic mb-4">"O plano Ilimitado nos deu liberdade para testar inúmeras campanhas sem custos de desenvolvimento extra. É o melhor investimento."</p>
                                    <div className="text-sm font-medium text-white">
                                        Pedro R. - Diretor de Marketing
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </section>
                </main>

                {/* --- FOOTER --- */}
                <footer className="relative z-10 border-t border-gray-800 mt-12 py-8 bg-gray-900/90">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                            <Copyright className="w-4 h-4" />
                            <span>2024 SiteBoost Brasil. Todos os direitos reservados.</span>
                        </div>
                        <p>Desenvolvido com Next.js, Tailwind CSS e a Inteligência Gemini.</p>
                        <div className="mt-4 space-x-4">
                            <a href="#" className="hover:text-purple-400 transition">Termos de Serviço</a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="hover:text-purple-400 transition">Política de Privacidade</a>
                        </div>
                    </div>
                </footer>
                
                {/* --- BOTÃO FLUTUANTE --- */}
                <FloatingCTA isActive={isFloatingCtaActive} />

            </div>
        </>
    );
}
