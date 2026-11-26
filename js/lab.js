/* Laboratório: pequenos experimentos interativos com anéis.
   Cada experimento é uma função (contêiner, opções) registrada em L.lab.w.
   Usado na tela "Lab" e dentro das seções (bloco { t: 'lab', w: 'zn', n: 12 }). */
'use strict';

L.lab = {
  montar(w, el, op = {}) {
    const f = L.lab.w[w];
    if (!f) { el.textContent = `Experimento desconhecido: ${w}`; return; }
    f(el, op);
  },

  /* ---------- utilidades ---------- */
  SOBRE: { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' },
  /** Polinômio em texto com expoentes sobrescritos (rápido para tábuas grandes). */
  uni(a, v = 'x', ordem = 'desc') {
    return L.poli.tex(a, v, ordem).replace(/\^\{(\d+)\}/g, (_, d) => [...d].map(c => L.lab.SOBRE[c]).join('')).replace(/ /g, '');
  },
  num(el, sel) { return Number(el.querySelector(sel).value); },
  /** Campo numérico com botões − e +. */
  passo(id, rot, val, min, max) {
    return `<label class="lab-passo"><span>${rot}</span><button type="button" class="btn mini" data-d="-1" data-alvo="${id}">−</button>
      <input type="number" id="${id}" value="${val}" min="${min}" max="${max}" inputmode="numeric"><button type="button" class="btn mini" data-d="1" data-alvo="${id}">+</button></label>`;
  },
  ligarPassos(el, aoMudar) {
    el.addEventListener('click', e => {
      const b = e.target.closest('button[data-alvo]');
      if (!b) return;
      const inp = el.querySelector('#' + b.dataset.alvo);
      const v = Math.min(Number(inp.max), Math.max(Number(inp.min), Number(inp.value) + Number(b.dataset.d)));
      inp.value = v;
      aoMudar();
    });
    el.addEventListener('change', e => { if (e.target.matches('input, select')) aoMudar(); });
  },
  uid: (() => { let k = 0; return p => `${p}${++k}`; })(),
  lista(xs) { return xs.length ? xs.join(', ') : '—'; },
  CORES: ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#9a6324', '#469990', '#808000', '#000075', '#bfef45', '#fabed4', '#dcbeff', '#aaffc3', '#ffd8b1', '#a9a9a9']
};

L.lab.w = {};

/* ============================================================
   Z_n: tábua, invertíveis, divisores de zero, idempotentes, nilpotentes, ideais
   ============================================================ */
L.lab.w.zn = function (el, op) {
  const idN = L.lab.uid('n'), idOp = L.lab.uid('op');
  el.innerHTML = `<div class="lab-ctrl">${L.lab.passo(idN, 'n =', op.n || 12, 2, 30)}
      <label class="lab-passo"><span>tábua</span><select id="${idOp}"><option value="mul">multiplicação</option><option value="soma"${op.op === 'soma' ? ' selected' : ''}>adição</option></select></label></div>
    <div class="lab-saida"></div>`;
  const saida = el.querySelector('.lab-saida');
  let marcado = null;

  const desenhar = () => {
    const n = L.lab.num(el, '#' + idN), mul = el.querySelector('#' + idOp).value === 'mul';
    const A = L.ar;
    const U = A.U(n), DZ = A.divZero(n), ID = A.idempotentes(n), NI = A.nilpotentes(n);
    const tipo = a => a === 0 ? 'zero' : U.includes(a) ? 'inv' : 'dz';
    const cel = (a, b) => (mul ? a * b : a + b) % n;
    const linhas = Array.from({ length: n }, (_, a) => `<tr data-a="${a}"${marcado === a ? ' class="marcada"' : ''}><th class="${tipo(a)}">${a}</th>${Array.from({ length: n }, (_, b) => {
      const v = cel(a, b);
      const c = mul ? (v === 0 ? 'v0' : v === 1 ? 'v1' : '') : (v === 0 ? 'v0' : '');
      return `<td class="${c}">${v}</td>`;
    }).join('')}</tr>`).join('');
    const ideais = A.divisores(n).map(d => {
      const els = Array.from({ length: n / d }, (_, k) => k * d);
      const rot = d === n ? '\\{0\\}' : d === 1 ? `\\mathbb{Z}_{${n}}` : `\\langle ${d}\\rangle`;
      const max = A.ehPrimo(d);
      return `<li>$${d === n || d === 1 ? rot : `${rot}=\\{${els.length > 8 ? els.slice(0, 6).join(',') + ',\\dots' : els.join(',')}\\}`}$ <span class="sub">(${els.length} elem.)</span>${max ? ' <span class="selo st-ok">maximal e primo</span>' : ''}</li>`;
    }).join('');
    let info = '';
    if (marcado !== null && marcado < n) {
      const a = marcado, g = A.mdc(a, n);
      if (a === 0) info = `$0$ não é invertível e, por definição, não é divisor de zero (divisores de zero são não nulos).`;
      else if (g === 1) info = `$\\operatorname{mdc}(${a},${n})=1$: a linha de $${a}$ passa por <b>todos</b> os elementos e tem um $1$ na coluna $${A.inv(a, n)}$. Logo $${a}^{-1}=${A.inv(a, n)}$ em $\\mathbb{Z}_{${n}}$.`;
      else info = `$\\operatorname{mdc}(${a},${n})=${g}$: a linha de $${a}$ só tem múltiplos de $${g}$ e tem um $0$ na coluna $${n / g}$, pois $${a}\\cdot${n / g}=${a * (n / g)}\\equiv 0$. Logo $${a}$ é divisor de zero (e não é invertível).`;
    }
    saida.innerHTML = `
      ${mul ? `<div class="lab-legenda"><span class="ch inv">invertível</span><span class="ch dz">divisor de zero</span><span class="ch zero">zero</span> · casas: <span class="ch v1">1</span> <span class="ch v0">0</span></div>` : ''}
      <div class="rolagem"><table class="lab-tab"><tr><th class="canto">${mul ? '·' : '+'}</th>${Array.from({ length: n }, (_, b) => `<th>${b}</th>`).join('')}</tr>${linhas}</table></div>
      <p class="sub">Toque num elemento da primeira coluna para destacá-lo.</p>
      ${info ? `<div class="lab-info">${info}</div>` : ''}
      <ul class="lab-fatos">
        <li><b>Invertíveis</b> $U(${n})$ (${U.length}): ${U.map(a => `$${a}^{-1}=${A.inv(a, n)}$`).join(', ') || '—'}</li>
        <li><b>Divisores de zero</b> (${DZ.length}): $${L.lab.lista(DZ)}$</li>
        <li><b>Idempotentes</b> ($a^2=a$): $${L.lab.lista(ID)}$</li>
        <li><b>Nilpotentes</b> ($a^k=0$): $${L.lab.lista(NI)}$</li>
        <li><b>Característica</b>: $${n}$ · <b>$\\mathbb{Z}_{${n}}$ é corpo?</b> ${A.ehPrimo(n) ? `sim ($${n}$ é primo)` : `não ($${n}$ não é primo)`}</li>
        <li><b>Ideais</b> (um para cada divisor de $${n}$):<ul>${ideais}</ul></li>
      </ul>`;
  };
  saida.addEventListener('click', e => {
    const tr = e.target.closest('tr[data-a]');
    if (!tr) return;
    const a = Number(tr.dataset.a);
    marcado = marcado === a ? null : a;
    desenhar();
  });
  L.lab.ligarPassos(el, () => { marcado = null; desenhar(); });
  desenhar();
};

/* ============================================================
   Z_p[x]/<f>
   ============================================================ */
L.lab.w.quoc = function (el, op) {
  const idP = L.lab.uid('p'), idF = L.lab.uid('f');
  const presets = ['x^2+x+1', 'x^2+1', 'x^2+2', 'x^3+x+1', 'x^2'];
  el.innerHTML = `<div class="lab-ctrl">
      <label class="lab-passo"><span>$p=$</span><select id="${idP}">${[2, 3, 5, 7].map(p => `<option${p === (op.p || 2) ? ' selected' : ''}>${p}</option>`).join('')}</select></label>
      <label class="lab-passo"><span>$f(x)=$</span><input type="text" id="${idF}" class="lab-f" value="${op.f || 'x^2+x+1'}" autocomplete="off" autocapitalize="off" spellcheck="false"></label></div>
    <div class="lab-presets">${presets.map(f => `<button type="button" class="btn mini" data-f="${f}">${L.lab.uni(L.poli.ler(f))}</button>`).join('')}</div>
    <div class="lab-saida"></div>`;
  const saida = el.querySelector('.lab-saida');
  const desenhar = () => {
    const p = Number(el.querySelector('#' + idP).value);
    let f;
    try { f = L.poli.coefs(L.poli.ler(el.querySelector('#' + idF).value), p); }
    catch (e) { saida.innerHTML = `<div class="aviso-leitura">${L.util.esc(e.message)}</div>`; return; }
    const d = f.length - 1;
    if (d < 1) { saida.innerHTML = `<div class="aviso-leitura">Escolha um polinômio de grau pelo menos 1 (os coeficientes são lidos módulo ${p}).</div>`; return; }
    if (p ** d > 125) { saida.innerHTML = `<div class="aviso-leitura">São ${p ** d} classes: grande demais para mostrar aqui. Tente um grau menor.</div>`; return; }
    const P = L.poli;
    const els = P.todos(p, d);
    const red = a => P.resto(a, f, p);
    const idx = a => els.findIndex(b => P.igual(b, a));
    const prod = els.map(a => els.map(b => red(P.mul(a, b, p))));
    const nz = els.filter(a => a.length);
    const inv = nz.filter(a => prod[idx(a)].some(c => P.igual(c, [1])));
    const dz = nz.filter(a => prod[idx(a)].some((c, j) => !c.length && els[j].length));
    const raizes = L.ar.raizes(f, p);
    const corpo = inv.length === nz.length;
    const lider = f[d], invL = L.ar.inv(lider, p);
    const regra = P.coefs(f.slice(0, d).map(c => -c * invL), p);
    const mostrarTab = els.length <= 49;
    const tab = mostrarTab ? `<div class="rolagem"><table class="lab-tab poli"><tr><th class="canto">·</th>${nz.map(b => `<th>${L.lab.uni(b)}</th>`).join('')}</tr>
      ${nz.map(a => `<tr><th class="${inv.some(x => P.igual(x, a)) ? 'inv' : 'dz'}">${L.lab.uni(a)}</th>${nz.map(b => { const c = prod[idx(a)][idx(b)]; return `<td class="${!c.length ? 'v0' : P.igual(c, [1]) ? 'v1' : ''}">${L.lab.uni(c)}</td>`; }).join('')}</tr>`).join('')}</table></div>`
      : '<p class="sub">(A tábua tem mais de 49 elementos e não é mostrada.)</p>';
    saida.innerHTML = `
      <div class="lab-info">Em $\\mathbb{Z}_{${p}}[x]/\\langle ${P.tex(f)}\\rangle$ vale $${d === 1 ? 'x' : `x^{${d}}`}=${P.tex(regra)}$. Toda classe tem um único representante de grau menor que $${d}$: são $${p}^{${d}}=${els.length}$ elementos.</div>
      ${tab}
      <div class="lab-legenda"><span class="ch inv">invertível</span><span class="ch dz">divisor de zero</span> · casas: <span class="ch v1">1</span> <span class="ch v0">0</span> (o $0$ foi omitido da tábua)</div>
      <ul class="lab-fatos">
        <li><b>Raízes de $f$ em $\\mathbb{Z}_{${p}}$:</b> $${raizes.length ? raizes.join(',\\ ') : '\\text{nenhuma}'}$</li>
        <li><b>Invertíveis</b> (${inv.length}): ${inv.map(a => L.lab.uni(a)).join(', ') || '—'}</li>
        <li><b>Divisores de zero</b> (${dz.length}): ${dz.map(a => L.lab.uni(a)).join(', ') || '—'}</li>
        <li><b>É corpo?</b> ${corpo ? `<span class="selo st-ok">sim</span> — um corpo com ${els.length} elementos; o ideal $\\langle ${P.tex(f)}\\rangle$ é maximal.` : `<span class="selo">não</span> — há divisores de zero; o ideal $\\langle ${P.tex(f)}\\rangle$ não é primo, logo não é maximal.`}</li>
        ${d <= 3 ? `<li class="sub">Para grau 2 ou 3: o quociente é corpo exatamente quando $f$ não tem raízes em $\\mathbb{Z}_{${p}}$ ${raizes.length === 0 === corpo ? '(confere aqui)' : ''}.</li>` : ''}
      </ul>`;
  };
  el.querySelector('.lab-presets').addEventListener('click', e => {
    const b = e.target.closest('button[data-f]');
    if (!b) return;
    el.querySelector('#' + idF).value = b.dataset.f;
    desenhar();
  });
  el.querySelector('#' + idF).addEventListener('input', desenhar);
  L.lab.ligarPassos(el, desenhar);
  desenhar();
};

/* ============================================================
   Z[i]/<a + bi>: o reticulado colorido pelas classes
   ============================================================ */
L.lab.w.gauss = function (el, op) {
  const idA = L.lab.uid('a'), idB = L.lab.uid('b');
  el.innerHTML = `<div class="lab-ctrl">${L.lab.passo(idA, '$a=$', op.a ?? 2, -4, 4)}${L.lab.passo(idB, '$b=$', op.b ?? 1, -4, 4)}</div><div class="lab-saida"></div>`;
  const saida = el.querySelector('.lab-saida');
  const desenhar = () => {
    const a = L.lab.num(el, '#' + idA), b = L.lab.num(el, '#' + idB);
    if (a === 0 && b === 0) { saida.innerHTML = '<div class="aviso-leitura">Com $a=b=0$ o ideal é $\\{0\\}$ e cada classe tem um só elemento. Escolha outro gerador.</div>'; return; }
    const G = L.gauss, B = G.base(a, b), N = a * a + b * b;
    const R = 6, esc = 22, tam = (2 * R + 1) * esc;
    const cor = k => N <= L.lab.CORES.length ? L.lab.CORES[k] : `hsl(${Math.round(360 * k / N)} 70% 50%)`;
    let pts = '';
    for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) {
      const k = G.indice(x, y, B), cx = (x + R + 0.5) * esc, cy = (R - y + 0.5) * esc;
      pts += k === 0
        ? `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${cor(0)}" stroke="currentColor" stroke-width="2"/>`
        : `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${cor(k)}"/>`;
    }
    const m = (R + 0.5) * esc;
    const reps = [];
    for (let y = 0; y < B.p; y++) for (let x = 0; x < B.r; x++) reps.push([x, y]);
    const gtex = G.tex([a, b]);
    // tábua de multiplicação das classes (se pequena)
    let tab = '', corpo = null;
    if (N <= 13) {
      const prod = reps.map(u => reps.map(v => G.indice(...G.mul(u, v), B)));
      const nz = reps.map((_, k) => k).filter(k => k);
      corpo = nz.every(k => prod[k].some(c => c === G.indice(1, 0, B)));
      tab = `<div class="rolagem"><table class="lab-tab"><tr><th class="canto">·</th>${reps.map(r => `<th>${G.tex(r).replace(/ /g, '')}</th>`).join('')}</tr>
        ${reps.map((u, i) => `<tr><th style="color:${cor(i)}">${G.tex(u).replace(/ /g, '')}</th>${reps.map((_, j) => `<td style="color:${cor(prod[i][j])}">${G.tex(reps[prod[i][j]]).replace(/ /g, '')}</td>`).join('')}</tr>`).join('')}</table></div>`;
    }
    saida.innerHTML = `
      <svg class="lab-gauss" viewBox="0 0 ${tam} ${tam}" role="img" aria-label="Reticulado dos inteiros gaussianos colorido pelas classes">
        <line x1="0" y1="${m}" x2="${tam}" y2="${m}" class="eixo"/><line x1="${m}" y1="0" x2="${m}" y2="${tam}" class="eixo"/>
        ${pts}</svg>
      <div class="lab-info">Os pontos com contorno formam o ideal $\\langle ${gtex}\\rangle$ (os múltiplos de $${gtex}$). Cada cor é uma classe $z+\\langle ${gtex}\\rangle$: são $${a}^2+${b < 0 ? `(${b})` : b}^2=${N}$ classes.</div>
      <ul class="lab-fatos"><li><b>Representantes:</b> ${reps.map((r, k) => `<span style="color:${cor(k)};font-weight:700">${G.tex(r).replace(/ /g, '')}</span>`).join(', ')}</li>
      ${corpo === null ? '' : `<li><b>É corpo?</b> ${corpo ? '<span class="selo st-ok">sim</span>' : '<span class="selo">não</span> (algum elemento não nulo não tem inverso na tábua)'}</li>`}</ul>
      ${tab}`;
  };
  L.lab.ligarPassos(el, desenhar);
  desenhar();
};

/* ============================================================
   Homomorfismos de anéis Z_m → Z_n
   ============================================================ */
L.lab.w.hom = function (el, op) {
  const idM = L.lab.uid('m'), idN = L.lab.uid('n');
  el.innerHTML = `<div class="lab-ctrl">${L.lab.passo(idM, '$m=$', op.m || 6, 1, 40)}${L.lab.passo(idN, '$n=$', op.n || 10, 1, 40)}</div><div class="lab-saida"></div>`;
  const saida = el.querySelector('.lab-saida');
  const desenhar = () => {
    const m = L.lab.num(el, '#' + idM), n = L.lab.num(el, '#' + idN), A = L.ar;
    const linhas = Array.from({ length: n }, (_, a) => {
      const soma = (m * a) % n === 0, idem = (a * a) % n === a;
      return { a, soma, idem, ok: soma && idem };
    });
    const homs = linhas.filter(l => l.ok);
    const desc = homs.map(({ a }) => {
      const ker = Array.from({ length: m }, (_, x) => x).filter(x => (a * x) % n === 0);
      const im = [...new Set(Array.from({ length: m }, (_, x) => (a * x) % n))].sort((u, v) => u - v);
      return `<li>$\\varphi(x)=${a}x$: $\\operatorname{Ker}\\varphi=${ker.length === m ? `\\mathbb{Z}_{${m}}` : ker.length === 1 ? '\\{0\\}' : `\\langle ${ker[1]}\\rangle`}$, imagem $\\{${im.length > 10 ? im.slice(0, 8).join(',') + ',\\dots' : im.join(',')}\\}$${a === 1 % n && m === n ? ' (a identidade)' : ''}${a === 0 ? ' (o homomorfismo nulo)' : ''}</li>`;
    }).join('');
    saida.innerHTML = `
      <div class="lab-info">Um homomorfismo $\\varphi\\colon\\mathbb{Z}_{${m}}\\to\\mathbb{Z}_{${n}}$ fica determinado por $a=\\varphi(1)$, pois $\\varphi(x)=x\\cdot a$. Para que $x\\mapsto ax$ funcione, é preciso (1) $${m}a\\equiv0 \\pmod{${n}}$, para preservar a soma (porque $${m}=0$ em $\\mathbb{Z}_{${m}}$), e (2) $a^2=a$, para preservar o produto.</div>
      <div class="rolagem"><table class="tab lab-hom"><tr><th>$a$</th>${linhas.map(l => `<th>${l.a}</th>`).join('')}</tr>
        <tr><th>(1)</th>${linhas.map(l => `<td class="${l.soma ? 'sim' : 'nao'}">${l.soma ? '✓' : '✗'}</td>`).join('')}</tr>
        <tr><th>(2)</th>${linhas.map(l => `<td class="${l.idem ? 'sim' : 'nao'}">${l.idem ? '✓' : '✗'}</td>`).join('')}</tr></table></div>
      <p><b>${homs.length} homomorfismo${homs.length === 1 ? '' : 's'}</b> de $\\mathbb{Z}_{${m}}$ em $\\mathbb{Z}_{${n}}$:</p><ul class="lab-fatos">${desc}</ul>
      ${A.mdc(m, n) === 1 ? `<p class="sub">Como $\\operatorname{mdc}(${m},${n})=1$, a condição (1) obriga $a=0$: só existe o homomorfismo nulo.</p>` : ''}`;
  };
  L.lab.ligarPassos(el, desenhar);
  desenhar();
};

/* ============================================================
   TELA DO LABORATÓRIO
   ============================================================ */
L.lab.experimentos = [
  ['zn', R`$\mathbb{Z}_n$`, R`Tábuas de $\mathbb{Z}_n$, com invertíveis, divisores de zero, idempotentes, nilpotentes e ideais.`],
  ['quoc', R`$\mathbb{Z}_p[x]/\langle f\rangle$`, R`O anel quociente por um polinômio: elementos, tábua e quando ele é corpo.`],
  ['gauss', R`$\mathbb{Z}[i]/\langle \alpha\rangle$`, R`O quociente dos inteiros gaussianos visto no plano: cada cor é uma classe.`],
  ['hom', R`$\mathbb{Z}_m\to\mathbb{Z}_n$`, R`Todos os homomorfismos de anéis entre dois $\mathbb{Z}_n$, com núcleo e imagem.`]
];
