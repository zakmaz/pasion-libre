
import React from 'react';
import { MapPin, ShieldCheck, Heart } from 'lucide-react';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
  onClick: (ad: Ad) => void;
}

const AdCard: React.FC<AdCardProps> = ({ ad, onClick }) => {
  return (
    <div 
      onClick={() => onClick(ad)}
      className="group bg-pink-700 border border-pink-400 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-red-400 transition-all cursor-pointer flex flex-col h-full shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={ad.imageUrl} 
          alt={ad.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-pink-900/60 backdrop-blur-sm p-2 rounded-full text-white/70 hover:text-red-500 transition-colors shadow-sm">
            <Heart size={18} fill="currentColor" className="text-transparent hover:text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            {ad.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white line-clamp-1 leading-tight group-hover:text-red-300 transition-colors">
            {ad.title}
          </h3>
        </div>
        <p className="text-red-400 font-black text-xl mb-2 drop-shadow-sm">
          {ad.price > 0 ? `${ad.price}€` : 'Consultar'}
        </p>
        <div className="flex items-center gap-1 text-pink-200 text-xs mb-3">
          <MapPin size={14} />
          {ad.location}
        </div>
        <div className="mt-auto pt-3 border-t border-pink-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white">
              {ad.seller.charAt(0)}
            </div>
            <span className="text-xs text-pink-100 font-medium truncate max-w-[80px]">
              {ad.seller}
            </span>
          </div>
          {ad.isVerified && (
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold bg-emerald-900/40 px-2 py-0.5 rounded-full">
              <ShieldCheck size={12} />
              VERIFICADO
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCard;
