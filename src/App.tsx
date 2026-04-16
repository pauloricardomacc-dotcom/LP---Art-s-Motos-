/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Bike,
  Zap,
  Hammer,
  ChevronLeft,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';

const LOGO_URL = "https://i.imgur.com/S3mNLl2.png";

const services = [
  {
    title: "Mecânica Completa",
    description: "Revisão geral e manutenção preventiva para todos os modelos de motos.",
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    title: "Alinhamento de Chassi",
    description: "Tecnologia de precisão para garantir a geometria original da sua moto.",
    icon: <Bike className="w-6 h-6" />,
  },
  {
    title: "Solda Especializada",
    description: "Soldas de alta resistência em chassi e componentes estruturais.",
    icon: <Hammer className="w-6 h-6" />,
  },
  {
    title: "Motos Elétricas",
    description: "Especialistas em manutenção de sistemas elétricos e baterias.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Scooters Elétricas",
    description: "Manutenção completa para sua mobilidade urbana elétrica.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Bikes Elétricas",
    description: "Cuidado especializado para sua e-bike de qualquer marca.",
    icon: <Bike className="w-6 h-6" />,
  },
];

const testimonials = [
  {
    name: "Anne Silva",
    image: "https://i.imgur.com/ChpdRym.jpeg",
  },
  {
    name: "Matheus",
    image: "https://i.imgur.com/nhno6vK.jpeg",
  },
  {
    name: "Vanuza",
    image: "https://i.imgur.com/0mPR3Jc.jpeg",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    slidesToScroll: 1,
    containScroll: false
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'serviços', 'sobre', 'depoimentos', 'contato'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian selection:bg-brand-red selection:text-white safe-bottom">
      {/* Navigation - Desktop */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/90 backdrop-blur-xl py-1 border-b border-white/5' : 'bg-transparent py-3'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <img 
                src={LOGO_URL}
                alt="Art's Motos Logo"
                className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform drop-shadow-2xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg leading-none tracking-tight italic">OFICINA <span className="text-brand-red">ART'S MOTOS</span></span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-bold mt-1">Alta Performance e Qualidade</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {['Serviços', 'Sobre', 'Depoimentos', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all relative group ${activeSection === item.toLowerCase() ? 'text-brand-red' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand-red transition-all ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <a 
              href="https://wa.me/554196688144?text=Olá!%20Quero%20agendar%20um%20serviço%20na%20Art's%20Motos.%20Quais%20os%20horários%20disponíveis?" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary !py-3 !px-6 !text-xs uppercase tracking-widest"
            >
              Agendar
            </a>
          </div>
        </div>
      </nav>

      {/* Thumb Navigation (Mobile Only) */}
      <div className="thumb-nav">
        {[
          { id: 'hero', icon: <Bike className="w-5 h-5" /> },
          { id: 'serviços', icon: <Wrench className="w-5 h-5" /> },
          { id: 'sobre', icon: <Award className="w-5 h-5" /> },
          { id: 'contato', icon: <Phone className="w-5 h-5" /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-item-mobile ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.icon}
          </button>
        ))}
        <a 
          href="https://wa.me/554196688144?text=Olá!%20Estou%20navegando%20no%20site%20e%20tenho%20uma%20dúvida%20rápida%20sobre%20a%20Art's%20Motos.%20Pode%20me%20ajudar?" 
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#e31d1a] rounded-[18px] flex items-center justify-center text-white shadow-[0_0_15px_rgba(227,29,26,0.4)] active:scale-95 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-white/10" />
        </a>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1920" 
            alt="Premium Motorcycle" 
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent hidden sm:block" />
          <div className="absolute inset-0 bg-obsidian/60 sm:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full mb-8 mt-12 sm:mt-10">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="uppercase tracking-[0.3em] text-brand-red font-black text-[10px]">Oficina de Tradição e Qualidade em Curitiba</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-9xl leading-[0.9] mb-6 sm:mb-8">
              QUALIDADE <br />
              <span className="text-brand-red">GARANTIDA.</span> <br />
              <span className="text-white/40 text-4xl sm:text-6xl md:text-9xl">CONFIANÇA.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 max-w-xl leading-relaxed font-medium">
              Oficina especializada em mecânica de alta qualidade e restauração técnica. O cuidado que sua moto merece com o conhecimento que você confia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={() => scrollToSection('serviços')}
                className="btn-primary text-base sm:text-lg px-8 sm:px-10"
              >
                Ver Serviços
                <ChevronRight className="w-5 h-5" />
              </button>
              <a 
                href="https://wa.me/554196688144?text=Olá!%20Vi%20o%20site%20da%20Art's%20Motos%20e%20gostaria%20de%20falar%20com%20um%20especialista." 
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-base sm:text-lg px-8 sm:px-10"
              >
                Falar com Especialista
              </a>
            </div>

            <div className="mt-12 sm:mt-16 flex items-center gap-6 sm:gap-8 border-l-2 border-brand-yellow pl-6 sm:pl-8">
              <div>
                <div className="flex text-brand-yellow mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">4.9 no Google Business</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-display font-black italic leading-none">15 ANOS</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">de experiência técnica</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Dark */}
      <section id="serviços" className="section-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <span className="text-brand-red font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">O Melhor para Sua Moto</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-none">NOSSAS <span className="text-brand-red">ESPECIALIDADES</span></h2>
            </div>
            <p className="text-gray-500 max-w-md text-base sm:text-lg leading-relaxed">
              Equipamentos modernos e mecânicos experientes para entregar a melhor manutenção que sua moto já teve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass-card p-8 sm:p-10 group relative overflow-hidden rounded-3xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:bg-brand-red/10 transition-all" />
                <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-red/5">
                  {service.icon}
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - White Contrast */}
      <section id="sobre" className="section-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square sm:aspect-[4/5] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1000" 
                  alt="Workshop Detail" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-48 h-48 sm:w-64 sm:h-64 bg-brand-yellow/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 bg-obsidian p-6 sm:p-10 rounded-[20px] sm:rounded-[30px] shadow-2xl z-20 border border-white/5">
                <p className="font-display font-black italic text-4xl sm:text-6xl text-brand-red leading-none mb-1 sm:mb-2">15+</p>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">Anos de Excelência</p>
              </div>
            </div>
            
            <div className="lg:pl-10">
              <span className="text-brand-red font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Sua Moto em Boas Mãos</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-10 leading-none">TRABALHO <br /> <span className="text-brand-red">HONESTO.</span></h2>
              
              <div className="space-y-6 sm:space-y-8 text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  A Art's Motos nasceu em 2008 focada em entregar qualidade real sem enrolação. O que começou como uma pequena oficina, tornou-se referência em Curitiba pela seriedade do nosso trabalho.
                </p>
                <p>
                  Com anos de experiência em grandes marcas, trouxemos para nossa oficina um padrão de revisão onde cada detalhe é verificado com rigor técnico e transparência total com o cliente.
                </p>
                <p>
                  Hoje, somos o destino de quem busca confiança. Seja para uma manutenção simples ou uma restauração completa, sua moto recebe o tratamento de quem entende do assunto.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-1 bg-brand-red" />
                  <span className="text-obsidian font-black text-2xl italic uppercase tracking-tighter">Transparência</span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Processos Claros</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-1 bg-brand-yellow" />
                  <span className="text-obsidian font-black text-2xl italic uppercase tracking-tighter">Precisão</span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Ajuste Fino</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark */}
      <section id="depoimentos" className="section-dark bg-lead py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-brand-red font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Quem Passou por Aqui</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-none">CLIENTES QUE <span className="text-brand-red">COMO VOCÊ</span> CONFIAM</h2>
        </div>

        <div className="relative">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="glass-card overflow-hidden rounded-[32px] h-full border border-white/5 shadow-2xl"
                  >
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-16">
            <button 
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full border-2 border-brand-red/30 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group scale-90 sm:scale-100"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-14 h-14 rounded-full border-2 border-brand-red/30 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group scale-90 sm:scale-100"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card overflow-hidden rounded-[40px] border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-20">
                <span className="text-brand-red font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Conexão</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl mb-12 sm:mb-16 leading-none">FALE COM O <br /> <span className="text-brand-red">ESPECIALISTA</span></h2>
                
                <div className="space-y-8 sm:space-y-12">
                  <div className="flex items-start gap-6 sm:gap-8 group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-yellow shrink-0 border border-white/10 group-hover:bg-brand-yellow group-hover:text-obsidian transition-all duration-500">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-brand-red font-black block mb-2 sm:mb-3">Onde Estamos</label>
                      <p className="text-lg sm:text-xl font-bold mb-1">R. Bento Ribeiro, 140 - Loja 2</p>
                      <p className="text-gray-500 text-sm sm:text-base font-medium">Bairro Alto, Curitiba - PR</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 sm:gap-8 group">
                    <a 
                      href="https://www.instagram.com/art.s_motos/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shrink-0 bg-instagram shadow-lg shadow-brand-red/10 hover:scale-110 transition-all duration-500"
                    >
                      <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
                    </a>
                    <div>
                      <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-brand-red font-black block mb-2 sm:mb-3">Instagram Oficial</label>
                      <a 
                        href="https://www.instagram.com/art.s_motos/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xl sm:text-2xl font-display font-black italic tracking-tight hover:text-brand-red transition-colors"
                      >
                        @art.s_motos
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 sm:gap-8 group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 shrink-0 border border-white/10 group-hover:bg-white group-hover:text-obsidian transition-all duration-500">
                      <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-brand-red font-black block mb-2 sm:mb-3">Horário de Pista</label>
                      <p className="text-lg sm:text-xl font-bold mb-1">Segunda a Sexta</p>
                      <p className="text-gray-500 text-sm sm:text-base font-medium">08:30 – 18:30</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-20 flex flex-col gap-[15px]">
                  <a 
                    href="https://wa.me/554196688144?text=Olá!%20Quero%20agendar%20um%20serviço%20na%20Art's%20Motos.%20Quais%20os%20horários%20disponíveis?" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-primary w-full text-xl py-6 animate-pulse-yellow"
                  >
                    Agendar Horário
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative h-[450px] lg:h-auto bg-lead overflow-hidden flex flex-col">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.842798363749!2d-49.20853542461047!3d-25.41009187757342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce5e6f8f8f8f7%3A0x8f8f8f8f8f8f8f8f!2sR.%20Bento%20Ribeiro%2C%20140%20-%20Loja%202%20-%20Bairro%20Alto%2C%20Curitiba%20-%20PR%2C%2082840-030!5e0!3m2!1spt-BR!2sbr!4v1713131313131!5m2!1spt-BR!2sbr" 
                  className="w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=R.+Bento+Ribeiro,+140+-+Loja+2+-+Bairro+Alto,+Curitiba+-+PR"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-obsidian px-4 py-2 rounded-lg font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-brand-red hover:text-white transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    Definir Rota
                  </a>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Art's+Motos+R.+Bento+Ribeiro,+140+-+Loja+2+-+Bairro+Alto,+Curitiba+-+PR"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-obsidian px-4 py-2 rounded-lg font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-brand-red hover:text-white transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Abrir no Maps
                  </a>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="w-6 h-6 bg-brand-red rounded-full relative z-10 border-4 border-obsidian shadow-xl" />
                  <div className="mt-3 bg-brand-red px-3 py-1 rounded shadow-lg">
                    <span className="text-[10px] font-black uppercase text-white">ART'S MOTOS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-obsidian border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="flex items-center gap-5">
              <img 
                src={LOGO_URL}
                alt="Art's Motos Logo"
                className="w-20 h-20 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-black uppercase italic tracking-tight text-3xl block">OFICINA <span className="text-brand-red">ART'S MOTOS</span></span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">Alta Performance e Qualidade</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: 'Serviços', icon: <Wrench className="w-5 h-5" /> },
                { name: 'Sobre', icon: <Award className="w-5 h-5" /> },
                { name: 'Contato', icon: <Phone className="w-5 h-5" /> }
              ].map(item => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 hover:text-brand-red transition-all group animate-pulse-red-subtle"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-black">
              © {new Date().getFullYear()} Oficina Art's Motos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
