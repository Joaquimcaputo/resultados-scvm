const { useState, useMemo } = React;

const colors = {
  primary: '#1B5E4F',
  primaryDark: '#0D3D31',
  success: '#10B981',
  danger: '#EF4444'
};

const LIVRO_ORDENS = [
  { codigo: 'BDVAAAAA', isin: 'AOBDVAAAAA05', tipologia: 'Acções', emissor: 'Banco de Fomento Angola', ultimaCotacao: 43950, melhorPrecoCompra: 44000, melhorPrecoVenda: 43950 },
  { codigo: 'BAIAAAAA', isin: 'AOBAIAAAAA03', tipologia: 'Acções', emissor: 'Banco Angolano de Investimentos', ultimaCotacao: 38000, melhorPrecoCompra: 38500, melhorPrecoVenda: 38000 },
  { codigo: 'OTNR2408', isin: 'AOBFAAAAAA08', tipologia: 'OT-NR', emissor: 'República de Angola', ultimaCotacao: 49500, melhorPrecoCompra: 49500, melhorPrecoVenda: 49000, taxaCupao: 7.5 }
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
      status: 'Pendente'
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
              ✕
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
                    className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    min="1"
                    placeholder="Ex: 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preço (Kz)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
          <button onClick={onClose} className="flex-1 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-100">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submeter Ordem
          </button>
        </div>
      </div>
    </div>
  );
};

const TradingPlatform = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  
  const handleOrderSubmit = (ordem) => {
    setSubmittedOrders([...submittedOrders, { ...ordem, id: Date.now() }]);
    setSelectedInstrument(null);
    alert('Ordem submetida com sucesso!');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-md bg-gradient-to-r from-teal-700 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white px-4 py-2 rounded-lg inline-block">
            <ResultadosLogo />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Simulador de Ordens</h1>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-4">Selecione um Instrumento</h2>
            <div className="grid gap-4">
              {LIVRO_ORDENS.map(inst => (
                <button
                  key={inst.codigo}
                  onClick={() => setSelectedInstrument(inst)}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-teal-50 border-2 border-gray-200 hover:border-teal-500 transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">{inst.codigo}</div>
                      <div className="text-sm text-gray-600">{inst.emissor}</div>
                      <div className="text-xs text-gray-500 mt-1">{inst.tipologia}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatCurrency(inst.ultimaCotacao)}</div>
                      <div className="text-sm text-gray-600">Compra: {formatCurrency(inst.melhorPrecoCompra)}</div>
                      <div className="text-sm text-gray-600">Venda: {formatCurrency(inst.melhorPrecoVenda)}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {submittedOrders.length > 0 && (
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-xl font-bold mb-4">Ordens Submetidas ({submittedOrders.length})</h2>
              <div className="space-y-4">
                {submittedOrders.map(ordem => (
                  <div key={ordem.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-lg">{ordem.instrumento.codigo}</div>
                        <div className="text-sm text-gray-600">{ordem.instrumento.emissor}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${ordem.tipo === 'compra' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {ordem.tipo.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Quantidade</div>
                        <div className="font-bold">{ordem.quantidade}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Preço</div>
                        <div className="font-bold">{formatCurrency(ordem.preco)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Montante</div>
                        <div className="font-bold">{formatCurrency(ordem.custos.montante)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Total</div>
                        <div className="font-bold text-teal-700">{formatCurrency(ordem.custos.totalLiquidar)}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Status: {ordem.status} | Data: {new Date(ordem.data).toLocaleString('pt-AO')}
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
          onClose={() => setSelectedInstrument(null)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

ReactDOM.render(<TradingPlatform />, document.getElementById('root'));