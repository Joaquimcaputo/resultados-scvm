const { useState, useMemo } = React;
const { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

// Ícones Lucide como componentes React
const Icon = ({ name, size = 24, className = "" }) => {
  React.useEffect(() => {
    lucide.createIcons();
  }, []);
  return React.createElement('i', { 'data-lucide': name, className, style: { width: size, height: size } });
};

const colors = {
  primary: '#1B5E4F',
  primaryDark: '#0D3D31',
  gold: '#D4AF37',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
};

const LIVRO_ORDENS = [
  { codigo: 'BDVAAAAA', isin: 'AOBDVAAAAA05', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 43950, totalBuyQty: 25869, totalSellQty: 165, melhorPrecoCompra: 44000, melhorPrecoVenda: 43950, risco: 'Médio', volume24h: 1250000000, variacao: 2.5, rating: 'BBB+', setor: 'Financeiro' },
  { codigo: 'BAIAAAAA', isin: 'AOBAIAAAAA03', tipologia: 'Acções', emissor: 'Banco Angolano de Investimentos', ultimaCotacao: 38000, totalBuyQty: 15200, totalSellQty: 8500, melhorPrecoCompra: 38500, melhorPrecoVenda: 38000, risco: 'Médio', volume24h: 980000000, variacao: -1.2, rating: 'BBB', setor: 'Financeiro' },
  { codigo: 'OTNR2408', isin: 'AOBFAAAAAA08', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 49500, totalBuyQty: 5000, totalSellQty: 2003, melhorPrecoCompra: 49500, melhorPrecoVenda: 49000, risco: 'Baixo', volume24h: 450000000, variacao: 0.2, rating: 'AA-', taxaCupao: 7.5, setor: 'Soberano' }
];

const PRECARIO = {
  taxas: {
    acoes: { mercadoSecundario: { resultados: 0.009, bodiva: 0.0015 } },
    tituloDivida: { mercadoSecundario: { resultados: 0.0075, bodiva: 0.000525 } }
  },
  minimosResultados: 3000,
  minimosBodiva: { acoes: 250, divida: 1750 },
  iva: 0.14
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
  const [searchTerm, setSearchTerm] = useState('');
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const marketStats = useMemo(() => {
    const totalVolume = LIVRO_ORDENS.reduce((sum, inst) => sum + inst.volume24h, 0);
    const avgVariation = LIVRO_ORDENS.reduce((sum, inst) => sum + inst.variacao, 0) / LIVRO_ORDENS.length;
    return { totalVolume, avgVariation };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-md bg-gradient-to-r from-teal-700 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="bg-white px-4 py-2 rounded-lg">
              <ResultadosLogo />
            </div>
            <nav className="flex gap-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'dashboard' ? 'bg-white text-gray-900' : 'text-white hover:bg-white hover:bg-opacity-20'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('instrumentos')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'instrumentos' ? 'bg-white text-gray-900' : 'text-white hover:bg-white hover:bg-opacity-20'}`}
              >
                Instrumentos
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Visão Geral do Mercado</h1>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Volume Total</div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(marketStats.totalVolume)}</div>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Variação Média</div>
                <div className={`text-2xl font-bold ${marketStats.avgVariation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketStats.avgVariation.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Top Instrumentos</h2>
              <div className="space-y-3">
                {LIVRO_ORDENS.map(inst => (
                  <div key={inst.codigo} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">{inst.codigo}</div>
                      <div className="text-sm text-gray-600">{inst.emissor}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(inst.ultimaCotacao)}</div>
                      <div className={`text-sm ${inst.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {inst.variacao >= 0 ? '+' : ''}{inst.variacao}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instrumentos' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Instrumentos Financeiros</h1>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3">Código</th>
                    <th className="text-left p-3">Emissor</th>
                    <th className="text-right p-3">Cotação</th>
                    <th className="text-right p-3">Variação</th>
                  </tr>
                </thead>
                <tbody>
                  {LIVRO_ORDENS.map(inst => (
                    <tr key={inst.codigo} className="border-b border-gray-100">
                      <td className="p-3 font-mono font-bold">{inst.codigo}</td>
                      <td className="p-3">{inst.emissor}</td>
                      <td className="p-3 text-right font-bold">{formatCurrency(inst.ultimaCotacao)}</td>
                      <td className="p-3 text-right">
                        <span className={`font-semibold ${inst.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {inst.variacao >= 0 ? '+' : ''}{inst.variacao}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

ReactDOM.render(<TradingPlatform />, document.getElementById('root'));