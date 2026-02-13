
import React from 'react';
import { 
  Home, 
  Smartphone, 
  Car, 
  Heart, 
  Briefcase, 
  MoreHorizontal,
  Camera,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import { Ad, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Todos', icon: 'Home' },
  { id: 'relaciones', name: 'Relaciones', icon: 'Heart' },
  { id: 'empleo', name: 'Empleo Adultos', icon: 'Briefcase' },
  { id: 'vivienda', name: 'Vivienda', icon: 'Home' },
  { id: 'ocio', name: 'Ocio y Eventos', icon: 'Coffee' },
  { id: 'motor', name: 'Motor', icon: 'Car' },
  { id: 'tecnologia', name: 'Tecnología', icon: 'Smartphone' },
  { id: 'otros', name: 'Otros', icon: 'MoreHorizontal' },
];

export const MOCK_ADS: Ad[] = [
  {
    id: '1',
    title: 'Cámara Mirrorless Profesional',
    description: 'Perfecta para sesiones de fotografía de alta calidad. Incluye lente 50mm.',
    price: 850,
    category: 'tecnologia',
    location: 'Madrid',
    imageUrl: 'https://picsum.photos/seed/camera/600/400',
    createdAt: '2024-03-20',
    seller: 'Arturo G.',
    isVerified: true,
  },
  {
    id: '2',
    title: 'Buscamos Bartender para Club Nocturno',
    description: 'Experiencia mínima 2 años. Ambiente profesional y excelente paga por horas.',
    price: 15,
    category: 'empleo',
    location: 'Barcelona',
    imageUrl: 'https://picsum.photos/seed/bar/600/400',
    createdAt: '2024-03-19',
    seller: 'NightLife Group',
    isVerified: true,
  },
  {
    id: '3',
    title: 'Apartamento Céntrico Amueblado',
    description: 'Ideal para personas solas o parejas. Solo adultos responsables.',
    price: 1200,
    category: 'vivienda',
    location: 'Valencia',
    imageUrl: 'https://picsum.photos/seed/apt/600/400',
    createdAt: '2024-03-18',
    seller: 'InmoGestión',
    isVerified: false,
  },
  {
    id: '4',
    title: 'Clases de Yoga para Adultos',
    description: 'Sesiones privadas enfocadas en relajación y bienestar físico.',
    price: 45,
    category: 'ocio',
    location: 'Sevilla',
    imageUrl: 'https://picsum.photos/seed/yoga/600/400',
    createdAt: '2024-03-17',
    seller: 'Elena Mindful',
    isVerified: true,
  }
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home': return <Home size={20} />;
    case 'Smartphone': return <Smartphone size={20} />;
    case 'Car': return <Car size={20} />;
    case 'Heart': return <Heart size={20} />;
    case 'Briefcase': return <Briefcase size={20} />;
    case 'Camera': return <Camera size={20} />;
    case 'Coffee': return <Coffee size={20} />;
    case 'ShoppingBag': return <ShoppingBag size={20} />;
    default: return <MoreHorizontal size={20} />;
  }
};
