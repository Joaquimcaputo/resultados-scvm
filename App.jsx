import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, BarChart3, Clock, FileText, ArrowUpRight, ArrowDownRight, Home, Briefcase, Activity, Target, X, TrendingDown, PieChart as IconPieChart, UserPlus, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle, AlertCircle, DollarSign, Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  { codigo: 'BDVAAAAA', isin: 'AOBDVAAAAA05', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 43950, totalBuyQty: 25869, totalSellQty: 165, melhorPrecoCompra: 44000, melhorPrecoVenda: 43950, risco: 'Médio', volume24h: 1250000000, variacao: 2.5, rating: 'BBB+', taxaCupao: null, setor: 'Financeiro', valorMercado: 125000000000, pVp: 1.2, roe: 15.3, dividendYield: 3.5 },
  { codigo: 'BAIAAAAA', isin: 'AOBAIAAAAA03', tipologia: 'Acções', emissor: 'Banco Angolano de Investimentos', ultimaCotacao: 38000, totalBuyQty: 15200, totalSellQty: 8500, melhorPrecoCompra: 38500, melhorPrecoVenda: 38000, risco: 'Médio', volume24h: 980000000, variacao: -1.2, rating: 'BBB', taxaCupao: null, setor: 'Financeiro', valorMercado: 98000000000, pVp: 1.1, roe: 12.8, dividendYield: 4.2 },
  { codigo: 'BCPAAAAA', isin: 'AOBCPAAAAA01', tipologia: 'Acções', emissor: 'Banco Comercial Português', ultimaCotacao: 25000, totalBuyQty: 9800, totalSellQty: 4200, melhorPrecoCompra: 25500, melhorPrecoVenda: 25000, risco: 'Alto', volume24h: 650000000, variacao: -3.8, rating: 'BB+', taxaCupao: null, setor: 'Financeiro', valorMercado: 65000000000, pVp: 0.9, roe: 8.5, dividendYield: 2.8 },
  { codigo: 'OTNR2408', isin: 'AOBFAAAAAA08', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 49500, totalBuyQty: 5000, totalSellQty: 2003, melhorPrecoCompra: 49500, melhorPrecoVenda: 49000, risco: 'Baixo', volume24h: 450000000, variacao: 0.2, rating: 'AA-', taxaCupao: 7.5, setor: 'Soberano', maturidade: '2024-08', ytm: 7.8 },
  { codigo: 'OTNR2410', isin: 'AOBFAAAAAA10', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 52000, totalBuyQty: 8200, totalSellQty: 3500, melhorPrecoCompra: 52500, melhorPrecoVenda: 52000, risco: 'Baixo', volume24h: 680000000, variacao: 0.8, rating: 'AA-', taxaCupao: 8.0, setor: 'Soberano', maturidade: '2024-10', ytm: 8.2 },
  { codigo: 'OTNR2501', isin: 'AOBFAAAAAA13', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 58000, totalBuyQty: 12000, totalSellQty: 5600, melhorPrecoCompra: 58500, melhorPrecoVenda: 58000, risco: 'Baixo', volume24h: 920000000, variacao: 1.5, rating: 'AA', taxaCupao: 9.0, setor: 'Soberano', maturidade: '2025-01', ytm: 9.3 },
  { codigo: 'BT091224', isin: 'AOBT091224A1', tipologia: 'Bilhetes do Tesouro', emissor: 'República de Angola', ultimaCotacao: 9800, totalBuyQty: 25000, totalSellQty: 18000, melhorPrecoCompra: 9850, melhorPrecoVenda: 9800, risco: 'Baixo', volume24h: 1200000000, variacao: 0.1, rating: 'AA', taxaCupao: 6.5, setor: 'Soberano', maturidade: '2024-12-09', ytm: 6.7 }
];

const PRECARIO = {
  versao: '5.0',
  dataVigencia: '09-08-2024',
  taxas: {
    acoes: { mercadoSecundario: { resultados: 0.009, bodiva: 0.0015 } },
    tituloDivida: { mercadoSecundario: { resultados: 0.0075, bodiva: 0.000525 } }
  },
  minimosResultados: 3000,
  minimosBodiva: { acoes: 250, divida: 1750 },
  iva: 0.14
};

const MOCK_HISTORICAL_DATA = [
  { data: '01/10', valor: 42000 },
  { data: '02/10', valor: 42500 },
  { data: '03/10', valor: 43200 },
  { data: '04/10', valor: 43800 },
  { data: '05/10', valor: 43950 }
];

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

const AccountRegistration = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    tipoCliente: 'individual',
    nome: '',
    email: '',
    telefone: '',
    nif: '',
    morada: '',
    senha: '',
    confirmarSenha: '',
    aceitaTermos: false
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    if (step === 1) return formData.tipoCliente;
    if (step === 2) return formData.nome && formData.email && formData.telefone;
    if (step === 3) return formData.nif && formData.morada;
    if (step === 4) return formData.senha && formData.senha === formData.confirmarSenha && formData.aceitaTermos;
    return false;
  };

  const handleSubmit = () => {
    console.log('[REGISTRO] Nova conta criada:', formData);
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Abertura de Conta</h1>
              <p className="text-teal-100 mt-2">Bem-vindo à RESULTADOS SCVM</p>
            </div>
            <ResultadosLogo />
          </div>
          
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-white text-teal-700' : 'bg-teal-600 text-white'}`}>
                  {step > num ? <CheckCircle size={20} /> : num}
                </div>
                {num < 4 && <div className={`w-24 h-1 mx-2 ${step > num ? 'bg-white' : 'bg-teal-600'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Tipo de Cliente</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleChange('tipoCliente', 'individual')}
                  className={`p-6 rounded-xl border-2 transition-all ${formData.tipoCliente === 'individual' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}
                >
                  <User size={48} className={formData.tipoCliente === 'individual' ? 'text-teal-600 mx-auto mb-3' : 'text-gray-400 mx-auto mb-3'} />
                  <h3 className="font-bold text-lg">Pessoa Singular</h3>
                  <p className="text-sm text-gray-600 mt-2">Investidor individual</p>
                </button>
                <button
                  onClick={() => handleChange('tipoCliente', 'corporativo')}
                  className={`p-6 rounded-xl border-2 transition-all ${formData.tipoCliente === 'corporativo' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}
                >
                  <Briefcase size={48} className={formData.tipoCliente === 'corporativo' ? 'text-teal-600 mx-auto mb-3' : 'text-gray-400 mx-auto mb-3'} />
                  <h3 className="font-bold text-lg">Pessoa Colectiva</h3>
                  <p className="text-sm text-gray-600 mt-2">Empresa ou instituição</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    placeholder="Nome completo"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                        placeholder="+244 900 000 000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Informações Fiscais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NIF</label>
                  <input
                    type="text"
                    value={formData.nif}
                    onChange={(e) => handleChange('nif', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    placeholder="000000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Morada Completa</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 text-gray-400" size={20} />
                    <textarea
                      value={formData.morada}
                      onChange={(e) => handleChange('morada', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      rows="3"
                      placeholder="Rua, número, bairro, município"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Segurança da Conta</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.senha}
                      onChange={(e) => handleChange('senha', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      placeholder="Mínimo 8 caracteres"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmarSenha}
                      onChange={(e) => handleChange('confirmarSenha', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      placeholder="Repita a senha"
                    />
                  </div>
                  {formData.confirmarSenha && formData.senha !== formData.confirmarSenha && (
                    <p className="text-red-600 text-sm mt-2">As senhas não coincidem</p>
                  )}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.aceitaTermos}
                      onChange={(e) => handleChange('aceitaTermos', e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      Declaro que li e aceito os Termos de Uso e a Política de Privacidade da RESULTADOS SCVM, S.A.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Voltar
            </button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid()}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              <CheckCircle size={18} className="inline mr-2" />
              Abrir Conta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InstrumentDetails = ({ instrument, onClose, onTrade }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-AO').format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white">{instrument.codigo}</h2>
              <p className="text-teal-100 text-lg mt-1">{instrument.emissor}</p>
              <div className="flex gap-3 mt-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">{instrument.tipologia}</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">{instrument.setor}</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">Rating: {instrument.rating}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl border-2 border-teal-200">
              <div className="text-sm text-gray-600 mb-1">Última Cotação</div>
              <div className="text-3xl font-bold text-teal-700">{formatCurrency(instrument.ultimaCotacao)}</div>
              <div className={`flex items-center mt-2 ${instrument.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {instrument.variacao >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                <span className="font-semibold ml-1">{Math.abs(instrument.variacao)}%</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Volume 24h</div>
              <div className="text-2xl font-bold text-gray-800">{formatCurrency(instrument.volume24h)}</div>
              <div className="text-sm text-gray-500 mt-2">Liquidez: Alta</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Spread</div>
              <div className="text-2xl font-bold text-gray-800">{formatCurrency(instrument.melhorPrecoVenda - instrument.melhorPrecoCompra)}</div>
              <div className="text-sm text-gray-500 mt-2">
                {((instrument.melhorPrecoVenda - instrument.melhorPrecoCompra) / instrument.melhorPrecoCompra * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BarChart3 className="mr-2 text-teal-600" />
              Evolução de Preço (5 dias)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MOCK_HISTORICAL_DATA}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area type="monotone" dataKey="valor" stroke={colors.primary} fillOpacity={1} fill="url(#colorValor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="mr-2 text-teal-600" />
                Livro de Ordens
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Melhor Compra</div>
                    <div className="text-xl font-bold text-green-700">{formatCurrency(instrument.melhorPrecoCompra)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Quantidade</div>
                    <div className="font-bold">{formatNumber(instrument.totalBuyQty)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Melhor Venda</div>
                    <div className="text-xl font-bold text-red-700">{formatCurrency(instrument.melhorPrecoVenda)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Quantidade</div>
                    <div className="font-bold">{formatNumber(instrument.totalSellQty)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="mr-2 text-teal-600" />
                Análise Fundamental
              </h3>
              <div className="space-y-3">
                {instrument.tipologia === 'Acções' ? (
                  <>
                    <div className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">Maturidade:</span>
                      <span className="font-semibold">{instrument.maturidade}</span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-semibold">{instrument.rating}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <AlertCircle className="mr-2 text-amber-600" />
              Avaliação de Risco
            </h3>
            <div className="flex items-center gap-4">
              <div className={`px-6 py-3 rounded-lg font-bold text-lg ${
                instrument.risco === 'Baixo' ? 'bg-green-100 text-green-700' :
                instrument.risco === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                Risco: {instrument.risco}
              </div>
              <p className="text-sm text-gray-600">
                {instrument.risco === 'Baixo' && 'Instrumento com baixa volatilidade e alta qualidade creditícia.'}
                {instrument.risco === 'Médio' && 'Instrumento com volatilidade moderada. Requer acompanhamento regular.'}
                {instrument.risco === 'Alto' && 'Instrumento de alta volatilidade. Adequado para investidores experientes.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4">Informações Técnicas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">ISIN:</span>
                  <span className="font-mono font-semibold">{instrument.isin}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Código:</span>
                  <span className="font-mono font-semibold">{instrument.codigo}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Emissor:</span>
                  <span className="font-semibold">{instrument.emissor}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Setor:</span>
                  <span className="font-semibold">{instrument.setor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 sticky bottom-0">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
            >
              Fechar
            </button>
            <button
              onClick={() => onTrade(instrument)}
              className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 flex items-center justify-center"
            >
              <TrendingUp className="mr-2" />
              Negociar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSimulator = ({ instrument, onClose, onSubmit }) => {
  const [orderType, setOrderType] = useState('compra');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(instrument.melhorPrecoCompra);
  
  const calculateCosts = useMemo(() => {
    const qty = parseInt(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const montante = qty * prc;
    
    const taxasConfig = instrument.tipologia === 'Acções' ? PRECARIO.taxas.acoes.mercadoSecundario : PRECARIO.taxas.tituloDivida.mercadoSecundario;
    
    let comissaoResultados = Math.max(montante * taxasConfig.resultados, PRECARIO.minimosResultados);
    let taxaBodiva = Math.max(montante * taxasConfig.bodiva, instrument.tipologia === 'Acções' ? PRECARIO.minimosBodiva.acoes : PRECARIO.minimosBodiva.divida);
    
    const ivaResultados = comissaoResultados * PRECARIO.iva;
    const ivaBodiva = taxaBodiva * PRECARIO.iva;
    const totalComissoes = comissaoResultados + ivaResultados + taxaBodiva + ivaBodiva;
    const totalLiquidar = montante + totalComissoes;
    
    return { montante, comissaoResultados, ivaResultados, taxaBodiva, ivaBodiva, totalComissoes, totalLiquidar };
  }, [quantity, price, instrument]);
  
  const formatCurrency = (value) => {
    if (!value) return 'Kz 0,00';
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 }).format(value);
  };
  
  const handleSubmit = () => {
    onSubmit({
      instrumento: instrument,
      tipo: orderType,
      quantidade: parseInt(quantity),
      preco: parseFloat(price),
      custos: calculateCosts,
      data: new Date().toISOString(),
      status: 'Pendente Compliance'
    });
  };
  
  const isValid = quantity && price && parseInt(quantity) > 0 && parseFloat(price) > 0;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Nova Ordem</h2>
              <p className="text-white mt-1">{instrument.codigo} - {instrument.emissor}</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Operação</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setOrderType('compra'); setPrice(instrument.melhorPrecoCompra); }}
                    className={`flex-1 py-3 rounded-xl font-semibold ${orderType === 'compra' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Compra
                  </button>
                  <button
                    onClick={() => { setOrderType('venda'); setPrice(instrument.melhorPrecoVenda); }}
                    className={`flex-1 py-3 rounded-xl font-semibold ${orderType === 'venda' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Venda
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantidade</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preço (Kz)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {quantity && price && (
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-teal-300">
                <h3 className="font-bold text-lg mb-4 text-teal-800">Resumo Financeiro</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montante:</span>
                      <span className="font-bold text-xl text-teal-700">{formatCurrency(calculateCosts.montante)}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Comissão RESULTADOS:</span>
                      <span>{formatCurrency(calculateCosts.comissaoResultados)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (14%):</span>
                      <span>{formatCurrency(calculateCosts.ivaResultados)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa BODIVA:</span>
                      <span>{formatCurrency(calculateCosts.taxaBodiva)}</span>
                    </div>
                  </div>
                  <div className="bg-teal-700 rounded-lg p-3 text-white">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total a Liquidar:</span>
                      <span className="font-bold text-xl">{formatCurrency(calculateCosts.totalLiquidar)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            Submeter Ordem
          </button>
        </div>
      </div>
    </div>
  );
};

const TradingPlatform = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showOrderSimulator, setShowOrderSimulator] = useState(false);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const filteredInstruments = useMemo(() => {
    return LIVRO_ORDENS.filter(inst => {
      const matchesSearch = inst.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inst.emissor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || inst.tipologia === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);
  
  const handleOrderSubmit = (ordem) => {
    setSubmittedOrders([...submittedOrders, { ...ordem, id: Date.now() }]);
    setShowOrderSimulator(false);
    setSelectedInstrument(null);
    setActiveTab('ordens');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const marketStats = useMemo(() => {
    const totalVolume = LIVRO_ORDENS.reduce((sum, inst) => sum + inst.volume24h, 0);
    const avgVariation = LIVRO_ORDENS.reduce((sum, inst) => sum + inst.variacao, 0) / LIVRO_ORDENS.length;
    const gainers = LIVRO_ORDENS.filter(inst => inst.variacao > 0).length;
    const losers = LIVRO_ORDENS.filter(inst => inst.variacao < 0).length;
    
    return { totalVolume, avgVariation, gainers, losers };
  }, []);
  
  if (!isRegistered) {
    return <AccountRegistration onComplete={() => setIsRegistered(true)} />;
  }

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
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-gray-900' : 'text-white hover:bg-white hover:bg-opacity-20'}`}
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
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Visão Geral do Mercado</h1>
              <p className="text-gray-600 mt-2">Dados em tempo real da BODIVA</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="text-teal-600" size={24} />
                  <TrendingUp className="text-green-600" size={20} />
                </div>
                <div className="text-sm text-gray-600">Volume Total</div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(marketStats.totalVolume)}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="text-blue-600" size={24} />
                </div>
                <div className="text-sm text-gray-600">Variação Média</div>
                <div className={`text-2xl font-bold ${marketStats.avgVariation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketStats.avgVariation.toFixed(2)}%
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <ArrowUpRight className="text-green-600" size={24} />
                </div>
                <div className="text-sm text-gray-600">Em Alta</div>
                <div className="text-2xl font-bold text-green-600">{marketStats.gainers}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <ArrowDownRight className="text-red-600" size={24} />
                </div>
                <div className="text-sm text-gray-600">Em Baixa</div>
                <div className="text-2xl font-bold text-red-600">{marketStats.losers}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <TrendingUp className="mr-2 text-teal-600" />
                Top Movers
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {LIVRO_ORDENS.sort((a, b) => Math.abs(b.variacao) - Math.abs(a.variacao)).slice(0, 6).map(inst => (
                  <div key={inst.codigo} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedInstrument(inst)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg">{inst.codigo}</div>
                        <div className="text-sm text-gray-600">{inst.emissor}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(inst.ultimaCotacao)}</div>
                        <div className={`flex items-center text-sm ${inst.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {inst.variacao >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {Math.abs(inst.variacao)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <IconPieChart className="mr-2 text-teal-600" />
                Distribuição por Setor
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Financeiro', value: 3, fill: colors.primary },
                      { name: 'Soberano', value: 4, fill: colors.gold }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'instrumentos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Instrumentos Financeiros</h1>
                <p className="text-gray-600 mt-2">Explore e negocie ativos disponíveis</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pesquisar por código ou emissor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'Acções', label: 'Acções' },
                    { value: 'OT-NR', label: 'OT-NR' },
                    { value: 'Bilhetes do Tesouro', label: 'BT' }
                  ].map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setFilterType(filter.value)}
                      className={`px-4 py-2 rounded-lg font-medium ${filterType === filter.value ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-3 font-bold text-gray-700">Código</th>
                      <th className="text-left p-3 font-bold text-gray-700">Emissor</th>
                      <th className="text-left p-3 font-bold text-gray-700">Tipo</th>
                      <th className="text-right p-3 font-bold text-gray-700">Cotação</th>
                      <th className="text-right p-3 font-bold text-gray-700">Variação</th>
                      <th className="text-right p-3 font-bold text-gray-700">Volume</th>
                      <th className="text-center p-3 font-bold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInstruments.map(inst => (
                      <tr key={inst.codigo} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 font-mono font-bold">{inst.codigo}</td>
                        <td className="p-3">{inst.emissor}</td>
                        <td className="p-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {inst.tipologia}
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold">{formatCurrency(inst.ultimaCotacao)}</td>
                        <td className="p-3 text-right">
                          <span className={`flex items-center justify-end font-semibold ${inst.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {inst.variacao >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            {Math.abs(inst.variacao)}%
                          </span>
                        </td>
                        <td className="p-3 text-right">{formatCurrency(inst.volume24h)}</td>
                        <td className="p-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => setSelectedInstrument(inst)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                            >
                              Detalhes
                            </button>
                            <button
                              onClick={() => {
                                setSelectedInstrument(inst);
                                setShowOrderSimulator(true);
                              }}
                              className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
                            >
                              Negociar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ordens' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Minhas Ordens</h1>
                <p className="text-gray-600 mt-2">Histórico e status de ordens submetidas</p>
              </div>
            </div>

            {submittedOrders.length === 0 ? (
              <div className="bg-white rounded-xl p-12 border-2 border-gray-200 text-center">
                <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhuma ordem submetida</h3>
                <p className="text-gray-500 mb-6">Comece a negociar para ver suas ordens aqui</p>
                <button
                  onClick={() => setActiveTab('instrumentos')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
                >
                  Ver Instrumentos
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {submittedOrders.map(ordem => (
                  <div key={ordem.id} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{ordem.instrumento.codigo}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${ordem.tipo === 'compra' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {ordem.tipo.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {ordem.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{ordem.instrumento.emissor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Data</div>
                        <div className="font-semibold">{new Date(ordem.data).toLocaleDateString('pt-AO')}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Quantidade</div>
                        <div className="font-bold text-lg">{ordem.quantidade}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Preço</div>
                        <div className="font-bold text-lg">{formatCurrency(ordem.preco)}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Montante</div>
                        <div className="font-bold text-lg">{formatCurrency(ordem.custos.montante)}</div>
                      </div>
                      <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                        <div className="text-sm text-teal-700">Total a Liquidar</div>
                        <div className="font-bold text-lg text-teal-700">{formatCurrency(ordem.custos.totalLiquidar)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'carteira' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Minha Carteira</h1>
                <p className="text-gray-600 mt-2">Visão completa dos seus investimentos</p>
              </div>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
                <Download size={18} />
                Exportar Relatório
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign size={28} />
                  <TrendingUp size={24} />
                </div>
                <div className="text-sm opacity-90">Valor Total</div>
                <div className="text-3xl font-bold mt-1">Kz 0,00</div>
                <div className="text-sm mt-2 opacity-75">Sem posições abertas</div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="text-green-600" size={28} />
                </div>
                <div className="text-sm text-gray-600">Ganho/Perda</div>
                <div className="text-3xl font-bold text-gray-400 mt-1">--</div>
                <div className="text-sm text-gray-500 mt-2">Aguardando operações</div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <IconPieChart className="text-blue-600" size={28} />
                </div>
                <div className="text-sm text-gray-600">Instrumentos</div>
                <div className="text-3xl font-bold text-gray-800 mt-1">0</div>
                <div className="text-sm text-gray-500 mt-2">Diversificação: 0%</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-12 border-2 border-gray-200 text-center">
              <IconPieChart size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Carteira Vazia</h3>
              <p className="text-gray-500 mb-6">Você ainda não possui investimentos. Comece a negociar para construir sua carteira.</p>
              <button
                onClick={() => setActiveTab('instrumentos')}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
              >
                Explorar Instrumentos
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Target className="mr-2 text-teal-600" />
                Dicas para Construir sua Carteira
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-2">Diversificação</h4>
                  <p className="text-sm text-gray-600">Distribua seus investimentos entre diferentes setores e tipos de instrumentos para reduzir riscos.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-2">Análise Fundamental</h4>
                  <p className="text-sm text-gray-600">Avalie indicadores como P/VP, ROE e rating antes de investir em qualquer instrumento.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-2">Horizonte de Investimento</h4>
                  <p className="text-sm text-gray-600">Defina seus objetivos de curto, médio e longo prazo antes de tomar decisões de investimento.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-teal-700 mb-2">Gestão de Risco</h4>
                  <p className="text-sm text-gray-600">Nunca invista mais do que pode perder e mantenha uma reserva de emergência fora do mercado.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedInstrument && !showOrderSimulator && (
        <InstrumentDetails
          instrument={selectedInstrument}
          onClose={() => setSelectedInstrument(null)}
          onTrade={(inst) => {
            setSelectedInstrument(inst);
            setShowOrderSimulator(true);
          }}
        />
      )}

      {showOrderSimulator && selectedInstrument && (
        <OrderSimulator
          instrument={selectedInstrument}
          onClose={() => {
            setShowOrderSimulator(false);
            setSelectedInstrument(null);
          }}
          onSubmit={handleOrderSubmit}
        />
      )}

      <footer className="bg-gradient-to-r from-teal-700 to-teal-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-white px-3 py-2 rounded-lg inline-block mb-4">
                <ResultadosLogo />
              </div>
              <p className="text-teal-100 text-sm">
                Sociedade Corretora de Valores Mobiliários licenciada pela CMC
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Produtos</h4>
              <ul className="space-y-2 text-sm text-teal-100">
                <li>Acções</li>
                <li>Obrigações do Tesouro</li>
                <li>Bilhetes do Tesouro</li>
                <li>Fundos de Investimento</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Recursos</h4>
              <ul className="space-y-2 text-sm text-teal-100">
                <li>Centro de Ajuda</li>
                <li>Documentação API</li>
                <li>Tarifário</li>
                <li>Regulamentação</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm text-teal-100">
                <li>Email: info@resultados.ao</li>
                <li>Tel: +244 222 123 456</li>
                <li>Luanda, Angola</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-600 mt-8 pt-6 text-center text-sm text-teal-100">
            <p>© 2024 RESULTADOS SCVM, S.A. Todos os direitos reservados.</p>
            <p className="mt-2">Membro da BODIVA | Supervisionado pela CMC</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradingPlatform;
                
                      <span className="text-gray-600">P/VP:</span>
                      <span className="font-semibold">{instrument.pVp}</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">ROE:</span>
                      <span className="font-semibold">{instrument.roe}%</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">Dividend Yield:</span>
                      <span className="font-semibold">{instrument.dividendYield}%</span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-gray-600">Valor de Mercado:</span>
                      <span className="font-semibold">{formatCurrency(instrument.valorMercado)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">Taxa Cupão:</span>
                      <span className="font-semibold">{instrument.taxaCupao}%</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">YTM:</span>
                      <span className="font-semibold">{instrument.ytm}%</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
