/* Capítulo 4 — Homomorfismos de anéis: definição, núcleo, 1º teorema do isomorfismo,
   homomorfismos entre Z_n, isomorfismos e característica, corpo de frações.
   Notação das listas: φ: R → S (com \colon), Ker φ, φ(R) = imagem, R ≅ S.
   Homomorfismo NÃO precisa levar a unidade na unidade. Use R`...`. */
(function () {
  L.registrarCapitulo({
    num: 4,
    titulo: 'Homomorfismos de anéis',
    subtitulo: 'Aplicações que respeitam as duas operações: núcleo, o primeiro teorema do isomorfismo, quando dois anéis são “o mesmo” e o corpo de frações.',

    secoes: [
      /* =============================================================== 4.1 */
      {
        id: 1,
        titulo: 'Homomorfismos de anéis',
        resumo: [
          R`$\varphi\colon R\to S$ é <b>homomorfismo de anéis</b> se $\varphi(a+b)=\varphi(a)+\varphi(b)$ e $\varphi(ab)=\varphi(a)\varphi(b)$ para todos $a,b$.`,
          R`<b>Isomorfismo</b>: homomorfismo bijetor; $R\cong S$.`,
          R`Não se exige $\varphi(1)=1$. Automaticamente, $\varphi(0)=0$ e $\varphi(-a)=-\varphi(a)$.`,
          R`Exemplos: $\Z\to\Z_n$, $k\mapsto k\bmod n$; a conjugação em $\C$; a avaliação $f\mapsto f(a)$; a projeção $R\oplus S\to R$.`
        ],
        cartoes: [
          { id: 'c4.1a', frente: R`Definição de homomorfismo de anéis.`, verso: R`$\varphi\colon R\to S$ com $\varphi(a+b)=\varphi(a)+\varphi(b)$ e $\varphi(ab)=\varphi(a)\varphi(b)$ para todos $a,b\in R$.` },
          { id: 'c4.1b', frente: R`Um homomorfismo de anéis leva a unidade na unidade?`, verso: R`Não necessariamente: $x\mapsto4x$ de $\Z_3$ em $\Z_6$ é homomorfismo e $\varphi(1)=4$. ($4$ é a unidade da imagem $\{0,2,4\}$.)` },
          { id: 'c4.1c', frente: R`Dê uma aplicação $\Z\to\Z$ que preserva a soma mas não o produto.`, verso: R`$x\mapsto2x$: $2(ab)\neq(2a)(2b)$ em geral.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Com grupos, os homomorfismos transformaram o grupo quociente numa ferramenta. Vamos refazer essa história para anéis, com os ideais no lugar dos subgrupos normais. A diferença: agora há <b>duas</b> operações a respeitar.</p>` },
          { t: 'teo', rotulo: 'Definição', html: R`
            <p>Um <b>homomorfismo de anéis</b> $\varphi\colon R\to S$ é uma aplicação que preserva as duas operações:
            $$\begin{aligned}\varphi(a+b)&=\varphi(a)+\varphi(b),\\ \varphi(ab)&=\varphi(a)\varphi(b)\end{aligned}$$
            para todos $a,b\in R$. Um homomorfismo bijetor é um <b>isomorfismo</b>, e escrevemos $R\cong S$.</p>` },
          { t: 'atencao', titulo: 'A unidade', html: R`<p>A definição <b>não</b> exige que $\varphi$ leve a unidade de $R$ na unidade de $S$. Por exemplo, $\varphi\colon\Z_3\to\Z_6$, $\varphi(x)=4x$, é um homomorfismo (confira abaixo) com $\varphi(1)=4\neq1$. E o homomorfismo nulo, $\varphi(x)=0$, é sempre um homomorfismo.</p>` },
          { t: 'html', html: R`
            <p><b>Exemplos.</b></p>
            <ul><li>$\Z\to\Z_n$, $k\mapsto k\bmod n$: o <b>homomorfismo natural</b>.</li>
            <li>$\C\to\C$, $a+bi\mapsto a-bi$ (conjugação): é um isomorfismo.</li>
            <li>$\R[x]\to\R$, $f(x)\mapsto f(2)$ (avaliação em $2$): $(f+g)(2)=f(2)+g(2)$ e $(fg)(2)=f(2)g(2)$.</li>
            <li>$R\oplus S\to R$, $(r,s)\mapsto r$ (projeção).</li></ul>
            <p><b>Não são:</b> $\Z\to\Z$, $x\mapsto2x$ (falha o produto: $\varphi(1\cdot1)=2$, $\varphi(1)\varphi(1)=4$); $\Z\to\Z$, $x\mapsto x^2$ (falha a soma: $(1+1)^2=4\neq2$).</p>` },
          { t: 'exemplo', titulo: 'Exemplo: Z₃ → Z₆, x ↦ 4x', enunciado: R`Verifique que $\varphi(x)=4x$ define um homomorfismo de $\Z_3$ em $\Z_6$.`, solucao: R`
            <p><b>Bem definida e aditiva:</b> em $\Z_3$, a soma é feita módulo $3$, e em $\Z_6$ módulo $6$. Se $x+y=z+3k$, então $4(x+y)=4z+12k=4z$ em $\Z_6$. Por isso $\varphi(x+y)=\varphi(x)+\varphi(y)$. O ponto-chave: $3\cdot4=12=0$ em $\Z_6$.</p>
            <p><b>Multiplicativa:</b> $\varphi(xy)=4xy$ e $\varphi(x)\varphi(y)=16xy=4xy$ em $\Z_6$, porque $16=4$. O ponto-chave: $4^2=4$.</p>` },
          { t: 'pratica', titulo: 'Fixação: é homomorfismo?', itens: [
            { t: 'grade', p: R`Decida, para cada aplicação, se cada igualdade vale para <b>todos</b> os elementos.`, cab: ['preserva a soma?', 'preserva o produto?', 'homomorfismo?'], linhas: [
              { rot: R`$\Z\to\Z_5$, $x\mapsto x\bmod5$`, r: [0, 0, 0] },
              { rot: R`$\Z_6\to\Z_9$, $x\mapsto3x$`, r: [0, 1, 1] },
              { rot: R`$\R[x]\to\R$, $f\mapsto f(0)$`, r: [0, 0, 0] },
              { rot: R`$\Z\to\Z$, $x\mapsto-x$`, r: [0, 1, 1] },
              { rot: R`$M_2(\Z)\to\Z$, $A\mapsto a_{11}$`, r: [0, 1, 1] }
            ], exp: R`<p>$\Z_6\to\Z_9$, $x\mapsto3x$: a soma funciona porque $6\cdot3=18=0$ em $\Z_9$, mas $\varphi(1)^2=9=0\neq3=\varphi(1)$. Para $-x$: $(-1)(-1)=1\neq-1$. A entrada $(1,1)$ de um produto de matrizes é $a_{11}b_{11}+a_{12}b_{21}$, não $a_{11}b_{11}$.</p>` },
            { t: 'mod', n: 10, r: 8, p: R`$\varphi\colon\Z_5\to\Z_{10}$, $\varphi(x)=6x$, é um homomorfismo ($5\cdot6=30=0$ e $6^2=36=6$ em $\Z_{10}$). Quanto vale $\varphi(3)$?`, rot: R`$\varphi(3)=$`,
              exp: R`$\varphi(3)=6\cdot3=18=8$ em $\Z_{10}$. Repare que $\varphi(1)=6$ não é a unidade de $\Z_{10}$, mas é a unidade da imagem $\{0,6,2,8,4\}$.` },
            { t: 'vf', p: R`Se $\varphi\colon R\to S$ é homomorfismo de anéis, então $\varphi(0)=0$.`, r: true, exp: R`$\varphi$ é, em particular, homomorfismo dos grupos aditivos: $\varphi(0)=\varphi(0+0)=\varphi(0)+\varphi(0)$, e cancela-se.` }
          ] },
          { t: 'reforco', geradores: ['ehhom'] }
        ]
      },

      /* =============================================================== 4.2 */
      {
        id: 2,
        titulo: 'Propriedades e núcleo',
        resumo: [
          R`$\Ker\varphi=\{r\in R\mid\varphi(r)=0\}$ é sempre um <b>ideal</b> de $R$; a imagem $\varphi(R)$ é um subanel de $S$.`,
          R`$\varphi$ é injetora $\iff\Ker\varphi=\{0\}$; isomorfismo $\iff$ sobrejetora e $\Ker\varphi=\{0\}$.`,
          R`Imagem de ideal é ideal <b>da imagem</b> (de $S$, se $\varphi$ é sobrejetora); pré-imagem de ideal é ideal.`,
          R`Se $R$ tem unidade, $\varphi$ é sobrejetora e $S\neq\{0\}$, então $\varphi(1)$ é a unidade de $S$.`
        ],
        cartoes: [
          { id: 'c4.2a', frente: R`O núcleo de um homomorfismo de anéis é…`, verso: R`Um ideal: $\varphi(a-b)=0$ e $\varphi(ra)=\varphi(r)\cdot0=0$.` },
          { id: 'c4.2b', frente: R`Como o núcleo decide a injetividade?`, verso: R`$\varphi$ é injetora $\iff\Ker\varphi=\{0\}$: $\varphi(a)=\varphi(b)\iff a-b\in\Ker\varphi$.` },
          { id: 'c4.2c', frente: R`Núcleo de $\R[x]\to\R$, $f\mapsto f(2)$?`, verso: R`$\langle x-2\rangle$: os polinômios que têm $2$ como raiz.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Propriedades', html: R`
            <p>Seja $\varphi\colon R\to S$ um homomorfismo de anéis. Então:</p>
            <ol><li>$\varphi(nr)=n\varphi(r)$ e $\varphi(r^n)=\varphi(r)^n$ para $n\geq1$;</li>
            <li>se $A$ é subanel de $R$, $\varphi(A)$ é subanel de $S$; se $A$ é ideal e $\varphi$ é sobrejetora, $\varphi(A)$ é ideal de $S$;</li>
            <li>se $B$ é ideal de $S$, então $\varphi^{-1}(B)=\{r\mid\varphi(r)\in B\}$ é ideal de $R$;</li>
            <li>se $R$ é comutativo, $\varphi(R)$ é comutativo;</li>
            <li>se $R$ tem unidade, $S\neq\{0\}$ e $\varphi$ é sobrejetora, então $\varphi(1)$ é a unidade de $S$;</li>
            <li>$\varphi$ é um isomorfismo se, e somente se, é sobrejetora e $\Ker\varphi=\{0\}$.</li></ol>` },
          { t: 'teo', rotulo: 'Teorema (o núcleo é um ideal)', html: R`<p>O <b>núcleo</b> $\Ker\varphi=\{r\in R\mid\varphi(r)=0\}$ de um homomorfismo de anéis $\varphi\colon R\to S$ é um ideal de $R$.</p>` },
          { t: 'exemplo', titulo: 'Demonstração', aberto: true, enunciado: R`Por que $\Ker\varphi$ é um ideal?`, solucao: R`
            <p>$0\in\Ker\varphi$. Se $a,b\in\Ker\varphi$, $\varphi(a-b)=\varphi(a)-\varphi(b)=0$. Se $a\in\Ker\varphi$ e $r\in R$, $\varphi(ra)=\varphi(r)\varphi(a)=\varphi(r)\cdot0=0$ e, do mesmo modo, $\varphi(ar)=0$. Pelo teste do ideal, $\Ker\varphi$ é ideal. Repare que é o <b>produto</b> que faz do núcleo um ideal, e não apenas um subanel.</p>` },
          { t: 'html', html: R`
            <p><b>Exemplos de núcleos.</b></p>
            <ul><li>$\Z\to\Z_n$: $\Ker=\langle n\rangle=n\Z$.</li>
            <li>$\R[x]\to\R$, $f\mapsto f(2)$: $\Ker=\{f\mid f(2)=0\}=\langle x-2\rangle$ (se $f(2)=0$, então $x-2$ divide $f$).</li>
            <li>$R\oplus S\to R$, $(r,s)\mapsto r$: $\Ker=\{0\}\oplus S$.</li>
            <li>$\Z_3\to\Z_6$, $x\mapsto4x$: $\Ker=\{0\}$, e a imagem é $\{0,4,2\}$.</li></ul>` },
          { t: 'lab', w: 'hom', m: 12, n: 18, titulo: 'Núcleo e imagem dos homomorfismos ℤₘ → ℤₙ', html: R`A tabela testa as duas condições para cada candidato $a=\varphi(1)$; embaixo, núcleo e imagem de cada homomorfismo.` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'conjmod', n: 12, r: [0, 2, 4, 6, 8, 10], p: R`O homomorfismo $\varphi\colon\Z_{12}\to\Z_{18}$, $\varphi(x)=9x$, tem qual núcleo? Liste-o.`,
              exp: R`É homomorfismo: $12\cdot9=108=0$ e $9^2=81=9$ em $\Z_{18}$. E $9x\equiv0\pmod{18}$ exatamente quando $x$ é par: $\Ker\varphi=\{0,2,4,6,8,10\}=\langle2\rangle$. A imagem é $\{0,9\}$.` },
            { t: 'vf', p: R`A imagem de um ideal por um homomorfismo é sempre um ideal do contradomínio.`, r: false,
              exp: R`A inclusão $\Z\to\Q$ é homomorfismo, $\Z$ é ideal de $\Z$, mas $\Z$ não é ideal de $\Q$. É preciso que $\varphi$ seja sobrejetora.` },
            { t: 'escolha', p: R`Qual é o núcleo de $\varphi\colon\Z\to\Z_4\oplus\Z_6$, $\varphi(x)=(x\bmod4,\ x\bmod6)$?`, op: [R`$\langle12\rangle$`, R`$\langle24\rangle$`, R`$\langle2\rangle$`, R`$\{0\}$`], c: 0,
              exp: R`$x$ vai em $(0,0)$ quando $4\mid x$ e $6\mid x$, isto é, $\mmc(4,6)=12\mid x$.` }
          ] },
          { t: 'reforco', geradores: ['nucleo'] }
        ]
      },

      /* =============================================================== 4.3 */
      {
        id: 3,
        titulo: 'O primeiro teorema do isomorfismo',
        resumo: [
          R`Se $\varphi\colon R\to S$ é homomorfismo, então $R/\Ker\varphi\cong\varphi(R)$, por $r+\Ker\varphi\mapsto\varphi(r)$.`,
          R`Todo ideal $A$ é núcleo de um homomorfismo: $R\to R/A$, $r\mapsto r+A$.`,
          R`Receita: para identificar $R/A$, procure um homomorfismo sobrejetor $R\to S$ com núcleo $A$; então $R/A\cong S$.`
        ],
        cartoes: [
          { id: 'c4.3a', frente: R`Enuncie o primeiro teorema do isomorfismo para anéis.`, verso: R`Se $\varphi\colon R\to S$ é homomorfismo de anéis, então $r+\Ker\varphi\mapsto\varphi(r)$ é um isomorfismo de $R/\Ker\varphi$ sobre $\varphi(R)$.` },
          { id: 'c4.3b', frente: R`$\R[x]/\langle x^2+1\rangle\cong$?`, verso: R`$\C$, pelo homomorfismo $f(x)\mapsto f(i)$, sobrejetor e com núcleo $\langle x^2+1\rangle$.` },
          { id: 'c4.3c', frente: R`Todo ideal é núcleo de algum homomorfismo?`, verso: R`Sim: $A$ é o núcleo de $R\to R/A$, $r\mapsto r+A$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Primeiro teorema do isomorfismo', html: R`<p>Seja $\varphi\colon R\to S$ um homomorfismo de anéis. A aplicação
            $$r+\Ker\varphi\ \longmapsto\ \varphi(r)$$
            é um isomorfismo de $R/\Ker\varphi$ sobre $\varphi(R)$. Assim, $R/\Ker\varphi\cong\varphi(R)$.</p>` },
          { t: 'html', html: R`
            <p>A demonstração é a mesma de grupos, mais uma linha para o produto: a aplicação está bem definida e é injetora porque $r+\Ker\varphi=s+\Ker\varphi\iff\varphi(r)=\varphi(s)$; é sobrejetora sobre $\varphi(R)$ por construção; e preserva o produto porque $(r+\Ker\varphi)(s+\Ker\varphi)=rs+\Ker\varphi\mapsto\varphi(rs)=\varphi(r)\varphi(s)$.</p>
            <p><b>Todo ideal é um núcleo:</b> dado um ideal $A$, a aplicação $R\to R/A$, $r\mapsto r+A$, é um homomorfismo sobrejetor com núcleo $A$. Ideais e núcleos são a mesma coisa.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: ℝ[x]/⟨x²+1⟩ ≅ ℂ', enunciado: R`Use o teorema para mostrar que $\R[x]/\langle x^2+1\rangle\cong\C$.`, solucao: R`
            <p>Seja $\varphi\colon\R[x]\to\C$, $\varphi(f)=f(i)$ (avaliação em $i$): é homomorfismo. É sobrejetora, pois $\varphi(a+bx)=a+bi$. Núcleo: se $f(i)=0$, divida $f=q\cdot(x^2+1)+(a+bx)$; então $0=f(i)=a+bi$, logo $a=b=0$ e $f\in\langle x^2+1\rangle$. A outra inclusão é clara. Pelo teorema, $\R[x]/\langle x^2+1\rangle\cong\C$, e como $\C$ é corpo, $\langle x^2+1\rangle$ é maximal em $\R[x]$.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: ℤ[i]/⟨2+i⟩ ≅ ℤ₅', enunciado: R`Mostre que $\varphi\colon\Z[i]\to\Z_5$, $\varphi(a+bi)=(a+3b)\bmod5$, é um homomorfismo sobrejetor com núcleo $\langle2+i\rangle$.`, solucao: R`
            <p>A ideia: em $\Z_5$, $3^2=9=-1$, então $3$ faz o papel de $i$. Soma: clara. Produto: $(a+bi)(c+di)=(ac-bd)+(ad+bc)i\mapsto ac-bd+3ad+3bc$, enquanto $(a+3b)(c+3d)=ac+3ad+3bc+9bd$, e $9bd=-bd$ em $\Z_5$. Sobrejetora: $\varphi(k)=k\bmod5$.</p>
            <p>Núcleo: $\varphi(2+i)=5=0$, então $\langle2+i\rangle\subset\Ker\varphi$. Reciprocamente, se $a+3b\equiv0\pmod5$, escreva $a+bi=(a-2b)+b(2+i)$. Como $a-2b\equiv a+3b\equiv0\pmod5$, temos $a-2b=5k=k(2+i)(2-i)\in\langle2+i\rangle$, e portanto $a+bi\in\langle2+i\rangle$. Assim $\Z[i]/\langle2+i\rangle\cong\Z_5$: é um corpo, e o ideal é maximal.</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'escolha', p: R`Pelo homomorfismo $f\mapsto f(3)$, o anel $\R[x]/\langle x-3\rangle$ é isomorfo a…`, op: [R`$\R$`, R`$\C$`, R`$\R\oplus\R$`, R`$\Z_3$`], c: 0,
              exp: R`A avaliação em $3$ é sobrejetora sobre $\R$ (constantes) e tem núcleo $\langle x-3\rangle$. Logo $\langle x-3\rangle$ é maximal em $\R[x]$.` },
            { t: 'escolha', p: R`$\Z_{12}/\langle4\rangle$ é isomorfo a…`, op: [R`$\Z_4$`, R`$\Z_3$`, R`$\Z_{12}$`, R`$\Z_2\oplus\Z_2$`], c: 0,
              exp: R`$\Z_{12}\to\Z_4$, $x\mapsto x\bmod4$, está bem definida ($4\mid12$), é homomorfismo sobrejetor e tem núcleo $\{0,4,8\}=\langle4\rangle$.` },
            { t: 'escolha', p: R`Pela avaliação $f\mapsto f(1)$, $\Z[x]/\langle x-1\rangle\cong\Z$. O que se conclui sobre $\langle x-1\rangle$ em $\Z[x]$?`, op: ['É primo, mas não maximal.', 'É maximal.', 'Não é primo.', 'É igual a ℤ[x].'], c: 0,
              exp: R`$\Z$ é domínio, mas não é corpo. Pelo critério do quociente, o ideal é primo e não é maximal.` },
            { t: 'lacunas', p: R`Complete a identificação de $(\Z\oplus\Z)/(\{0\}\oplus\Z)$.`,
              texto: R`A projeção $\pi(a,b)=a$ é um homomorfismo de $\Z\oplus\Z$ em $\Z$, {{0}}, e o seu núcleo é {{1}}. Pelo primeiro teorema do isomorfismo, o quociente é isomorfo a {{2}}, que é um domínio mas não um corpo; logo $\{0\}\oplus\Z$ é um ideal {{3}}.`,
              lac: [{ op: ['sobrejetor', 'injetor', 'nulo', 'bijetor'], c: 0 }, { op: ['{0} ⊕ ℤ', 'ℤ ⊕ {0}', '{(0,0)}', '⟨(1,1)⟩'], c: 0 }, { op: ['ℤ', 'ℤ ⊕ ℤ', 'ℤ₂', 'ℚ'], c: 0 }, { op: ['primo, não maximal', 'maximal', 'não primo', 'principal e maximal'], c: 0 }] }
          ] }
        ]
      },

      /* =============================================================== 4.4 */
      {
        id: 4,
        titulo: 'Contando homomorfismos',
        resumo: [
          R`Um homomorfismo $\varphi\colon\Z_m\to\Z_n$ é $\varphi(x)=ax$ com $a=\varphi(1)$; é preciso $ma\equiv0\pmod n$ e $a^2=a$.`,
          R`Logo os homomorfismos $\Z_m\to\Z_n$ correspondem aos idempotentes $a$ de $\Z_n$ com $ma=0$.`,
          R`Num homomorfismo $\varphi$ definido num anel com unidade, $\varphi(1)$ é sempre idempotente.`
        ],
        cartoes: [
          { id: 'c4.4a', frente: R`Como achar todos os homomorfismos $\Z_m\to\Z_n$?`, verso: R`São os $x\mapsto ax$ com $a$ idempotente em $\Z_n$ ($a^2=a$) e $ma\equiv0\pmod n$.` },
          { id: 'c4.4b', frente: R`Por que $\varphi(1)$ é idempotente?`, verso: R`$\varphi(1)^2=\varphi(1\cdot1)=\varphi(1)$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Seja $\varphi\colon\Z_m\to\Z_n$ um homomorfismo e $a=\varphi(1)$. Como $x=1+\cdots+1$, a soma dá $\varphi(x)=xa$: <b>$\varphi$ fica determinado por $a$</b>. Duas condições sobre $a$:</p>
            <ol><li><b>soma:</b> $m\cdot1=0$ em $\Z_m$, então $ma=\varphi(m\cdot1)=0$ em $\Z_n$;</li>
            <li><b>produto:</b> $a^2=\varphi(1)\varphi(1)=\varphi(1\cdot1)=a$: $a$ é idempotente.</li></ol>
            <p>Reciprocamente, se $a$ cumpre (1) e (2), $x\mapsto ax$ está bem definida, preserva a soma, e $\varphi(xy)=axy=a^2xy=\varphi(x)\varphi(y)$.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: Z₄ → Z₆', enunciado: R`Encontre todos os homomorfismos de anéis de $\Z_4$ em $\Z_6$.`, solucao: R`
            <p>Idempotentes de $\Z_6$: $0,1,3,4$. Condição $4a\equiv0\pmod6$: $4\cdot0=0$ ✓, $4\cdot1=4$ ✗, $4\cdot3=12=0$ ✓, $4\cdot4=16=4$ ✗. Sobram $a=0$ e $a=3$: o homomorfismo nulo e $x\mapsto3x$, de núcleo $\{0,2\}$ e imagem $\{0,3\}$.</p>` },
          { t: 'lab', w: 'hom', m: 4, n: 6, titulo: 'Todos os homomorfismos ℤₘ → ℤₙ', html: R`Mude $m$ e $n$. Note que, quando $\mdc(m,n)=1$, só sobra o homomorfismo nulo.` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'num', r: 4, p: R`Quantos homomorfismos de anéis existem de $\Z_{12}$ em $\Z_{12}$?`, exp: R`Idempotentes de $\Z_{12}$: $0,1,4,9$, e todos satisfazem $12a=0$. São $4$; só $x\mapsto x$ é isomorfismo.` },
            { t: 'conjmod', n: 15, r: [0, 1, 6, 10], p: R`Para quais $a\in\Z_{15}$ a aplicação $x\mapsto ax$ é um homomorfismo de $\Z_{30}$ em $\Z_{15}$? Liste-os.`,
              exp: R`Idempotentes de $\Z_{15}$: $0,1,6,10$. Todos satisfazem $30a\equiv0\pmod{15}$. Então os quatro: $0,1,6,10$.`, dica: R`Antes de tudo, liste os idempotentes de $\Z_{15}$.` },
            { t: 'num', r: 1, p: R`Quantos homomorfismos de anéis existem de $\Z_7$ em $\Z_{10}$?`, exp: R`$7a\equiv0\pmod{10}$ obriga $a=0$ (pois $\mdc(7,10)=1$). Só o nulo.` }
          ] },
          { t: 'reforco', geradores: ['contahom'] }
        ]
      },

      /* =============================================================== 4.5 */
      {
        id: 5,
        titulo: 'Isomorfismos e a característica',
        resumo: [
          R`Isomorfismos preservam: comutatividade, unidade, número de invertíveis, de idempotentes, de divisores de zero, ser domínio ou corpo, característica.`,
          R`$\Z_{mn}\cong\Z_m\oplus\Z_n$ $\iff$ $\mdc(m,n)=1$.`,
          R`Se $R$ tem unidade, $n\mapsto n\cdot1$ é homomorfismo $\Z\to R$ com núcleo $\langle\car R\rangle$: $R$ contém uma cópia de $\Z_{\car R}$ (ou de $\Z$, se $\car R=0$).`,
          R`Todo corpo contém uma cópia de $\Z_p$ ou de $\Q$.`
        ],
        cartoes: [
          { id: 'c4.5a', frente: R`Quando $\Z_{mn}\cong\Z_m\oplus\Z_n$?`, verso: R`Exatamente quando $\mdc(m,n)=1$ (senão, as características $mn$ e $\mmc(m,n)$ diferem).` },
          { id: 'c4.5b', frente: R`Como mostrar que dois anéis <b>não</b> são isomorfos?`, verso: R`Achar uma propriedade preservada por isomorfismos que um tem e o outro não: característica, nº de invertíveis, idempotentes, ser domínio etc.` },
          { id: 'c4.5c', frente: R`Por que todo corpo contém $\Z_p$ ou $\Q$?`, verso: R`$n\mapsto n\cdot1$ dá uma cópia de $\Z_p$ ($\car=p$) ou de $\Z$ ($\car=0$); no 2º caso, as frações $(m\cdot1)(n\cdot1)^{-1}$ formam uma cópia de $\Q$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Anéis isomorfos são “o mesmo anel com outros nomes”: toda propriedade definida só com as operações passa de um para o outro. Para provar que dois anéis <b>não</b> são isomorfos, basta achar uma propriedade desse tipo que os separe.</p>` },
          { t: 'tabela', titulo: 'Exemplos de anéis não isomorfos', cab: ['par', 'o que os distingue'], linhas: [
            [R`$\Z_8$ e $\Z_2\oplus\Z_4$`, R`característica $8$ × $4$`],
            [R`$\Z$ e $\Z\oplus\Z$`, R`idempotentes: só $0,1$ × também $(1,0)$ e $(0,1)$`],
            [R`$\Z_9$ e $\Z_3\oplus\Z_3$`, R`característica $9$ × $3$`],
            [R`$\Q$ e $\R$`, R`em $\R$, $x^2=2$ tem solução; em $\Q$, não`],
            [R`$\Z_{25}$ e $\Z_5[i]$`, R`os dois têm $25$ elementos, mas característica $25$ × $5$`]
          ] },
          { t: 'teo', rotulo: 'Proposição', html: R`<p>$\Z_{mn}\cong\Z_m\oplus\Z_n$ se, e somente se, $\mdc(m,n)=1$. O isomorfismo é $x\mapsto(x\bmod m,\ x\bmod n)$.</p>` },
          { t: 'exemplo', titulo: 'Por quê?', aberto: true, enunciado: R`Justifique a proposição.`, solucao: R`
            <p>Se $\mdc(m,n)=d\gt1$, a característica de $\Z_m\oplus\Z_n$ é $\mmc(m,n)=mn/d\lt mn$, e a de $\Z_{mn}$ é $mn$: não são isomorfos.</p>
            <p>Se $\mdc(m,n)=1$, $\Z\to\Z_m\oplus\Z_n$, $x\mapsto(x\bmod m,x\bmod n)$, é homomorfismo com núcleo $\langle\mmc(m,n)\rangle=\langle mn\rangle$. Pelo primeiro teorema, $\Z_{mn}$ é isomorfo à imagem, que tem $mn$ elementos, ou seja, é o anel todo.</p>` },
          { t: 'exemplo', titulo: 'Aplicação: os idempotentes de ℤ₁₅', enunciado: R`Use $\Z_{15}\cong\Z_3\oplus\Z_5$ para achar os idempotentes de $\Z_{15}$ sem testar os $15$ elementos.`, solucao: R`
            <p>Em $\Z_3\oplus\Z_5$, $(u,v)^2=(u,v)$ exige $u^2=u$ em $\Z_3$ e $v^2=v$ em $\Z_5$, que são corpos: $u,v\in\{0,1\}$. São $4$ idempotentes: $(0,0),(1,1),(1,0),(0,1)$. Voltando a $\Z_{15}$: $(1,0)$ corresponde a $x\equiv1\pmod3$ e $x\equiv0\pmod5$, ou seja, $x=10$; e $(0,1)$ a $x=6$. Os idempotentes são $0,1,6,10$.</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'mod', n: 35, r: 26, p: R`Pelo isomorfismo $\Z_{35}\to\Z_5\oplus\Z_7$, que elemento de $\Z_{35}$ corresponde a $(1,5)$?`, rot: '$x=$',
              exp: R`Os $x\equiv5\pmod7$ são $5,12,19,26,33$; destes, $26\equiv1\pmod5$.` },
            { t: 'escolha', p: R`Qual par de anéis é isomorfo?`, op: [R`$\Z_{10}$ e $\Z_2\oplus\Z_5$`, R`$\Z_{12}$ e $\Z_2\oplus\Z_6$`, R`$\Z_4$ e $\Z_2\oplus\Z_2$`, R`$\Z$ e $2\Z$`], c: 0,
              exp: R`$\mdc(2,5)=1$. Nos outros: características $12$ × $6$; $4$ × $2$; $\Z$ tem unidade e $2\Z$ não.` },
            { t: 'num', r: 8, p: R`Quantos idempotentes tem $\Z_{30}$? (Use $\Z_{30}\cong\Z_2\oplus\Z_3\oplus\Z_5$.)`, exp: R`Em cada coordenada, $0$ ou $1$: $2^3=8$.` }
          ] },
          { t: 'teo', rotulo: 'Teorema (o homomorfismo de ℤ em um anel com unidade)', html: R`<p>Se $R$ tem unidade, $\varphi\colon\Z\to R$, $\varphi(n)=n\cdot1$, é um homomorfismo, com $\Ker\varphi=\langle\car R\rangle$. Logo $R$ contém um subanel isomorfo a $\Z_n$, se $\car R=n\gt0$, ou a $\Z$, se $\car R=0$.</p>
            <p><b>Corolário.</b> Todo corpo de característica $p$ contém uma cópia de $\Z_p$; todo corpo de característica $0$ contém uma cópia de $\Q$.</p>` },
          { t: 'pratica', itens: [
            { t: 'vf', p: R`Existe um homomorfismo sobrejetor de $\Z_{12}$ em $\Z_5$.`, r: false,
              exp: R`A imagem seria $\Z_{12}/\Ker\varphi$, com número de elementos dividindo $12$. Como $5\nmid12$, impossível.` },
            { t: 'escolha', p: R`Qual é o menor subcorpo de $\Z_7[x]/\langle x^2+1\rangle$ (um corpo com $49$ elementos)?`, op: [R`Uma cópia de $\Z_7$`, R`Uma cópia de $\Q$`, R`Ele mesmo`, R`$\{0,1\}$`], c: 0,
              exp: R`A característica é $7$, e $\{n\cdot1\}$ é uma cópia de $\Z_7$ (as classes constantes).` }
          ] },
          { t: 'reforco', geradores: ['crt'] }
        ]
      },

      /* =============================================================== 4.6 */
      {
        id: 6,
        titulo: 'O corpo de frações',
        resumo: [
          R`Todo domínio $D$ está contido (a menos de isomorfismo) num corpo $F$ cujos elementos são frações $a/b$, $a,b\in D$, $b\neq0$: o <b>corpo de frações</b> de $D$.`,
          R`$a/b=c/d\iff ad=bc$; $\frac ab+\frac cd=\frac{ad+bc}{bd}$, $\frac ab\cdot\frac cd=\frac{ac}{bd}$.`,
          R`Exemplos: $\Z\leadsto\Q$; $\Z[i]\leadsto\Q[i]$; $\Z[x]\leadsto$ funções racionais; um corpo $\leadsto$ ele mesmo.`
        ],
        cartoes: [
          { id: 'c4.6a', frente: R`Quando $a/b=c/d$ no corpo de frações?`, verso: R`Quando $ad=bc$ em $D$.` },
          { id: 'c4.6b', frente: R`Por que só domínios têm corpo de frações?`, verso: R`Um subanel (com a unidade) de um corpo não tem divisores de zero; e a construção usa $bd\neq0$ quando $b,d\neq0$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Lá no começo do curso construímos $\Q$ a partir de $\Z$: pares $(a,b)$ com $b\neq0$, a relação de equivalência $(a,b)\sim(c,d)\iff ad=bc$ e as operações das frações. A mesma construção funciona trocando $\Z$ por qualquer domínio de integridade.</p>` },
          { t: 'teo', rotulo: 'Teorema (corpo de frações)', html: R`<p>Seja $D$ um domínio de integridade. Existe um corpo $F$ que contém um subanel isomorfo a $D$ e tal que todo elemento de $F$ é da forma $ab^{-1}$ com $a,b$ nesse subanel e $b\neq0$. Ele é obtido das classes de pares $(a,b)$, $b\neq0$, com
            $$\begin{aligned}(a,b)\sim(c,d)&\iff ad=bc,\\ [a,b]+[c,d]&=[ad+bc,\ bd],\\ [a,b]\cdot[c,d]&=[ac,\ bd].\end{aligned}$$
            Escrevemos $a/b$ para $[a,b]$; $D$ aparece como $\{a/1\}$.</p>` },
          { t: 'atencao', titulo: 'Onde se usa que D é domínio', html: R`<p>Para que $bd$ seja um denominador permitido, é preciso $bd\neq0$ quando $b\neq0$ e $d\neq0$: ausência de divisores de zero. E a transitividade de $\sim$ usa o cancelamento. De fato, um anel com divisores de zero não cabe em corpo nenhum.</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'escolha', p: R`Qual é o corpo de frações de $\Z[\sqrt2\,]$?`, op: [R`$\Q[\sqrt2\,]$`, R`$\R$`, R`$\Q$`, R`$\Z[\sqrt2\,]$`], c: 0,
              exp: R`$\frac{a+b\sqrt2}{c+d\sqrt2}$, racionalizado, é $r+s\sqrt2$ com $r,s\in\Q$; e todo $r+s\sqrt2$ é uma fração assim (tome denominador comum).` },
            { t: 'vf', p: R`O corpo de frações de $\Z_7$ é $\Q$.`, r: false, exp: R`$\Z_7$ já é corpo; o corpo de frações de um corpo é (isomorfo a) ele mesmo, pois $a/b=ab^{-1}$.` },
            { t: 'vf', p: R`$\Z_6$ tem corpo de frações.`, r: false, exp: R`$\Z_6$ não é domínio: $2\cdot3=0$. Num corpo, isso obrigaria $2=0$ ou $3=0$.` },
            { t: 'escolha', p: R`No corpo de frações de $\Z[x]$, as frações $\dfrac{x^2-1}{x+1}$ e $\dfrac{x-1}{1}$ são…`, op: ['iguais', 'diferentes', 'não definidas', 'iguais só para x ≠ −1'], c: 0,
              exp: R`$(x^2-1)\cdot1=(x+1)(x-1)$: pelo critério $ad=bc$, são iguais. (Aqui não há “valor de $x$”: são elementos de um corpo de frações de polinômios.)` }
          ] }
        ]
      },

      /* =============================================================== 4.7 */
      {
        id: 7,
        titulo: 'Revisão geral da unidade',
        resumo: [R`Anéis $\to$ domínios e corpos $\to$ ideais e quocientes $\to$ homomorfismos: ideais = núcleos; primo $\leftrightarrow$ domínio; maximal $\leftrightarrow$ corpo; $R/\Ker\varphi\cong\varphi(R)$.`],
        cartoes: [
          { id: 'c4.7a', frente: R`O dicionário grupos $\leftrightarrow$ anéis.`, verso: R`Subgrupo normal $\leftrightarrow$ ideal; $G/N$ $\leftrightarrow$ $R/A$; núcleo é normal $\leftrightarrow$ núcleo é ideal; $G/\Ker\varphi\cong\varphi(G)$ $\leftrightarrow$ $R/\Ker\varphi\cong\varphi(R)$.` }
        ],
        blocos: [
          { t: 'html', html: R`<p>Questões que atravessam a unidade inteira, em ordem aleatória de assunto. Depois de terminar, faça um <a href="#/treino/misto">treino misto</a>.</p>` },
          { t: 'pratica', titulo: 'Revisão geral', itens: [
            { t: 'escolha', p: R`Em $\Z_{20}$, quantos elementos são invertíveis, divisores de zero e nulos, respectivamente?`, op: ['8, 11 e 1', '8, 12 e 0', '10, 9 e 1', '9, 10 e 1'], c: 0,
              exp: R`$|U(20)|=8$ ($1,3,7,9,11,13,17,19$); o zero; e os $11$ restantes são divisores de zero.` },
            { t: 'vf', p: R`Se $A$ é um ideal maximal de um anel comutativo com unidade $R$, então $R/A$ não tem divisores de zero.`, r: true, exp: R`$R/A$ é corpo, logo domínio.` },
            { t: 'escolha', p: R`O anel quociente $\Z_3[x]/\langle x^2+x+2\rangle$ é…`, op: ['um corpo com 9 elementos', 'um domínio infinito', 'um anel com divisores de zero', 'isomorfo a ℤ₉'], c: 0,
              exp: R`$f(0)=2$, $f(1)=4=1$, $f(2)=8=2$: sem raízes, então o quociente é corpo, com $3^2=9$ elementos. Não é $\Z_9$ (característica $3$, não $9$).` },
            { t: 'num', r: 1, p: R`Quantos homomorfismos de anéis existem de $\Z_6$ em $\Z_{9}$?`, exp: R`Idempotentes de $\Z_9$: só $0$ e $1$ ($9$ é potência de primo). Como $6\cdot1=6\neq0$ em $\Z_9$, o $1$ não serve. Só existe o homomorfismo nulo.` },
            { t: 'grade', p: R`Verdadeiro ou falso?`, op: ['V', 'F'], cab: ['V ou F'], linhas: [
              { rot: R`Todo subanel de $\Z$ é um ideal de $\Z$.`, r: [0] },
              { rot: R`Todo ideal primo de $\Z$ é maximal.`, r: [1] },
              { rot: R`A imagem de um domínio por um homomorfismo é um domínio.`, r: [1] },
              { rot: R`$\car(\Z_4\oplus\Z_6)=24$.`, r: [1] },
              { rot: R`$\R[x]/\langle x^2+1\rangle$ é um corpo.`, r: [0] }
            ], exp: R`<p>Os subanéis de $\Z$ são os $n\Z$, todos ideais. $\{0\}$ é primo e não é maximal. A imagem de $\Z$ em $\Z_6$ (natural) é $\Z_6$, que não é domínio. $\car(\Z_4\oplus\Z_6)=\mmc(4,6)=12$.</p>` },
            { t: 'aberta', p: R`Seja $\varphi\colon F\to S$ um homomorfismo, com $F$ corpo e $\varphi$ não nulo. Mostre que $\varphi$ é injetor.`,
              modelo: R`$\Ker\varphi$ é um ideal de $F$, logo é $\{0\}$ ou $F$. Se fosse $F$, $\varphi$ seria nulo. Portanto $\Ker\varphi=\{0\}$ e $\varphi$ é injetor.` }
          ] }
        ]
      }
    ]
  });
})();
