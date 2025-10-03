import Image from "next/image";
// Linha de importação CORRIGIDA com todos os ícones necessários!
import { MapPin, Truck, Shield, Calendar, Wrench, Settings, Zap, Circle } from 'lucide-react'; 

const forkliftData = [
  {
    name: "Empilhadeira a Gás",
    year: 2022,
    capacity: "2.5 Toneladas",
    description: "Ideal para operações internas e externas, oferecendo potência e economia.",
    image: "/gas-forklift.jpg", // Substitua pelo caminho da sua imagem
    features: [
      { icon: Zap, text: "Motor potente" },
      { icon: Shield, text: "Baixa emissão" },
      { icon: Wrench, text: "Manutenção simplificada" },
    ],
  },
  {
    name: "Empilhadeira Elétrica",
    year: 2023,
    capacity: "2.0 Toneladas",
    description: "Perfeita para ambientes internos, silenciosa e totalmente sustentável.",
    image: "/electric-forklift.jpg", // Substitua pelo caminho da sua imagem
    features: [
      { icon: Settings, text: "Operação silenciosa" },
      { icon: Circle, text: "Zero emissão de poluentes" },
      { icon: Calendar, text: "Bateria de longa duração" }, // Ícone Calendar usado aqui
    ],
  },
  {
    name: "Empilhadeira Diesel",
    year: 2021,
    capacity: "5.0 Toneladas",
    description: "Máxima força para cargas pesadas e trabalho contínuo em pátios.",
    image: "/diesel-forklift.jpg", // Substitua pelo caminho da sua imagem
    features: [
      { icon: Zap, text: "Alta capacidade de carga" },
      { icon: Truck, text: "Excelente tração" },
      { icon: Wrench, text: "Robustez incomparável" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Truck className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">USD Empilhadeiras</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#frota" className="text-gray-600 hover:text-blue-600 transition duration-150">Frota</a>
            <a href="#localizacao" className="text-gray-600 hover:text-blue-600 transition duration-150">Localização</a>
            <a href="#contato" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150">Fale Conosco</a>
          </nav>
          {/* Mobile menu button hidden for brevity */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold mb-4">A Força que Seu Negócio Precisa</h1>
          <p className="text-xl mb-8">Locação e Venda de Empilhadeiras de Alta Performance.</p>
          <a href="#contato" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">Solicite um Orçamento</a>
        </div>
      </section>

      {/* Frota Section */}
      <section id="frota" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">Nossa Frota de Empilhadeiras</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {forkliftData.map((forklift) => (
              <div key={forklift.name} className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-300 transition duration-300">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {/* Substitua o componente Image por uma div temporária ou adicione suas imagens */}
                  <span className="text-gray-500 text-sm">Espaço para Imagem: {forklift.name}</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{forklift.name}</h4>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{forklift.year}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm font-semibold">{forklift.capacity}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{forklift.description}</p>
                  <ul className="space-y-2">
                    {forklift.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-800">
                        <feature.icon className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contato" className="mt-4 block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-150">Detalhes e Locação</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section id="localizacao" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Nossa Localização</h2>
          <div className="flex items-center justify-center text-xl text-gray-700 mb-4">
            <MapPin className="h-6 w-6 text-red-500 mr-3" />
            <p>Rua Exemplo, 123 - Bairro Industrial - Cidade/SP</p>
          </div>
          <div className="h-80 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-gray-500">Espaço para Mapa (Google Maps Embed)</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Entre em Contato</h2>
          <form className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea id="message" name="message" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-150">Enviar Mensagem</button>
            {/* O erro estava na linha acima, corrigido com o '>' final. */}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} USD Empilhadeiras. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}