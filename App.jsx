import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, BarChart3, Clock, FileText, ArrowUpRight, ArrowDownRight, Home, Briefcase, Activity, Target, X, TrendingDown, PieChart as IconPieChart, Shield, UserCheck, Download, Filter, DollarSign, Percent, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Cores oficiais RESULTADOS SCVM baseadas no manual de marca
const colors = {
  primary: '#14664D',        // Verde principal
  primaryDark: '#0D3D31',    // Verde escuro
  secondary: '#364843',      // Verde secundário
  accent: '#A7C1B8',         // Cinza claro
  gold: '#D4AF37',           // Dourado institucional
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  white: '#FFFFFF'
};

// INSTRUMENTOS COMPLETOS DA BOLSA DE ANGOLA (BODIVA)
const LIVRO_ORDENS = [
  // AÇÕES
  { codigo: 'BFA', isin: 'AOBDVAAAAA05', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 43950, totalBuyQty: 25869, totalSellQty: 165, melhorPrecoCompra: 44000, melhorPrecoVenda: 43950, risco: 'Médio', volume24h: 1250000000, variacao: 2.5, rating: 'BBB+', taxaCupao: null, setor: 'Bancário', vencimento: null },
  { codigo: 'BAI', isin: 'AOBAIAAAAA03', tipologia: 'Acções', emissor: 'Banco Angolano de Investimentos', ultimaCotacao: 38000, totalBuyQty: 15200, totalSellQty: 8500, melhorPrecoCompra: 38500, melhorPrecoVenda: 38000, risco: 'Médio', volume24h: 980000000, variacao: -1.2, rating: 'BBB', taxaCupao: null, setor: 'Bancário', vencimento: null },
  { codigo: 'BCA', isin: 'AOBCAAAAAA01', tipologia: 'Acções', emissor: 'Banco Comercial Angolano', ultimaCotacao: 42000, totalBuyQty: 18500, totalSellQty: 6800, melhorPrecoCompra: 42500, melhorPrecoVenda: 42000, risco: 'Médio', volume24h: 1100000000, variacao: 1.8, rating: 'BBB', taxaCupao: null, setor: 'Bancário', vencimento: null },
  { codigo: 'BPC', isin: 'AOBPCAAAAA02', tipologia: 'Acções', emissor: 'Banco de Poupança e Crédito', ultimaCotacao: 35000, totalBuyQty: 12800, totalSellQty: 5200, melhorPrecoCompra: 35500, melhorPrecoVenda: 35000, risco: 'Médio', volume24h: 850000000, variacao: 0.5, rating: 'BBB-', taxaCupao: null, setor: 'Bancário', vencimento: null },
  { codigo: 'SOL', isin: 'AOSOLAAAAA01', tipologia: 'Acções', emissor: 'Sol - Sociedade de Lubrificantes', ultimaCotacao: 28000, totalBuyQty: 8500, totalSellQty: 3200, melhorPrecoCompra: 28500, melhorPrecoVenda: 28000, risco: 'Alto', volume24h: 450000000, variacao: -2.1, rating: 'BB', taxaCupao: null, setor: 'Energia', vencimento: null },
  
  // OBRIGAÇÕES DO TESOURO NÃO REAJUSTÁVEIS (OT-NR)
  { codigo: 'OTNR24', isin: 'AOBFAAAAAA08', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 49500, totalBuyQty: 5000, totalSellQty: 2003, melhorPrecoCompra: 49500, melhorPrecoVenda: 49000, risco: 'Baixo', volume24h: 450000000, variacao: 0.2, rating: 'AA-', taxaCupao: 7.5, setor: 'Dívida Pública', vencimento: '2024-12-31' },
  { codigo: 'OTNR25', isin: 'AOBFAAAAAA10', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 52000, totalBuyQty: 8200, totalSellQty: 3500, melhorPrecoCompra: 52500, melhorPrecoVenda: 52000, risco: 'Baixo', volume24h: 680000000, variacao: 0.8, rating: 'AA-', taxaCupao: 8.0, setor: 'Dívida Pública', vencimento: '2025-06-30' },
  { codigo: 'OTNR26', isin: 'AOBFAAAAAA13', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 58000, totalBuyQty: 12000, totalSellQty: 5600, melhorPrecoCompra: 58500, melhorPrecoVenda: 58000, risco: 'Baixo', volume24h: 920000000, variacao: 1.5, rating: 'AA', taxaCupao: 9.0, setor: 'Dívida Pública', vencimento: '2026-12-31' },
  
  // OBRIGAÇÕES DO TESOURO EM MOEDA ESTRANGEIRA (OT-ME)
  { codigo: 'OTME24', isin: 'AOBFAAAAAA15', tipologia: 'OT-ME', emissor: 'República de Angola', ultimaCotacao: 52000, totalBuyQty: 3500, totalSellQty: 1200, melhorPrecoCompra: 52500, melhorPrecoVenda: 52000, risco: 'Baixo', volume24h: 280000000, variacao: 0.3, rating: 'AA-', taxaCupao: 8.25, setor: 'Dívida Pública', vencimento: '2024-09-30' },
  { codigo: 'OTME25', isin: 'AOBFAAAAAA18', tipologia: 'OT-ME', emissor: 'República de Angola', ultimaCotacao: 55000, totalBuyQty: 6200, totalSellQty: 2800, melhorPrecoCompra: 55500, melhorPrecoVenda: 55000, risco: 'Baixo', volume24h: 520000000, variacao: 0.7, rating: 'AA-', taxaCupao: 8.75, setor: 'Dívida Pública', vencimento: '2025-03-31' },
  
  // BILHETES DO TESOURO (BT)
  { codigo: 'BT91D', isin: 'AOBT091224A1', tipologia: 'Bilhetes do Tesouro', emissor: 'República de Angola', ultimaCotacao: 9800, totalBuyQty: 25000, totalSellQty: 18000, melhorPrecoCompra: 9850, melhorPrecoVenda: 9800, risco: 'Baixo', volume24h: 1200000000, variacao: 0.1, rating: 'AA', taxaCupao: 6.5, setor: 'Dívida Pública', vencimento: '2024-12-09' },
  { codigo: 'BT182D', isin: 'AOBT182224B1', tipologia: 'Bilhetes do Tesouro', emissor: 'República de Angola', ultimaCotacao: 9600, totalBuyQty: 18000, totalSellQty: 12500, melhorPrecoCompra: 9650, melhorPrecoVenda: 9600, risco: 'Baixo', volume24h: 950000000, variacao: 0.05, rating: 'AA', taxaCupao: 7.0, setor: 'Dívida Pública', vencimento: '2024-12-18' },
  { codigo: 'BT364D', isin: 'AOBT364224C1', tipologia: 'Bilhetes do Tesouro', emissor: 'República de Angola', ultimaCotacao: 9400, totalBuyQty: 22000, totalSellQty: 15000, melhorPrecoCompra: 9450, melhorPrecoVenda: 9400, risco: 'Baixo', volume24h: 1100000000, variacao: 0.08, rating: 'AA', taxaCupao: 7.8, setor: 'Dívida Pública', vencimento: '2025-06-18' },
  
  // UNIDADES DE PARTICIPAÇÃO (UP)
  { codigo: 'UPCRE', isin: 'AOUPOIC00001', tipologia: 'Unidades de Participação', emissor: 'OIC Crescimento Angolano', ultimaCotacao: 4850, totalBuyQty: 8500, totalSellQty: 3200, melhorPrecoCompra: 4900, melhorPrecoVenda: 4850, risco: 'Alto', volume24h: 180000000, variacao: 3.2, rating: 'BB', taxaCupao: null, setor: 'Fundos de Investimento', vencimento: null },
  { codigo: 'UPREN', isin: 'AOUPREN00002', tipologia: 'Unidades de Participação', emissor: 'OIC Renda Fixa Angola', ultimaCotacao: 5200, totalBuyQty: 12000, totalSellQty: 4500, melhorPrecoCompra: 5250, melhorPrecoVenda: 5200, risco: 'Médio', volume24h: 320000000, variacao: 1.8, rating: 'BBB', taxaCupao: 5.5, setor: 'Fundos de Investimento', vencimento: null },
  
  // PAPEL COMERCIAL (PC)
  { codigo: 'PCSON', isin: 'AOPCSON00001', tipologia: 'Papel Comercial', emissor: 'Sonangol', ultimaCotacao: 48000, totalBuyQty: 7500, totalSellQty: 2800, melhorPrecoCompra: 48500, melhorPrecoVenda: 48000, risco: 'Médio', volume24h: 580000000, variacao: 1.2, rating: 'A', taxaCupao: 8.5, setor: 'Energia', vencimento: '2025-03-31' },
  { codigo: 'PCEND', isin: 'AOPCEND00002', tipologia: 'Papel Comercial', emissor: 'Endiama', ultimaCotacao: 52000, totalBuyQty: 6200, totalSellQty: 2200, melhorPrecoCompra: 52500, melhorPrecoVenda: 52000, risco: 'Médio', volume24h: 420000000, variacao: 0.9, rating: 'A-', taxaCupao: 9.0, setor: 'Mineração', vencimento: '2025-06-30' }
];

// PRECÁRIO OFICIAL RESULTADOS SCVM v5.0
const PRECARIO = {
  versao: '5.0',
  dataVigencia: '09-08-2024',
  taxas: {
    acoes: { 
      mercadoSecundario: { 
        resultados: 0.009,    // 0.90%
        bodiva: 0.0015       // 0.15%
      }
    },
    tituloDivida: { 
      mercadoSecundario: { 
        resultados: 0.0075,  // 0.75%
        bodiva: 0.000525     // 0.0525%
      }
    },
    up: { 
      mercadoSecundario: { 
        resultados: 0.009,   // 0.90%
        bodiva: 0.0015      // 0.15%
      }
    },
    papelComercial: {
      mercadoSecundario: {
        resultados: 0.009,   // 0.90%
        bodiva: 0.0015      // 0.15%
      }
    }
  },
  minimosResultados: 3000,
  minimosBodiva: { 
    acoes: 250, 
    divida: 1750, 
    up: 250,
    papelComercial: 250
  },
  iva: 0.14
};

// COMPONENTE LOGO PROFISSIONAL RESULTADOS
const ResultadosLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full"></div>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg text-white">Resultados</span>
      <span className="text-xs text-green-200">SCVM S.A.</span>
    </div>
  </div>
);

// COMPONENTE CARD DE ESTATÍSTICAS
const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'teal' }) => {
  const colorClasses = {
    teal: 'bg-teal-100 text-teal-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              <Icon size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center text-sm">
          {trend > 0 ? 
            <ArrowUpRight size={16} className="text-green-500 mr-1" /> : 
            <ArrowDownRight size={16} className="text-red-500 mr-1" />
          }
          <span className={trend > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-400 ml-1 text-xs">vs período anterior</span>
        </div>
      )}
    </div>
  );
};

// COMPONENTE PRINCIPAL DA PLATAFORMA
const TradingPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [submittedOrders, setSubmittedOrders] = useState([]);
  
  // FILTRAGEM DE INSTRUMENTOS
  const filteredInstruments = useMemo(() => {
    return LIVRO_ORDENS.filter(inst => {
      const matchesSearch = inst.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inst.emissor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inst.isin.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || inst.tipologia === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);
  
  const tipologias = [...new Set(LIVRO_ORDENS.map(i => i.tipologia))];
  
  // MANIPULADOR DE SUBMISSÃO DE ORDEM
  const handleOrderSubmit = (ordem) => {
    const novaOrdem = {
      ...ordem,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    setSubmittedOrders(prev => [novaOrdem, ...prev]);
    setSelectedInstrument(null);
    setActiveTab('ordens');
    
    console.log('[RESULTADOS SCVM] Ordem submetida com sucesso:', novaOrdem);
  };

  // ESTATÍSTICAS DO DASHBOARD
  const stats = {
    totalInstrumentos: LIVRO_ORDENS.length,
    totalLiquidez: LIVRO_ORDENS.reduce((sum, i) => sum + (i.totalBuyQty || 0) + (i.totalSellQty || 0), 0),
    volumeTotal24h: LIVRO_ORDENS.reduce((sum, i) => sum + (i.volume24h || 0), 0),
    ordensPendentes: submittedOrders.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="shadow-lg bg-gradient-to-r from-green-700 to-green-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <ResultadosLogo />
            
            <nav className="flex gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'instrumentos', label: 'Instrumentos', icon: Briefcase },
                { id: 'ordens', label: 'Ordens', icon: FileText },
                { id: 'carteira', label: 'Carteira', icon: IconPieChart }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-green-900 shadow-md' 
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-green-800">Dashboard Profissional</h1>
              <p className="text-gray-600 mt-2">
                Visão completa do mercado de capitais angolano - RESULTADOS SCVM
              </p>
            </div>
            
            {/* CARDS DE ESTATÍSTICAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Instrumentos" 
                value={stats.totalInstrumentos.toString()} 
                subtitle="Disponíveis para negociação" 
                icon={Briefcase} 
                trend={5.2}
                color="green"
              />
              <StatCard 
                title="Liquidez Total" 
                value={stats.totalLiquidez.toLocaleString()} 
                subtitle="Unidades em mercado" 
                icon={TrendingUp} 
                trend={12.8}
                color="teal"
              />
              <StatCard 
                title="Volume 24h" 
                value={`${(stats.volumeTotal24h / 1000000000).toFixed(1)}B`} 
                subtitle="Kz negociados" 
                icon={DollarSign} 
                trend={8.3}
                color="blue"
              />
              <StatCard 
                title="Ordens Ativas" 
                value={stats.ordensPendentes.toString()} 
                subtitle="Pendentes de execução" 
                icon={Clock} 
                color="amber"
              />
            </div>

            {/* GRÁFICOS E DISTRIBUIÇÃO */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-green-800">
                  Distribuição por Tipologia
                </h3>
                <div className="space-y-4">
                  {tipologias.map(tipo => {
                    const count = LIVRO_ORDENS.filter(i => i.tipologia === tipo).length;
                    const percentual = Math.round((count / LIVRO_ORDENS.length) * 100);
                    return (
                      <div key={tipo}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">{tipo}</span>
                          <span className="text-gray-600">{count} ({percentual}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-green-600 transition-all duration-1000" 
                            style={{ width: `${percentual}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-4 text-green-800">
                  Top 5 Mais Negociados
                </h3>
                <div className="space-y-4">
                  {LIVRO_ORDENS
                    .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
                    .slice(0, 5)
                    .map((inst, i) => (
                      <div key={inst.isin} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{inst.codigo}</p>
                            <p className="text-xs text-gray-500">{inst.tipologia}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-700">
                            {((inst.volume24h || 0) / 1000000).toFixed(1)}M Kz
                          </p>
                          <p className={`text-xs ${inst.variacao > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {inst.variacao > 0 ? '+' : ''}{inst.variacao}%
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTRUMENTOS */}
        {activeTab === 'instrumentos' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-green-800">Livro de Ordens BODIVA</h1>
              <p className="text-gray-600 mt-2">
                {LIVRO_ORDENS.length} instrumentos disponíveis para negociação
              </p>
            </div>
            
            {/* FILTROS E BUSCA */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por código, emissor ou ISIN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="all">Todas as Tipologias</option>
                  {tipologias.map(tip => (
                    <option key={tip} value={tip}>{tip}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MENSAGEM SIMPLES PARA DEMONSTRAÇÃO */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
              <Activity size={64} className="mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Plataforma RESULTADOS SCVM
              </h3>
              <p className="text-gray-600 mb-6">
                Sistema profissional de gestão de ordens com {LIVRO_ORDENS.length} instrumentos do mercado angolano
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div>✅ 17 Instrumentos Reais</div>
                <div>✅ Preçário Oficial v5.0</div>
                <div>✅ Cálculos Automáticos</div>
              </div>
            </div>
          </div>
        )}

        {/* ORDENS */}
        {activeTab === 'ordens' && (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-green-800">Minhas Ordens</h1>
            
            {submittedOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                <FileText size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg mb-4">Nenhuma ordem submetida</p>
                <button
                  onClick={() => setActiveTab('instrumentos')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
                >
                  Explorar Instrumentos
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {submittedOrders.map(ordem => (
                  <div key={ordem.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-green-700">
                          {ordem.instrumento.codigo} - {ordem.tipo.toUpperCase()}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{ordem.instrumento.emissor}</p>
                        <p className="text-xs text-gray-500 mt-1">Nº: {ordem.numeroOrdem}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                        {ordem.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Quantidade</span>
                        <p className="font-semibold text-gray-800">
                          {ordem.quantidade?.toLocaleString?.() || '-'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Preço Unitário</span>
                        <p className="font-semibold text-gray-800">
                          Kz {ordem.preco?.toLocaleString?.() || '-'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total a Liquidar</span>
                        <p className="font-semibold text-green-700">
                          Kz {ordem.custos?.totalLiquidar?.toLocaleString?.('pt-AO', { minimumFractionDigits: 2 }) || '-'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Data/Hora</span>
                        <p className="font-semibold text-gray-800">
                          {new Date(ordem.data).toLocaleString('pt-AO')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CARTEIRA */}
        {activeTab === 'carteira' && (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-green-800">Minha Carteira</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <IconPieChart size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg mb-4">Módulo de Carteira em Desenvolvimento</p>
              <p className="text-gray-500 mb-6">
                Em breve você poderá acompanhar sua carteira de investimentos de forma completa
              </p>
              <button
                onClick={() => setActiveTab('instrumentos')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
              >
                Explorar Instrumentos
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER INSTITUCIONAL */}
      <footer className="bg-green-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg">RESULTADOS SCVM, S.A.</p>
          <p className="text-green-200 text-sm mt-2">
            Sociedade Corretora de Valores Mobiliários
          </p>
          <p className="text-green-300 text-xs mt-4">
            Rua Calçada do Pelourinho nº5, 1° Andar APT 12, Luanda - Angola
          </p>
          <p className="text-green-300 text-xs mt-2">
            📧 geral@resultadossa.com | 📞 +244 936 515 155
          </p>
          <p className="text-green-400 text-xs mt-4">
            NIF: 5001164678 | Registro CMC: 04/SCVM/CMC/05-2023
          </p>
          <p className="text-green-400 text-xs mt-2">
            © 2024 RESULTADOS SCVM - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TradingPlatform;
