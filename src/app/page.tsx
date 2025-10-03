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
  Award
} from "lucide-react"

// --- Componentes de UI Corrigidos (Tipagem TypeScript) ---

// 1. Definição da Tipagem para Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  className?: string; 
  variant?: "default" | "outline";
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
        // Classes padrão para os botões coloridos
        variantClasses = "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl hover:scale-105 transition-all duration-300";
    } else if (variant === "outline") {
        // Classes para os botões de contorno
        variantClasses = "border border-white/30 text-white hover:bg-white/10";
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

// 3. Componente Badge (Etiqueta)
const Badge = ({ children, className = '' }: CardProps) => (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
         style={{ backgroundColor: "#8B5CF6", color: "white" }} // Cor de fundo fixa para simplicidade
    >
        {children}
    </div>
);

// 4. Componente Separator (Separador)
const Separator = ({ className = '' }: { className?: string }) => (
    <div className={`shrink-0 bg-border h-[1px] w-full my-4 ${className}`} />
);


// --- Landing Page Principal ---

export default function LandingPage() {
  return (
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

          {/* BLOCO DE GERAÇÃO INTEGRADO */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30 p-6 md:p-8 max-w-3xl mx-auto mb-16 shadow-2xl shadow-purple-900/50">
            <CardContent className="p-0">
              <h3 className="text-2xl font-extrabold text-white mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-400 fill-yellow-400" />
                Comece AGORA: Descreva Sua Landing Page
              </h3>
              <textarea
                className="w-full h-24 p-4 text-base bg-gray-900 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 placeholder:text-gray-500"
                placeholder="Ex: Crie uma landing page de vendas para o meu eBook sobre 'Finanças Pessoais para Iniciantes', com um preço de 27€ e garantia de 30 dias. O tom deve ser motivacional."
                readOnly 
              />
              <Button 
                className="w-full px-12 py-4 text-xl"
              >
                <Rocket className="w-6 h-6 mr-2" />
                GERAR MINHA LANDING PAGE GRÁTIS
              </Button>
              <p className="text-gray-400 text-sm mt-3">
                ✨ Teste grátis, obtenha o código completo!
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

      {/* Prova Social - Depoimentos */}
      <section className="container mx-auto px-4 py-20 bg-white/5">
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
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
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

      {/* Oferta Direta */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            O Que Você Recebe <span className="text-purple-400">Hoje</span>
          </h2>
          
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/30 p-8">
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Acesso Imediato à IA</h3>
                  <p className="text-gray-300">Crie landing pages ilimitadas com nossa inteligência artificial avançada.</p>
                </div>
                <div className="text-center">
                  <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Código Fonte Completo</h3>
                  <p className="text-gray-300">Baixe HTML, CSS e JavaScript otimizados para máxima performance.</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Suporte Prioritário</h3>
                  <p className="text-gray-300">Tire dúvidas e receba ajuda especializada quando precisar.</p>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="text-center">
                <Button className="px-12 py-4 text-xl">
                  QUERO ACESSO COMPLETO AGORA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Garantia */}
      <section className="container mx-auto px-4 py-20 bg-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border-green-500/30 rounded-2xl p-8">
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Garantia de <span className="text-green-400">Satisfação Total</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Teste nossa plataforma por 7 dias completos. Se não ficar 100% satisfeito, 
              devolvemos todo seu investimento sem perguntas.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Risco Zero • Garantia Incondicional</span>
            </div>
          </div>
        </div>
      </section>

      {/* Escassez */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm border-red-500/30 rounded-2xl p-8">
            <Timer className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              ⚠️ <span className="text-red-400">OFERTA LIMITADA</span> ⚠️
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Apenas <span className="text-red-400 font-bold">47 vagas restantes</span> para dezembro. 
              Após esgotar, próxima turma apenas em 2025.
            </p>
            <Badge className="bg-red-500 text-white text-lg px-6 py-2 mb-6">
              ÚLTIMAS HORAS • TERMINA EM DEZEMBRO
            </Badge>
            <div className="space-y-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-12 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                GARANTIR MINHA VAGA AGORA
              </Button>
              <p className="text-gray-400 text-sm">⏰ Não perca esta oportunidade única</p>
            </div>
        </div>
      </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Perguntas <span className="text-purple-400">Frequentes</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Preciso saber programação para usar?",
                answer: "Não! Nossa IA faz todo o trabalho técnico. Você só precisa descrever o que quer e pronto."
              },
              {
                question: "Posso usar o código em qualquer servidor?",
                answer: "Sim! O código gerado é 100% seu e funciona em qualquer hospedagem (Hostinger, GoDaddy, etc.)."
              },
              {
                question: "Quantas landing pages posso criar?",
                answer: "Ilimitadas! Crie quantas páginas precisar para todos seus produtos e campanhas."
              },
              {
                question: "E se eu não gostar do resultado?",
                answer: "Garantia total de 7 dias. Se não ficar satisfeito, devolvemos 100% do valor investido."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-bold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre o Criador */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Quem Está Por Trás do <span className="text-purple-400">SiteBoost Brasil</span>
          </h2>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
            <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                SB
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Especialista em Automação e IA</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Desenvolvedor com mais de 8 anos criando soluções que automatizam processos complexos. 
                  Criou o SiteBoost Brasil para democratizar o acesso a landing pages profissionais, 
                  eliminando a barreira técnica que impede pequenos negócios de crescerem online.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Sua Empresa Precisa <span className="text-purple-400">Dessa Solução</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Pare de perder vendas por não ter landing pages profissionais. 
            Comece hoje e veja seus resultados dispararem.
          </p>
          
          <div className="space-y-6">
            <Button className="px-16 py-6 text-2xl">
              CRIAR MINHA PRIMEIRA LANDING PAGE AGORA
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="px-8 py-3">
                QUERO ALGO PERSONALIZADO
              </Button>
              <Button variant="outline" className="px-8 py-3">
                FALAR COM ESPECIALISTA
              </Button>
            </div>
            
            <p className="text-gray-400">
              ✨ Comece grátis • 💳 Sem cartão de crédito • 🛡️ Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">SiteBoost Brasil</span>
          </div>
          <p className="text-gray-400">
            © 2024 SiteBoost Brasil. Transformando ideias em landing pages de alta conversão.
          </p>
        </div>
      </footer>
    </div>
  )
}
