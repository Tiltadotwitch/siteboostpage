"use client"

// Importações Padrões
import { useState, useCallback, useMemo } from 'react';
import React, { ReactNode } from 'react'; // Adicionado ReactNode para tipagem de 'children'

// Ícones do Lucide React
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
  Loader,
  Search,
  Timer,
  Award,
  LineChart, 
  LogIn, 
  UserPlus 
} from "lucide-react"


// --- Variáveis Globais de Firebase/API ---
const apiKey = "" 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;


// --- Interfaces de Tipagem (CORREÇÃO ESSENCIAL) ---

interface CommonProps {
    children: ReactNode;
    className?: string;
}

interface ButtonProps extends CommonProps {
    onClick?: () => void;
    disabled?: boolean;
}

interface CardProps extends CommonProps {}
interface CardContentProps extends CommonProps {}
interface BadgeProps extends CommonProps {}
interface SeparatorProps {
    className?: string;
}
interface RocketIconProps {
    className?: string;
}


// --- Componentes de UI (Simulação de Importação) ---

/**
 * Componente simples de botão.
 */
const Button: React.FC<ButtonProps> = ({ children, className = '', onClick = () => {}, disabled = false }) => (
  <button 
    className={`inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg ${className}`} 
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

/**
 * Componente simples de Card.
 */
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`rounded-xl border shadow-sm ${className}`}>
    {children}
  </div>
);

/**
 * Componente de conteúdo de Card.
 */
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Componente simples de Badge.
 */
const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </div>
);

/**
 * Componente de Separador (linha horizontal).
 */
const Separator: React.FC<SeparatorProps> = ({ className = '' }) => (
  <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} />
);

// --- Novo Componente da Logo de Foguete ---
const RocketIcon: React.FC<RocketIconProps> = ({ className = "w-8 h-8 text-purple-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corpo do Foguete (Rocket Body) - Mais parecido com um foguete real */}
    <path d="M12 2.5L12 18M12 2.5L16 14L12 18L8 14L12 2.5Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" 
          fill="rgba(147, 51, 234, 0.3)" className="text-purple-400 stroke-2"/>
    {/* Chamas (Flames) */}
    <path d="M10 18L12 22L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400" />
    {/* Estabilizadores (Stabilizers) */}
    <path d="M5 14L19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-purple-400" />
    <path d="M19 14L16 18M5 14L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-purple-400" />
    {/* Janela (Window/Detail) */}
    <circle cx="12" cy="7" r="1.5" fill="currentColor" className="text-purple-400" />
  </svg>
);

// --- Componente de Fundo Animado (Background Stars/Digital Flow) ---
const BackgroundStars = () => (
    <style dangerouslySetInnerHTML={{__html: `
        @keyframes star-fall {
            0% { transform: translateY(-100vh); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        .star {
            position: absolute;
            background: #ffffff50;
            border-radius: 50%;
            animation: star-fall linear infinite;
        }
        .star:nth-child(1) { width: 1px; height: 1px; top: 10%; left: 5%; animation-duration: 8s; animation-delay: 1s; }
        .star:nth-child(2) { width: 2px; height: 2px; top: 20%; left: 80%; animation-duration: 12s; animation-delay: 3s; }
        .star:nth-child(3) { width: 1px; height: 1px; top: 50%; left: 30%; animation-duration: 10s; animation-delay: 0s; }
        .star:nth-child(4) { width: 3px; height: 3px; top: 70%; left: 90%; animation-duration: 15s; animation-delay: 5s; }
        .star:nth-child(5) { width: 1px; height: 1px; top: 90%; left: 45%; animation-duration: 9s; animation-delay: 2s; }
        .star:nth-child(6) { width: 2px; height: 2px; top: 35%; left: 15%; animation-duration: 11s; animation-delay: 4s; }
    `}} />
);


// --- Tipos para a Estrutura de Conteúdo ---
interface GeneratedContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  features: string[];
}

// --- Conteúdo Padrão (Fallback) ---
const initialContent: GeneratedContent = {
  headline: "10X MAIS VENDAS COM LANDING PAGE EM 90 SEGUNDOS",
  subheadline: "Cansado de esperar semanas? Nossa IA elimina a complicação, entregando páginas profissionais de alta conversão instantaneamente.",
  ctaText: "LANÇAR MINHA PÁGINA AGORA",
  features: [
    "GERAÇÃO ULTRA RÁPIDA DE COPY",
    "DOWNLOAD DO CÓDIGO FONTE COMPLETO",
    "OTIMIZAÇÃO AUTOMÁTICA PARA SEO",
  ]
};

// Limite de caracteres e gerações para o novo modo de teste grátis 
const CHARACTER_LIMIT = 2500; 
const FREE_TRIAL_DAYS = 3;
const FREE_TRIAL_GENERATIONS = 4;

// --- Estrutura JSON que a IA irá gerar ---
const responseSchema = {
    type: "OBJECT",
    properties: {
        "headline": { "type": "STRING", "description": "Headline principal, curta e impactante, focada no benefício e velocidade. MÁXIMO 12 palavras." },
        "subheadline": { "type": "STRING", "description": "Subtítulo, abordando a dor do cliente e a solução oferecida pela IA. MÁXIMO 20 palavras." },
        "ctaText": { "type": "STRING", "description": "Texto do botão principal de Chamada para Ação. Curto e direto (Ex: QUERO ACESSO AGORA)." },
        "features": {
            "type": "ARRAY",
            "description": "Uma lista de 3 benefícios chave da ferramenta, cada um com um título curto e poderoso. Use APENAS o título.",
            "items": { "type": "STRING" }
        }
    },
    "required": ["headline", "subheadline", "ctaText", "features"]
};

// --- Componente da Landing Page ---
export default function LandingPage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [content, setContent] = useState<GeneratedContent>(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationsCount, setGenerationsCount] = useState(0); // Simula o contador de gerações do trial

  // Manipulador de mudança de input com limite de caracteres
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= CHARACTER_LIMIT) {
      setUserPrompt(value);
      if (error && error.includes('Limite de caracteres')) {
        setError(null);
      }
    } else {
      setError(`Limite de caracteres (${CHARACTER_LIMIT.toLocaleString('pt-BR')}) excedido para o Teste Grátis.`);
    }
  };


  // Função para fazer a chamada à API do Gemini
  const generateContent = useCallback(async () => {
    if (!userPrompt.trim()) {
      setError("Por favor, insira uma descrição do produto ou serviço.");
      return;
    }
    if (generationsCount >= FREE_TRIAL_GENERATIONS) {
        setError(`Limite de ${FREE_TRIAL_GENERATIONS} gerações do Teste Grátis atingido. Faça upgrade para continuar!`);
        return;
    }
    if (userPrompt.length > CHARACTER_LIMIT) {
        setError(`Limite de caracteres (${CHARACTER_LIMIT.toLocaleString('pt-BR')}) excedido para o Teste Grátis.`);
        return;
    }


    setLoading(true);
    setError(null);

    const systemPrompt = `Você é um copywriter de marketing digital focado em alta conversão e IA. Sua tarefa é criar um texto poderoso para uma landing page de vendas. O seu output DEVE ser APENAS o objeto JSON conforme o esquema fornecido.`;
    const userQuery = `Gere uma nova headline, subheadline, texto de CTA e 3 características principais para o seguinte produto/serviço: "${userPrompt}". O foco deve ser em gerar resultados rápidos e eliminar o trabalho manual.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }], 
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    };

    let resultJson: GeneratedContent | null = null;
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
          const jsonText = candidate.content.parts[0].text;
          const parsedJson = JSON.parse(jsonText);
          
          if (parsedJson.headline && parsedJson.subheadline) {
             resultJson = parsedJson as GeneratedContent;
             break; 
          } else {
            // Se o JSON for mal formatado ou incompleto, o Gemini pode falhar na primeira tentativa.
            // É importante relatar isso para tentar novamente.
             throw new Error("Resposta da IA incompleta ou mal formatada.");
          }
        } else {
          throw new Error("A IA não retornou um conteúdo JSON válido.");
        }
      } catch (e) {
        console.error(`Tentativa ${retries + 1} falhou:`, e);
        retries++;
        if (retries < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
        } else {
          setError("Falha ao gerar o conteúdo após várias tentativas. Tente novamente ou ajuste o seu prompt.");
        }
      }
    }
    
    setLoading(false);
    
    if (resultJson) {
        // Incrementa o contador de gerações APENAS se a geração foi bem-sucedida
        setGenerationsCount(prev => prev + 1);
        setContent(resultJson);
    }
  }, [userPrompt, generationsCount]);
  
  const dynamicBenefits = useMemo(() => {
    const baseBenefits = [
      // Manter a estrutura base, mas atualizar os títulos com base no content.features
      { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: content.features[0] || "GERAÇÃO ULTRA RÁPIDA DE COPY", description: "Descrição dinâmica 1 gerada pela IA." },
      { icon: <Download className="w-8 h-8 text-green-400" />, title: content.features[1] || "DOWNLOAD DO CÓDIGO FONTE COMPLETO", description: "Descrição dinâmica 2 gerada pela IA." },
      { icon: <Rocket className="w-8 h-8 text-purple-400" />, title: content.features[2] || "OTIMIZAÇÃO AUTOMÁTICA PARA SEO", description: "Descrição dinâmica 3 gerada pela IA." },
      
      // Benefícios estáticos adicionais que permanecem para preencher a seção
      { icon: <Shield className="w-8 h-8 text-blue-400" />, title: "LANCE CAMPEÕES DE VENDA HOJE", description: "Pare de adiar campanhas. Sua landing page fica pronta antes do café acabar." },
      { icon: <Clock className="w-8 h-8 text-orange-400" />, title: "CRIE VARIAÇÕES ILIMITADAS DE TESTE", description: "Teste diferentes copies e layouts para descobrir o que converte mais, sem custo extra de desenvolvimento." },
      { icon: <Award className="w-8 h-8 text-pink-400" />, title: "DOMINE A COMPETIÇÃO ONLINE", description: "Tenha a tecnologia dos grandes players no seu negócio. Sua página de vendas será imbatível." }
    ];
    return baseBenefits.map((item, index) => ({
      ...item,
      // Garante que os 3 primeiros benefícios usem a copy gerada
      title: content.features[index] || item.title
    }));
  }, [content.features]);

  const charsRemaining = CHARACTER_LIMIT - userPrompt.length;

  return (
    // Div principal que define o fundo e a altura mínima
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Componente de Fundo Animado */}
      <BackgroundStars />
      <div className="absolute inset-0 z-0">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
      </div>

      {/* Conteúdo principal com z-index para ficar acima do fundo animado */}
      <div className="relative z-10">

        {/* Header com CTA - LOGO ATUALIZADA */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Logo do Foguete (Atualizada) */}
            <a href="#" className="flex items-center gap-3"> 
              <RocketIcon className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-black text-white">SiteBoost <span className="font-light">Brasil</span></span>
            </a>
            
            {/* Botões de Entrar/Cadastrar e CTA */}
            <nav className="flex items-center space-x-4">
                <Button className="bg-transparent text-white border border-white/20 hover:border-purple-400 px-4 py-2 hover:text-purple-400 transition-colors hidden sm:inline-flex">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-4 py-2 rounded-lg shadow-xl hover:scale-105 transition-all duration-300">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar
                </Button>
            </nav>
          </div>
        </header>

        {/* --- Seção de Geração de Conteúdo IA --- */}
        <section className="container mx-auto px-4 py-12">
          <Card className="bg-slate-800/70 border-purple-500/50 shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Search className="w-6 h-6 text-purple-400"/>
              Gerador de Conteúdo IA
            </h2>
            <p className="text-gray-300 mb-4">
              Descreva seu produto ou serviço para gerar uma nova cópia de alta conversão. 
              <span className="font-semibold text-yellow-400"> 
                (Teste Grátis: {FREE_TRIAL_DAYS} dias | {FREE_TRIAL_GENERATIONS - generationsCount} gerações restantes)
              </span>
            </p>
            
            <div className="flex flex-col gap-4">
              <textarea
                className="flex-grow p-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all min-h-[120px]"
                placeholder={`Ex: 'Curso online para pais sobre finanças pessoais com IA. O curso dura 6 semanas e ensina como investir para a aposentadoria.' (Máximo ${CHARACTER_LIMIT.toLocaleString('pt-BR')} caracteres)`}
                value={userPrompt}
                onChange={handlePromptChange}
                disabled={loading || generationsCount >= FREE_TRIAL_GENERATIONS}
              />
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 text-base rounded-lg shadow-md disabled:bg-slate-700 disabled:opacity-70 w-full"
                onClick={generateContent}
                disabled={loading || userPrompt.length === 0 || charsRemaining < 0 || generationsCount >= FREE_TRIAL_GENERATIONS}
              >
                {loading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <RocketIcon className="w-5 h-5 mr-2 text-white" />}
                {loading ? 'Gerando...' : 'GERAR'} 
              </Button>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row justify-between items-center">
              <p className={`text-sm ${charsRemaining < 500 ? 'text-red-400' : 'text-gray-400'}`}>
                  Caracteres restantes: {charsRemaining.toLocaleString('pt-BR')} / {CHARACTER_LIMIT.toLocaleString('pt-BR')}
              </p>
              {error && (
                  <p className="text-red-400 text-sm mt-2 sm:mt-0">Erro: {error}</p>
              )}
              {loading && (
                  <p className="text-purple-400 text-sm mt-2 sm:mt-0">Gerando... A IA está pesquisando e criando o copy.</p>
              )}
            </div>

          </Card>
        </section>
        {/* ------------------------------------- */}


        {/* Hero Section - Conteúdo dinâmico */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            
            {/* 1. HEADLINE IMPACTANTE (Dinâmico) */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {/* Split para manter o efeito de cor no final */}
              {content.headline.split(' ').slice(0, -3).join(' ')} 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 
                {content.headline.split(' ').slice(-3).join(' ')}
              </span>
            </h1>
            
            {/* 2. SUBTÍTULO (Dinâmico) */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {content.subheadline}
            </p>

            {/* CTA Principal (Dinâmico) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-12 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                <Rocket className="w-6 h-6 mr-2" />
                {content.ctaText}
              </Button>
              <p className="text-gray-400 text-sm">
                ✨ Comece grátis: {FREE_TRIAL_DAYS} dias e {FREE_TRIAL_GENERATIONS} gerações!
              </p>
            </div>

            {/* Prova Social Rápida (Atualizada) */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-300">
              
              {/* Gerações de Página (Gráfico Subindo) */}
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-400" />
                <span>2.300 gerações de página</span>
              </div>
              
              {/* Usuários Cadastrados */}
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>+1.300 usuários cadastrados</span>
              </div>
              
              {/* Conversão Média */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <span>+340% Conversão Média</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENEFÍCIOS EM BULLETS (Dinâmico) */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto"> 
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Crie em Minutos. <span className="text-purple-400">Venda Imediatamente.</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynamicBenefits.map((benefit, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        {/* O TÍTULO É DINÂMICO */}
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
        
        {/* --- SEÇÃO DE PLANOS DE PREÇOS --- */}
        <section className="container mx-auto px-4 py-20 bg-white/5">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
                Escolha o seu <span className="text-pink-400">Plano de Lançamento</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Plano 1: Starter (Grátis - Atualizado) */}
                <Card className="bg-slate-800/80 border-purple-500/50 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                        <div>
                            <Badge className="bg-purple-600 text-white mb-4">Starter</Badge>
                            <h3 className="text-3xl font-bold text-white mb-2">Teste Grátis</h3>
                            <p className="text-gray-300 text-5xl font-extrabold mb-6">
                                R$ 0<span className="text-base font-normal"> / {FREE_TRIAL_DAYS} dias</span>
                            </p>
                            <ul className="space-y-3 text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> **{FREE_TRIAL_GENERATIONS} Gerações** de página</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Limite de **{CHARACTER_LIMIT.toLocaleString('pt-BR')} caracteres** por prompt</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Acesso total à interface do Gerador IA</li>
                                <li className="flex items-center gap-2 text-gray-500"><LineChart className="w-5 h-5"/> Sem suporte prioritário</li>
                            </ul>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-lg w-full">
                            Começar Grátis
                        </Button>
                    </CardContent>
                </Card>

                {/* Plano 2: Pro (Mais Popular) */}
                <Card className="bg-purple-900/90 border-pink-500 shadow-2xl shadow-pink-500/30 ring-4 ring-pink-500 transition-all duration-500 scale-[1.05]">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                        <div>
                            <Badge className="bg-pink-500 text-white mb-4">MAIS POPULAR</Badge>
                            <h3 className="text-3xl font-bold text-white mb-2">Plano Pro</h3>
                            <p className="text-yellow-400 text-5xl font-extrabold mb-6">
                                R$ 79,90<span className="text-base font-normal"> / mês</span>
                            </p>
                            <ul className="space-y-3 text-white mb-8">
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> **Gerações Ilimitadas** (Sem limite de caracteres)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Download ilimitado do código</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Suporte Básico por Email</li>
                                <li className="flex items-center gap-2 text-gray-300"><Shield className="w-5 h-5"/> Sem recurso de Arte Única</li>
                            </ul>
                        </div>
                        <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-lg w-full">
                            Assinar Pro
                        </Button>
                    </CardContent>
                </Card>

                {/* Plano 3: Premium (Arte Única) */}
                <Card className="bg-slate-800/80 border-purple-500/50 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                        <div>
                            <Badge className="bg-yellow-500 text-black mb-4">Premium</Badge>
                            <h3 className="text-3xl font-bold text-white mb-2">Arte Única</h3>
                            <p className="text-gray-300 text-5xl font-extrabold mb-6">
                                R$ 149,90<span className="text-base font-normal"> / mês</span>
                            </p>
                            <ul className="space-y-3 text-gray-300 mb-8">
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> **Gerações Ilimitadas** (Sem limite de caracteres)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Todos os recursos do Plano Pro</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> **Recurso de Arte Única** (Premium)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400"/> Suporte Prioritário (24/7)</li>
                            </ul>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-lg w-full">
                            Assinar Premium
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
        {/* ------------------------------------- */}


        {/* 4. PROVA SOCIAL (DEPOIMENTOS) - Estático */}
        <section className="container mx-auto px-4 py-20 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Resultados Reais: O Que Nossos <span className="text-purple-400">Clientes Conquistaram</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Carlos Mendes",
                  role: "CEO, TechStart",
                  result: "Aumentei 280% as vendas",
                  feature: "A facilidade de download do código é imbatível",
                  feeling: "Nunca imaginei lançar um produto em um único dia. Incrível!",
                  rating: 5
                },
                {
                  name: "Ana Paula Silva",
                  role: "Marketing Digital",
                  result: "Economizei R$ 15.000 em dev",
                  feature: "A inteligência artificial gera copies que realmente vendem",
                  feeling: "Minha agência agora escala projetos 10x mais rápido. Essencial.",
                  rating: 5
                },
                {
                  name: "Roberto Costa",
                  role: "E-commerce Owner",
                  result: "Lancei 5 produtos em 1 semana",
                  feature: "Os templates são otimizados e mobile-first",
                  feeling: "Finalmente posso competir no nível dos grandes e-commerces.",
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

        {/* 5. OFERTA DIRETA (PRODUTO) - Estático */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Tudo Que Você Recebe <span className="text-purple-400">Ao Entrar Agora</span>
            </h2>
            
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/30 p-8">
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Plataforma de IA Ilimitada</h3>
                    <p className="text-gray-300">Crie landing pages ilimitadas, sem restrições ou créditos para acabar.</p>
                  </div>
                  <div className="text-center">
                    <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Código Fonte Completo</h3>
                    <p className="text-gray-300">Você recebe o projeto completo para hospedar onde quiser e ter controle total.</p>
                  </div> 
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Atualizações e Suporte</h3>
                    <p className="text-gray-300">Você recebe acesso às novidades da IA e suporte dedicado para qualquer dúvida.</p>
                  </div>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div className="text-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-12 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                    {content.ctaText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="container mx-auto px-4 py-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SiteBoost Brasil. Todos os direitos reservados. | <a href="#" className="hover:text-purple-400 transition-colors">Termos de Uso</a> | <a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidade</a></p>
        </footer>

      </div>
    </div>
  );
}
        {/* 6. GARANTIA DE SATISFAÇÃO - Estático */}
        <section className="container mx-auto px-4 py-20 bg-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border-green-500/30 rounded-2xl p-8">
              <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Risco Zero: Garantia Incondicional de <span className="text-green-400">7 Dias</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Teste a SiteBoost Brasil por 7 dias completos. Se a sua primeira Landing Page não for a melhor que você já viu, devolvemos 100% do seu investimento.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Sua satisfação ou seu dinheiro de volta.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Escassez - ATUALIZADO (Referência do Rodapé) */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm border-red-500/30 rounded-2xl p-8">
              <Timer className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                ⚠️ <span className="text-red-400">OFERTA ESPECIAL VÁLIDA POR TEMPO LIMITADO</span> ⚠️
              </h2>
              <p className="text-xl text-gray-300 mb-6 font-semibold">
                Lembre-se: Você pode testar **GRÁTIS por {FREE_TRIAL_DAYS} dias** com limite de **{FREE_TRIAL_GENERATIONS} gerações** de página!
              </p>
              <p className="text-lg text-yellow-300 mb-6">
                 Esta oferta de Acesso Ilimitado tem apenas **47 vagas restantes** para novos membros. Garanta a sua e trave o preço de lançamento.
              </p>
              
              <div className="space-y-4">
                
                {/* 7. CHAMADA FINAL (CTA) - Dinâmico */}
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-12 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  {content.ctaText}
                </Button>
                <p className="text-gray-400 text-sm">⏰ Não perca esta oportunidade única de escala.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner de Inauguração - Mantido */}
        <section className="container mx-auto px-4 pt-10 pb-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/50 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <Award className="w-6 h-6 text-yellow-400" />
                        GRANDE INAUGURAÇÃO!
                    </h3>
                    <p className="text-gray-300">
                        Estamos em fase de lançamento. Os primeiros assinantes do Plano Pro/Premium recebem **3 meses de bônus**! Aproveite as vantagens exclusivas da nossa fase inicial.
                    </p>
                </div>
            </div>
        </section>


        {/* FAQ e Footer - Mantido como estava originalmente */}
        <section className="container mx-auto px-4 py-20 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Perguntas <span className="text-purple-400">Frequentes</span>
            </h2>
            
            {/* NOVO: OFERTA 300 CADASTROS COM 50% DE DESCONTO */}
            <p className="text-center text-lg text-yellow-400 font-medium mb-10 p-3 bg-purple-900/50 rounded-xl shadow-inner border border-yellow-500/50">
                ⭐ **PROVA SOCIAL**: Temos **mais de 300 cadastros** e estamos oferecendo **50% de desconto** nas primeiras assinaturas!
            </p>

            <div className="space-y-6">
                
                {/* NOVO: FAQ Item - Compra Direta */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                        <details>
                            <summary className="text-white font-bold text-lg cursor-pointer flex items-center">
                                Consigo comprar direto no site?
                            </summary>
                            <p className="mt-4 text-gray-300 border-t border-white/20 pt-4">
                                Sim, você consegue comprar **diretamente no site**! Nosso sistema de checkout é seguro (via SSL), rápido e processa a ativação da sua conta de forma imediata após a confirmação do pagamento.
                            </p>
                        </details>
                    </CardContent>
                </Card>

                {/* FAQ Item 1 */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                        <details>
                            <summary className="text-white font-bold text-lg cursor-pointer flex items-center">
                                Preciso saber programação para usar?
                            </summary>
                            <p className="mt-4 text-gray-300 border-t border-white/20 pt-4">
                                Não! Nossa IA faz todo o trabalho técnico. Você só precisa descrever o que quer e pronto.
                            </p>
                        </details>
                    </CardContent>
                </Card>
                
                {/* FAQ Item 2 */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                        <details>
                            <summary className="text-white font-bold text-lg cursor-pointer flex items-center">
                                Posso usar o código em qualquer servidor?
                            </summary>
                            <p className="mt-4 text-gray-300 border-t border-white/20 pt-4">
                                Sim! O código gerado é 100% seu e funciona em qualquer hospedagem (Hostinger, GoDaddy, Vercel, etc.).
                            </p>
                        </details>
                    </CardContent>
                </Card>
                
                {/* FAQ Item 3 */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                        <details>
                            <summary className="text-white font-bold text-lg cursor-pointer flex items-center">
                                Quantas landing pages posso criar?
                            </summary>
                            <p className="mt-4 text-gray-300 border-t border-white/20 pt-4">
                                Ilimitadas nos planos pagos! O plano Grátis oferece **{FREE_TRIAL_GENERATIONS} gerações** e tem limite de caracteres por geração.
                            </p>
                        </details>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* CTA Final 2 - Dinâmico */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-8">
              Pare de Esperar. <span className="text-purple-400">Comece a Vender.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Garanta sua vaga hoje e tenha acesso ilimitado à ferramenta que está revolucionando o mercado de Marketing Digital.
            </p>
            
            <div className="space-y-6">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-16 py-6 text-2xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                {content.ctaText}
              </Button>
              
              <p className="text-gray-400">
                ✨ **Teste Grátis por {FREE_TRIAL_DAYS} dias** • 💳 Sem cartão de crédito • 🛡️ Garantia de 7 dias
              </p>
            </div>
          </div>
        </section>

        {/* Footer - Estático */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/20">
          <div className="text-center">
            <a href="#" className="flex items-center justify-center gap-3 mb-4"> 
              <RocketIcon className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">SiteBoost <span className="font-light">Brasil</span></span>
            </a>
            <p className="text-gray-400">
              © 2024 SiteBoost Brasil. Transformando descrições simples em Landing Pages de Alta Conversão.
            </p>
          </div>
        </footer>
      </div>
      {/* Fim da Div principal (min-h-screen) */}
    </div> 
  )
}
