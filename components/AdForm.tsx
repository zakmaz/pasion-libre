
import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, Loader2, Camera } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { enhanceAdDescription, moderateContent } from '../services/geminiService';

interface AdFormProps {
  onSubmit: (ad: any) => void;
  onCancel: () => void;
}

const AdForm: React.FC<AdFormProps> = ({ onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [moderationResult, setModerationResult] = useState<{ isSafe: boolean; reason: string } | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'otros',
    location: '',
    image: null as File | null
  });

  const handleEnhance = async () => {
    if (!formData.title || !formData.description) return;
    setEnhancing(true);
    const result = await enhanceAdDescription(formData.title, formData.description);
    if (result) {
      setFormData(prev => ({
        ...prev,
        title: result.enhancedTitle,
        description: result.enhancedDescription
      }));
    }
    setEnhancing(false);
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // AI Moderation
    const mod = await moderateContent(formData.title + ' ' + formData.description);
    setModerationResult(mod);
    
    if (mod.isSafe) {
      setTimeout(() => {
        onSubmit({
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
          seller: 'Usuario Pasion',
          isVerified: false,
          imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
          price: Number(formData.price)
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pink-600 rounded-3xl shadow-2xl p-6 sm:p-10 max-w-3xl mx-auto border border-pink-400 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="flex items-center justify-between mb-8 border-b border-pink-400 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white">Publicar en Pasion-Libre</h2>
          <p className="text-pink-100 text-sm mt-1">Conecta con personas reales de forma segura.</p>
        </div>
        <button onClick={onCancel} className="text-pink-200 hover:text-white transition-colors bg-pink-700 p-2 rounded-full">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-pink-100 mb-1.5">Título del Anuncio</label>
            <input 
              required
              value={formData.title}
              onChange={(e) => handleTextChange('title', e.target.value)}
              className="w-full bg-pink-700 border border-pink-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white placeholder:text-pink-400"
              placeholder="¿Qué buscas o qué ofreces?"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-pink-100 mb-1.5">Categoría</label>
            <select 
              value={formData.category}
              onChange={(e) => handleTextChange('category', e.target.value)}
              className="w-full bg-pink-700 border border-pink-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none text-white"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id} className="bg-pink-800">{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-pink-100 mb-1.5">Precio (€)</label>
            <input 
              type="number"
              required
              value={formData.price}
              onChange={(e) => handleTextChange('price', e.target.value)}
              className="w-full bg-pink-700 border border-pink-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white placeholder:text-pink-400"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* AI Enhancement */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-bold text-pink-100">Descripción</label>
            <button 
              type="button"
              onClick={handleEnhance}
              disabled={enhancing || !formData.description}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black px-3 py-1.5 rounded-full transition-all disabled:opacity-50 shadow-md"
            >
              {enhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {enhancing ? 'PULIENDO...' : 'MEJORAR CON IA'}
            </button>
          </div>
          <textarea 
            required
            rows={5}
            value={formData.description}
            onChange={(e) => handleTextChange('description', e.target.value)}
            className="w-full bg-pink-700 border border-pink-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white placeholder:text-pink-400"
            placeholder="Sé detallado y honesto..."
          />
        </div>

        {/* Location Input for real forum feel */}
        <div>
          <label className="block text-sm font-bold text-pink-100 mb-1.5">Ubicación (Ciudad)</label>
          <input 
            required
            value={formData.location}
            onChange={(e) => handleTextChange('location', e.target.value)}
            className="w-full bg-pink-700 border border-pink-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all text-white placeholder:text-pink-400"
            placeholder="Ej: Madrid, Valencia..."
          />
        </div>

        {/* Media */}
        <div>
          <label className="block text-sm font-bold text-pink-100 mb-2">Fotos Reales</label>
          <div className="border-2 border-dashed border-pink-400 rounded-2xl p-8 flex flex-col items-center justify-center bg-pink-700/50 hover:bg-pink-700 transition-colors cursor-pointer group">
            <div className="bg-red-600 p-3 rounded-full shadow-lg mb-3 group-hover:scale-110 transition-transform">
              <Camera size={24} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">Subir archivos</span>
            <span className="text-xs text-pink-200 mt-1">Sube hasta 5 fotos reales</span>
          </div>
        </div>

        {/* Moderation Warning */}
        {moderationResult && !moderationResult.isSafe && (
          <div className="bg-red-900 border border-red-500 p-4 rounded-xl flex gap-3 text-red-100 text-sm animate-bounce">
            <AlertCircle className="flex-shrink-0" size={20} />
            <div>
              <p className="font-bold">⚠️ Error de Contenido</p>
              <p>{moderationResult.reason}</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-pink-400 flex flex-col sm:flex-row gap-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-2 disabled:opacity-70 text-lg uppercase tracking-wider"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle size={24} />}
            Publicar Anuncio Real
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-8 py-4 text-pink-100 font-bold hover:bg-pink-700 rounded-2xl transition-all border border-pink-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdForm;
