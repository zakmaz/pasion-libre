
import React from 'react';
import { Search, PlusCircle, User, Heart, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onNavigate: (route: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-pink-600 border-b border-pink-400 shadow-lg px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-red-600 p-2 rounded-lg text-white font-black text-xl leading-none shadow-md">
            P
          </div>
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
            pasion<span className="text-red-400">-</span>libre
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input 
            type="text" 
            placeholder="Buscar en el foro..."
            className="w-full bg-pink-700/50 border border-pink-400 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm text-white placeholder:text-pink-200"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-200" size={18} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95"
          >
            <PlusCircle size={18} />
            <span className="hidden lg:block">Nuevo Anuncio</span>
          </button>
          <div className="h-8 w-[1px] bg-pink-400 mx-1 hidden sm:block"></div>
          <button className="p-2.5 text-pink-100 hover:bg-pink-700 rounded-full transition-all">
            <Heart size={20} />
          </button>
          <button className="p-2.5 text-pink-100 hover:bg-pink-700 rounded-full transition-all">
            <MessageSquare size={20} />
          </button>
          <button className="flex items-center gap-2 p-1 pl-3 bg-pink-700 rounded-full hover:bg-pink-800 transition-all">
            <span className="text-xs font-medium text-pink-100 hidden sm:block">Mi Perfil</span>
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              P
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
