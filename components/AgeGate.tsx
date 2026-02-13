
import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface AgeGateProps {
  onConfirm: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-900 px-4">
      <div className="max-w-md w-full bg-pink-800 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] p-8 text-center animate-in fade-in zoom-in duration-500 border border-pink-600">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-600 p-4 rounded-full shadow-lg">
            <ShieldAlert size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white mb-4">¡ALTO!</h1>
        <h2 className="text-xl font-bold text-red-400 mb-4 tracking-tight uppercase">pasion-libre: Contenido Adulto</h2>
        <p className="text-pink-100 mb-8 leading-relaxed font-medium">
          Este foro está reservado exclusivamente para personas mayores de 18 años. 
          Contiene material explícito y anuncios clasificados para adultos.
        </p>
        <div className="space-y-4">
          <button 
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-red-950/40 active:scale-95 text-lg uppercase"
          >
            SÍ, TENGO +18 AÑOS
          </button>
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="w-full bg-pink-700 hover:bg-pink-600 text-pink-100 font-bold py-3 px-6 rounded-2xl transition-all border border-pink-500"
          >
            SALIR DEL FORO
          </button>
        </div>
        <p className="mt-8 text-[10px] text-pink-400 uppercase tracking-widest font-black">
          NAVEGACIÓN SEGURA Y PRIVADA
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
