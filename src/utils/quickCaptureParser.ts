/**
 * Interpretador demonstrativo da Captura Rápida da Clarus Finance.
 * Baseado na experiência funcional da plataforma de referência, utilizando
 * exclusivamente dados locais na memória do navegador (sem envio a servidores).
 */

export type ClarusCategoryKey =
  | 'food'
  | 'transport'
  | 'housing'
  | 'leisure'
  | 'health'
  | 'education'
  | 'salary'
  | 'other';

export interface ParsedQuickCapture {
  rawInput: string;
  description: string;
  amountCents: number;
  amountFormatted: string;
  type: 'expense' | 'income';
  categoryKey: ClarusCategoryKey;
  categoryLabel: string;
  dateLabel: string;
  isValid: boolean;
  errorMessage?: string;
}

const CATEGORY_DICTIONARY: Record<
  Exclude<ClarusCategoryKey, 'other'>,
  { label: string; keywords: string[] }
> = {
  food: {
    label: 'Alimentação',
    keywords: [
      'ifood',
      'rappi',
      'almoco',
      'almoço',
      'jantar',
      'cafe',
      'café',
      'padaria',
      'mercado',
      'supermercado',
      'feira',
      'restaurante',
      'lanche',
      'pizza',
      'hortifruti',
      'acougue',
      'açougue',
      'comida',
      'alimentacao',
    ],
  },
  transport: {
    label: 'Transporte',
    keywords: [
      'uber',
      '99',
      'onibus',
      'ônibus',
      'metro',
      'metrô',
      'gasolina',
      'combustivel',
      'combustível',
      'estacionamento',
      'pedagio',
      'pedágio',
      'corrida',
      'passagem',
    ],
  },
  housing: {
    label: 'Moradia',
    keywords: [
      'aluguel',
      'condominio',
      'condomínio',
      'luz',
      'energia',
      'enel',
      'agua',
      'água',
      'sabesp',
      'gas',
      'gás',
      'internet',
      'vivo',
      'claro',
      'iptu',
      'casa',
    ],
  },
  leisure: {
    label: 'Lazer',
    keywords: [
      'cinema',
      'netflix',
      'spotify',
      'streaming',
      'show',
      'ingresso',
      'viagem',
      'hotel',
      'passeio',
      'parque',
      'teatro',
      'jogo',
    ],
  },
  health: {
    label: 'Saúde',
    keywords: [
      'farmacia',
      'farmácia',
      'drogasil',
      'raia',
      'remedio',
      'remédio',
      'consulta',
      'medico',
      'médico',
      'dentista',
      'exame',
      'academia',
      'terapia',
    ],
  },
  education: {
    label: 'Educação',
    keywords: [
      'curso',
      'livro',
      'faculdade',
      'escola',
      'mensalidade',
      'aula',
      'idioma',
      'ingles',
      'inglês',
    ],
  },
  salary: {
    label: 'Salário e Receitas',
    keywords: [
      'salario',
      'salário',
      'pagamento',
      'freelance',
      'recebi',
      'pix recebido',
      'reembolso',
      'rendimento',
      'bonus',
      'bônus',
      'venda',
    ],
  },
};

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function formatBrlFromCents(cents: number, showSign = true): string {
  const absValue = Math.abs(cents) / 100;
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(absValue);

  if (!showSign) return formatted;
  return cents >= 0 ? `+ ${formatted}` : `− ${formatted}`;
}

export function parseQuickCaptureInput(input: string): ParsedQuickCapture {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      rawInput: input,
      description: '',
      amountCents: 0,
      amountFormatted: 'R$ 0,00',
      type: 'expense',
      categoryKey: 'other',
      categoryLabel: 'Outros',
      dateLabel: 'hoje',
      isValid: false,
      errorMessage: 'Digite uma descrição e um valor, por exemplo: almoço 32 ifood',
    };
  }

  const amountMatch = trimmed.match(
    /(?:r\$\s*)?\d{1,3}(?:[.\s]\d{3})*(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?/i
  );

  if (!amountMatch) {
    return {
      rawInput: input,
      description: trimmed,
      amountCents: 0,
      amountFormatted: 'R$ 0,00',
      type: 'expense',
      categoryKey: 'other',
      categoryLabel: 'Aguardando valor',
      dateLabel: 'hoje',
      isValid: false,
      errorMessage: 'Inclua o valor numérico do lançamento (ex.: 32 ou 32,00).',
    };
  }

  const rawNumber = amountMatch[0].replace(/r\$\s*/i, '').trim();
  const normalizedNumber = rawNumber.includes(',')
    ? rawNumber.replace(/\./g, '').replace(',', '.')
    : rawNumber.replace(/\.(?=\d{3}(?:$|\s))/g, '');
  const numericValue = Number(normalizedNumber);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return {
      rawInput: input,
      description: trimmed,
      amountCents: 0,
      amountFormatted: 'R$ 0,00',
      type: 'expense',
      categoryKey: 'other',
      categoryLabel: 'Valor inválido',
      dateLabel: 'hoje',
      isValid: false,
      errorMessage: 'Digite um valor maior que zero.',
    };
  }

  const normalized = normalizeText(trimmed);
  const isIncome = /\b(recebi|salario|pagamento|freelance|venda|reembolso|rendimento|bonus|entrou)\b/.test(
    normalized
  );

  let detectedCategory: ClarusCategoryKey = isIncome ? 'salary' : 'other';
  let bestScore = 0;

  (Object.keys(CATEGORY_DICTIONARY) as Array<Exclude<ClarusCategoryKey, 'other'>>).forEach(
    (key) => {
      if (isIncome && key !== 'salary') return;
      if (!isIncome && key === 'salary') return;
      const entry = CATEGORY_DICTIONARY[key];
      let score = 0;
      entry.keywords.forEach((kw) => {
        const normKw = normalizeText(kw);
        if (
          normalized === normKw ||
          normalized.includes(` ${normKw} `) ||
          normalized.startsWith(`${normKw} `) ||
          normalized.endsWith(` ${normKw}`)
        ) {
          score += normKw.length >= 5 ? 3 : 2;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        detectedCategory = key;
      }
    }
  );

  let dateLabel = 'hoje';
  if (/\banteontem\b/.test(normalized)) {
    dateLabel = 'anteontem';
  } else if (/\bontem\b/.test(normalized)) {
    dateLabel = 'ontem';
  }

  const cleanedDesc = trimmed
    .replace(amountMatch[0], '')
    .replace(/\b(hoje|ontem|anteontem)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  const description = cleanedDesc
    ? cleanedDesc.charAt(0).toUpperCase() + cleanedDesc.slice(1)
    : isIncome
    ? 'Entrada registrada'
    : 'Despesa registrada';

  const signedCents = Math.round(numericValue * 100) * (isIncome ? 1 : -1);
  const categoryLabel =
    detectedCategory === 'other'
      ? 'Geral'
      : CATEGORY_DICTIONARY[detectedCategory].label;

  return {
    rawInput: input,
    description,
    amountCents: signedCents,
    amountFormatted: formatBrlFromCents(signedCents, true),
    type: isIncome ? 'income' : 'expense',
    categoryKey: detectedCategory,
    categoryLabel,
    dateLabel,
    isValid: true,
  };
}
