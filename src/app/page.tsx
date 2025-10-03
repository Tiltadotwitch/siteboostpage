"use client"

// Importamos React para definir os tipos corretos (React.ReactNode)
import * as React from "react"
import { 
  Zap, 
  Clock, 
  Download, 
  Shield, 
  Rocket, 
  Star, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Sparkles,
  Timer,
  Award,
  DollarSign,
  Copyright,
  Mail,
  Instagram,
  Facebook
} from "lucide-react"

// Adicionamos um componente <TailwindLoader> para carregar o CDN.
// Isso garante que o design funcione mesmo sem a importação de globals.css.
const TailwindLoader = () => (
    <script src="https://cdn.tailwindcss.com"></script>
)


// =================================================================
// --- Componentes de UI (Tipagem TypeScript) ---
// =================================================================

// 1. Definição da Tipagem para Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  className?: string; 
  variant?: "default" | "outline" | "highlight";
}

/**
 * Componente simples de botão.
 */
const Button = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full"
    
    let variantClasses = "";
    if (variant === "default") {
        variantClasses = "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl hover:scale-105 transition-all duration-300";
    } else if (variant === "outline") {
        variantClasses = "border border-white/30 text-white hover:bg-white/10";
    } else if (variant === "highlight") {
        variantClasses = "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold shadow-2xl shadow-yellow-500/50 hover:scale-105 transition-all duration-300";
    }

    return (
      <button 
        className={`${baseClasses} ${variantClasses} ${className}`} 
        {...props} 
      >
        {children}
      </button>
    );
};

// 2. Definição da Tipagem para Card e CardContent
interface CardProps {
    children: React.ReactNode; 
    className?: string; 
}
const Card = ({ children, className = '' }: CardProps) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);
const CardContent = ({ children, className = '' }: CardProps) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ children, className = '' }: CardProps) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

// =================================================================
// --- Pricing Card Component ---
// =================================================================

interface FeatureListProps {
  icon: React.ReactNode;
  text: string;
  isAvailable: boolean;
}
const FeatureItem = ({ icon, text, isAvailable }: FeatureListProps) => (
  <li className="flex items-center space-x-3 text-left">
    <div className={`text-sm md:text-base ${isAvailable ? 'text-green-400' : 'text-gray-500'}`}>
        {isAvailable ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
    </div>
    <span className={isAvailable ? 'text-gray-200' : 'text-gray-400 line-through'}>
      {text}
    </span>
  </li>
);

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  isHighlighted: boolean;
  ctaText: string;
  monthlyGens: string;
}

const plans: PricingPlan[] = [
  {
    name: "GRÁTIS",
    price: 0,
    description: "Ideal para testar o poder da IA e ter uma pré-visualização.",
    monthlyGens: "1",
    features: [
      "Limite de 500 caracteres (Input)",
      "1 Geração por Mês",
      "Apenas Pré-visualização",
      "Sem Download do Código",
      "Marca d'Água no Output",
      "Suporte via Comunidade (Fórum)",
      "Gerações Ilimitadas (Bloqueado)"
    ],
    isHighlighted: false,
    ctaText: "COMEÇAR AGORA",
  },
  {
    name: "BÁSICO",
    price: 49,
    description: "Perfeito para freelancers e pequenos negócios que precisam de código.",
    monthlyGens: "10",
    features: [
      "Input de Ilimitado",
      "10 Gerações por Mês",
      "Download Ilimitado",
      "Acesso ao Código Fonte Limpo",
      "Sem Marca d'Água",
      "Suporte Padrão (E-mail)",
      "Gerações Ilimitadas (Bloqueado)"
    ],
    isHighlighted: false,
    ctaText: "ESCOLHER BÁSICO",
  },
  {
    name: "PRO",
    price: 149,
    description: "Recomendado para quem usa páginas de venda ou lançamentos frequentemente.",
    monthlyGens: "Ilimitado",
    features: [
      "Input de Ilimitado",
      "Gerações Ilimitadas",
      "Download Ilimitado",
      "Acesso ao Código Fonte Limpo",
      "Sem Marca d'Água",
      "Suporte Prioritário (Chat)",
      "Contas de Usuário (Bloqueado)"
    ],
    isHighlighted: true,
    ctaText: "ASSINAR PRO",
  },
  {
    name: "AGÊNCIA",
    price: 299,
    description: "Para equipes e agências que gerenciam múltiplos clientes e projetos.",
    monthlyGens: "Ilimitado",
    features: [
      "Input de Ilimitado",
      "Gerações Ilimitadas",
      "Download Ilimitado",
      "Acesso ao Código Fonte Limpo",
      "Sem Marca d'Água",
      "Suporte Dedicado (Gerente)",
      "5 Contas de Usuário Adicionais"
    ],
    isHighlighted: false,
    ctaText: "SOLICITAR AGÊNCIA",
  },
];

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    const isPro = plan.isHighlighted;
    const highlightClasses = isPro 
      ? "border-yellow-500 bg-gradient-to-br from-purple-800/80 to-slate-900/80 shadow-2xl shadow-yellow-900/50 scale-[1.02] transition-all duration-500" 
      : "border-white/20 bg-white/10";
    
    // Mapeamento de recursos para cores/disponibilidade
    const getFeatureStatus = (feature: string, planName: string) => {
        if (planName === "GRÁTIS") {
          return feature.includes("500 caracteres") || feature.includes("1 Geração") || feature.includes("Pré-visualização") ? true : false;
        }
        if (planName === "BÁSICO") {
          return !feature.includes("Gerações Ilimitadas (Bloqueado)") && !feature.includes("Contas de Usuário (Bloqueado)") ? true : false;
        }
        if (planName === "PRO") {
          return !feature.includes("Contas de Usuário (Bloqueado)") ? true : false;
        }
        if (planName === "AGÊNCIA") {
          return true; // Tudo disponível para o plano Agência
        }
        return false;
    };


    return (
      <Card className={`flex flex-col h-full ${highlightClasses}`}>
        {isPro && (
          <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 rounded-full bg-yellow-500 text-gray-900 text-sm font-bold shadow-lg">
            MAIS POPULAR
          </div>
        )}
        
        <CardHeader className="text-center pb-0 pt-8">
          <h3 className={`text-3xl font-bold ${isPro ? 'text-yellow-400' : 'text-white'}`}>{plan.name}</h3>
          <p className="text-gray-400 mb-4">{plan.description}</p>
          <div className="flex items-end justify-center py-4">
            <span className="text-5xl font-black text-white">
                {plan.price === 0 ? "GRÁTIS" : `R$ ${plan.price}`}
            </span>
            {plan.price > 0 && (
                <span className="text-xl text-gray-400"> /mês</span>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between pt-6">
          <ul className="space-y-3 mb-8 text-center">
             <li className="font-bold text-lg text-purple-400 mb-4 flex items-center justify-center">
                 <Zap className="w-5 h-5 mr-2" />
                 {plan.monthlyGens} GERAÇÕES {plan.monthlyGens !== 'Ilimitado' && '/ MÊS'}
             </li>
            {plan.features.map((feature, index) => (
              <FeatureItem
                key={index}
                text={feature}
                icon={<CheckCircle />}
                isAvailable={getFeatureStatus(feature, plan.name)}
              />
            ))}
          </ul>
          
          <Button 
            className="w-full mt-auto px-8 py-3 text-lg"
            variant={isPro ? 'highlight' : 'default'}
          >
            {plan.ctaText}
          </Button>
        </CardContent>
      </Card>
    );
};


// =================================================================
// --- Landing Page Principal ---
// =================================================================

export default function LandingPage() {
  return (
    // Adicionamos o loader do Tailwind aqui.
    <>
      <TailwindLoader />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
        {/* Header com CTA */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SiteBoost Brasil</span>
            </div>
            <Button className="px-8 py-3">
              INICIAR SESSÃO
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Headline Impactante */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              CRIE LANDING PAGES EM 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 2 MINUTOS</span>
            </h1>
            
            {/* Subtítulo (Dor + Solução) */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Pare de perder clientes por não ter uma landing page profissional. 
              Nossa IA cria páginas de alta conversão instantaneamente, sem código e sem complicação.
            </p>

            {/* BLOCO DE GERAÇÃO INTEGRADO - COM LIMITES DO PLANO GRÁTIS */}
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30 p-6 md:p-8 max-w-3xl mx-auto mb-16 shadow-2xl shadow-purple-900/50">
              <CardContent className="p-0">
                <h3 className="text-2xl font-extrabold text-white mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-3 text-yellow-400 fill-yellow-400" />
                  Comece AGORA: Descreva Sua Landing Page
                </h3>
                <textarea
                  className="w-full h-24 p-4 text-base bg-gray-900 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 placeholder:text-gray-500"
                  placeholder="Ex: Crie uma landing page de vendas para o meu eBook sobre 'Finanças Pessoais para Iniciantes', com um preço de 27€ e garantia de 30 dias. O tom deve ser motivacional. (Max. 500 caracteres no plano Grátis)"
                  readOnly 
                />
                <p className="text-gray-400 text-xs text-right mb-4">
                  Limite de 500 caracteres (Plano Grátis)
                </p>
                <Button 
                  className="w-full px-12 py-4 text-xl"
                >
                  <Rocket className="w-6 h-6 mr-2" />
                  GERAR MINHA LANDING PAGE GRÁTIS (1/mês)
                </Button>
                <p className="text-gray-400 text-sm mt-3">
                  ✨ Apenas pré-visualização. Baixe o código nos planos Pro.
                </p>
              </CardContent>
            </Card>

            {/* Prova Social Rápida */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>+2.847 empresas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 estrelas</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>+340% conversão</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios em Bullets */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Transforme Visitantes em <span className="text-purple-400">Clientes Pagantes</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-yellow-400" />,
                  title: "ECONOMIZE 40 HORAS DE TRABALHO",
                  description: "Nossa IA cria em minutos o que levaria semanas para desenvolver manualmente."
                },
                {
                  icon: <Download className="w-8 h-8 text-green-400" />,
                  title: "BAIXE O CÓDIGO COMPLETO IMEDIATAMENTE",
                  description: "Receba arquivos HTML, CSS e JS prontos para hospedar onde quiser."
                },
                {
                  icon: <Rocket className="w-8 h-8 text-purple-400" />,
                  title: "AUMENTE SUAS VENDAS EM ATÉ 340%",
                  description: "Landing pages otimizadas com técnicas comprovadas de conversão."
                },
                {
                  icon: <Shield className="w-8 h-8 text-blue-400" />,
                  title: "ELIMINE A DEPENDÊNCIA DE PROGRAMADORES",
                  description: "Crie páginas profissionais sem conhecimento técnico ou equipe."
                },
                {
                  icon: <Clock className="w-8 h-8 text-orange-400" />,
                  title: "LANCE CAMPANHAS NO MESMO DIA",
                  description: "Pare de esperar semanas. Sua landing page fica pronta hoje."
                },
                {
                  icon: <Award className="w-8 h-8 text-pink-400" />,
                  title: "SUPERE SEUS CONCORRENTES AGORA",
                  description: "Enquanto eles planejam, você já está vendendo com páginas profissionais."
                }
              ].map((benefit, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Planos de Aquisição Mensal (Pricing) */}
        <section className="container mx-auto px-4 py-20 bg-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-16">
              Escolha o Plano Que Vai <span className="text-purple-400">Turbinar Suas Vendas</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>

            <p className="text-gray-400 text-lg mt-16 flex items-center justify-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-400" />
              Todos os planos incluem a garantia incondicional de 7 dias.
            </p>
          </div>
        </section>

        {/* Prova Social - Depoimentos */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Veja o Que Nossos <span className="text-purple-400">Clientes Dizem</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Carlos Mendes",
                  role: "CEO, TechStart",
                  result: "Aumentei 280% as vendas",
                  feature: "A velocidade da IA é impressionante",
                  feeling: "Nunca pensei que seria tão fácil ter uma landing page profissional.",
                  rating: 5
                },
                {
                  name: "Ana Paula Silva",
                  role: "Marketing Digital",
                  result: "Economizei R$ 15.000 em desenvolvimento",
                  feature: "O código gerado é limpo e otimizado",
                  feeling: "Minha agência agora entrega projetos 10x mais rápido.",
                  rating: 5
                },
                {
                  name: "Roberto Costa",
                  role: "E-commerce Owner",
                  result: "Lancei 5 produtos em uma semana",
                  feature: "Templates focados em conversão",
                  feeling: "Finalmente posso competir com as grandes empresas.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white font-bold text-lg mb-2">"{testimonial.result}"</p>
                    <p className="text-gray-300 mb-4">"{testimonial.feature}. {testimonial.feeling}"</p>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {testimonial.name[0]}
                        </div>
                        <div>
                            <p className="text-white font-semibold">{testimonial.name}</p>
                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-white/10">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-gray-400">
              <div>
                <h4 className="text-white font-semibold mb-4">Produto</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Funcionalidades</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Planos</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Galeria</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Empresa</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidade</a></li>
                </ul>
              </div>
              <div className="col-span-2">
                <h4 className="text-white font-semibold mb-4">Contacto</h4>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-purple-400" /> suporte@siteboost.com.br</p>
                  <p>Av. Paulista, 1000, São Paulo - SP</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-purple-400 transition-colors"><Instagram className="w-6 h-6" /></a>
                  <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-purple-400 transition-colors"><Facebook className="w-6 h-6" /></a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
              <p className="flex items-center justify-center gap-1">
                <Copyright className="w-4 h-4" /> 
                {new Date().getFullYear()} SiteBoost Brasil. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
