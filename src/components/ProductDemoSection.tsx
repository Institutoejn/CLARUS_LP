import React, { useMemo, useState } from 'react';
import {
  CircleDollarSign,
  Plus,
  RotateCcw,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { DEMO_CONTENT, QUICK_CAPTURE_PRESETS } from '../config/content';
import {
  formatBrlFromCents,
  parseQuickCaptureInput,
} from '../utils/quickCaptureParser';

interface DemoTransaction {
  id: string;
  description: string;
  category: string;
  dateLabel: string;
  amountCents: number;
  type: 'expense' | 'income';
}

const INITIAL_DEMO_TRANSACTIONS: DemoTransaction[] = [
  {
    id: 'tx-1',
    description: 'Almoço iFood',
    category: 'Alimentação',
    dateLabel: 'hoje',
    amountCents: -3200,
    type: 'expense',
  },
  {
    id: 'tx-2',
    description: 'Supermercado Semanal',
    category: 'Alimentação',
    dateLabel: 'ontem',
    amountCents: -28800,
    type: 'expense',
  },
  {
    id: 'tx-3',
    description: 'Uber Centro',
    category: 'Transporte',
    dateLabel: 'ontem',
    amountCents: -2490,
    type: 'expense',
  },
  {
    id: 'tx-4',
    description: 'Aluguel e Condomínio',
    category: 'Moradia',
    dateLabel: '05 out',
    amountCents: -168000,
    type: 'expense',
  },
  {
    id: 'tx-5',
    description: 'Salário Mensal',
    category: 'Salário e Receitas',
    dateLabel: '05 out',
    amountCents: 625000,
    type: 'income',
  },
  {
    id: 'tx-6',
    description: 'Farmácia',
    category: 'Saúde',
    dateLabel: '03 out',
    amountCents: -8510,
    type: 'expense',
  },
];

export const ProductDemoSection: React.FC = () => {
  const [transactions, setTransactions] = useState<DemoTransaction[]>(INITIAL_DEMO_TRANSACTIONS);
  const [inputText, setInputText] = useState('café e padaria 18,50');
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'expense' | 'income'>('all');

  const parsedPreview = useMemo(() => parseQuickCaptureInput(inputText), [inputText]);

  const totals = useMemo(() => {
    const incomeCents = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amountCents, 0);
    const expenseCents = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + Math.abs(t.amountCents), 0);
    const balanceCents = incomeCents - expenseCents;

    // Agrupamento por categoria de despesa
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) || 0) + Math.abs(t.amountCents));
      });

    const categories = Array.from(map.entries())
      .map(([name, totalCents]) => ({
        name,
        totalCents,
        share: expenseCents > 0 ? Math.max(4, Math.round((totalCents / expenseCents) * 100)) : 0,
      }))
      .sort((a, b) => b.totalCents - a.totalCents);

    return {
      incomeCents,
      expenseCents,
      balanceCents,
      categories,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter((t) => t.type === activeFilter);
  }, [transactions, activeFilter]);

  const handleAddDemoTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedPreview.isValid) {
      setFeedbackMsg(parsedPreview.errorMessage || 'Digite uma descrição e um valor válido.');
      return;
    }

    const newTx: DemoTransaction = {
      id: `demo-${Date.now()}`,
      description: parsedPreview.description,
      category: parsedPreview.categoryLabel,
      dateLabel: parsedPreview.dateLabel,
      amountCents: parsedPreview.amountCents,
      type: parsedPreview.type,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setInputText('');
    setFeedbackMsg(
      `Lançamento demonstrativo "${newTx.description}" (${formatBrlFromCents(
        newTx.amountCents,
        true
      )}) adicionado ao painel.`
    );
  };

  const handleResetDemo = () => {
    setTransactions(INITIAL_DEMO_TRANSACTIONS);
    setInputText('almoço 32 ifood');
    setActiveFilter('all');
    setFeedbackMsg('Painel demonstrativo restaurado para os valores originais.');
  };

  return (
    <section
      id="demonstracao"
      aria-labelledby="demonstracao-heading"
      className="scroll-mt-20 border-t border-[#DEDCE8] bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div data-reveal="up" className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7E3BED]">
              {DEMO_CONTENT.eyebrow}
            </p>
            <h2
              id="demonstracao-heading"
              className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#14121C] [text-wrap:balance]"
            >
              {DEMO_CONTENT.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#625D70]">
              {DEMO_CONTENT.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDemo}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-4 py-2 text-xs font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
            >
              <RotateCcw className="size-3.5 text-[#625D70]" aria-hidden="true" />
              <span>Restaurar exemplo</span>
            </button>
          </div>
        </div>

        {/* Container Principal do Mockup Interativo da Plataforma */}
        <div data-reveal="up" className="mt-10 rounded-[24px] border border-[#DEDCE8] bg-[#F4F3FA] p-4 sm:p-6 lg:p-8">
          {/* Barra Superior do Ambiente Demonstrativo */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DEDCE8] pb-5">
            <div>
              <p className="text-xs font-medium text-[#625D70]">
                Ambiente interativo de demonstração
              </p>
              <h3 className="mt-0.5 font-display text-xl font-bold text-[#14121C]">
                Visão geral · Outubro
              </h3>
            </div>
            <p className="text-xs text-[#625D70]">
              Valores financeiros em <span className="font-mono font-medium text-[#14121C]">Geist Mono</span> tabular
            </p>
          </div>

          {/* Barra de Captura Rápida Funcional */}
          <form
            onSubmit={handleAddDemoTransaction}
            aria-label="Testar captura rápida no painel demonstrativo"
            className="mt-6 rounded-2xl border border-[#DEDCE8] bg-white p-3 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2A1458]/10 text-[#2A1458]">
                  <CircleDollarSign className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <label htmlFor="demo-quick-input" className="sr-only">
                    Digite uma movimentação de exemplo com descrição e valor
                  </label>
                  <input
                    id="demo-quick-input"
                    type="text"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (feedbackMsg) setFeedbackMsg('');
                    }}
                    placeholder="Digite um lançamento: ex. almoço 32 ifood ou uber 24,90 ontem"
                    className="w-full min-w-0 bg-transparent text-sm text-[#14121C] placeholder:text-[#625D70]/70 focus:outline-none sm:text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#2A1458] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
              >
                <Plus className="size-4 text-[#D7F744]" aria-hidden="true" />
                <span>Adicionar ao exemplo</span>
              </button>
            </div>

            {/* Pré-visualização instantânea do parser + atalhos de teste */}
            <div className="mt-3 flex flex-col justify-between gap-3 border-t border-[#DEDCE8] pt-3 lg:flex-row lg:items-center">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-xs text-[#625D70]">Preencher com 1 clique:</span>
                {QUICK_CAPTURE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setInputText(preset.input);
                      setFeedbackMsg('');
                    }}
                    className="min-h-[32px] rounded-lg border border-[#DEDCE8] bg-[#F4F3FA] px-2.5 py-1 text-xs text-[#14121C] transition-colors hover:border-[#7E3BED] hover:bg-white"
                  >
                    {preset.input}
                  </button>
                ))}
              </div>

              <div aria-live="polite" className="text-xs text-[#625D70]">
                {parsedPreview.isValid ? (
                  <span>
                    Leitura:{' '}
                    <strong className="font-medium text-[#14121C]">
                      {parsedPreview.description}
                    </strong>{' '}
                    · {parsedPreview.categoryLabel} ·{' '}
                    <strong className="font-mono font-semibold text-[#2A1458] tabular-nums">
                      {parsedPreview.amountFormatted}
                    </strong>
                  </span>
                ) : (
                  <span>{parsedPreview.errorMessage}</span>
                )}
              </div>
            </div>

            {feedbackMsg && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2.5 text-xs font-medium text-[#2A1458]"
              >
                {feedbackMsg}
              </p>
            )}
          </form>

          {/* 3 Cards de Resumo Mensal (Saldo, Entradas, Saídas) */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#DEDCE8] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#625D70]">Saldo do mês</span>
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#2A1458]/10 text-[#2A1458]">
                  <Wallet className="size-4" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-[#14121C] tabular-nums">
                {formatBrlFromCents(totals.balanceCents, false)}
              </p>
              <p className="mt-1 text-xs text-[#625D70]">
                Diferença entre entradas e saídas registradas
              </p>
            </div>

            <div className="rounded-2xl border border-[#DEDCE8] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#625D70]">Entradas no mês</span>
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#2A1458]/10 text-[#2A1458]">
                  <TrendingUp className="size-4" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-[#2A1458] tabular-nums">
                {formatBrlFromCents(totals.incomeCents, true)}
              </p>
              <p className="mt-1 text-xs text-[#625D70]">
                Salário, reembolsos e receitas
              </p>
            </div>

            <div className="rounded-2xl border border-[#DEDCE8] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#625D70]">Saídas no mês</span>
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#ECEAF3] text-[#14121C]">
                  <TrendingDown className="size-4" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold tracking-tight text-[#14121C] tabular-nums">
                {formatBrlFromCents(-totals.expenseCents, true)}
              </p>
              <p className="mt-1 text-xs text-[#625D70]">
                Total de despesas categorizadas
              </p>
            </div>
          </div>

          {/* Grid Principal: Por Categoria + Movimentações Recentes */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Coluna 1: Distribuição por Categoria */}
            <article className="rounded-2xl border border-[#DEDCE8] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-display text-lg font-bold text-[#14121C]">
                  Por categoria
                </h4>
                <span className="text-xs text-[#625D70]">
                  {totals.categories.length} categorias ativas
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {totals.categories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-[#14121C]">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#625D70] tabular-nums">
                          {cat.share}%
                        </span>
                        <span className="font-mono font-semibold text-[#14121C] tabular-nums">
                          {formatBrlFromCents(cat.totalCents, false)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#ECEAF3]">
                      <div
                        className="h-full rounded-full bg-[#2A1458] transition-opacity duration-150"
                        style={{ width: `${Math.min(100, cat.share)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Coluna 2: Movimentações Recentes com Filtro Funcional */}
            <article className="rounded-2xl border border-[#DEDCE8] bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-display text-lg font-bold text-[#14121C]">
                  Movimentações recentes
                </h4>

                {/* Controle segmentado funcional (permitido pelas diretrizes de UI) */}
                <div
                  role="group"
                  aria-label="Filtrar movimentações demonstrativas"
                  className="inline-flex items-center gap-1 rounded-xl bg-[#F4F3FA] p-1"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className={`min-h-[34px] whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      activeFilter === 'all'
                        ? 'bg-white text-[#14121C] shadow-xs'
                        : 'text-[#625D70] hover:text-[#14121C]'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('expense')}
                    className={`min-h-[34px] whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      activeFilter === 'expense'
                        ? 'bg-white text-[#14121C] shadow-xs'
                        : 'text-[#625D70] hover:text-[#14121C]'
                    }`}
                  >
                    Saídas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('income')}
                    className={`min-h-[34px] whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                      activeFilter === 'income'
                        ? 'bg-white text-[#14121C] shadow-xs'
                        : 'text-[#625D70] hover:text-[#14121C]'
                    }`}
                  >
                    Entradas
                  </button>
                </div>
              </div>

              <div className="mt-4 divide-y divide-[#DEDCE8]">
                {filteredTransactions.slice(0, 6).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#14121C]">
                        {tx.description}
                      </p>
                      <p className="mt-0.5 text-xs text-[#625D70]">
                        <span>{tx.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{tx.dateLabel}</span>
                      </p>
                    </div>
                    <span
                      className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
                        tx.type === 'income' ? 'text-[#2A1458]' : 'text-[#14121C]'
                      }`}
                    >
                      {formatBrlFromCents(tx.amountCents, true)}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Bloco de Metas Pessoais ("Pequenos passos, grandes planos.") */}
          <div className="mt-6 rounded-2xl border border-[#7E3BED]/20 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#7E3BED]/10 text-[#7E3BED]">
                  <Target className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-[#14121C]">
                    Suas metas
                  </h4>
                  <p className="text-xs text-[#625D70]">
                    Pequenos passos, grandes planos.
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#625D70]">
                Progresso calculado sobre o objetivo definido
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {DEMO_CONTENT.monthlySummaryDemo.goals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] p-4"
                >
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-[#14121C]">{goal.name}</span>
                    <span className="font-mono text-xs font-semibold text-[#7E3BED] tabular-nums">
                      {goal.progress}%
                    </span>
                  </div>

                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#DEDCE8]">
                    <div
                      className="h-full rounded-full bg-[#7E3BED]"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-[#625D70]">
                    <span className="font-mono tabular-nums">
                      {goal.saved} guardados
                    </span>
                    <span className="font-mono tabular-nums">
                      Meta: {goal.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-[#625D70]">
            {DEMO_CONTENT.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
