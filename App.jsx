import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, BarChart3, Clock, FileText, Home, Briefcase, Activity, X, PieChart as IconPieChart, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle, UserPlus } from 'lucide-react';

const colors = {
  primary: '#1B5E4F',
  primaryDark: '#0D3D31',
  gold: '#D4AF37',
  success: '#10B981',
  danger: '#EF4444'
};

const ResultadosLogo = () => (
  <svg viewBox="0 0 200 60" className="h-12">
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors.primary} />
        <stop offset="100%" stopColor={colors.primaryDark} />
      </linearGradient>
    </defs>
    <rect x="5" y="15" width="8" height="30" rx="2" fill="url(#lg)" transform="rotate(20 9 30)" />
    <rect x="15" y="12" width="8" height="36" rx="2" fill="url(#lg)" transform="rotate(20 19 30)" />
    <rect x="25" y="18" width="8" height="24" rx="2" fill="url(#lg)" transform="rotate(20 29 30)" />
    <text x="45" y="32" fontFamily="Arial" fontSize="18" fontWeight="700" fill={colors.primary}>Resultados</text>
    <text x="45" y="46" fontFamily="Arial" fontSize="9" fill="#666" letterSpacing="3">SCVM S.A.</text>
  </svg>
);

const TradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-md bg-gradient-to-r from-teal-700 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="bg-white px-4 py-2 rounded-lg">
              <ResultadosLogo />
            </div>
            <nav className="flex gap-6">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'instrumentos', label: 'Instrumentos', icon: Briefcase },
                { id: 'ordens', label: 'Ordens', icon: FileText },
                { id: 'carteira', label: 'Carteira', icon: IconPieChart }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20"
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Activity size={64} className="mx-auto mb-4 text-teal-600" />
          <h1 className="text-3xl font-bold text-teal-700 mb-4">
            RESULTADOS SCVM - Plataforma Profissional
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Sistema de Gestão de Ordens do Mercado de Capitais Angolano
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-teal-50 rounded-lg">
              <UserPlus size={48} className="mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold mb-2">Abertura de Conta</h3>
              <p className="text-sm text-gray-600">KYC completo em 4 etapas</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <BarChart3 size={48} className="mx-auto mb-3 text-blue-600" />
              <h3 className="font-bold mb-2">Análise Avançada</h3>
              <p className="text-sm text-gray-600">Gráficos e projeções</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <CheckCircle size={48} className="mx-auto mb-3 text-green-600" />
              <h3 className="font-bold mb-2">Gestão de Ordens</h3>
              <p className="text-sm text-gray-600">Compliance e execução</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradingPlatform;
