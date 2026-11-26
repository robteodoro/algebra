/* Aritmética dos anéis do curso: Z_n, polinômios com coeficientes inteiros ou em Z_p
   (e seus quocientes por um polinômio), e o reticulado dos inteiros gaussianos.
   Tudo exato, com números inteiros pequenos. */
'use strict';

/* ============================================================
   ARITMÉTICA EM Z E EM Z_n
   ============================================================ */
L.ar = {
  /** Representante em {0, ..., n-1}. */
  mod(a, n) { return ((a % n) + n) % n; },
  mdc(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; },
  mmc(a, b) { return a && b ? Math.abs(a * b) / L.ar.mdc(a, b) : 0; },
  ehPrimo(n) {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  },
  divisores(n) { const r = []; for (let d = 1; d <= n; d++) if (n % d === 0) r.push(d); return r; },
  /** Primos que dividem n, em ordem. */
  primos(n) { return L.ar.divisores(n).filter(L.ar.ehPrimo); },
  /** Fatoração: [[p, e], ...]. */
  fatorar(n) {
    const f = [];
    for (let p = 2; p * p <= n; p++) {
      let e = 0;
      while (n % p === 0) { n /= p; e++; }
      if (e) f.push([p, e]);
    }
    if (n > 1) f.push([n, 1]);
    return f;
  },
  /** Inverso de a em Z_n, ou null se não existir. */
  inv(a, n) {
    a = L.ar.mod(a, n);
    for (let x = 0; x < n; x++) if ((a * x) % n === 1 % n) return x;
    return null;
  },
  /** U(n): elementos invertíveis de Z_n. */
  U(n) { return Array.from({ length: n }, (_, a) => a).filter(a => L.ar.mdc(a, n) === 1 && (n > 1 || a === 0)); },
  phi(n) { return L.ar.U(n).length; },
  /** Divisores de zero de Z_n: a ≠ 0 com ab = 0 para algum b ≠ 0. */
  divZero(n) {
    const r = [];
    for (let a = 1; a < n; a++) for (let b = 1; b < n; b++) if ((a * b) % n === 0) { r.push(a); break; }
    return r;
  },
  idempotentes(n) { return Array.from({ length: n }, (_, a) => a).filter(a => (a * a) % n === a); },
  nilpotentes(n) {
    return Array.from({ length: n }, (_, a) => a).filter(a => {
      let x = a % n;
      for (let k = 0; k < 8; k++) { if (x === 0) return true; x = (x * a) % n; }
      return x === 0;
    });
  },
  /** Ordem aditiva de a em Z_n. */
  ordemAditiva(a, n) { return n / L.ar.mdc(a, n); },
  /** Soluções de um polinômio (coeficientes crescentes) em Z_n. */
  raizes(coefs, n) {
    const r = [];
    for (let x = 0; x < n; x++) {
      let v = 0, pot = 1;
      for (const c of coefs) { v = (v + c * pot) % n; pot = (pot * x) % n; }
      if (L.ar.mod(v, n) === 0) r.push(x);
    }
    return r;
  },
  /** Homomorfismos de anéis Z_m → Z_n: x ↦ ax com n | ma e a² = a em Z_n. */
  homZmZn(m, n) { return L.ar.idempotentes(n).filter(a => (m * a) % n === 0); }
};

/* ============================================================
   POLINÔMIOS
   Um polinômio é um vetor de coeficientes inteiros, do grau 0 para cima: [1, 0, 1] = 1 + x².
   "p" é o módulo dos coeficientes (0 = inteiros, sem redução).
   ============================================================ */
L.poli = {
  limpar(a) { const b = a.slice(); while (b.length && b[b.length - 1] === 0) b.pop(); return b; },
  grau(a) { return L.poli.limpar(a).length - 1; },   // grau do polinômio nulo: -1
  nulo(a) { return L.poli.limpar(a).length === 0; },
  coefs(a, p) { return L.poli.limpar(p ? a.map(c => L.ar.mod(c, p)) : a.slice()); },
  soma(a, b, p = 0) { const n = Math.max(a.length, b.length); return L.poli.coefs(Array.from({ length: n }, (_, k) => (a[k] || 0) + (b[k] || 0)), p); },
  sub(a, b, p = 0) { const n = Math.max(a.length, b.length); return L.poli.coefs(Array.from({ length: n }, (_, k) => (a[k] || 0) - (b[k] || 0)), p); },
  esc(c, a, p = 0) { return L.poli.coefs(a.map(x => x * c), p); },
  mul(a, b, p = 0) {
    if (!a.length || !b.length) return [];
    const r = Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; }));
    return L.poli.coefs(r, p);
  },
  pot(a, k, p = 0) { let r = [1]; for (let i = 0; i < k; i++) r = L.poli.mul(r, a, p); return L.poli.coefs(r, p); },
  igual(a, b) { const x = L.poli.limpar(a), y = L.poli.limpar(b); return x.length === y.length && x.every((c, k) => c === y[k]); },

  /** Resto da divisão de a por f. Com p primo, qualquer f ≠ 0; com p = 0, f precisa ser mônico. */
  resto(a, f, p = 0) {
    f = L.poli.coefs(f, p);
    let r = L.poli.coefs(a, p);
    const df = f.length - 1;
    if (df < 0) throw new Error('Divisão por zero');
    const lider = f[df];
    let invL;
    if (p) { invL = L.ar.inv(lider, p); if (invL === null) throw new Error('coeficiente líder não invertível'); }
    else if (Math.abs(lider) !== 1) throw new Error('em Z, só divido por polinômio mônico');
    else invL = lider;
    while (r.length - 1 >= df) {
      const k = r.length - 1 - df;
      const c = p ? L.ar.mod(r[r.length - 1] * invL, p) : r[r.length - 1] * invL;
      const sub = Array(k).fill(0).concat(f.map(x => x * c));
      r = L.poli.sub(r, sub, p);
    }
    return r;
  },
  /** Forma reduzida de a em Z_p[x]/<f> (ou Z[x]/<f>, ou Z_p[x] se f for nulo). */
  reduzir(a, p = 0, f = null) { return f ? L.poli.resto(a, f, p) : L.poli.coefs(a, p); },

  /** Todos os polinômios de grau menor que d com coeficientes em Z_p (representantes de Z_p[x]/<f>). */
  todos(p, d) {
    const r = [];
    const total = p ** d;
    for (let k = 0; k < total; k++) {
      const c = [];
      let t = k;
      for (let j = 0; j < d; j++) { c.push(t % p); t = Math.floor(t / p); }
      r.push(L.poli.limpar(c));
    }
    return r;
  },

  /** LaTeX. ordem 'desc' (x² + x + 1) ou 'asc' (3 + 2i, como nos inteiros gaussianos). */
  tex(a, v = 'x', ordem = 'desc') {
    const c = L.poli.limpar(a);
    if (!c.length) return '0';
    const termos = [];
    c.forEach((x, k) => {
      if (x === 0) return;
      const mono = k === 0 ? '' : k === 1 ? v : `${v}^{${k}}`;
      const abs = Math.abs(x);
      const num = k === 0 ? String(abs) : abs === 1 ? '' : String(abs);
      termos.push({ neg: x < 0, s: num + mono });
    });
    if (ordem === 'desc') termos.reverse();
    return termos.map((t, i) => (i === 0 ? (t.neg ? '-' : '') + t.s : (t.neg ? ' - ' : ' + ') + t.s)).join('');
  },
  /** Texto para digitar (sem chaves). */
  texto(a, v = 'x', ordem = 'desc') { return L.poli.tex(a, v, ordem).replace(/\{|\}/g, '').replace(/ /g, ''); },

  /**
   * Lê um polinômio digitado na variável v (uma letra). Aceita +, −, ·, *, ^, ², ³,
   * parênteses e multiplicação implícita: "2x^2 + 3x - 1", "(x+1)(x+2)", "3 + 2i".
   */
  ler(texto, v = 'x') {
    const s = String(texto)
      .replace(/[−–—]/g, '-').replace(/[·×∙⋅]/g, '*')
      .replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4')
      .replace(/\s+/g, '');
    if (!s) throw new Error('Resposta vazia.');
    const t = [];
    for (let i = 0; i < s.length;) {
      const c = s[i];
      if (/[0-9]/.test(c)) { let j = i; while (j < s.length && /[0-9]/.test(s[j])) j++; t.push({ k: 'num', v: Number(s.slice(i, j)) }); i = j; }
      else if (/[.,]/.test(c)) throw new Error('Use só números inteiros nos coeficientes.');
      else if (c === v) { t.push({ k: 'var' }); i++; }
      else if (/[a-zA-Z]/.test(c)) throw new Error(`A resposta não deveria ter a letra “${c}”.`);
      else if ('+-*^()'.includes(c)) { t.push({ k: c }); i++; }
      else if (c === '/') throw new Error('Não use divisão: escreva o resultado com coeficientes inteiros.');
      else throw new Error(`Símbolo não reconhecido: “${c}”`);
    }
    let i = 0;
    const P = L.poli;
    const ver = () => t[i];
    function expr() {
      let a = termo();
      while (ver() && (ver().k === '+' || ver().k === '-')) { const op = t[i++].k; const b = termo(); a = op === '+' ? P.soma(a, b) : P.sub(a, b); }
      return a;
    }
    function termo() {
      let a = unario();
      for (;;) {
        const x = ver();
        if (!x) break;
        if (x.k === '*') { i++; a = P.mul(a, unario()); }
        else if (x.k === '(' || x.k === 'var' || x.k === 'num') a = P.mul(a, potencia());
        else break;
      }
      return a;
    }
    function unario() {
      if (ver() && ver().k === '-') { i++; return P.esc(-1, unario()); }
      if (ver() && ver().k === '+') { i++; return unario(); }
      return potencia();
    }
    function potencia() {
      const b = primario();
      if (ver() && ver().k === '^') {
        i++;
        const e = t[i++];
        if (!e || e.k !== 'num') throw new Error('O expoente precisa ser um número inteiro.');
        if (e.v > 40) throw new Error('Expoente grande demais.');
        return P.pot(b, e.v);
      }
      return b;
    }
    function primario() {
      const x = t[i++];
      if (!x) throw new Error('Expressão incompleta.');
      if (x.k === 'num') return P.limpar([x.v]);
      if (x.k === 'var') return [0, 1];
      if (x.k === '(') { const a = expr(); if (!t[i] || t[i].k !== ')') throw new Error('Parênteses desbalanceados.'); i++; return a; }
      throw new Error('Expressão mal formada.');
    }
    const r = expr();
    if (i < t.length) throw new Error('Expressão mal formada (sobrou algo no final).');
    return r;
  }
};

/* ============================================================
   INTEIROS GAUSSIANOS E O QUOCIENTE Z[i]/<a+bi>
   As classes são as do reticulado gerado por a+bi e i(a+bi) = -b+ai.
   ============================================================ */
L.gauss = {
  mul([a, b], [c, d]) { return [a * c - b * d, a * d + b * c]; },
  norma([a, b]) { return a * a + b * b; },
  /**
   * Base escalonada do reticulado <a+bi>: vetores (r, 0) e (q, p), com r·p = a² + b².
   * Os representantes das classes são x + yi com 0 ≤ y < p e 0 ≤ x < r.
   */
  base(a, b) {
    let u = [a, b], v = [-b, a];
    while (v[1] !== 0) {
      const k = Math.floor(u[1] / v[1]);
      u = [u[0] - k * v[0], u[1] - k * v[1]];
      [u, v] = [v, u];
    }
    // agora v = (r, 0) e u = (q, p)
    let r = Math.abs(v[0]);
    if (u[1] < 0) u = [-u[0], -u[1]];
    const p = u[1], q = L.ar.mod(u[0], r);
    return { r, p, q };
  },
  /** Representante canônico da classe de x + yi. */
  classe(x, y, B) {
    const k = Math.floor(y / B.p);
    x -= k * B.q; y -= k * B.p;
    return [L.ar.mod(x, B.r), y];
  },
  indice(x, y, B) { const [cx, cy] = L.gauss.classe(x, y, B); return cy * B.r + cx; },
  tex([a, b]) { return L.poli.tex([a, b], 'i', 'asc'); }
};
