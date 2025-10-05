const { useState, useMemo } = React;

const colors = {
  primary: '#1B5E4F',
  primaryDark: '#0D3D31',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B'
};

const INSTRUMENTOS_COMPLETOS = [
  { codigo: 'BDVAAAAA', isin: 'AOBDVAAAAA05', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 43950, melhorPrecoCompra: 43950, melhorPrecoVenda: 44000, totalBuyQty: 25869, totalSellQty: 165, vnua: 972.93, setor: 'Financeiro', risco: 'Médio' },
  { codigo: 'BAIAAAAA', isin: 'AOBAIAAAAA05', tipologia: 'Acções', emissor: 'Banco Angolano de Investimentos', ultimaCotacao: 105000, melhorPrecoCompra: 102600, melhorPrecoVenda: 110000, totalBuyQty: 186, totalSellQty: 45, vnua: 3494.58, setor: 'Financeiro', risco: 'Médio' },
  { codigo: 'BCGAAAAA', isin: 'AOBCGAAAAA05', tipologia: 'Acções', emissor: 'Banco Caixa Geral Angola', ultimaCotacao: 15590, melhorPrecoCompra: 15500, melhorPrecoVenda: 15590, totalBuyQty: 969, totalSellQty: 30921, vnua: 1227.55, setor: 'Financeiro', risco: 'Médio' },
  { codigo: 'ENSAAAAA', isin: 'AOENSAAAAA05', tipologia: 'Acções', emissor: 'Empresa Nacional de Seguros', ultimaCotacao: 32400, melhorPrecoCompra: 31000, melhorPrecoVenda: 32400, totalBuyQty: 1132, totalSellQty: 1461, vnua: 1811.62, setor: 'Seguros', risco: 'Médio' },
  { codigo: 'BFAAAAAA', isin: 'AOBFAAAAAA08', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 100000, melhorPrecoCompra: 98000, melhorPrecoVenda: 102000, totalBuyQty: 1163, totalSellQty: 106, vnua: 0, setor: 'Financeiro', risco: 'Médio' },
  { codigo: 'SNLEDOFB', isin: 'AOSNLEDOFA16', tipologia: 'OC', emissor: 'Sonangol', ultimaCotacao: 100, melhorPrecoCompra: 95, melhorPrecoVenda: 100, totalBuyQty: 1781, totalSellQty: 26, taxaCupao: 17.5, dataEmissao: '2023-09-14', dataVencimento: '2028-09-14', vnua: 10000, setor: 'Petróleo', risco: 'Baixo' },
  { codigo: 'OH15I28C', isin: 'AOUGDOHI24C6', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 100.798, melhorPrecoCompra: 90, melhorPrecoVenda: 100.612, totalBuyQty: 2100024, totalSellQty: 136560, taxaCupao: 16.75, dataEmissao: '2024-05-15', dataVencimento: '2028-05-15', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'OJ08M30A', isin: 'AOUGDOJM24A8', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 94.1, melhorPrecoCompra: 93.607, melhorPrecoVenda: 94.1, totalBuyQty: 8400, totalSellQty: 3416827, taxaCupao: 17.0, dataEmissao: '2024-03-08', dataVencimento: '2030-03-08', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'OI08I30A', isin: 'AOUGDOII25A5', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 94.07, melhorPrecoCompra: 0, melhorPrecoVenda: 94.07, totalBuyQty: 0, totalSellQty: 17041440, taxaCupao: 17.25, dataEmissao: '2025-05-08', dataVencimento: '2030-05-08', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'OG15L28A', isin: 'AOUGDOGL25B1', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 94, melhorPrecoCompra: 90, melhorPrecoVenda: 94, totalBuyQty: 1000, totalSellQty: 5699112, taxaCupao: 16.75, dataEmissao: '2025-07-15', dataVencimento: '2028-07-15', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'OJ15G31A', isin: 'AOUGDOJG25A7', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 94.27, melhorPrecoCompra: 0, melhorPrecoVenda: 94.27, totalBuyQty: 0, totalSellQty: 8651215, taxaCupao: 17.25, dataEmissao: '2025-08-15', dataVencimento: '2031-08-15', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'EL15S31A', isin: 'AOUGDELS23E6', tipologia: 'OTME', emissor: 'República de Angola', ultimaCotacao: 99.999, melhorPrecoCompra: 0, melhorPrecoVenda: 99.999, totalBuyQty: 0, totalSellQty: 7358, taxaCupao: 7.0, dataEmissao: '2023-02-15', dataVencimento: '2031-02-15', vnua: 1000, setor: 'Soberano', risco: 'Baixo' },
  { codigo: 'OK15M31A', isin: 'AOUGDOKM24A6', tipologia: 'OTNR', emissor: 'República de Angola', ultimaCotacao: 96.93, melhorPrecoCompra: 0, melhorPrecoVenda: 94.03, totalBuyQty: 0, totalSellQty: 3754797, taxaCupao: 16.6, dataEmissao: '2024-03-15', dataVencimento: '2031-03-15', vnua: 1000, setor: 'Soberano', risco: 'Baixo' }
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
    <rect x="5" y="15" width="8" height="30" rx="2" fill={colors.primary} transform="rotate(20 9 30)" />
    <rect x="15" y="12" width="8" height="36" rx="2" fill={colors.primary} transform="rotate(20 19 30)" />
    <rect x="25" y="18" width="8" height="24" rx="2" fill={colors.primary} transform="rotate(20 29 30)" />
    <text x="45" y="32" fontFamily="Arial" fontSize="18" fontWeight="700" fill={colors.primary}>Resultados</text>
    <text x="45" y="46" fontFamily="Arial" fontSize="9" fill="#666" letterSpacing="3">SCVM S.A.</text>
  </svg>
);

const RegistroInvestidor = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    nome: '',
    nif: '',
    contaCevama: '',
    email: '',
    telefone: '',
    morada: ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isValid = formData.nome && formData.nif && formData.contaCevama;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <ResultadosLogo />
          <h1 className="text-3xl font-bold text-gray-800 mt-6">Cadastro de Investidor</h1>
          <p className="text-gray-600 mt-2">Preencha seus dados para começar a negociar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Nome completo do investidor"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">NIF *</label>
              <input
                type="text"
                value={formData.nif}
                onChange={(e) => handleChange('nif', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="000000000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">N.º Conta CEVAMA *</label>
              <input
                type="text"
                value={formData.contaCevama}
                onChange={(e) => handleChange('contaCevama', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="906006"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="+244 900 000 000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Morada</label>
            <textarea
              value={formData.morada}
              onChange={(e) => handleChange('morada', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows="2"
              placeholder="Endereço completo"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg mt-6"
          >
            Cadastrar e Acessar Plataforma
          </button>
        </form>
      </div>
    </div>
  );
};

const OrderSimulator = ({ instrument, cliente, onClose, onSubmit }) => {
  const [orderType, setOrderType] = useState('compra');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(instrument.melhorPrecoCompra);
  const [orderLimit, setOrderLimit] = useState('mercado');
  const [validade, setValidade] = useState('');
  
  const calculateCosts = useMemo(() => {
    const qty = parseInt(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const montante = qty * prc;
    
    const isTituloDivida = ['OTNR', 'OTME', 'OC', 'BT', 'OTBT', 'PC'].includes(instrument.tipologia);
    const taxasConfig = isTituloDivida ? PRECARIO.taxas.tituloDivida.mercadoSecundario : PRECARIO.taxas.acoes.mercadoSecundario;
    
    let comissaoResultados = Math.max(montante * taxasConfig.resultados, PRECARIO.minimosResultados);
    let taxaBodiva = Math.max(montante * taxasConfig.bodiva, isTituloDivida ? PRECARIO.minimosBodiva.divida : PRECARIO.minimosBodiva.acoes);
    
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
      cliente: cliente,
      instrumento: instrument,
      tipo: orderType,
      tipoOrdem: orderLimit,
      quantidade: parseInt(quantity),
      preco: parseFloat(price),
      validade: validade,
      custos: calculateCosts,
      data: new Date().toISOString(),
      status: 'Pendente'
    });
  };
  
  const isValid = quantity && price && parseInt(quantity) > 0 && parseFloat(price) > 0;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8">
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Ordem de Transação de Valores Mobiliários</h2>
              <p className="text-teal-100 mt-1">{instrument.codigo} - {instrument.emissor}</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 text-2xl">×</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-teal-50 border-2 border-teal-600 rounded-xl p-4">
            <h3 className="font-bold text-teal-900 mb-3 text-lg">DADOS DO CLIENTE</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600">Nome</div>
                <div className="font-bold text-gray-900">{cliente.nome}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">N.º Conta CEVAMA</div>
                <div className="font-bold text-gray-900">{cliente.contaCevama}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">NIF</div>
                <div className="font-bold text-gray-900">{cliente.nif}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Instrumento</div>
                <div className="font-bold text-lg">{instrument.codigo} - {instrument.isin}</div>
                <div className="text-sm text-gray-700">{instrument.emissor}</div>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">{instrument.tipologia}</span>
                  <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">Última: {formatCurrency(instrument.ultimaCotacao)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">TIPO DE OPERAÇÃO *</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setOrderType('compra'); setPrice(instrument.melhorPrecoCompra); }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${orderType === 'compra' ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700'}`}
                  >
                    ☑ Compra
                  </button>
                  <button
                    onClick={() => { setOrderType('venda'); setPrice(instrument.melhorPrecoVenda); }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${orderType === 'venda' ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700'}`}
                  >
                    ☐ Venda
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">TIPO DE ORDEM *</label>
                <div className="flex gap-2">
                  {['limitada', 'mercado', 'outro'].map(tipo => (
                    <button
                      key={tipo}
                      onClick={() => setOrderLimit(tipo)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium ${orderLimit === tipo ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {orderLimit === tipo ? '☑' : '☐'} {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantidade *</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    min="1"
                    placeholder="Ex: 2003"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preço (Kz) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Validade da Ordem</label>
                <input
                  type="date"
                  value={validade}
                  onChange={(e) => setValidade(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {quantity && price && (
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-teal-300">
                <h3 className="font-bold text-lg mb-4 text-teal-800">Resumo Financeiro</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Montante*:</span>
                      <span className="font-bold text-2xl text-teal-700">{formatCurrency(calculateCosts.montante)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">*O montante poderá ser aproximado em função das condições de mercado</div>
                  </div>
                  <div className="space-y-2 text-sm bg-white rounded-lg p-3">
                    <div className="flex justify-between border-b pb-2">
                      <span>Comissão RESULTADOS:</span>
                      <span className="font-semibold">{formatCurrency(calculateCosts.comissaoResultados)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>IVA (14%):</span>
                      <span className="font-semibold">{formatCurrency(calculateCosts.ivaResultados)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Taxa BODIVA:</span>
                      <span className="font-semibold">{formatCurrency(calculateCosts.taxaBodiva)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA BODIVA:</span>
                      <span className="font-semibold">{formatCurrency(calculateCosts.ivaBodiva)}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-lg p-4 text-white shadow-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total a Liquidar:</span>
                      <span className="font-bold text-2xl">{formatCurrency(calculateCosts.totalLiquidar)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">DECLARAÇÃO</p>
            <p className="mb-2">Declaro que tomei conhecimento das características técnicas e condições de adesão do produto e autorizo a RESULTADOS SCVM, S.A. a proceder ao débito ou crédito do valor correspondente ao montante de liquidação dos títulos acrescido dos valores da comissão e respetivo IVA, conforme preçário em vigor.</p>
            <p className="mb-2">Declaro ter lido e aceite os termos constantes no contrato de intermediação financeira, nas políticas de execução e transmissão de ordens e de conflitos de interesse da RESULTADOS SCVM, S.A.</p>
            <p>Declaro também ter sido previamente informado sobre as ordens disponíveis e os últimos preços transacionados em bolsa bem como os riscos associados ao instrumento ora negociado.</p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-100">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 shadow-lg"
          >
            Submeter Ordem
          </button>
        </div>
      </div>
    </div>
  );
};

const TradingPlatform = () => {
  const [cliente, setCliente] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [filterTipologia, setFilterTipologia] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleOrderSubmit = (ordem) => {
    setSubmittedOrders([...submittedOrders, { ...ordem, id: Date.now() }]);
    setSelectedInstrument(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const filteredInstruments = useMemo(() => {
    return INSTRUMENTOS_COMPLETOS.filter(inst => {
      const matchesTipo = filterTipologia === 'all' || inst.tipologia === filterTipologia;
      const matchesSearch = inst.codigo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           inst.emissor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTipo && matchesSearch;
    });
  }, [filterTipologia, searchTerm]);

  const tipologias = ['all', 'Acções', 'OTNR', 'OTME', 'OC'];

  if (!cliente) {
    return <RegistroInvestidor onComplete={setCliente} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-md bg-gradient-to-r from-teal-700 to-teal-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="bg-white px-4 py-2 rounded-lg">
              <ResultadosLogo />
            </div>
            <div className="text-white text-right">
              <div className="font-bold">{cliente.nome}</div>
              <div className="text-sm text-teal-100">Conta: {cliente.contaCevama}</div> </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Sistema de Gestão de Ordens</h1>
            <p className="text-gray-600 mt-2">Plataforma Profissional RESULTADOS SCVM</p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Livro de Ordens - BODIVA</h2>
              <div className="text-sm text-gray-600">
                Total: <span className="font-bold text-teal-700">{filteredInstruments.length}</span> instrumentos
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                placeholder="Pesquisar por código ou emissor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[300px] px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex gap-2 flex-wrap">
                {tipologias.map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => setFilterTipologia(tipo)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${filterTipologia === tipo ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {tipo === 'all' ? 'Todos' : tipo}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-700 text-white">
                    <th className="text-left p-3 font-bold">Código</th>
                    <th className="text-left p-3 font-bold">Emissor</th>
                    <th className="text-left p-3 font-bold">Tipo</th>
                    <th className="text-right p-3 font-bold">Última Cotação</th>
                    <th className="text-right p-3 font-bold">Compra</th>
                    <th className="text-right p-3 font-bold">Venda</th>
                    <th className="text-center p-3 font-bold">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstruments.map((inst, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-teal-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-teal-700">{inst.codigo}</td>
                      <td className="p-3">{inst.emissor}</td>
                      <td className="p-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {inst.tipologia}
                        </span>
                      </td>
                      <td className="p-3 text-right font-bold">{formatCurrency(inst.ultimaCotacao)}</td>
                      <td className="p-3 text-right text-green-700 font-semibold">{formatCurrency(inst.melhorPrecoCompra)}</td>
                      <td className="p-3 text-right text-red-700 font-semibold">{formatCurrency(inst.melhorPrecoVenda)}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedInstrument(inst)}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm shadow-md transition-all"
                        >
                          Negociar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {submittedOrders.length > 0 && (
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Histórico de Ordens ({submittedOrders.length})</h2>
              <div className="space-y-4">
                {submittedOrders.slice().reverse().map(ordem => (
                  <div key={ordem.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-lg text-teal-700">{ordem.instrumento.codigo}</div>
                        <div className="text-sm text-gray-600">{ordem.instrumento.emissor}</div>
                        <div className="text-xs text-gray-500 mt-1">Cliente: {ordem.cliente.nome} | Conta: {ordem.cliente.contaCevama}</div>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${ordem.tipo === 'compra' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {ordem.tipo.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {ordem.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="bg-white rounded p-2">
                        <div className="text-gray-600 text-xs">Tipo Ordem</div>
                        <div className="font-bold">{ordem.tipoOrdem}</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-gray-600 text-xs">Quantidade</div>
                        <div className="font-bold text-lg">{ordem.quantidade}</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-gray-600 text-xs">Preço</div>
                        <div className="font-bold text-lg">{formatCurrency(ordem.preco)}</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-gray-600 text-xs">Montante</div>
                        <div className="font-bold text-lg">{formatCurrency(ordem.custos.montante)}</div>
                      </div>
                      <div className="bg-teal-100 rounded p-2">
                        <div className="text-teal-700 text-xs font-semibold">Total a Liquidar</div>
                        <div className="font-bold text-lg text-teal-700">{formatCurrency(ordem.custos.totalLiquidar)}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Data: {new Date(ordem.data).toLocaleString('pt-AO')} {ordem.validade && `| Validade: ${ordem.validade}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedInstrument && (
        <OrderSimulator
          instrument={selectedInstrument}
          cliente={cliente}
          onClose={() => setSelectedInstrument(null)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

ReactDOM.render(<TradingPlatform />, document.getElementById('root'));