/**
 * Máscaras e validação dos formulários de contato.
 *
 * O objetivo declarado é "não deixar digitar falso". Vale ser preciso sobre
 * o que esta camada consegue e o que não consegue:
 *
 *  · Consegue barrar o que é comprovadamente inválido — formato quebrado,
 *    DDD inexistente, celular sem o 9, sequências como (11) 11111-1111,
 *    domínio sem ponto, domínio descartável conhecido, erro de digitação
 *    clássico (gmial.com).
 *  · NÃO consegue provar que o e-mail existe nem que o telefone atende.
 *    Só um código de confirmação enviado ao contato prova isso. Se um dia
 *    a taxa de lead falso incomodar, o passo seguinte é double opt-in —
 *    não uma regex mais agressiva, que só começaria a barrar gente real.
 */

// ---------------------------------------------------------------------------
// TELEFONE
// ---------------------------------------------------------------------------

/** DDDs em operação no Brasil. Fonte: plano nacional de numeração da Anatel. */
const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

/**
 * Máscara progressiva de telefone brasileiro.
 * Formata enquanto digita: (11) 98472-1536 ou (11) 3251-7890.
 */
export function mascaraTelefone(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validarTelefone(valor: string): string | null {
  const d = apenasDigitos(valor);

  if (d.length === 0) return 'Informe o telefone de contato.';
  if (d.length < 10) return 'Telefone incompleto — inclua o DDD.';
  if (d.length > 11) return 'Telefone com dígitos demais.';

  const ddd = Number(d.slice(0, 2));
  if (!DDDS_VALIDOS.has(ddd)) return `DDD ${d.slice(0, 2)} não existe.`;

  const numero = d.slice(2);

  // Celular tem 9 dígitos e começa com 9; fixo tem 8 e começa de 2 a 5.
  if (numero.length === 9 && numero[0] !== '9') {
    return 'Celular com 9 dígitos precisa começar com 9.';
  }
  if (numero.length === 8 && !'2345'.includes(numero[0])) {
    return 'Telefone fixo começa com 2, 3, 4 ou 5.';
  }

  // Todos os dígitos iguais: (11) 99999-9999 e parentes.
  if (/^(\d)\1+$/.test(numero)) return 'Esse número não parece real.';

  // Sequência corrida do começo ao fim: 23456789, 987654321.
  //
  // Precisa checar o número INTEIRO, dígito a dígito. A primeira versão
  // procurava o número como substring de '01234567890123...' e reprovava
  // gente de verdade: 987654321 é substring da sequência decrescente, e
  // qualquer celular terminado em corrida curta caía junto.
  const corrida = (passo: number) =>
    [...numero].every((d, i) => i === 0 || Number(d) === Number(numero[i - 1]) + passo);
  if (corrida(1) || corrida(-1)) return 'Esse número não parece real.';

  return null;
}

// ---------------------------------------------------------------------------
// E-MAIL
// ---------------------------------------------------------------------------

/**
 * "Máscara" de e-mail: normaliza enquanto digita — sem espaços, sem
 * maiúsculas, sem acento. Impede a maior fonte de e-mail inválido, que é
 * o autocorretor do celular capitalizando a primeira letra.
 */
export function mascaraEmail(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

/** Domínios descartáveis mais comuns — lead que nasce morto. */
const DOMINIOS_DESCARTAVEIS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'temp-mail.org',
  '10minutemail.com', 'yopmail.com', 'throwawaymail.com', 'trashmail.com',
  'sharklasers.com', 'getnada.com', 'maildrop.cc', 'fakeinbox.com',
  'dispostable.com', 'mailnesia.com', 'tempr.email', 'emailtemporario.com.br',
]);

/** Erros de digitação clássicos em domínios populares. */
const CORRECOES: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmil.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com', 'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com',
  'uo.com.br': 'uol.com.br', 'bol.com': 'bol.com.br',
};

export type ResultadoEmail = { erro: string | null; sugestao?: string };

export function validarEmail(valor: string): ResultadoEmail {
  const v = mascaraEmail(valor);

  if (v.length === 0) return { erro: 'Informe o e-mail.' };
  if (v.length > 254) return { erro: 'E-mail longo demais.' };

  // Formato: um @, parte local sem ponto no começo/fim e sem ponto duplo,
  // domínio com pelo menos um ponto e TLD de 2+ letras.
  const formato =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
  if (!formato.test(v)) return { erro: 'E-mail em formato inválido.' };

  const [local, dominio] = v.split('@');

  if (local.length > 64) return { erro: 'E-mail em formato inválido.' };

  if (CORRECOES[dominio]) {
    return {
      erro: `Domínio parece ter erro de digitação.`,
      sugestao: `${local}@${CORRECOES[dominio]}`,
    };
  }

  if (DOMINIOS_DESCARTAVEIS.has(dominio)) {
    return { erro: 'Use um e-mail permanente — precisamos conseguir responder.' };
  }

  // Domínio de exemplo reservado por norma (RFC 2606): nunca é real.
  if (/^(example|test|invalid|localhost)\.|\.(example|test|invalid|local)$/.test(dominio)) {
    return { erro: 'Esse domínio não recebe e-mail.' };
  }

  return { erro: null };
}

// ---------------------------------------------------------------------------
// NOME E EMPRESA
// ---------------------------------------------------------------------------

export function validarNomeCompleto(valor: string): string | null {
  const v = valor.trim().replace(/\s+/g, ' ');
  if (v.length === 0) return 'Informe o nome completo.';
  if (v.length < 5) return 'Nome muito curto.';
  if (/\d/.test(v)) return 'Nome não deve conter números.';
  if (!/^[\p{L}\p{M}'’.\- ]+$/u.test(v)) return 'Use apenas letras no nome.';

  const partes = v.split(' ').filter((p) => p.replace(/[.'’-]/g, '').length >= 2);
  if (partes.length < 2) return 'Informe nome e sobrenome.';

  // Teclado batido: "asdf asdf", "aaaa bbbb".
  if (/^(\p{L})\1{2,}/u.test(v)) return 'Esse nome não parece real.';

  return null;
}

export function validarEmpresa(valor: string): string | null {
  const v = valor.trim();
  if (v.length === 0) return 'Informe a empresa.';
  if (v.length < 2) return 'Nome da empresa muito curto.';
  if (/^(\p{L})\1{2,}$/u.test(v)) return 'Esse nome não parece real.';
  return null;
}

export function validarDescricao(valor: string): string | null {
  if (valor.length > 2000) return 'Descrição longa demais (máximo 2000 caracteres).';
  return null;
}
