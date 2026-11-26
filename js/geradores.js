/* Geradores de exercícios de reforço: cada chamada de gerar() cria um exercício novo,
   com a resposta calculada exatamente e uma solução comentada.
   Os testes (testes/teste.html) conferem cada gerador por força bruta, de forma independente. */
'use strict';

L.geradores = {};
L.registrarGerador = function (g) { L.geradores[g.id] = g; };

(function () {
  const { int, sortear, embaralhar } = L.util;
  const A = L.ar, P = L.poli, G = L.gauss;
  const Z = n => `\\mathbb{Z}_{${n}}`;
  const lista = xs => xs.length ? `\\{${xs.join(',')}\\}` : '\\varnothing';
  const COMPOSTOS = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24];
  const PRIMOS = [2, 3, 5, 7, 11, 13];

  /* ------------------------------------------------------------ 1.2 operar */
  L.registrarGerador({
    id: 'operar', titulo: 'Contas em ℤₙ, em somas diretas e em ℤ[i]', cap: 1, sec: 2,
    gerar() {
      const tipo = sortear(['zn', 'zn', 'soma', 'gauss']);
      if (tipo === 'zn') {
        const n = int(5, 20), a = int(2, n - 1), b = int(2, n - 1), op = sortear(['mul', 'mul', 'neg', 'pot']);
        if (op === 'mul') return { t: 'mod', n, r: (a * b) % n, p: R`Em $${Z(n)}$, calcule $${a}\cdot${b}$.`, rot: '$=$',
          exp: R`$${a}\cdot${b}=${a * b}=${Math.floor(a * b / n)}\cdot${n}+${(a * b) % n}$, logo $${a}\cdot${b}=${(a * b) % n}$ em $${Z(n)}$.` };
        if (op === 'neg') return { t: 'mod', n, r: (n - a) % n, p: R`Em $${Z(n)}$, quem é $-${a}$, o oposto (simétrico aditivo) de $${a}$?`, rot: '$-' + a + '=$',
          exp: R`É o elemento que somado a $${a}$ dá $0$: $${a}+${n - a}=${n}=0$ em $${Z(n)}$.` };
        const k = int(2, 4), r = Math.pow(a, k) % n;
        let passos = [], x = 1;
        for (let i = 1; i <= k; i++) { x = (x * a) % n; passos.push(`${a}^{${i}}=${x}`); }
        return { t: 'mod', n, r, p: R`Em $${Z(n)}$, calcule $${a}^{${k}}$.`, rot: '$=$', exp: R`Reduzindo a cada passo: $${passos.join(',\ ')}$.` };
      }
      if (tipo === 'soma') {
        const m = int(2, 6), n = int(3, 9), a = int(1, m - 1), b = int(1, n - 1), c = int(1, m - 1), d = int(1, n - 1);
        const r1 = (a * c) % m, r2 = (b * d) % n;
        return { t: 'multi', p: R`Em $${Z(m)}\oplus${Z(n)}$, calcule $(${a},${b})\cdot(${c},${d})=(u,v)$, com $0\le u\lt ${m}$ e $0\le v\lt ${n}$.`,
          campos: [{ rot: '$u=$', r: r1 }, { rot: '$v=$', r: r2 }],
          exp: R`As operações são coordenada a coordenada: $u=${a}\cdot${c}=${r1}$ em $${Z(m)}$ e $v=${b}\cdot${d}=${r2}$ em $${Z(n)}$.` };
      }
      const z = [int(-4, 4), int(-4, 4) || 1], w = [int(-4, 4), int(-4, 4) || 2], pr = G.mul(z, w);
      return { t: 'poli', v: 'i', r: pr, p: R`Em $\mathbb{Z}[i]$, calcule $(${G.tex(z)})(${G.tex(w)})$.`,
        exp: R`Distributiva e $i^2=-1$: $(a+bi)(c+di)=(ac-bd)+(ad+bc)i$. Aqui $ac-bd=${z[0] * w[0]}-(${z[1] * w[1]})=${pr[0]}$ e $ad+bc=${z[0] * w[1]}+(${z[1] * w[0]})=${pr[1]}$, então o produto é $${G.tex(pr)}$.` };
    }
  });

  /* ------------------------------------------------------------ 1.3 inverso */
  L.registrarGerador({
    id: 'inverso', titulo: 'Inversos em ℤₙ', cap: 1, sec: 3,
    gerar() {
      const n = sortear([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 21, 22, 25, 26]);
      let a = int(2, n - 1);
      if (Math.random() < 0.65) while (A.mdc(a, n) !== 1) a = int(2, n - 1);
      const inv = A.inv(a, n), g = A.mdc(a, n);
      return { t: 'mod', n, r: inv, nada: true, p: R`Em $${Z(n)}$, determine $${a}^{-1}$ (ou escreva “não existe”).`, rot: R`$${a}^{-1}=$`,
        dica: R`$${a}$ é invertível em $${Z(n)}$ exatamente quando $\operatorname{mdc}(${a},${n})=1$.`,
        exp: inv === null
          ? R`$\operatorname{mdc}(${a},${n})=${g}\neq1$: todo múltiplo $${a}x$ é múltiplo de $${g}$ mesmo depois de reduzir módulo $${n}$, então nunca vale $${a}x=1$. Não existe inverso.`
          : R`$\operatorname{mdc}(${a},${n})=1$, logo o inverso existe. Procurando: $${a}\cdot${inv}=${a * inv}=${Math.floor(a * inv / n)}\cdot${n}+1$, ou seja, $${a}\cdot${inv}=1$ em $${Z(n)}$.` };
    }
  });

  L.registrarGerador({
    id: 'unz', titulo: 'Os invertíveis U(n)', cap: 1, sec: 3,
    gerar() {
      const n = sortear([8, 9, 10, 12, 14, 15, 16, 18, 20, 24]);
      const U = A.U(n);
      if (Math.random() < 0.5) return { t: 'conjmod', n, r: U, p: R`Liste os elementos invertíveis de $${Z(n)}$, isto é, o conjunto $U(${n})$.`,
        exp: R`São os $a$ com $\operatorname{mdc}(a,${n})=1$: $U(${n})=${lista(U)}$.` };
      return { t: 'num', r: U.length, p: R`Quantos elementos invertíveis tem o anel $${Z(n)}$?`,
        exp: R`Contam-se os $a\in\{1,\dots,${n - 1}\}$ com $\operatorname{mdc}(a,${n})=1$: $${lista(U)}$, ${U.length} elementos.` };
    }
  });

  /* ------------------------------------------------------------ 1.5 unidade de um subanel */
  L.registrarGerador({
    id: 'unidsub', titulo: 'A unidade de um subanel de ℤₙ', cap: 1, sec: 5,
    gerar() {
      const [d, k] = sortear([[2, 5], [2, 3], [3, 4], [2, 7], [3, 5], [5, 2], [4, 3], [2, 4], [3, 3], [2, 6], [5, 3], [3, 2], [4, 5]]);
      const n = d * k;
      const S = Array.from({ length: k }, (_, j) => j * d);
      const e = S.find(x => S.every(y => (x * y) % n === y)) ?? null;
      return { t: 'mod', n, r: e, nada: true, p: R`Em $${Z(n)}$, o conjunto $S=${lista(S)}$ é um subanel. Ele tem unidade? Se tiver, qual?`, rot: '$1_S=$',
        dica: R`Procure $e\in S$ com $e\cdot s=s$ para todo $s\in S$. Basta testar $e\cdot${d}=${d}$ e depois conferir.`,
        exp: e === null
          ? R`Nenhum $e\in S$ satisfaz $e\cdot${d}=${d}$: ${S.map(x => R`$${x}\cdot${d}=${(x * d) % n}$`).join(', ')}. O subanel não tem unidade, embora $${Z(n)}$ tenha.`
          : R`$${e}\cdot s=s$ para todo $s\in S$ (confira: ${S.map(s => R`$${e}\cdot${s}=${(e * s) % n}$`).join(', ')}). A unidade do subanel é $${e}$, diferente da unidade $1$ de $${Z(n)}$.` };
    }
  });

  /* ------------------------------------------------------------ 2.1 divisores de zero */
  L.registrarGerador({
    id: 'divzero', titulo: 'Invertível ou divisor de zero?', cap: 2, sec: 1,
    gerar() {
      const n = sortear(COMPOSTOS);
      if (Math.random() < 0.4) {
        const D = A.divZero(n);
        return { t: 'conjmod', n, r: D, p: R`Liste os divisores de zero de $${Z(n)}$.`,
          exp: R`São os $a\neq0$ com $\operatorname{mdc}(a,${n})\gt1$: $${lista(D)}$. Os demais elementos não nulos são invertíveis.` };
      }
      const a = int(2, n - 1), g = A.mdc(a, n);
      return { t: 'escolha', fixa: true, p: R`Em $${Z(n)}$, o elemento $${a}$ é…`, op: ['invertível', 'divisor de zero'], c: g === 1 ? 0 : 1,
        exp: g === 1 ? R`$\operatorname{mdc}(${a},${n})=1$ e $${a}^{-1}=${A.inv(a, n)}$.` : R`$\operatorname{mdc}(${a},${n})=${g}$ e $${a}\cdot${n / g}=${a * n / g}=0$ em $${Z(n)}$, com $${n / g}\neq0$.` };
    }
  });

  /* ------------------------------------------------------------ 2.3 corpos Z_p[i] */
  L.registrarGerador({
    id: 'zpi', titulo: 'ℤₚ[i] é corpo?', cap: 2, sec: 3,
    gerar() {
      const p = sortear([3, 5, 7, 11, 13, 17, 19]);
      let par = null;
      for (let a = 1; a < p && !par; a++) for (let b = 1; b < p; b++) if ((a * a + b * b) % p === 0) { par = [a, b]; break; }
      return { t: 'escolha', fixa: true, p: R`O anel $${Z(p)}[i]=\{a+bi\mid a,b\in${Z(p)}\}$, com $i^2=-1$, é um corpo?`, op: ['Sim', 'Não'], c: par ? 1 : 0,
        dica: R`$(a+bi)(a-bi)=a^2+b^2$. Se existir $a+bi\neq0$ com $a^2+b^2=0$, há um produto nulo com fatores não nulos.`,
        exp: par
          ? R`Não: $${par[0]}^2+${par[1]}^2=${par[0] ** 2 + par[1] ** 2}=0$ em $${Z(p)}$, logo $(${par[0]}+${par[1]}i)(${par[0]}-${par[1]}i)=0$ com fatores não nulos. Nem domínio é.`
          : R`Sim: $a^2+b^2\neq0$ sempre que $a+bi\neq0$ (verifica-se testando os $${p}$ quadrados), e então $(a+bi)^{-1}=(a^2+b^2)^{-1}(a-bi)$. É um corpo com $${p * p}$ elementos.` };
    }
  });

  /* ------------------------------------------------------------ 2.4 característica */
  L.registrarGerador({
    id: 'car', titulo: 'Característica', cap: 2, sec: 4,
    gerar() {
      const tipo = sortear(['soma', 'soma', 'pol', 'mat', 'comZ']);
      if (tipo === 'soma') {
        const m = int(2, 12), n = int(2, 12), c = A.mmc(m, n);
        return { t: 'num', r: c, p: R`Qual é a característica de $${Z(m)}\oplus${Z(n)}$?`,
          exp: R`A unidade é $(1,1)$, e $k\cdot(1,1)=(k,k)=(0,0)$ exatamente quando $${m}\mid k$ e $${n}\mid k$. O menor $k$ é $\operatorname{mmc}(${m},${n})=${c}$.` };
      }
      if (tipo === 'pol') { const n = int(2, 15); return { t: 'num', r: n, p: R`Qual é a característica de $${Z(n)}[x]$?`, exp: R`A unidade é o polinômio constante $1$, de ordem aditiva $${n}$: $\operatorname{car}${Z(n)}[x]=${n}$.` }; }
      if (tipo === 'mat') { const n = int(2, 15); return { t: 'num', r: n, p: R`Qual é a característica de $M_2(${Z(n)})$?`, exp: R`A unidade é a matriz identidade $I$, e $kI$ é nula exatamente quando $${n}\mid k$. Logo a característica é $${n}$.` }; }
      const n = int(2, 9);
      return { t: 'num', r: 0, p: R`Qual é a característica de $${Z(n)}\oplus\mathbb{Z}$?`, exp: R`$k\cdot(1,1)=(k,k)$ nunca é $(0,0)$ para $k\geq1$, pois a segunda coordenada é o inteiro $k\neq0$. A característica é $0$.` };
    }
  });

  /* ------------------------------------------------------------ 2.5 equações, idempotentes, nilpotentes */
  L.registrarGerador({
    id: 'equacao', titulo: 'Equações do 2º grau em ℤₙ', cap: 2, sec: 5,
    gerar() {
      const n = sortear([5, 6, 7, 8, 9, 10, 11, 12, 13, 15]);
      const r1 = int(0, n - 1), r2 = int(0, n - 1);
      const b = A.mod(-(r1 + r2), n), c = A.mod(r1 * r2, n);
      const sol = A.raizes([c, b, 1], n);
      const eq = `x^2${b ? `+${b}x` : ''}${c ? `+${c}` : ''}=0`;
      return { t: 'conjmod', n, r: sol, p: R`Resolva $${eq}$ em $${Z(n)}$.`,
        dica: R`O polinômio fatora como $(x-${r1})(x-${r2})$. Mas cuidado: ${A.ehPrimo(n) ? 'aqui' : 'em $' + Z(n) + '$ nem sempre'} produto nulo obriga um fator nulo.`,
        exp: R`Testando $x=0,\dots,${n - 1}$, as soluções são $${lista(sol)}$. ${A.ehPrimo(n) ? `Como $${Z(n)}$ é corpo, $(x-${r1})(x-${r2})=0$ obriga $x=${r1}$ ou $x=${r2}$.` : (sol.length > (r1 === r2 ? 1 : 2) ? `Há mais soluções que as raízes óbvias $${r1}$ e $${r2}$ porque $${Z(n)}$ tem divisores de zero.` : `Desta vez só aparecem as raízes óbvias, mas em $${Z(n)}$ isso não é garantido.`)}` };
    }
  });

  L.registrarGerador({
    id: 'idemnil', titulo: 'Idempotentes e nilpotentes de ℤₙ', cap: 2, sec: 5,
    gerar() {
      const n = sortear([6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 27, 30]);
      if (Math.random() < 0.5) {
        const I = A.idempotentes(n);
        return { t: 'conjmod', n, r: I, p: R`Liste os idempotentes de $${Z(n)}$ (os $a$ com $a^2=a$).`,
          exp: R`Testando $a^2=a$: $${lista(I)}$. ${I.length > 2 ? `Além de $0$ e $1$ há outros porque $${n}$ tem dois fatores primos distintos.` : `Só os triviais $0$ e $1$, porque $${n}$ é potência de um único primo.`}` };
      }
      const N = A.nilpotentes(n), rad = A.primos(n).reduce((x, y) => x * y, 1);
      return { t: 'conjmod', n, r: N, p: R`Liste os nilpotentes de $${Z(n)}$ (os $a$ com $a^k=0$ para algum $k\geq1$).`,
        exp: R`$a^k$ é múltiplo de $${n}$ exatamente quando $a$ é múltiplo de todos os primos que dividem $${n}$, isto é, de $${rad}$: $${lista(N)}$.` };
    }
  });

  /* ------------------------------------------------------------ 3.2 ideais */
  L.registrarGerador({
    id: 'ideais', titulo: 'Ideais de ℤ e de ℤₙ', cap: 3, sec: 2,
    gerar() {
      const tipo = sortear(['somaZ', 'intZ', 'gerZn', 'contaZn']);
      if (tipo === 'somaZ' || tipo === 'intZ') {
        const a = int(2, 9) * int(1, 4), b = int(2, 9) * int(1, 4);
        if (a === b) return this.gerar();
        if (tipo === 'somaZ') return { t: 'num', r: A.mdc(a, b), p: R`Em $\mathbb{Z}$, $\langle ${a}\rangle+\langle ${b}\rangle=\langle d\rangle$ com $d\gt0$. Quem é $d$?`, rot: '$d=$',
          exp: R`$\langle ${a}\rangle+\langle ${b}\rangle=\{${a}u+${b}v\}$ é o conjunto das combinações inteiras, que são os múltiplos de $\operatorname{mdc}(${a},${b})=${A.mdc(a, b)}$.` };
        return { t: 'num', r: A.mmc(a, b), p: R`Em $\mathbb{Z}$, $\langle ${a}\rangle\cap\langle ${b}\rangle=\langle m\rangle$ com $m\gt0$. Quem é $m$?`, rot: '$m=$',
          exp: R`Os múltiplos comuns de $${a}$ e $${b}$ são os múltiplos de $\operatorname{mmc}(${a},${b})=${A.mmc(a, b)}$.` };
      }
      const n = sortear([8, 10, 12, 15, 16, 18, 20, 24, 30, 36]);
      if (tipo === 'gerZn') {
        let a = int(2, n - 1);
        while (A.mdc(a, n) === a) a = int(2, n - 1);
        const d = A.mdc(a, n);
        return { t: 'num', r: d, p: R`Em $${Z(n)}$, o ideal $\langle ${a}\rangle$ é igual a $\langle d\rangle$ para um único divisor positivo $d$ de $${n}$. Quem é $d$?`, rot: '$d=$',
          dica: R`Os múltiplos de $${a}$ em $${Z(n)}$ são os múltiplos de $\operatorname{mdc}(${a},${n})$.`,
          exp: R`$d=\operatorname{mdc}(${a},${n})=${d}$: o ideal $\langle ${a}\rangle$ tem $${n / d}$ elementos, $\{0,${d},${2 * d},\dots\}$.` };
      }
      const D = A.divisores(n);
      return { t: 'num', r: D.length, p: R`Quantos ideais tem o anel $${Z(n)}$?`,
        exp: R`Um para cada divisor positivo $d$ de $${n}$ (o ideal $\langle d\rangle$): $${D.join(',')}$. São $${D.length}$ ideais, contando $\{0\}=\langle ${n}\rangle$ e $${Z(n)}=\langle1\rangle$.` };
    }
  });

  /* ------------------------------------------------------------ 3.4 calcular no quociente */
  const IRRED = { 2: [[1, 1, 1], [1, 1, 0, 1], [1, 0, 1, 1]], 3: [[1, 0, 1], [2, 1, 1], [2, 2, 1]], 5: [[2, 0, 1], [3, 0, 1], [1, 1, 1]] };
  const REDUT = { 2: [[1, 0, 1], [0, 1, 1]], 3: [[2, 0, 1], [0, 1, 1]], 5: [[1, 0, 1], [4, 0, 1]] };
  L.registrarGerador({
    id: 'quocpoli', titulo: 'Produtos em ℤₚ[x]/⟨f⟩ e em ℝ[x]/⟨x²+1⟩', cap: 3, sec: 4,
    gerar() {
      if (Math.random() < 0.3) {
        const u = [int(-4, 4), int(1, 4)], w = [int(-4, 4), int(-3, 3) || 1];
        const r = P.resto(P.mul(u, w), [1, 0, 1]);
        return { t: 'poli', mod: 0, f: [1, 0, 1], r, p: R`Em $\mathbb{R}[x]/\langle x^2+1\rangle$, escreva o produto $(${P.tex(u)})(${P.tex(w)})+\langle x^2+1\rangle$ na forma $ax+b+\langle x^2+1\rangle$. (Responda só $ax+b$.)`,
          exp: R`$(${P.tex(u)})(${P.tex(w)})=${P.tex(P.mul(u, w))}$ e, como $x^2=-1$ no quociente, isso vale $${P.tex(r)}$.` };
      }
      const p = sortear([2, 3, 5]);
      const f = sortear(Math.random() < 0.7 ? IRRED[p] : REDUT[p]);
      const d = f.length - 1;
      const els = P.todos(p, d).filter(x => P.grau(x) >= 1);
      const u = sortear(els), w = sortear(els);
      const prod = P.mul(u, w, p), r = P.resto(prod, f, p);
      const regra = P.coefs(f.slice(0, d).map(c => -c), p);
      return { t: 'poli', mod: p, f, r, p: R`Em $${Z(p)}[x]/\langle ${P.tex(f)}\rangle$, calcule $(${P.tex(u)})(${P.tex(w)})$, escrevendo o resultado com grau menor que $${d}$ e coeficientes em $${Z(p)}$.`,
        dica: R`No quociente, $${P.tex(f)}=0$, ou seja, $x^{${d}}=${P.tex(regra)}$.`,
        exp: R`Em $${Z(p)}[x]$: $(${P.tex(u)})(${P.tex(w)})=${P.tex(prod)}$. Trocando $x^{${d}}$ por $${P.tex(regra)}$ (quantas vezes for preciso) e reduzindo os coeficientes módulo $${p}$, sobra $${P.tex(r)}$.` };
    }
  });

  L.registrarGerador({
    id: 'quocgauss', titulo: 'O quociente ℤ[i]/⟨a+bi⟩', cap: 3, sec: 4,
    gerar() {
      let a, b;
      do { a = int(1, 5); b = sortear([-3, -2, -1, 1, 2, 3]); } while (A.mdc(a, b) !== 1);
      const N = a * a + b * b, al = G.tex([a, b]);
      if (Math.random() < 0.4) {
        return { t: 'num', r: N, p: R`Quantos elementos tem o anel quociente $\mathbb{Z}[i]/\langle ${al}\rangle$?`,
          exp: R`No quociente $${al}=0$, e então também $(${al})(${G.tex([a, -b])})=${N}=0$. Como $\operatorname{mdc}(${a},${b})=1$, as classes de $0,1,\dots,${N - 1}$ são todas distintas e esgotam o anel: são $${a}^2+${b < 0 ? `(${b})` : b}^2=${N}$ elementos. (Veja o desenho no Laboratório.)` };
      }
      const t = A.mod(-a * A.inv(b, N), N);
      return { t: 'mod', n: N, r: t, p: R`No anel $\mathbb{Z}[i]/\langle ${al}\rangle$, que tem $${N}$ elementos e é representado por $0,1,\dots,${N - 1}$, a classe de $i$ é igual à classe de qual inteiro $t\in\{0,\dots,${N - 1}\}$?`, rot: '$t=$',
        dica: R`No quociente vale $${a}+${b < 0 ? `(${b})` : b}i=0$ e também $${N}=0$.`,
        exp: R`De $${al}=0$ vem $${b}i=${-a}$. Multiplicando pelo inverso de $${b}$ módulo $${N}$, que é $${A.inv(b, N)}$: $i=${-a}\cdot${A.inv(b, N)}=${t}$ (módulo $${N}$). Confira: $${t}-i$ é múltiplo de $${al}$.` };
    }
  });

  /* ------------------------------------------------------------ 3.5 primos e maximais */
  L.registrarGerador({
    id: 'maximal', titulo: 'Ideais primos e maximais', cap: 3, sec: 5,
    gerar() {
      if (Math.random() < 0.5) {
        const n = sortear([12, 18, 20, 24, 30, 36, 45, 50, 60, 42]);
        const ps = A.primos(n);
        return { t: 'conjmod', p: R`Os ideais maximais de $${Z(n)}$ são da forma $\langle d\rangle$ com $d$ divisor positivo de $${n}$. Liste esses $d$.`, r: ps,
          exp: R`$${Z(n)}/\langle d\rangle$ é (isomorfo a) $${Z('d')}$, que é corpo exatamente quando $d$ é primo. Os primos que dividem $${n}$: $${lista(ps)}$.` };
      }
      const p = sortear([2, 3, 5]);
      const irr = Math.random() < 0.5;
      const f = sortear(irr ? IRRED[p].filter(x => x.length === 3) : REDUT[p]);
      const rz = A.raizes(f, p);
      return { t: 'escolha', fixa: true, p: R`Em $${Z(p)}[x]$, o ideal $\langle ${P.tex(f)}\rangle$ é maximal?`, op: ['Sim', 'Não'], c: rz.length ? 1 : 0,
        dica: R`Um polinômio de grau $2$ que não tem raízes em $${Z(p)}$ não se fatora; teste $x=0,\dots,${p - 1}$.`,
        exp: rz.length
          ? R`Não: $${rz[0]}$ é raiz, então $${P.tex(f)}$ tem o fator $${P.tex(P.coefs([-rz[0], 1], p))}$ e o quociente tem divisores de zero. O ideal não é nem primo.`
          : R`Sim: testando $x=0,\dots,${p - 1}$, não há raízes, e o quociente $${Z(p)}[x]/\langle ${P.tex(f)}\rangle$ é um corpo com $${p * p}$ elementos (confira no Laboratório).` };
    }
  });

  /* ------------------------------------------------------------ 4.1 é homomorfismo? */
  L.registrarGerador({
    id: 'ehhom', titulo: 'x ↦ ax é homomorfismo?', cap: 4, sec: 1,
    gerar() {
      const m = sortear([2, 3, 4, 5, 6, 8, 10, 12]), n = sortear([4, 6, 8, 10, 12, 15, 20, 30]);
      let a = int(1, n - 1);
      if (Math.random() < 0.4) { const H = A.homZmZn(m, n).filter(x => x); if (H.length) a = sortear(H); }
      const soma = (m * a) % n === 0, prod = (a * a) % n === a;
      const c = soma && prod ? 0 : !soma ? 1 : 2;
      return { t: 'escolha', fixa: true, p: R`A aplicação $\varphi\colon${Z(m)}\to${Z(n)}$, $\varphi(x)=${a}x$, é um homomorfismo de anéis?`,
        op: ['Sim', 'Não: nem preserva a soma (não está bem definida)', 'Preserva a soma, mas não o produto'], c,
        dica: R`Soma: como $${m}=0$ em $${Z(m)}$, é preciso que $${m}\cdot${a}=0$ em $${Z(n)}$. Produto: $\varphi(1\cdot1)=\varphi(1)^2$ exige $${a}^2=${a}$.`,
        exp: R`$${m}\cdot${a}=${m * a}${soma ? '=0' : `\\neq0`}$ em $${Z(n)}$ ${soma ? '(soma ok)' : `(por exemplo, $\\varphi(${m - 1}+1)=\\varphi(0)=0$, mas $\\varphi(${m - 1})+\\varphi(1)=${(a * m) % n}$)`}; $${a}^2=${(a * a) % n}${prod ? '=' : '\\neq'}${a}$ em $${Z(n)}$ ${prod ? '(produto ok)' : '(produto falha)'}.` };
    }
  });

  /* ------------------------------------------------------------ 4.2 núcleo */
  L.registrarGerador({
    id: 'nucleo', titulo: 'Núcleo de um homomorfismo', cap: 4, sec: 2,
    gerar() {
      if (Math.random() < 0.5) {
        const a = int(2, 9), b = int(2, 9), c = A.mmc(a, b);
        return { t: 'num', r: c, p: R`Seja $\varphi\colon\mathbb{Z}\to${Z(a)}\oplus${Z(b)}$, $\varphi(x)=(x\bmod ${a},\ x\bmod ${b})$. Então $\operatorname{Ker}\varphi=\langle k\rangle$ com $k\gt0$. Quem é $k$?`, rot: '$k=$',
          exp: R`$\varphi(x)=(0,0)$ exatamente quando $${a}\mid x$ e $${b}\mid x$, isto é, quando $\operatorname{mmc}(${a},${b})=${c}$ divide $x$.` };
      }
      let m, n, H;
      do { m = sortear([4, 6, 8, 10, 12, 20]); n = sortear([6, 10, 12, 15, 20, 30]); H = A.homZmZn(m, n).filter(x => x); } while (!H.length);
      const a = sortear(H);
      const ker = Array.from({ length: m }, (_, x) => x).filter(x => (a * x) % n === 0);
      return { t: 'conjmod', n: m, r: ker, p: R`O homomorfismo $\varphi\colon${Z(m)}\to${Z(n)}$, $\varphi(x)=${a}x$, tem qual núcleo? Liste os elementos de $\operatorname{Ker}\varphi$.`,
        exp: R`Procuramos $x\in${Z(m)}$ com $${a}x\equiv0\pmod{${n}}$: $${lista(ker)}$. ${ker.length > 1 ? `É o ideal $\\langle ${ker[1]}\\rangle$ de $${Z(m)}$` : 'Núcleo trivial: $\\varphi$ é injetora'}.` };
    }
  });

  /* ------------------------------------------------------------ 4.4 contar homomorfismos */
  L.registrarGerador({
    id: 'contahom', titulo: 'Quantos homomorfismos ℤₘ → ℤₙ?', cap: 4, sec: 4,
    gerar() {
      const m = sortear([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), n = sortear([2, 4, 6, 10, 12, 15, 20, 30]);
      const H = A.homZmZn(m, n);
      if (Math.random() < 0.5) return { t: 'num', r: H.length, p: R`Quantos homomorfismos de anéis existem de $${Z(m)}$ em $${Z(n)}$? (Conte também o nulo.)`,
        dica: R`$\varphi(x)=ax$ com $a=\varphi(1)$; exige-se $${m}a=0$ e $a^2=a$ em $${Z(n)}$.`,
        exp: R`Idempotentes de $${Z(n)}$: $${lista(A.idempotentes(n))}$. Destes, os que satisfazem $${m}a\equiv0\pmod{${n}}$: $${lista(H)}$. São $${H.length}$ homomorfismos.` };
      return { t: 'conjmod', n, r: H, p: R`Para quais $a\in${Z(n)}$ a aplicação $x\mapsto ax$ é um homomorfismo de anéis de $${Z(m)}$ em $${Z(n)}$? Liste-os.`,
        exp: R`Precisamos de $a^2=a$ (idempotentes: $${lista(A.idempotentes(n))}$) e de $${m}a\equiv0\pmod{${n}}$. Sobram $${lista(H)}$.` };
    }
  });

  /* ------------------------------------------------------------ 4.5 Z_mn e Z_m ⊕ Z_n */
  L.registrarGerador({
    id: 'crt', titulo: 'ℤₘₙ e ℤₘ ⊕ ℤₙ', cap: 4, sec: 5,
    gerar() {
      if (Math.random() < 0.45) {
        const [m, n] = sortear([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [2, 4], [3, 6], [2, 6], [4, 6], [3, 9], [5, 7]]);
        const g = A.mdc(m, n);
        return { t: 'escolha', fixa: true, p: R`Os anéis $${Z(m * n)}$ e $${Z(m)}\oplus${Z(n)}$ são isomorfos?`, op: ['Sim', 'Não'], c: g === 1 ? 0 : 1,
          exp: g === 1
            ? R`Sim: $\operatorname{mdc}(${m},${n})=1$, e $x\mapsto(x\bmod ${m},x\bmod ${n})$ é um isomorfismo (núcleo $\langle ${m * n}\rangle$ e mesma quantidade de elementos).`
            : R`Não: a característica de $${Z(m)}\oplus${Z(n)}$ é $\operatorname{mmc}(${m},${n})=${A.mmc(m, n)}$, enquanto a de $${Z(m * n)}$ é $${m * n}$; isomorfismos preservam a característica.` };
      }
      const [m, n] = sortear([[3, 4], [3, 5], [4, 5], [2, 7], [5, 6], [4, 7], [3, 7], [5, 7]]);
      const u = int(0, m - 1), v = int(0, n - 1);
      const x = Array.from({ length: m * n }, (_, k) => k).find(k => k % m === u && k % n === v);
      return { t: 'mod', n: m * n, r: x, p: R`Pelo isomorfismo $${Z(m * n)}\to${Z(m)}\oplus${Z(n)}$, $x\mapsto(x\bmod ${m},\ x\bmod ${n})$, que elemento $x\in${Z(m * n)}$ corresponde a $(${u},${v})$?`, rot: '$x=$',
        dica: R`Liste os $x\equiv ${v}\pmod{${n}}$ entre $0$ e $${m * n - 1}$ e veja qual deixa resto $${u}$ na divisão por $${m}$.`,
        exp: R`Os candidatos $x\equiv ${v}\pmod{${n}}$ são $${Array.from({ length: m }, (_, k) => v + k * n).join(',')}$; destes, $${x}\equiv ${u}\pmod{${m}}$. Logo $x=${x}$.` };
    }
  });
})();
