'use client'; // ESSENCIAL: Transforma este arquivo num Client Component

import React, { useState, useEffect, useRef } from 'react';

// --- DEFINIÇÕES GLOBAIS PARA THREE.JS ---
// Declaramos a variável global THREE para que o TypeScript a reconheça
declare global {
  interface Window {
    THREE: any; 
  }
}
let THREE: any | undefined; 

// --- CONFIGURAÇÃO E DADOS ---
const BG_COLOR = '#0a0a0a'; 

const cardData = [
  {
    title: "Performance Inigualável",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
    description: "Utilizamos as mais recentes otimizações de código e arquitetura sem servidor para garantir velocidade de carregamento instantânea.",
  },
  {
    title: "Design de Alto Contraste",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v14M9 19a2 2 0 002 2h2a2 2 0 002-2m-8-8a2 2 0 11-4 0 2 2 0 014 0zM12 4a2 2 0 100 4 2 2 0 000-4z"></path>
      </svg>
    ),
    description: "O esquema de cores Black/Roxo não só é moderno, mas também otimizado para a visibilidade em qualquer dispositivo e condição de luz.",
  },
  {
    title: "Integração Imediata",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10m0 0h16M4 17l16-10M4 7l16 10M12 12h8m-4 0h-4"></path>
      </svg>
    ),
    description: "O código modular e limpo permite que você integre esta Landing Page em qualquer framework ou sistema de gestão de conteúdo.",
  },
];


const pricingPlans = [
  {
    name: "Plano Template",
    price: "R$ 49/mês",
    description: "Acesso a templates otimizados para lançamentos rápidos.",
    features: [
      "Acesso a 1 template premium",
      "5GB de armazenamento SSD",
      "Suporte via email (48h)",
      "Análises básicas de tráfego",
      "Certificado SSL gratuito"
    ],
    isPopular: false,
  },
  {
    name: "Criação Ouro",
    price: "R$ 149/mês",
    description: "Criação profissional e acompanhamento para pequenos negócios.",
    features: [
      "Landing Page customizada (1x)",
      "50GB de armazenamento SSD",
      "Suporte prioritário 24/7",
      "Análises avançadas e relatórios",
      "Domínio gratuito por 1 ano"
    ],
    isPopular: true,
  },
  {
    name: "Enterprise Custom",
    price: "Personalizado",
    description: "Soluções completas de criação e infraestrutura.",
    features: [
      "Tudo do Plano Criação Ouro",
      "Armazenamento e largura de banda ilimitados",
      "Consultoria de performance dedicada",
      "Infraestrutura de alta disponibilidade",
      "Integrações de API customizadas"
    ],
    isPopular: false,
  },
];

const testimonials = [
  {
    quote: "O SiteBoost transformou a forma como lançamos produtos. A velocidade de carregamento é incomparável, e o design é puro alto contraste.",
    name: "Ana Costa",
    title: "CEO, TechNova",
  },
  {
    quote: "Consegui subir minha taxa de conversão em 40% apenas usando o SiteBoost. Simplesmente o melhor investimento que fizemos em criação de páginas.",
    name: "Bruno Lima",
    title: "Marketing Lead, Alpha Digital",
  },
  {
    quote: "A facilidade de uso é incrível. Em poucas horas, tínhamos uma landing page profissional e otimizada rodando. Recomendo muito!",
    name: "Carla Pires",
    title: "Desenvolvedora Frontend",
  },
];

const faqs = [
  {
    question: "Como funciona o processo de criação de Landing Page?",
    answer: "O processo começa com a sua solicitação de orçamento. Analisamos as suas necessidades, propomos um design (baseado no SiteBoost ou totalmente customizado) e, após a aprovação, a nossa equipa de desenvolvimento entrega o projeto pronto a usar."
  },
  {
    question: "Quais linguagens de programação são usadas?",
    answer: "As Landings Pages são construídas em React (Next.js) e estilizadas com Tailwind CSS para garantir a máxima velocidade e performance no Google PageSpeed Insights. O fundo 3D usa a biblioteca Three.js."
  },
  {
    question: "O template é realmente responsivo?",
    answer: "Sim, todos os componentes e projetos criados são construídos com foco total em design responsivo, garantindo uma visualização perfeita em qualquer dispositivo (mobile, tablet, desktop)."
  },
  {
    question: "Existe alguma garantia de satisfação na criação?",
    answer: "Sim, oferecemos revisões ilimitadas durante a fase de desenvolvimento e uma garantia de 30 dias após a entrega, para garantir que está 100% satisfeito com o resultado final."
  },
];


const RainbowStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes color-cycle {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .fast-rainbow-text {
      background: linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #8a2be2);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: color-cycle 5s linear infinite; 
    }

    .purple-rainbow-text {
      background: linear-gradient(120deg, #8a2be2, #ff00ff, #ff69b4, #8a2be2);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: color-cycle 10s ease infinite; 
    }
    
    .smooth-rainbow-text {
      background: linear-gradient(120deg, #6366f1, #a855f7, #ec4899, #6366f1);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: color-cycle 12s ease-in-out infinite; 
    }
  `}} />
);

// --- COMPONENTE DE FUNDO 3D (PARTÍCULAS) - CORRIGIDO PARA HYDRATION ---

const ParticlesBackground: React.FC = () => {
  // Estado para garantir que a inicialização 3D só ocorre no lado do cliente
  const [isClient, setIsClient] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Confirma que estamos no ambiente do cliente
    setIsClient(true);

    // 2. Verifica se a biblioteca THREE.js foi carregada
    if (typeof window === 'undefined' || !window.THREE) {
      // console.warn("THREE.js não carregado. O fundo 3D não será exibido.");
      return;
    }
    
    // Atribui a variável global ao escopo local
    THREE = window.THREE;
    if (!mountRef.current) return;

    let scene: any, camera: any, renderer: any;
    let particles: any;
    let animationId: number;

    const init = () => {
      // Configuração da Cena, Câmera e Renderer (padrão Three.js)
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); 
      mountRef.current?.appendChild(renderer.domElement);

      // Criação das Partículas (Geometria, Posições e Cores)
      const particleCount = 2000; 
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        // Posições aleatórias
        positions[i * 3] = (Math.random() - 0.5) * 12; 
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

        // Cores (Roxo, Cinza, Rosa)
        const randomColor = Math.random();
        if (randomColor < 0.5) {
            color.setHex(0x8a2be2); 
        } else if (randomColor < 0.9) {
            color.setHex(0xaaaaaa); 
        } else {
            color.setHex(0xff69b4); 
        }
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02, 
        vertexColors: true,
        blending: THREE.AdditiveBlending, 
        transparent: true,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Animação de rotação e leve movimento
      particles.rotation.x += 0.00008; 
      particles.rotation.y += 0.0001; 
      
      // Simulação de "vibração" das partículas (uso de Date.now() / Math.sin())
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += Math.sin(Date.now() * 0.000005 + i) * 0.00005;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Tenta inicializar e animar
    try {
        init();
        animate();
    } catch (error) {
        console.error("Erro ao inicializar Three.js:", error);
    }

    // Função de limpeza (cleanup) para desmontagem
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) {
          renderer.dispose();
      }
      if (particles) {
        if (particles.geometry) particles.geometry.dispose();
        if (particles.material) (particles.material as any).dispose(); 
      }
    };
  }, []); // Efeito executa apenas na montagem do cliente

  // Retorna um placeholder fixo que é o mesmo no SSR e no Cliente, 
  // evitando a discrepância de HTML que causa o Hydration Error.
  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: BG_COLOR, filter: 'blur(1px)' }} 
    />
  );
};


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 backdrop-blur-md bg-white/90 border-b border-gray-300/80 shadow-lg text-gray-900">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold fast-rainbow-text">
          SiteBoost
        </h1>

        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#creation" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Criação Customizada
          </a>
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Funcionalidades
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Planos
          </a>
          <a href="#faq" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            FAQ
          </a>
          <a href="#creation" className="ml-4 px-6 py-2 font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-[1.05] bg-indigo-600 hover:bg-indigo-500 text-white ring-2 ring-indigo-400">
            Criar Agora
          </a>
        </nav>

        <button
          className="md:hidden text-gray-800 hover:text-indigo-600 z-50" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="fixed inset-0 top-[4.5rem] md:hidden space-y-3 p-8 rounded-none bg-gray-950/98 backdrop-blur-sm text-white overflow-y-auto">
          {['Criação Customizada', 'Funcionalidades', 'Planos', 'FAQ'].map((title) => {
             const id = title.toLowerCase().replace(/ /g, '-').replace('çãocustomizada', 'creation');
            return (
              <a
                key={id}
                href={`#${id.includes('criação') ? 'creation' : id}`}
                className="block text-gray-300 hover:text-pink-400 transition-colors font-semibold text-2xl p-3 border-b border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {title}
              </a>
          )})}
          <a href="#creation" className="w-full mt-6 px-6 py-3 font-bold text-center rounded-xl shadow-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-white block text-2xl">
            Criar Agora
          </a>
        </nav>
      )}
    </header>
  );
};

const Hero: React.FC = () => (
  <section className="relative h-[90vh] flex items-center justify-center text-center p-4 pt-20">
    <div className="z-10 max-w-5xl space-y-8">
      <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter">
        <span className="block smooth-rainbow-text">
          Crie seu site de conversão em dois minutos
        </span>
      </h2>
      <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
        Não apenas templates. Projetamos Landings Pages com design **Black/Roxo** de alto contraste, otimizadas para a conversão máxima do seu negócio.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
        <a href="#creation" className="px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-[1.05] bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-400/50">
          Criar Agora
        </a>
        <a href="#features" className="px-10 py-4 text-xl font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.05] bg-gray-700/50 hover:bg-gray-700/80 text-gray-200 ring-2 ring-gray-600">
          Explorar Funcionalidades
        </a>
      </div>
    </div>
  </section>
);

const Features: React.FC = () => (
  <section id="features" className="relative z-10 py-24 px-4 bg-transparent border-t border-indigo-900/50">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-5xl font-extrabold mb-4 purple-rainbow-text">
        Design. Velocidade. Conversão.
      </h3>
      <p className="text-2xl text-gray-400 mb-20 max-w-3xl mx-auto">
        Cada pixel do SiteBoost é projetado para capturar a atenção e maximizar os seus resultados de vendas.
      </p>

      <div className="grid md:grid-cols-3 gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="p-8 rounded-[2rem] border-2 border-indigo-700/60 bg-gray-900/70 backdrop-blur-lg shadow-xl transition-all duration-500 
                       hover:border-pink-500/80 hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] transform hover:scale-[1.02]"
          >
            <div className="mb-6 p-3 w-max rounded-xl bg-indigo-700/30 ring-2 ring-indigo-500/50 mx-auto">
                {card.icon}
            </div>
            <h4 className="text-2xl font-bold mb-3 text-gray-100">{card.title}</h4>
            <p className="text-gray-400 font-light">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing: React.FC = () => (
  <section id="pricing" className="relative z-10 py-24 px-4 bg-transparent">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-5xl font-extrabold mb-4 purple-rainbow-text">
        Planos de Criação & Templates
      </h3>
      <p className="text-2xl text-gray-400 mb-20 max-w-3xl mx-auto">
        Escolha entre um template pronto ou a nossa equipa para criar o seu próximo sucesso.
      </p>

      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-[2rem] border-2 border-indigo-900 bg-gray-900/80 backdrop-blur-lg shadow-2xl flex flex-col transition-all duration-500 hover:border-pink-500/80 ${
              plan.isPopular
                ? 'ring-4 ring-pink-500/70 transform scale-[1.05] shadow-[0_0_40px_rgba(255,105,180,0.6)]'
                : 'hover:ring-2 hover:ring-indigo-600/50'
            }`}
          >
            {plan.isPopular && (
              <span className="mb-4 text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 py-1 px-3 rounded-full self-center">
                Mais Solicitado
              </span>
            )}
            <h4 className="text-3xl font-bold text-gray-100 mb-2">{plan.name}</h4>
            <p className="text-gray-400 mb-6">{plan.description}</p>
            <p className="text-5xl font-extrabold text-white mb-8">
              {plan.price.includes('/') ? (
                <>
                  {plan.price.split('/')[0]}<span className="text-2xl font-normal text-indigo-400">/{plan.price.split('/')[1]}</span>
                </>
              ) : (
                plan.price
              )}
            </p>

            <ul className="space-y-3 text-left mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className='font-light'>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#creation"
              className={`w-full py-4 mt-auto text-xl font-bold rounded-xl text-center transition-all duration-300 transform hover:scale-[1.02] block ${
                plan.isPopular
                  ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-xl shadow-pink-500/50 ring-2 ring-white/50' 
                  : 'bg-gray-700/60 hover:bg-gray-700 text-gray-300 border border-gray-600'
              }`}
            >
              {plan.isPopular ? "Criar Agora & Dominar" : "Explorar Plano"}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" className="relative z-10 py-24 px-4 bg-transparent border-t border-indigo-900/50">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-5xl font-extrabold mb-4 purple-rainbow-text">
        O que dizem os nossos clientes
      </h3>
      <p className="text-2xl text-gray-400 mb-20 max-w-3xl mx-auto">
        A prova de que a criação do SiteBoost entrega resultados reais e maximiza a conversão.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl border border-gray-700/50 bg-gray-900/90 shadow-xl transition-all duration-500 hover:shadow-purple-500/30 flex flex-col justify-between"
          >
            <svg className="w-10 h-10 text-indigo-400 mb-6 opacity-70" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.75 22.75h-3.5a1.25 1.25 0 01-1.25-1.25v-8.5a1.25 1.25 0 011.25-1.25h3.5a1.25 1.25 0 011.25 1.25v8.5a1.25 1.25 0 01-1.25 1.25zM20.75 22.75h-3.5a1.25 1.25 0 01-1.25-1.25v-8.5a1.25 1.25 0 011.25-1.25h3.5a1.25 1.25 0 011.25 1.25v8.5a1.25 1.25 0 01-1.25 1.25z" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            <p className="text-xl italic text-gray-200 mb-8 font-light leading-relaxed">
              "{t.quote}"
            </p>
            <div>
              <p className="font-bold text-indigo-300">{t.name}</p>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-semibold text-gray-200 hover:text-indigo-400 transition-colors">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <p className="mt-4 text-gray-400 pr-8 transition-all duration-500 ease-in-out">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQ: React.FC = () => (
  <section id="faq" className="relative z-10 py-24 px-4 bg-transparent border-t border-indigo-900/50">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-5xl font-extrabold mb-4 text-center purple-rainbow-text">
        Perguntas Frequentes
      </h3>
      <p className="text-2xl text-gray-400 mb-16 text-center">
        As respostas para as suas dúvidas mais comuns sobre criação de Landings Pages.
      </p>

      <div className="space-y-4 bg-gray-900/70 p-8 rounded-3xl border border-indigo-700/50 shadow-2xl">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

const RequestCreationSection: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulário de criação submetido (simulado)."); 
    };
    
    return (
        <section id="creation" className="relative z-10 py-24 px-4 text-center bg-transparent border-t border-indigo-900/50">
            <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gray-900/70 border-4 border-indigo-500/50 shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-4">
                    <span className="block purple-rainbow-text">TRANSFORME VISITANTES</span>
                    <span className="block text-gray-100 text-6xl sm:text-7xl md:text-8xl">EM CLIENTES PAGANTES.</span>
                </h3>
                
                <p className="text-xl text-green-400 mb-6 font-semibold">
                   Até mesmo iniciantes sem experiência conseguem gerar páginas de alta conversão com nossa IA.
                </p>

                <p className="text-xl text-indigo-200 mb-4">
                    Diga-nos o que precisa. A nossa equipa irá criar a Landing Page perfeita, do zero, para o seu produto ou serviço.
                </p>
                <p className="text-lg text-gray-400 font-medium mb-10 italic">
                   Entregamos uma página **Premium** e otimizada, ideal para **Designers**, **Gestores de Tráfego** e **Criadores de Site** que exigem o melhor desempenho para os seus clientes.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="O seu Nome/Empresa"
                        className="w-full p-4 rounded-xl bg-gray-800 text-gray-100 border border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors"
                        required
                    />
                     <input
                        type="email"
                        placeholder="O seu Email Principal"
                        className="w-full p-4 rounded-xl bg-gray-800 text-gray-100 border border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors"
                        required
                    />
                    <textarea
                        placeholder="Descreva o seu projeto (e.g., 'Preciso de uma LP para um e-book de fitness...')"
                        rows={4}
                        className="w-full p-4 rounded-xl bg-gray-800 text-gray-100 border border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none transition-colors"
                        required
                    ></textarea>
                    
                    <button
                        type="submit"
                        className="w-full px-12 py-4 text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-[1.03] bg-indigo-500 hover:bg-indigo-400 text-white ring-4 ring-white/50"
                    >
                        Criar Agora
                    </button>
                </form>
            </div>
        </section>
    );
};


const Footer: React.FC = () => (
  <footer className="relative z-10 py-10 px-4 bg-gray-950/90 border-t border-indigo-900/50">
    <div className="max-w-7xl mx-auto text-center">
      <p className="text-gray-600 text-sm">
        © 2024 SiteBoost. Todos os direitos reservados. Design e Criação de Landings Pages por Gemini.
      </p>
      <div className="mt-4 space-x-4">
        <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors text-sm">
          Política de Privacidade
        </a>
        <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors text-sm">
          Termos de Serviço
        </a>
      </div>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL DO ARQUIVO ---

export default function SiteBoost() {
    // isThreeLoaded verifica se o script do Three.js foi injetado (via CDN)
    const [isThreeLoaded, setIsThreeLoaded] = useState(false);
    // isClient garante que estamos no navegador (Client-Side)
    const [isClient, setIsClient] = useState(false); 

    // Efeito para carregar o script do Three.js e setar isClient
    useEffect(() => {
        setIsClient(true); // O componente montou, estamos no cliente.

        if (typeof window === 'undefined') return;

        // Se o THREE já estiver na janela, apenas setamos a flag
        if (window.THREE) {
            THREE = window.THREE;
            setIsThreeLoaded(true);
            return;
        }

        // Caso contrário, injeta o script do Three.js via CDN (para evitar o 'Module Not Found' do npm)
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            if (window.THREE) {
                THREE = window.THREE;
                setIsThreeLoaded(true); 
            }
        };
        document.head.appendChild(script);

        return () => {
            // Limpa o script ao desmontar o componente, se necessário
            document.head.removeChild(script);
        };
    }, []);

  return (
    <div className="absolute top-0 w-full min-h-screen antialiased font-sans text-gray-100 z-[100]" style={{ backgroundColor: BG_COLOR }}>
      
      <RainbowStyles />

      {/* RENDERIZAÇÃO CONDICIONAL: O fundo 3D só aparece se for cliente E se o Three.js estiver pronto. */}
      {isClient && isThreeLoaded && <ParticlesBackground />}
      
      <Header />
      <main className="relative z-10 pt-[5.5rem] md:pt-[6rem] overflow-hidden"> 
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <RequestCreationSection /> 
      </main>
      <Footer />
    </div>
  );
}
