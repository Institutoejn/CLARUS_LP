/**
 * Conteúdo editorial em português do Brasil — Clarus Finance
 * Redigido com foco em clareza, acolhimento, precisão e ausência de promessas exageradas.
 * Dados comerciais, jurídicos ou técnicos não confirmados estão explicitamente marcados com:
 * TODO: validar com a Clarus
 */

export interface QuickCapturePreset {
  id: string;
  input: string;
  description: string;
  category: string;
  categoryKey: 'food' | 'transport' | 'housing' | 'leisure' | 'health' | 'education' | 'salary';
  amountFormatted: string;
  amountCents: number;
  type: 'expense' | 'income';
  dateLabel: string;
}

export const QUICK_CAPTURE_PRESETS: QuickCapturePreset[] = [
  {
    id: 'preset-1',
    input: 'almoço 32 ifood',
    description: 'Almoço iFood',
    category: 'Alimentação',
    categoryKey: 'food',
    amountFormatted: '− R$ 32,00',
    amountCents: -3200,
    type: 'expense',
    dateLabel: 'hoje',
  },
  {
    id: 'preset-2',
    input: 'uber 24,90 ontem',
    description: 'Uber',
    category: 'Transporte',
    categoryKey: 'transport',
    amountFormatted: '− R$ 24,90',
    amountCents: -2490,
    type: 'expense',
    dateLabel: 'ontem',
  },
  {
    id: 'preset-3',
    input: 'mercado 186,40',
    description: 'Mercado',
    category: 'Alimentação',
    categoryKey: 'food',
    amountFormatted: '− R$ 186,40',
    amountCents: -18640,
    type: 'expense',
    dateLabel: 'hoje',
  },
  {
    id: 'preset-4',
    input: 'internet vivo fibra 119,90',
    description: 'Internet Vivo Fibra',
    category: 'Moradia',
    categoryKey: 'housing',
    amountFormatted: '− R$ 119,90',
    amountCents: -11990,
    type: 'expense',
    dateLabel: 'hoje',
  },
  {
    id: 'preset-5',
    input: 'recebi freelance 1.450,00',
    description: 'Recebi Freelance',
    category: 'Salário e Receitas',
    categoryKey: 'salary',
    amountFormatted: '+ R$ 1.450,00',
    amountCents: 145000,
    type: 'income',
    dateLabel: 'hoje',
  },
];

export const HERO_CONTENT = {
  eyebrow: 'CLAREZA PARA CADA ESCOLHA',
  headlinePart1: 'Seu dinheiro,',
  headlineHighlight: 'finalmente claro.',
  subheadline:
    'A Clarus Finance ajuda você a registrar movimentações em segundos, visualizar para onde vai cada real e compreender sua rotina financeira sem planilhas complexas.',
  primaryCta: {
    label: 'Criar minha conta',
    href: '/register',
  },
  secondaryCta: {
    label: 'Conhecer a experiência',
    href: '#demonstracao',
  },
  loginPrompt: {
    text: 'Já utiliza a Clarus?',
    label: 'Entrar na conta',
    href: '/login',
  },
  demoDisclaimer: 'Dados fictícios exclusivamente para demonstração da interface.',
};

export const VALUE_PROPOSITION_CONTENT = {
  eyebrow: 'POR QUE A CLARUS EXISTE',
  title: 'Sua vida financeira, no lugar certo.',
  problemStatement:
    'Anotações soltas no celular, comprovantes esquecidos e planilhas que dão trabalho demais manter. Quando as informações financeiras ficam dispersas, falta visão do mês e qualquer decisão parece mais pesada do que deveria.',
  solutionStatement:
    'A Clarus reúne seus registros em uma interface limpa e silenciosa, desenhada para reduzir o atrito diário e devolver contexto às suas escolhas.',
  pillars: [
    {
      index: '01',
      title: 'Registre com rapidez',
      description:
        'Use a captura rápida para anotar entradas e saídas em uma única linha, exatamente como você lembra no dia a dia: "almoço 32 ifood" ou "uber 24,90 ontem".',
      highlight: 'Menos tempo preenchendo formulários, mais consistência.',
    },
    {
      index: '02',
      title: 'Organize com clareza',
      description:
        'Cada lançamento encontra seu espaço em categorias compreensíveis como Alimentação, Moradia, Transporte, Saúde, Educação e Lazer, com leitura imediata.',
      highlight: 'Sem siglas bancárias ou códigos difíceis de decifrar.',
    },
    {
      index: '03',
      title: 'Acompanhe com contexto',
      description:
        'Consulte o resumo do mês, compare o peso de cada categoria nas suas saídas e acompanhe o avanço das suas metas financeiras em um só lugar.',
      highlight: 'Visão tranquila para planejar seus próximos passos.',
    },
  ],
};

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: 'COMO FUNCIONA NA PRÁTICA',
  title: 'Três passos simples para manter o mês sob controle.',
  subtitle:
    'Uma rotina financeira sustentável não começa com regras rígidas, mas com um processo leve o suficiente para caber no seu dia.',
  steps: [
    {
      stepNumber: '01',
      title: 'Registre uma movimentação',
      description:
        'Digite a descrição e o valor no campo de captura rápida ou adicione os detalhes manualmente. Você pode informar datas relativas como "hoje" ou "ontem".',
      exampleInput: 'almoço 32 ifood',
      exampleOutput: 'Valor identificado: − R$ 32,00 · Data: hoje',
    },
    {
      stepNumber: '02',
      title: 'Organize e categorize',
      description:
        'A plataforma reconhece os termos principais da sua anotação e sugere a categoria correspondente. Se preferir, altere a categoria com um toque antes de confirmar.',
      exampleInput: 'Categoria sugerida: Alimentação',
      exampleOutput: 'Classificação limpa e editável a qualquer momento',
    },
    {
      stepNumber: '03',
      title: 'Entenda sua rotina financeira',
      description:
        'Seu painel atualiza instantaneamente o saldo mensal, a distribuição por categoria e o progresso das suas metas pessoais, mantendo os números sempre alinhados.',
      exampleInput: 'Resumo do mês atualizado',
      exampleOutput: 'Entradas, saídas e metas visíveis sem esforço',
    },
  ],
};

export const DEMO_CONTENT = {
  eyebrow: 'DEMONSTRAÇÃO DA PLATAFORMA',
  title: 'Experimente a leitura clara da Clarus.',
  subtitle:
    'Interaja com os exemplos abaixo ou digite uma movimentação demonstrativa para observar como a interface organiza valores, categorias e metas.',
  disclaimer:
    'Ambiente demonstrativo com valores fictícios. Nenhuma informação digitada aqui é enviada a servidores externos.',
  monthlySummaryDemo: {
    monthLabel: 'Outubro · Visão demonstrativa',
    balance: 'R$ 2.840,00',
    income: 'R$ 6.250,00',
    expenses: 'R$ 3.410,00',
    categories: [
      { id: 'housing', name: 'Moradia', amount: 'R$ 1.680,00', share: 49, count: 4 },
      { id: 'food', name: 'Alimentação', amount: 'R$ 920,00', share: 27, count: 14 },
      { id: 'transport', name: 'Transporte', amount: 'R$ 430,00', share: 13, count: 9 },
      { id: 'health', name: 'Saúde', amount: 'R$ 220,00', share: 6, count: 2 },
      { id: 'leisure', name: 'Lazer', amount: 'R$ 160,00', share: 5, count: 3 },
    ],
    goals: [
      {
        id: 'goal-1',
        name: 'Reserva de tranquilidade',
        saved: 'R$ 4.500,00',
        target: 'R$ 6.000,00',
        progress: 75,
        status: 'Em andamento',
      },
      {
        id: 'goal-2',
        name: 'Viagem de férias',
        saved: 'R$ 1.800,00',
        target: 'R$ 3.000,00',
        progress: 60,
        status: 'Em andamento',
      },
      {
        id: 'goal-3',
        name: 'Curso de atualização',
        saved: 'R$ 900,00',
        target: 'R$ 900,00',
        progress: 100,
        status: 'Concluída',
      },
    ],
  },
};

export const FEATURES_CONTENT = {
  eyebrow: 'RECURSOS E BENEFÍCIOS',
  title: 'Desenhada para dar visibilidade, não trabalho.',
  subtitle:
    'Cada detalhe da interface da Clarus Finance foi pensado para que você compreenda seus números rapidamente e volte a focar no que importa.',
  items: [
    {
      id: 'captura-rapida',
      kicker: 'Registro ágil',
      title: 'Captura rápida em linha única',
      description:
        'Anote despesas e receitas digitando como você fala. A plataforma interpreta o valor em reais, identifica se é entrada ou saída e posiciona a data.',
      metricLabel: 'Exemplo real da plataforma',
      metricValue: 'almoço 32 ifood → − R$ 32,00',
      span: 'wide' as const,
    },
    {
      id: 'visao-mensal',
      kicker: 'Síntese mensal',
      title: 'Resumo de saldo, entradas e saídas',
      description:
        'Acompanhe os três indicadores essenciais do seu mês lado a lado, com tipografia tabular alinhada para leitura rápida sem confusão visual.',
      metricLabel: 'Alinhamento numérico',
      metricValue: 'Geist Mono · tabular-nums',
      span: 'normal' as const,
    },
    {
      id: 'categorias-claras',
      kicker: 'Organização contextual',
      title: 'Distribuição por categorias essenciais',
      description:
        'Visualize quanto cada área da sua rotina — como Moradia, Alimentação e Transporte — representa no total do mês através de barras proporcionais.',
      metricLabel: 'Categorias nativas',
      metricValue: '7 grupos essenciais',
      span: 'normal' as const,
    },
    {
      id: 'metas-pessoais',
      kicker: 'Planejamento tranquilo',
      title: 'Metas com progresso visível',
      description:
        'Pequenos passos, grandes planos. Defina objetivos financeiros, registre aportes e acompanhe o percentual concluído de cada meta no seu ritmo.',
      metricLabel: 'Acompanhamento objetivo',
      metricValue: 'Valor guardado e meta total',
      span: 'wide' as const,
    },
    {
      id: 'historico-limpo',
      kicker: 'Histórico acessível',
      title: 'Movimentações recentes sempre à mão',
      description:
        'Consulte seus últimos lançamentos com indicação clara de data ("hoje", "ontem" ou dia do mês) e opção de desfazer inclusões recém-registradas.',
      metricLabel: 'Controle imediato',
      metricValue: 'Revisão e exclusão simples',
      span: 'normal' as const,
    },
    {
      id: 'experiencia-responsiva',
      kicker: 'Consistência de uso',
      title: 'Leve no computador e no celular',
      description:
        'Navegação adaptada para diferentes tamanhos de tela, com botões confortáveis ao toque, alto contraste e suporte completo a teclado.',
      metricLabel: 'Acessibilidade',
      metricValue: 'Foco visível · WCAG 2.2 AA',
      span: 'normal' as const,
    },
  ],
};

export const TRUST_CONTENT = {
  eyebrow: 'CONFIANÇA E PRIVACIDADE',
  title: 'Seus registros financeiros tratados com respeito e transparência.',
  description:
    'Sabemos que organizar a vida financeira exige confiança. Por isso, a Clarus Finance adota uma postura transparente sobre como suas informações são utilizadas e protegidas.',
  principles: [
    {
      title: 'Controle sobre os seus registros',
      description:
        'Você decide o que registrar, editar ou remover da sua conta. Seus lançamentos existem para ajudar na sua organização pessoal, nunca para expor sua rotina.',
    },
    {
      title: 'Privacidade desde o desenho',
      description:
        'Dados pessoais e valores financeiros da área autenticada não são compartilhados com ferramentas publicitárias nem expostos em URLs públicas.',
    },
    {
      title: 'Documentação clara e acessível',
      description:
        'Nossos compromissos de tratamento de dados e regras de uso estão organizados em linguagem direta para consulta aberta.',
    },
  ],
  // TODO: validar com a Clarus — confirmar especificações técnicas de infraestrutura, armazenamento, criptografia e dados do controlador jurídico antes da publicação definitiva.
  validationNotice:
    'Nota de transparência: especificações técnicas detalhadas de infraestrutura e qualificação societária completa encontram-se em etapa de validação jurídica final pela equipe Clarus Finance.',
};

export const FAQ_ITEMS = [
  {
    id: 'faq-o-que-e',
    question: 'O que é a Clarus Finance?',
    answer:
      'A Clarus Finance é uma plataforma web de organização financeira pessoal. Sua proposta é ajudar você a registrar movimentações, visualizar gastos por categoria, acompanhar o saldo do mês e evoluir em suas metas financeiras com clareza, simplicidade e leveza.',
  },
  {
    id: 'faq-para-quem',
    question: 'Para quem a Clarus foi criada?',
    answer:
      'Para pessoas que desejam entender melhor para onde vai o próprio dinheiro no dia a dia, mas não querem lidar com planilhas complexas ou interfaces carregadas de termos técnicos.',
  },
  {
    id: 'faq-como-comecar',
    question: 'Como faço para começar a usar?',
    answer:
      'Basta clicar em "Criar minha conta", informar seu nome, e-mail e definir uma senha. Em poucos instantes você já pode registrar sua primeira entrada ou saída usando a captura rápida.',
  },
  {
    id: 'faq-custo',
    question: 'Existe custo para criar uma conta na Clarus?',
    // TODO: validar com a Clarus — confirmar política oficial de preços, gratuidade ou planos de assinatura.
    answer:
      'Você pode criar sua conta gratuitamente para conhecer a experiência da plataforma. Informações comerciais detalhadas sobre eventuais planos futuros ou condições específicas estão em validação pela equipe da Clarus Finance (conteúdo comercial sujeito a confirmação oficial).',
  },
  {
    id: 'faq-integracao-bancaria',
    question: 'A Clarus exige conexão automática com a minha conta bancária?',
    answer:
      'Não. Na experiência atual da Clarus Finance, você registra suas movimentações de forma direta e consciente usando a captura rápida — sem precisar fornecer senhas bancárias ou configurar integrações complexas.',
  },
  {
    id: 'faq-dados-privacidade',
    question: 'Como meus dados financeiros são tratados?',
    // TODO: validar com a Clarus — validar cláusulas definitivas de retenção, operador/controlador LGPD e canal oficial do encarregado de dados (DPO).
    answer:
      'Seus dados são utilizados exclusivamente para fornecer a experiência de organização financeira dentro da sua conta. Valores financeiros e descrições pessoais nunca são enviados para ferramentas de análise de tráfego. Você pode consultar a estrutura completa na nossa página de Política de Privacidade.',
  },
  {
    id: 'faq-acesso-conta',
    question: 'Já tenho cadastro. Como acesso minha conta ou recupero minha senha?',
    answer:
      'Você pode acessar sua conta a qualquer momento clicando em "Entrar" no topo da página (rota /login). Caso não lembre sua senha, utilize a opção "Esqueci minha senha" na tela de entrada (/forgot-password) para redefini-la.',
  },
];
