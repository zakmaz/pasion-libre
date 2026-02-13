
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AgeGate from './components/AgeGate';
import AdCard from './components/AdCard';
import AdForm from './components/AdForm';
import { CATEGORIES, MOCK_ADS, getIcon } from './constants';
import { Ad, AppRoute } from './types';
import { ChevronRight, Filter, Sparkles, TrendingUp, Users, ShieldCheck, Search, PlusCircle, MessageSquare, Phone } from 'lucide-react';

const App: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  // Initialize ads from localStorage or mock data
  useEffect(() => {
    const verified = localStorage.getItem('pasion_verified');
    if (verified === 'true') {
      setIsVerified(true);
    }

    const savedAds = localStorage.getItem('pasion_ads');
    if (savedAds) {
      setAds(JSON.parse(savedAds));
    } else {
      setAds(MOCK_ADS);
    }
  }, []);

  // Save ads whenever they change
  useEffect(() => {
    if (ads.length > 0) {
      localStorage.setItem('pasion_ads', JSON.stringify(ads));
    }
  }, [ads]);

  const handleVerify = () => {
    setIsVerified(true);
    localStorage.setItem('pasion_verified', 'true');
  };

  const filteredAds = useMemo(() => {
    if (selectedCategory === 'all') return ads;
    return ads.filter(ad => ad.category === selectedCategory);
  }, [ads, selectedCategory]);

  const handleCreateAd = (newAd: Ad) => {
    const updatedAds = [newAd, ...ads];
    setAds(updatedAds);
    localStorage.setItem('pasion_ads', JSON.stringify(updatedAds));
    setCurrentRoute(AppRoute.HOME);
    window.scrollTo(0, 0);
  };

  if (!isVerified) {
    return <AgeGate onConfirm={handleVerify} />;
  }

  return (
    <div className="min-h-screen bg-pink-500 flex flex-col text-white">
      <Navbar onNavigate={(r) => {
        setCurrentRoute(r as AppRoute);
        window.scrollTo(0,0);
      }} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
        {currentRoute === AppRoute.HOME && (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-pink-800 to-pink-600 text-white p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-pink-400">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-white text-xs font-black tracking-widest uppercase mb-6 shadow-lg">
                  <Sparkles size={14} />
                  EL FORO NÚMERO 1 EN ESPAÑA
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1] tracking-tighter">
                  pasion<span className="text-red-500">-</span>libre
                </h1>
                <p className="text-pink-100 text-xl mb-10 leading-relaxed max-w-lg font-medium">
                  Anuncios reales de personas como tú. Sin filtros, sin complicaciones. Únete a la comunidad más ardiente.
                </p>
                <div className="flex flex-wrap gap-5">
                  <button 
                    onClick={() => setCurrentRoute(AppRoute.CREATE)}
                    className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black transition-all hover:bg-red-700 shadow-2xl shadow-red-900/40 active:scale-95 text-lg uppercase tracking-wide"
                  >
                    Publicar Ahora
                  </button>
                  <button className="bg-pink-900/40 hover:bg-pink-900/60 text-white px-10 py-5 rounded-2xl font-black transition-all border-2 border-pink-400/30 active:scale-95 text-lg uppercase tracking-wide">
                    Explorar Foro
                  </button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent hidden lg:block"></div>
              <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]"></div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Anuncios Reales', val: `${ads.length + 1240}`, icon: <TrendingUp className="text-red-400" /> },
                { label: 'En Línea', val: '8.432', icon: <Users className="text-pink-300" /> },
                { label: 'Nuevos Hoy', val: '312', icon: <Sparkles className="text-red-500" /> },
                { label: 'Estado Foro', val: 'Activo', icon: <ShieldCheck className="text-emerald-400" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-pink-700/40 backdrop-blur-md p-6 rounded-3xl border border-pink-400/30 flex items-center gap-5 shadow-xl">
                  <div className="bg-pink-900/50 p-3 rounded-2xl shadow-inner">{stat.icon}</div>
                  <div>
                    <div className="text-white font-black text-2xl leading-tight">{stat.val}</div>
                    <div className="text-pink-200 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white tracking-tight">Secciones del Foro</h2>
                <button className="text-red-400 font-black text-sm flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
                  Ver Todo <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: 1200, behavior: 'smooth' });
                    }}
                    className={`flex flex-col items-center justify-center p-6 rounded-[32px] border-2 transition-all group ${
                      selectedCategory === cat.id 
                        ? 'bg-red-600 border-red-500 text-white shadow-2xl shadow-red-900/40 scale-110 z-10' 
                        : 'bg-pink-700/50 border-pink-400/30 text-pink-100 hover:border-red-400 hover:bg-pink-700'
                    }`}
                  >
                    <div className={`mb-3 transition-transform group-hover:scale-110 ${selectedCategory === cat.id ? 'text-white' : 'text-pink-300'}`}>
                      {getIcon(cat.icon)}
                    </div>
                    <span className="text-xs font-black uppercase tracking-tighter whitespace-nowrap">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Ads Grid */}
            <section id="ads-section">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-pink-900/40 p-6 rounded-[32px] border border-pink-400/30 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
                  <h2 className="text-2xl font-black text-white">Tablón de Anuncios</h2>
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full">EN VIVO</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Filtrar..." 
                      className="bg-pink-800 border border-pink-400 rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-red-500 outline-none text-white w-40"
                    />
                  </div>
                  <button className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg">
                    <Filter size={20} />
                  </button>
                </div>
              </div>
              
              {filteredAds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredAds.map(ad => (
                    <AdCard 
                      key={ad.id} 
                      ad={ad} 
                      onClick={(ad) => {
                        setSelectedAd(ad);
                        setCurrentRoute(AppRoute.DETAIL);
                        window.scrollTo(0,0);
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-pink-900/40 rounded-[40px] p-24 text-center border-2 border-pink-400/30 border-dashed">
                  <div className="bg-red-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Search className="text-red-400" size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">Vaya... nada por aquí</h3>
                  <p className="text-pink-200 text-lg max-w-sm mx-auto font-medium italic">Sé el primero en publicar en esta categoría y haz que suba la temperatura.</p>
                  <button 
                    onClick={() => setCurrentRoute(AppRoute.CREATE)}
                    className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl"
                  >
                    Publicar Anuncio
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {currentRoute === AppRoute.CREATE && (
          <AdForm 
            onSubmit={handleCreateAd}
            onCancel={() => setCurrentRoute(AppRoute.HOME)}
          />
        )}

        {currentRoute === AppRoute.DETAIL && selectedAd && (
          <div className="bg-pink-800 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-500 border border-pink-600 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 bg-pink-900 aspect-video lg:aspect-auto">
                <img 
                  src={selectedAd.imageUrl} 
                  alt={selectedAd.title} 
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                      {selectedAd.category}
                    </span>
                    <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">ID: {selectedAd.id.slice(-4)}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tighter italic">{selectedAd.title}</h1>
                  <p className="text-5xl font-black text-red-500 mb-10 drop-shadow-[0_4px_10px_rgba(239,68,68,0.3)]">
                    {selectedAd.price > 0 ? `${selectedAd.price}€` : 'CONSULTAR'}
                  </p>
                  
                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-xs font-black text-pink-400 uppercase tracking-[0.2em] mb-4">DETALLES DEL ANUNCIO</h4>
                      <p className="text-pink-100 leading-relaxed text-xl font-medium">
                        {selectedAd.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-5 p-6 bg-pink-900/60 rounded-[32px] border border-pink-500 shadow-inner">
                       <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                          {selectedAd.seller.charAt(0)}
                       </div>
                       <div>
                          <div className="font-black text-xl text-white italic">{selectedAd.seller}</div>
                          <div className="text-sm text-pink-300 font-bold uppercase tracking-wider">{selectedAd.location}</div>
                       </div>
                       {selectedAd.isVerified && (
                          <div className="ml-auto bg-emerald-900/50 p-3 rounded-full border border-emerald-500/50">
                             <ShieldCheck className="text-emerald-400" size={28} />
                          </div>
                       )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-950/40 flex items-center justify-center gap-3 text-lg uppercase tracking-wider active:scale-95">
                      <MessageSquare size={24} /> Enviar Mensaje
                    </button>
                    <button className="bg-pink-700 hover:bg-pink-600 text-white border-2 border-pink-500 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-wider active:scale-95">
                      <Phone size={24} /> WhatsApp / Tel
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setCurrentRoute(AppRoute.HOME);
                      window.scrollTo(0,0);
                    }}
                    className="w-full mt-4 text-pink-400 font-black hover:text-white transition-colors text-sm text-center uppercase tracking-widest"
                  >
                    ← VOLVER AL TABLÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Call-to-Action for Mobile */}
      <div className="md:hidden sticky bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setCurrentRoute(AppRoute.CREATE)}
          className="bg-red-600 text-white p-5 rounded-full shadow-[0_10px_40px_rgba(239,68,68,0.6)] flex items-center justify-center border-4 border-pink-500 active:scale-90 transition-transform scale-110"
        >
          <PlusCircle size={40} />
        </button>
      </div>

      <footer className="bg-pink-900 border-t border-pink-700 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="bg-red-600 p-2 rounded-lg text-white font-black text-xl shadow-lg">
                P
              </div>
              <span className="font-black text-3xl text-white tracking-tighter italic">pasion-libre</span>
            </div>
            <p className="text-pink-400 text-sm max-w-sm font-medium">
              El foro independiente de anuncios clasificados para adultos más real y apasionado. Solo contenido verificado.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-white text-sm font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-red-400 transition-colors underline decoration-red-600 underline-offset-8">Ayuda</a>
            <a href="#" className="hover:text-red-400 transition-colors underline decoration-red-600 underline-offset-8">Privacidad</a>
            <a href="#" className="hover:text-red-400 transition-colors underline decoration-red-600 underline-offset-8">Términos</a>
            <a href="#" className="hover:text-red-400 transition-colors underline decoration-red-600 underline-offset-8">Contacto</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-red-400 text-xs font-black tracking-widest uppercase">
              PROHIBIDO MENORES DE 18 AÑOS
            </p>
            <p className="text-pink-500 text-[10px] font-bold">
              © 2024 PASION-LIBRE. TODOS LOS DERECHOS RESERVADOS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
