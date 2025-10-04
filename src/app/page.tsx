"use client"; // ESSENTIAL: Allows the use of state and effect hooks (useState, useEffect)

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Declare external libraries loaded via CDN to avoid TypeScript errors
declare const THREE: any; 
declare const Tone: any; 

// --- DATA DEFINITIONS AND CUSTOM STYLES ---

// Basic typing for FAQ items and Plans
interface FaqItemData {
    id: number;
    question: string;
    answer: string;
}

interface PlanData {
    name: string;
    description: string;
    price: string;
    isPopular: boolean;
    borderClass: string;
    shadowClass: string;
    features: { text: string; isIncluded: boolean; colorClass: string }[];
    buttonText: string;
}

// FAQ Data
const faqItems: FaqItemData[] = [
    { id: 1, question: "Preciso ser um desenvolvedor para usar o SiteBoost?", answer: "Absolutamente não. Nosso processo é 100% passo a passo, projetado para que agências, profissionais de marketing e até mesmo iniciantes possam criar landing pages de nível profissional com a mesma qualidade de um sênior." },
    { id: 2, question: "O código gerado é compatível com todos os navegadores e dispositivos?", answer: "Sim. A SiteBoost gera código moderno (HTML5/CSS3/ES6), otimizado com classes do Tailwind CSS e com uma arquitetura Mobile First, garantindo compatibilidade e performance." },
    { id: 3, question: "Quais são as vantagens do código ser gerado em 'Arquitetura Única'?", answer: "Gerar a aplicação completa em um único arquivo (HTML, CSS e JS juntos; ou React/Angular Component) maximiza a portabilidade, agiliza a implantação e melhora a velocidade de carregamento (Core Web Vitals)." },
    { id: 4, question: "Posso solicitar códigos em frameworks específicos (React, Angular)?", answer: "Sim. Os planos Pro e Enterprise suportam a geração de código para diversos frameworks, incluindo React (JSX), Angular (TypeScript/Signals) e Vue.js, sempre mantendo a arquitetura em um único arquivo." },
];

// Tailwind style classes
const neonCyan = 'text-[#00ffff]';
const neonMagenta = 'text-[#ff007f]';
const accentCyan = 'text-[#00ffff]';
const accentMagenta = 'text-[#ff007f]';

// Plan Data
const plans: PlanData[] = [
    {
        name: "Iniciante",
        description: "Comece a explorar e a gerar receita",
        price: "79,90",
        isPopular: true,
        borderClass: 'border-accent-magenta/80',
        shadowClass: 'shadow-accent-magenta/40',
        features: [
            { text: "Acesso à I.A. Básica de Geração", isIncluded: true, colorClass: neonCyan },
            { text: "Geração de Código HTML/CSS", isIncluded: true, colorClass: neonCyan },
            { text: "10 Projetos por Mês", isIncluded: true, colorClass: neonCyan },
            { text: "Animações Complexas (GSAP)", isIncluded: false, colorClass: neonMagenta },
        ],
        buttonText: "Assinar por R$ 79,90"
    },
    {
        name: "Pro",
        description: "Crie para seus clientes sem limites",
        price: "197,90",
        isPopular: false,
        borderClass: 'border-cyan-400/80',
        shadowClass: 'shadow-cyan-400/40',
        features: [
            { text: "Geração Ilimitada (Fair Use)", isIncluded: true, colorClass: neonCyan },
            { text: "Geração de Frameworks (React, Angular)", isIncluded: true, colorClass: neonCyan },
            { text: "Animações Premium (GSAP/Three.js)", isIncluded: true, colorClass: neonCyan },
            { text: "Otimização Máxima de SEO e Velocidade", isIncluded: true, colorClass: neonCyan },
            { text: "Prioridade na Fila de Geração", isIncluded: true, colorClass: neonCyan },
        ],
        buttonText: "Escolher Plano Pro"
    },
    {
        name: "Enterprise / Personalizado",
        description: "Para grandes agências, integração de sistemas e criadores de conteúdo",
        price: "Sob Consulta",
        isPopular: false,
        borderClass: 'border-blue-400/80',
        shadowClass: 'shadow-blue-400/40',
        features: [
            { text: "Modelo I.A. Dedicado e Customizável", isIncluded: true, colorClass: neonCyan },
            { text: "Integração com APIs Próprias e CMS", isIncluded: true, colorClass: neonCyan },
            { text: "Treinamento com Padrões de Código Internos", isIncluded: true, colorClass: neonCyan },
            { text: "Plano Personalizado de recursos e SLAs", isIncluded: true, colorClass: neonCyan },
        ],
        buttonText: "Entre em Contato"
    }
];


// --- AUXILIARY COMPONENTS ---

// FaqItem component for the Accordion (Now with zoom on hover and no scroll-reveal)
interface FaqItemProps extends FaqItemData {
    activeId: number | null;
    setActiveId: React.Dispatch<React.SetStateAction<number | null>>;
}
const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer, activeId, setActiveId }) => {
    const isActive = activeId === id;
    
    const toggleFaq = () => setActiveId(isActive ? null : id);

    return (
        <div 
            // Added transform and hover:scale-[1.02] for the subtle zoom effect
            className={`border-2 rounded-xl p-4 transition-all duration-500 shadow-2xl transform hover:scale-[1.02] cursor-pointer
            ${isActive 
                ? 'border-cyan-400/60 bg-[#1a053c]/30 shadow-cyan-400/30 backdrop-blur-sm' 
                : 'border-gray-800/40 bg-[#1a053c]/10 hover:border-red-500/30'
            }`}
        >
            <button 
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={toggleFaq}
            >
                <span className={`text-xl font-semibold font-title ${isActive ? 'rainbow-text' : 'text-gray-200'}`}>{question}</span>
                <span className={`transform transition-transform duration-300 ml-4 ${isActive ? 'rotate-180 text-cyan-400' : 'rotate-0 text-gray-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-300 pl-2 border-l-2 border-red-500/50 py-1">{answer}</p>
            </div>
        </div>
    );
};

// Component to display animated counters
const CounterBox: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    // Effect to start the counter when it enters the viewport
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let startTimestamp: number | null = null;
                const duration = 2000; 

                const step = (timestamp: number) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = timestamp - startTimestamp;
                    const percentage = Math.min(progress / duration, 1);
                    setCount(Math.floor(percentage * value));

                    if (percentage < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [value]);

    return (
        <div ref={ref} className="text-center p-6 bg-[#1a053c]/40 rounded-xl border-t-4 border-[#00ffff]/60 shadow-xl transition-opacity duration-1000 opacity-100">
            <div className={`text-5xl font-title font-bold mb-1 ${neonCyan}`}>
                {count.toLocaleString('pt-BR')}{suffix}
            </div>
            <p className="text-lg text-gray-300">{label}</p>
        </div>
    );
};


// --- MAIN LANDING PAGE COMPONENT ---

const LandingPage: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const synthRef = useRef<any>(null);
    
    // Three.js variables stored in Ref for persistence and mutability
    const sceneRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const starGeoRef = useRef<any>(null);
    const starsRef = useRef<any>(null);
    
    // Used to store the animation frame ID for the Three.js loop
    const animationFrameIdRef = useRef<number | null>(null); 
    
    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);
    const starCount = 6000;

    // --- 1. AUDIO FUNCTIONS (TONE.JS) ---

    // Initializes the synthesizer when Tone.js is available
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof (window as any).Tone !== 'undefined') {
            const Tone = (window as any).Tone;
            synthRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "sine" },
                envelope: {
                    attack: 0.005, decay: 0.1, sustain: 0.05, release: 0.5
                }
            }).toDestination();
            // console.log("Tone.js loaded successfully.");
        }
    }, []);

    // Memoized function to play a note
    const playSynthNote = useCallback((note = 'C4') => {
        if (synthRef.current && typeof window !== 'undefined' && typeof (window as any).Tone !== 'undefined') {
            const Tone = (window as any).Tone;
            // Ensures the audio context is started by user interaction
            if (Tone.context.state !== 'running') {
                Tone.start(); 
                // console.log("Tone.js Audio Context started.");
            }
            synthRef.current.triggerAttackRelease(note, "16n");
        }
    }, []);


    // --- 2. ANIMATION FUNCTIONS (THREE.JS) ---

    // Animation loop function
    const animate = useCallback(() => {
        const stars = starsRef.current;
        const starGeo = starGeoRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        const scene = sceneRef.current;

        // Safety check before performing rendering operations
        if (!stars || !starGeo || !camera || !renderer || !scene) {
             animationFrameIdRef.current = requestAnimationFrame(animate);
             return;
        }

        animationFrameIdRef.current = requestAnimationFrame(animate);

        // Star movement (simulating warp)
        const positions = starGeo.attributes.position.array as number[];
        for (let i = 0; i < starCount; i++) {
            positions[i * 3 + 2] += 0.5; // Move along Z
            if (positions[i * 3 + 2] > 200) {
                positions[i * 3 + 2] = -900; // Reset star position
            }
        }
        starGeo.attributes.position.needsUpdate = true;
        
        stars.rotation.z += 0.0005;

        // Parallax control
        const targetX = mouseXRef.current * 30;
        const targetY = -mouseYRef.current * 30;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }, []);


    // Function to set up the Three.js scene
    const initializeThreeJS = useCallback(() => {
        // Double-check if THREE.js and the canvas are available
        if (typeof window === 'undefined' || typeof (window as any).THREE === 'undefined' || !canvasRef.current) {
            console.error("ERROR: Three.js or Canvas are not available for initialization.");
            return () => {};
        }
        
        const THREE = (window as any).THREE;

        // 1. Setup
        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        cameraRef.current.position.z = 1;
        cameraRef.current.rotation.x = Math.PI / 2;

        rendererRef.current = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setClearColor(0x000000, 0); 
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        
        // 2. Starfield Geometry and Material
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const color1 = new THREE.Color(0x00ffff); // Cyan
        const color2 = new THREE.Color(0xff007f); // Magenta
        const tempColor = new THREE.Color();

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = -(Math.random() * 800) - 100;

            const t = Math.random();
            tempColor.copy(color1).lerp(color2, t);
            colors[i * 3] = tempColor.r;
            colors[i * 3 + 1] = tempColor.g;
            colors[i * 3 + 2] = tempColor.b;
        }

        starGeoRef.current = new THREE.BufferGeometry();
        starGeoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeoRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            size: 2, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        
        starsRef.current = new THREE.Points(starGeoRef.current, starMaterial);
        sceneRef.current.add(starsRef.current);

        // 3. Event Handlers
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouseXRef.current = (event.clientX / window.innerWidth) * 2 - 1;
            mouseYRef.current = (event.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // console.log("Three.js initialized. Starting animation loop.");
        animate(); // Start the animation loop

        return () => {
            // Cleanup function for Three.js
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rendererRef.current) rendererRef.current.dispose();
        };

    }, [animate]);

    // Main Effect: Uses polling to wait for Three.js to be loaded via CDN
    // This is necessary because Next/Script loads the file asynchronously
    useEffect(() => {
        let timeoutId: number | null = null;
        let cleanupThree: (() => void) | null = null;
        
        const checkThreeReady = () => {
            // Check if THREE.js is loaded
            if (typeof window !== 'undefined' && typeof (window as any).THREE !== 'undefined') {
                // console.log("THREE.js detected! Initializing 3D scene.");
                cleanupThree = initializeThreeJS();
            } else {
                // If not ready, try again after 100ms
                timeoutId = window.setTimeout(checkThreeReady, 100);
            }
        };

        checkThreeReady();
        
        // Cleanup function for the effect
        return () => {
             // Clear the polling timeout if it's still running
             if (timeoutId !== null) window.clearTimeout(timeoutId);
             // Execute Three.js cleanup if it was initialized
             if (cleanupThree) cleanupThree();
        };

    }, [initializeThreeJS]);


    // Component for Custom CSS/Tailwind Styles
    const CustomStyles = () => ( // Removed useMemo here
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@300;400;600;700&display=swap');
            
            :root {
                --bg-dark: #03000f;
                --neon-cyan: #00ffff;
                --neon-magenta: #ff007f;
            }
            .font-inter { font-family: 'Inter', sans-serif; }
            .font-title { font-family: 'Orbitron', sans-serif; }

            /* Fix para o Next.js: Garante que o canvas cubra a tela e esteja atrás do conteúdo */
            .three-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; display: block; }
            
            .bg-hero {
                /* Ensures the background has a dark gradient and subtle glow */
                background-image: radial-gradient(circle at center, rgba(26, 5, 60, 0.4) 0%, rgba(3, 0, 15, 0.9) 100%);
                box-shadow: 0 0 100px rgba(0, 255, 255, 0.05) inset;
            }
            
            /* Standard Rainbow (Starter, Main Title) */
            .rainbow-text { 
                background: linear-gradient(90deg, #ffff00, #00ff00, #00ffff, #ff007f); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: transparent;
                background-size: 200% 200%;
                animation: gradient-shift 4s ease infinite;
            }
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* Pro Rainbow: Pink and Purple (Pro Plan & Metrics Title) */
            .rainbow-pro {
                background: linear-gradient(90deg, #ff007f, #8a2be2, #ff007f); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: transparent;
                background-size: 200% 200%;
                animation: gradient-shift-pro 3s ease infinite; 
            }
            @keyframes gradient-shift-pro {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* Enterprise Rainbow: Red and Black (Enterprise Plan) - Faster */
            .rainbow-enterprise {
                background: linear-gradient(90deg, #ff0000, #222222, #ff0000); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: transparent;
                background-size: 200% 200%;
                animation: gradient-shift-enterprise 2s linear infinite; 
            }
            @keyframes gradient-shift-enterprise {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* PRIMARY Button (Starter - Magenta) */
            .neon-button-primary {
                background-color: var(--neon-magenta); 
                color: white;
                box-shadow: 0 0 10px var(--neon-magenta), 0 0 40px var(--neon-magenta), 0 0 80px rgba(255, 0, 127, 0.6);
                transition: all 0.3s ease;
                border: 2px solid var(--neon-magenta);
                font-weight: 700;
            }
            .neon-button-primary:hover {
                background-color: var(--neon-cyan); 
                box-shadow: 0 0 15px var(--neon-cyan), 0 0 50px var(--neon-cyan), 0 0 100px rgba(0, 255, 255, 0.7);
                border-color: var(--neon-cyan);
                transform: scale(1.05);
            }
            
            /* Navigation Button (Header) */
            .neon-button-header {
                background-color: transparent; 
                color: var(--neon-cyan);
                box-shadow: 0 0 10px var(--neon-cyan);
                border: 1px solid var(--neon-cyan);
            }
            .neon-button-header:hover {
                background-color: var(--neon-cyan); 
                color: #03000f; 
                box-shadow: 0 0 20px var(--neon-cyan);
                transform: scale(1.05);
            }

            /* PRO Button (Cyan) */
            .neon-button-pro {
                background-color: var(--neon-cyan); 
                color: var(--bg-dark); 
                box-shadow: 0 0 10px var(--neon-cyan), 0 0 40px var(--neon-cyan), 0 0 80px rgba(0, 255, 255, 0.6);
                transition: all 0.3s ease;
                border: 2px solid var(--neon-cyan);
                font-weight: 700;
            }
            .neon-button-pro:hover {
                background-color: var(--neon-magenta); 
                color: white; 
                box-shadow: 0 0 15px var(--neon-magenta), 0 0 50px var(--neon-magenta), 0 0 100px rgba(255, 0, 127, 0.7);
                border-color: var(--neon-magenta);
                transform: scale(1.05);
            }

            /* ENTERPRISE Button (Blue/Premium) */
            .neon-button-enterprise {
                background-color: #0d0126; 
                color: #4a90e2; 
                box-shadow: 0 0 5px #4a90e2; 
                transition: all 0.3s ease;
                border: 2px solid #4a90e2;
                font-weight: 700;
            }
            .neon-button-enterprise:hover {
                background-color: #4a90e2; 
                color: white;
                box-shadow: 0 0 15px #4a90e2, 0 0 50px rgba(74, 144, 226, 0.7);
                border-color: #4a90e2;
                transform: scale(1.05);
            }
            
            /* Feature card hover effect */
            .feature-card {
                transition: all 0.3s ease;
            }
            .feature-card:hover {
                box-shadow: 0 0 15px var(--neon-cyan);
                transform: scale(1.03);
            }
            .feature-card.magenta:hover {
                box-shadow: 0 0 15px var(--neon-magenta);
            }
        `}</style>
    );


    return (
        <div className="min-h-screen bg-[#03000f] text-white font-inter overflow-x-hidden relative">
            <CustomStyles />
            
            {/* THREE.JS 3D CANVAS */}
            {/* O Canvas está visível e fixo, mas o fundo só aparecerá se o Three.js for carregado corretamente no layout */}
            <canvas ref={canvasRef} className="three-canvas" id="three-bg"></canvas>

            <div className="relative z-10">
                {/* O z-index:10 garante que o conteúdo React fique acima do Canvas (z-index:0) */}

                {/* HEADER / NAV */}
                <header className="sticky top-0 z-50 bg-[#0d0126]/80 backdrop-blur-sm border-b border-cyan-400/20">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="text-3xl font-bold font-title rainbow-text">SiteBoost</div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#funcionalidades" className="text-gray-300 hover:text-cyan-400 transition font-medium">Funcionalidades</a>
                            <a href="#metrics" className="text-gray-300 hover:text-cyan-400 transition font-medium">Clientes</a>
                            <a href="#precos" className="text-gray-300 hover:text-cyan-400 transition font-medium">Planos</a>
                            <a href="#faq" className="text-gray-300 hover:text-cyan-400 transition font-medium">FAQ</a>
                        </div>
                        <a href="#contato" className="hidden md:inline-block py-2 px-5 rounded-lg font-semibold text-sm neon-button-header">
                            Teste Grátis 3 Dias
                        </a>
                        <button className="md:hidden text-gray-300 hover:text-cyan-400 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </nav>
                </header>

                {/* HERO SECTION */}
                <section className="relative h-screen flex items-center justify-center text-center bg-hero overflow-hidden">
                    <div className="z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                        {/* BOTÕES E TÍTULOS VISÍVEIS */}
                        <a href="#contato" 
                           className={`py-2 px-5 inline-block rounded-full mb-6 font-semibold text-sm sm:text-base border-2 border-cyan-400/70 text-cyan-400 
                           transition duration-300 transform hover:scale-105 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/50 cursor-pointer`} 
                           onMouseEnter={() => playSynthNote('D5')}
                        >
                            🚀 Comece Agora: 3 Dias de Teste Grátis
                        </a>

                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-title font-bold mb-6 leading-tight text-white">
                            A <span className="rainbow-text">I.A.</span> que Multiplica seu Valor de Mercado
                        </h1>
                        <p className={`text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto mb-10 ${neonMagenta}`}>
                            Crie Landing Pages e Sites de Alto Nível em Minutos. Não importa se você é uma agência, desenvolvedor ou iniciante – o SiteBoost te entrega o código completo, **pronto para o cliente**.
                        </p>
                        <div className="space-y-4 sm:space-y-0 sm:space-x-6">
                            <a href="#contato" className="inline-block text-xl py-3 px-8 rounded-xl font-bold neon-button-primary" onClick={() => playSynthNote('C5')}>
                                Começar Teste Grátis
                            </a>
                            <a href="#precos" className="inline-block text-xl py-3 px-8 rounded-xl font-bold text-cyan-400 border-2 border-cyan-400 shadow-sm shadow-cyan-400/50 hover:bg-cyan-400/10 transition duration-300" onClick={() => playSynthNote('D5')}>
                                Ver Planos de Lucro
                            </a>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section id="funcionalidades" className="relative py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-5xl font-title text-white mb-4">A Tecnologia <span className={accentCyan}>SiteBoost</span> em Ação</h2>
                            <p className={`text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto ${accentMagenta}`}>
                                Nossa I.A. foi otimizada para ser a sua linha de produção de código, garantindo qualidade profissional em qualquer projeto.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {/* Feature 1 - Cyan Hover */}
                            <div 
                                className="feature-card bg-[#1a053c]/30 p-8 rounded-xl shadow-2xl border-t-4 border-cyan-400/50 transition-all duration-300 hover:ring-8 hover:ring-cyan-400/30" 
                                onMouseEnter={() => playSynthNote('D5')}
                            >
                                <div className={`text-5xl mb-4 ${neonCyan}`}>
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                </div>
                                <h3 className="text-2xl font-title font-bold mb-3 text-white">Domínio Profissional Instantâneo</h3>
                                <p className="text-gray-300">
                                    Diga adeus à curva de aprendizado. Crie Landing Pages com a complexidade e a qualidade de um desenvolvedor sênior, mesmo sendo um iniciante.
                                </p>
                            </div>

                            {/* Feature 2 - Magenta Hover */}
                            <div 
                                className="feature-card magenta bg-[#1a053c]/30 p-8 rounded-xl shadow-2xl border-t-4 border-red-500/50 transition-all duration-300 hover:ring-8 hover:ring-red-500/30" 
                                onMouseEnter={() => playSynthNote('E5')}
                            >
                                <div className={`text-5xl mb-4 ${neonMagenta}`}>
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-title font-bold mb-3 text-white">Geração de Renda Escalável</h3>
                                <p className="text-gray-300">
                                    Atenda mais clientes em menos tempo. Gere dezenas de páginas exclusivas por mês para agências e projetos de marketing com eficiência inigualável.
                                </p>
                            </div>

                            {/* Feature 3 - Blue Hover */}
                            <div 
                                className="feature-card blue bg-[#1a053c]/30 p-8 rounded-xl shadow-2xl border-t-4 border-blue-400/50 transition-all duration-300 hover:ring-8 hover:ring-blue-400/30" 
                                onMouseEnter={() => playSynthNote('G5')}
                            >
                                <div className={`text-5xl mb-4 text-blue-400`}>
                                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.536 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.781.565-1.832-.197-1.536-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.781-.57-.379-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                </div>
                                <h3 className="text-2xl font-title font-bold mb-3 text-white">Animações de Alto Impacto</h3>
                                <p className="text-gray-300">
                                    Nossa I.A. integra automaticamente bibliotecas de ponta (GSAP, Three.js) para criar efeitos visuais impressionantes e modernos, como esta página.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* METRICS AND SOCIAL PROOF SECTION */}
                <section id="metrics" className="relative py-16 md:py-24 bg-[#000005]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-5xl font-title mb-4 rainbow-pro">Nossos Números Falam por Si</h2>
                            <p className={`text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto rainbow-text`}>
                                A confiança da nossa comunidade é o nosso maior ativo. Junte-se a quem está escalando a produção web.
                            </p>
                        </div>
                        
                        {/* Counters Box */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <CounterBox value={2000} suffix="+" label="Usuários Ativos e Satisfeitos" />
                            <CounterBox value={49} suffix="/5.0" label="Classificação Média nas Plataformas" />
                            <CounterBox value={50000} suffix="+" label="Landing Pages Geradas pela I.A." />
                        </div>

                        {/* Reviews Box */}
                        <div className="bg-[#1a053c]/60 p-8 rounded-xl shadow-2xl border border-cyan-400/40">
                            <div className="flex justify-center items-center mb-6">
                                {/* SVG Star Icon (5 times) */}
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-8 h-8 ${i < 4.9 ? 'text-yellow-400' : 'text-gray-600'} fill-current mx-0.5`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.717 1.48-8.279L.001 9.306l8.332-1.151L12 .587z"/>
                                    </svg>
                                ))}
                            </div>
                            <blockquote className="italic text-xl text-center text-gray-200 leading-relaxed">
                                "O SiteBoost transformou a produtividade da nossa agência. O código gerado é tão limpo e otimizado quanto o que nossos desenvolvedores seniores faziam, mas em 1/10 do tempo. É a melhor I.A. de codificação do mercado."
                            </blockquote>
                            <p className={`mt-4 text-center font-semibold text-lg ${accentMagenta}`}>— Lucas F., CEO da Zenith Marketing</p>
                        </div>
                    </div>
                </section>


                {/* PRICING SECTION */}
                <section id="precos" className="relative py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-5xl font-title rainbow-text mb-4">Escolha o seu Caminho para a Geração de Renda</h2>
                            <p className={`text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto ${accentCyan}`}>
                                Invista na ferramenta que vai multiplicar sua capacidade de entrega e seus lucros com criação de Landing Pages.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {plans.map((plan, index) => {
                                
                                const titleClass = plan.name === 'Pro' 
                                    ? 'rainbow-pro' 
                                    : plan.name.includes('Enterprise') 
                                        ? 'rainbow-enterprise' 
                                        : plan.isPopular 
                                            ? 'rainbow-text' 
                                            : 'text-white';

                                // Class for the price
                                const priceClass = plan.name === 'Pro' 
                                    ? 'rainbow-pro' 
                                    : plan.name === 'Iniciante'
                                        ? 'rainbow-text'
                                        : 'text-white'; 
                                
                                // Custom button class for each plan
                                const buttonClass = 
                                    plan.name === 'Iniciante' ? 'neon-button-primary' :
                                    plan.name === 'Pro' ? 'neon-button-pro' :
                                    'neon-button-enterprise';

                                return (
                                    <div 
                                        key={plan.name}
                                        className={`relative bg-[#1a053c]/50 p-8 rounded-xl shadow-2xl border-t-8 flex flex-col 
                                            ${plan.borderClass} ${plan.isPopular ? 'scale-[1.02] transition-all duration-300 transform hover:scale-[1.07] hover:shadow-[0_0_30px_rgba(255,0,127,0.9)]' : 'transition-all duration-300 transform hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]'} `}
                                    >
                                        {plan.isPopular && (
                                            <div className="text-center absolute top-0 right-0 -mt-6 -mr-6">
                                                <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 shadow-lg shadow-red-500/50 rotate-3">Mais Popular</span>
                                            </div>
                                        )}

                                        {/* TITLE with dedicated rainbow effect */}
                                        <h3 className={`text-3xl font-bold mb-4 font-title ${titleClass}`}>{plan.name}</h3> 
                                        <p className="text-sm uppercase text-gray-300 mb-6">{plan.description}</p>
                                        
                                        {/* PRICE */}
                                        <div className="text-5xl font-title mb-6 text-white">
                                            {plan.price === 'Sob Consulta' 
                                                ? <span className="text-xl font-bold rainbow-enterprise">{plan.price}</span> 
                                                : <span className={priceClass}>{`R$ ${plan.price}`}</span>
                                            }
                                            {plan.price !== 'Sob Consulta' && <span className="text-xl font-medium text-gray-400">/mês</span>}
                                        </div> 
                                        
                                        {/* FEATURES LIST */}
                                        <ul className="space-y-3 text-sm mb-8 flex-grow text-gray-200"> 
                                            {plan.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start">
                                                    <span className={`${feature.colorClass} mr-3 mt-0.5`}>{feature.isIncluded ? '✔' : '✖'}</span> 
                                                    {feature.text}
                                                </li>
                                            ))}
                                        </ul>
                                        {/* BUTTON */}
                                        <a href="#contato" className={`w-full text-center py-3 text-xl rounded-xl font-bold ${buttonClass}`} onClick={() => playSynthNote('A4')}>
                                            {plan.buttonText}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section id="faq" className="relative py-16 md:py-24">
                    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#000005] p-8 rounded-xl backdrop-blur-md bg-opacity-70 border border-gray-800`}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-5xl font-title rainbow-text mb-4">Dúvidas Frequentes</h2>
                        </div>

                        <div id="accordion-container" className="space-y-4">
                            {/* FAQ Items - Now with only subtle zoom on hover (hover:scale-[1.02]) */}
                            {faqItems.map(item => (
                                <FaqItem
                                    key={item.id}
                                    {...item}
                                    activeId={activeFaq}
                                    setActiveId={setActiveFaq}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION (CONTACT) */}
                <section id="contato" className="relative py-16 md:py-24 bg-cover bg-center bg-[#0d0126]/90 border-t border-red-500/20">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl sm:text-6xl font-title rainbow-text mb-6 leading-tight">
                            Transforme sua Ideia em Código Profissional.
                        </h2>
                        <p className={`text-xl sm:text-2xl leading-relaxed ${accentCyan} mb-10`}>
                            Aproveite os 3 dias de teste grátis e veja o SiteBoost mudar a maneira como você trabalha e gera receita.
                        </p>
                        <a href="#" className="inline-block text-2xl py-4 px-12 rounded-xl font-bold neon-button-primary" onClick={() => playSynthNote('C6')}>
                            Começar Meu Teste Grátis Agora
                        </a>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-[#000000]/70 border-t border-cyan-400/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-3xl font-title rainbow-text mb-4">SiteBoost</div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Sua plataforma de I.A. para criação de código web de alta performance. Geração de código otimizado, sem barreiras.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-4 text-white">Navegação</h4>
                                <ul className="space-y-3 text-gray-400">
                                    <li><a href="#funcionalidades" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Funcionalidades</a></li>
                                    <li><a href="#metrics" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Clientes</a></li>
                                    <li><a href="#precos" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Planos</a></li>
                                    <li><a href="#faq" className="hover:text-cyan-400 transition hover:scale-105 inline-block">FAQ</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Termos de Serviço</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Política de Privacidade</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Declaração de Acessibilidade</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">Siga-nos</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Twitter</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">GitHub</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition hover:scale-105 inline-block">Fale Conosco</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                        <div className="flex items-center justify-center mb-2 text-sm">
                            <svg className={`w-5 h-5 mr-2 ${accentCyan}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm6-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            <span className="rainbow-text">Certificado SSL Válido e Seguro</span>
                        </div>
                        &copy; 2025 SiteBoost. Todos os direitos reservados. Sua I.A. de codificação web.
                    </div>
                </div>
            </footer>
        </div> 
    </div> 
    );
};

export default LandingPage;
