import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface AuthPageProps {
  onNavigate: (href: string) => void;
}

/**
 * AuthShell oficial alinhada à referência https://v0-clarus.vercel.app/login
 */
const AuthShell: React.FC<{
  children: React.ReactNode;
  onNavigate: (href: string) => void;
}> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F4F3FA] text-[#14121C] lg:grid lg:grid-cols-[46%_54%]">
      {/* Coluna do Formulário */}
      <section className="relative flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-[clamp(2.5rem,6vw,6rem)]">
        <div className="flex items-center justify-between gap-4">
          <BrandLogo surface="light" size="md" href="/" onNavigate={onNavigate} />
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-[#625D70] transition-colors hover:bg-[#ECEAF3] hover:text-[#14121C]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Voltar ao início</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </section>

      {/* Painel Editorial Direito (Fiel à referência da plataforma) */}
      <aside
        aria-label="Destaque institucional da Clarus Finance"
        className="relative isolate hidden min-h-screen overflow-hidden bg-[#14121C] lg:flex lg:items-end lg:p-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_20%_20%,#7E3BED_0,transparent_34%),radial-gradient(circle_at_82%_70%,#A982FF_0,transparent_28%),radial-gradient(circle_at_75%_12%,#D7F744_0,transparent_13%)]"
        />

        <div className="relative z-10 w-full max-w-xl text-white">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
            CLAREZA PARA CADA ESCOLHA
          </p>
          <h2 className="font-display text-6xl font-bold leading-[0.95] tracking-[-0.05em]">
            Seu dinheiro,
            <br />
            <span className="text-[#D7F744]">finalmente claro.</span>
          </h2>

          <div className="mt-12 ml-auto w-[280px] rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
            <p className="text-xs text-white/65">captura rápida (exemplo)</p>
            <p className="mt-2 text-sm font-medium text-white">almoço 32 ifood</p>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
              <span className="text-xs text-white/75">Alimentação</span>
              <span className="font-mono text-sm font-semibold text-[#D7F744] tabular-nums">
                − R$ 32,00
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export const LoginPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Digite um endereço de e-mail válido.');
      return;
    }
    if (!password) {
      setError('Digite sua senha para entrar.');
      return;
    }

    setError('');
    setLoading(true);
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          'clarus-demo-user',
          JSON.stringify({
            name: cleanEmail.split('@')[0],
            email: cleanEmail,
          })
        );
      } catch {
        // Fallback em memória
      }
      setLoading(false);
      onNavigate('/app');
    }, 300);
  };

  return (
    <AuthShell onNavigate={onNavigate}>
      <div>
        <p className="text-sm text-[#625D70]">bem-vindo de volta</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-[#14121C]">
          Entre no Clarus
        </h1>
        <p className="mt-2.5 text-sm text-[#625D70]">
          Sua vida financeira, no lugar certo.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="login-email" className="text-sm font-medium text-[#14121C]">
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="voce@email.com"
              className="h-12 w-full rounded-xl border border-[#DEDCE8] bg-white px-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-offset-0 focus:outline-[#7E3BED]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-sm font-medium text-[#14121C]">
                Senha
              </label>
              <a
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/forgot-password');
                }}
                className="text-xs font-medium text-[#2A1458] hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-[#DEDCE8] bg-white pr-12 pl-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-offset-0 focus:outline-[#7E3BED]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#625D70] hover:bg-[#F4F3FA] hover:text-[#14121C]"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-[#C94343]/30 bg-[#C94343]/10 px-3.5 py-2.5 text-xs font-medium text-[#C94343]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2A1458] px-5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
          >
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            {!loading && <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#625D70]">
          Ainda não tem conta?{' '}
          <a
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/register');
            }}
            className="font-medium text-[#2A1458] hover:underline"
          >
            Criar minha conta
          </a>
        </p>
      </div>
    </AuthShell>
  );
};

export const RegisterPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strengthChecks = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
  ];
  const strengthScore = strengthChecks.filter(Boolean).length;
  const strengthLabels = ['Fraca', 'Razoável', 'Boa', 'Forte'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Informe seu nome para personalizar sua conta.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Digite um endereço de e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('Sua senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas digitadas ainda não coincidem.');
      return;
    }
    if (!acceptedTerms) {
      setError('Confirme que leu os Termos de Uso e a Política de Privacidade para continuar.');
      return;
    }

    setError('');
    setLoading(true);
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          'clarus-demo-user',
          JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
          })
        );
      } catch {
        // Fallback em memória
      }
      setLoading(false);
      onNavigate('/app');
    }, 350);
  };

  return (
    <AuthShell onNavigate={onNavigate}>
      <div>
        <p className="text-sm text-[#625D70]">comece com tranquilidade</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-[#14121C]">
          Criar minha conta
        </h1>
        <p className="mt-2.5 text-sm text-[#625D70]">
          Organize suas movimentações, categorias e metas em um só lugar.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-name" className="text-sm font-medium text-[#14121C]">
              Como podemos chamar você?
            </label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Seu nome"
              className="h-11 w-full rounded-xl border border-[#DEDCE8] bg-white px-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-[#7E3BED]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-email" className="text-sm font-medium text-[#14121C]">
              E-mail
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="voce@email.com"
              className="h-11 w-full rounded-xl border border-[#DEDCE8] bg-white px-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-[#7E3BED]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-password" className="text-sm font-medium text-[#14121C]">
              Crie uma senha
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Pelo menos 6 caracteres"
                className="h-11 w-full rounded-xl border border-[#DEDCE8] bg-white pr-12 pl-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-[#7E3BED]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#625D70] hover:bg-[#F4F3FA]"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {password.length > 0 && (
              <div className="mt-1 flex items-center justify-between text-xs text-[#625D70]">
                <span>Força da senha: {strengthLabels[strengthScore]}</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`h-1.5 w-6 rounded-full ${
                        strengthScore >= step ? 'bg-[#2A1458]' : 'bg-[#DEDCE8]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reg-confirm" className="text-sm font-medium text-[#14121C]">
              Confirme sua senha
            </label>
            <input
              id="reg-confirm"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (error) setError('');
              }}
              placeholder="Repita sua senha"
              className="h-11 w-full rounded-xl border border-[#DEDCE8] bg-white px-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-[#7E3BED]"
            />
            {confirm.length > 0 && (
              <p
                className={`text-xs ${
                  password === confirm ? 'text-[#2A1458]' : 'text-[#C94343]'
                }`}
              >
                {password === confirm
                  ? 'As senhas coincidem.'
                  : 'As senhas ainda não coincidem.'}
              </p>
            )}
          </div>

          <label className="mt-1 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#625D70]">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (error) setError('');
              }}
              className="mt-0.5 size-4 shrink-0 accent-[#2A1458]"
            />
            <span>
              Concordo com os{' '}
              <a
                href="/termos"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/termos');
                }}
                className="font-medium text-[#2A1458] underline"
              >
                Termos de Uso
              </a>{' '}
              e a{' '}
              <a
                href="/privacidade"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/privacidade');
                }}
                className="font-medium text-[#2A1458] underline"
              >
                Política de Privacidade
              </a>
              .
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-[#C94343]/30 bg-[#C94343]/10 px-3.5 py-2.5 text-xs font-medium text-[#C94343]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2A1458] px-5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
          >
            <span>{loading ? 'Criando conta...' : 'Criar minha conta'}</span>
            {!loading && <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#625D70]">
          Já tem uma conta?{' '}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/login');
            }}
            className="font-medium text-[#2A1458] hover:underline"
          >
            Entrar
          </a>
        </p>
      </div>
    </AuthShell>
  );
};

export const ForgotPasswordPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Informe um endereço de e-mail válido para recuperar o acesso.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <AuthShell onNavigate={onNavigate}>
      <div>
        <p className="text-sm text-[#625D70]">recuperação de acesso</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-[#14121C]">
          Redefinir senha
        </h1>
        <p className="mt-2.5 text-sm text-[#625D70]">
          Informe o e-mail associado à sua conta na Clarus Finance.
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-[#2A1458]/20 bg-white p-6"
          >
            <div className="flex items-center gap-2.5 text-[#2A1458]">
              <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold">Instruções solicitadas</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#625D70]">
              Se houver uma conta vinculada a <strong className="text-[#14121C]">{email}</strong>,
              você receberá as instruções para redefinir sua senha.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2A1458] px-4 text-sm font-medium text-white hover:bg-[#7E3BED]"
            >
              Voltar para o login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="reset-email" className="text-sm font-medium text-[#14121C]">
                E-mail cadastrado
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="voce@email.com"
                className="h-12 w-full rounded-xl border border-[#DEDCE8] bg-white px-4 text-sm text-[#14121C] placeholder:text-[#625D70]/60 focus:border-[#7E3BED] focus:outline-2 focus:outline-[#7E3BED]"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[#C94343]/30 bg-[#C94343]/10 px-3.5 py-2.5 text-xs font-medium text-[#C94343]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2A1458] px-5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED]"
            >
              <span>Enviar link de recuperação</span>
              <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-[#625D70]">
          Lembrou sua senha?{' '}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/login');
            }}
            className="font-medium text-[#2A1458] hover:underline"
          >
            Voltar para Entrar
          </a>
        </p>
      </div>
    </AuthShell>
  );
};
