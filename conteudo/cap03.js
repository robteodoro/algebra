/* Capítulo 3 — Ideais e anéis quociente: ideais, ideais principais, o quociente R/A,
   cálculo com representantes, ideais primos e maximais.
   Notação das listas: <a> = ideal principal, A = ideal, r + A = classe. Use R`...`. */
(function () {
  L.registrarCapitulo({
    num: 3,
    titulo: 'Ideais e anéis quociente',
    subtitulo: 'Os subanéis que absorvem produtos, o anel das classes laterais e como reconhecer, pelo quociente, ideais primos e maximais.',

    secoes: [
      /* =============================================================== 3.1 */
      {
        id: 1,
        titulo: 'Ideais',
        resumo: [
          R`Um subanel $A$ de $R$ é um <b>ideal</b> se $ra\in A$ e $ar\in A$ para todos $r\in R$, $a\in A$ (“$A$ absorve produtos”).`,
          R`<b>Teste do ideal</b>: $A\neq\varnothing$ é ideal $\iff$ $a-b\in A$ e $ra,ar\in A$ para $a,b\in A$, $r\in R$.`,
          R`Todo ideal é subanel; a recíproca é falsa ($\Z\subset\Q$).`,
          R`Se um ideal contém um invertível, ele é o anel todo. Os únicos ideais de um corpo são $\{0\}$ e o corpo.`
        ],
        cartoes: [
          { id: 'c3.1a', frente: R`Teste do ideal.`, verso: R`$A\neq\varnothing$ é ideal de $R$ se, e só se, $a-b\in A$ e $ra,ar\in A$ para todos $a,b\in A$ e $r\in R$.` },
          { id: 'c3.1b', frente: R`Diferença entre subanel e ideal.`, verso: R`O subanel é fechado para produtos de <b>seus</b> elementos; o ideal absorve produtos por elementos <b>quaisquer</b> do anel.` },
          { id: 'c3.1c', frente: R`Por que um ideal que contém um invertível é o anel todo?`, verso: R`Se $u\in A$ é invertível, $1=u^{-1}u\in A$, e então $r=r\cdot1\in A$ para todo $r$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Com grupos, nem todo subgrupo servia para construir um quociente: era preciso que ele fosse <b>normal</b>. Com anéis acontece o mesmo, e o papel dos subgrupos normais é feito pelos <b>ideais</b>: subanéis que “engolem” produtos por elementos de fora.</p>
            <p>Pense em $2\Z\subset\Z$: um par vezes um inteiro qualquer é par. Já $\Z\subset\Q$ não tem essa propriedade: $\frac12\cdot1\notin\Z$.</p>` },
          { t: 'teo', rotulo: 'Definição e teste do ideal', html: R`
            <p>Um subanel $A$ de um anel $R$ é um <b>ideal</b> de $R$ se, para todos $r\in R$ e $a\in A$, tanto $ra$ quanto $ar$ estão em $A$.</p>
            <p><b>Teste:</b> um subconjunto não vazio $A$ de $R$ é um ideal se, e somente se,</p>
            <ol><li>$a-b\in A$ sempre que $a,b\in A$;</li><li>$ra$ e $ar$ estão em $A$ sempre que $a\in A$ e $r\in R$.</li></ol>` },
          { t: 'html', html: R`
            <p><b>Exemplos.</b> $\{0\}$ e $R$ são ideais de qualquer anel. $n\Z$ é ideal de $\Z$. Em $\R[x]$, os polinômios com termo constante $0$ formam um ideal (multiplicar por qualquer polinômio mantém o termo constante nulo). Nas funções $\R\to\R$, as que se anulam em $x=1$ formam um ideal.</p>
            <p><b>Não são ideais:</b> $\Z$ em $\Q$; a “diagonal” $\{(a,a)\mid a\in\Z\}$ em $\Z\oplus\Z$, que é subanel mas $(1,0)(5,5)=(5,0)$ não está nela.</p>` },
          { t: 'pratica', titulo: 'Fixação: subanel ou ideal?', itens: [
            { t: 'grade', p: R`Aplique os testes.`, cab: [R`$a-b\in A$?`, R`$ab\in A$?`, R`$ra\in A$?`, 'ideal?'], linhas: [
              { rot: R`$4\Z\subset\Z$`, r: [0, 0, 0, 0] },
              { rot: R`$\{(a,a)\}\subset\Z\oplus\Z$`, r: [0, 0, 1, 1] },
              { rot: R`$\{0,4,8\}\subset\Z_{12}$`, r: [0, 0, 0, 0] },
              { rot: R`constantes $\subset\Z[x]$`, r: [0, 0, 1, 1] },
              { rot: R`$\{f\in\Z[x]\mid f(0)\text{ par}\}\subset\Z[x]$`, r: [0, 0, 0, 0] }
            ], exp: R`<p>As constantes formam um subanel de $\Z[x]$, mas $x\cdot2=2x$ não é constante. Polinômios com $f(0)$ par: $(rf)(0)=r(0)f(0)$ é par. Esse ideal é $\langle x,2\rangle$.</p>` },
            { t: 'vf', p: R`Todo ideal é um subanel.`, r: true, exp: R`Pela definição (e pelo teste: se $ra\in A$ para todo $r\in R$, em particular para $r\in A$).` },
            { t: 'vf', p: R`Em $\Z_{12}$, o subconjunto $\{0,6\}$ é um ideal.`, r: true, exp: R`$6-6=0$, e $r\cdot6$ é $0$ ou $6$ conforme $r$ seja par ou ímpar.` }
          ] },
          { t: 'teo', rotulo: 'Proposição (ideais grandes demais)', html: R`<p>Seja $R$ um anel com unidade e $A$ um ideal de $R$. Se $A$ contém um elemento invertível, então $A=R$. Consequentemente, os únicos ideais de um corpo $F$ são $\{0\}$ e $F$.</p>` },
          { t: 'exemplo', titulo: 'Por quê?', aberto: true, enunciado: R`Justifique a proposição.`, solucao: R`<p>Se $u\in A$ é invertível, então $1=u^{-1}u\in A$, porque $A$ absorve o produto por $u^{-1}$. Daí $r=r\cdot1\in A$ para todo $r\in R$. Num corpo, todo elemento não nulo é invertível: um ideal diferente de $\{0\}$ contém um invertível e é o corpo inteiro.</p>` },
          { t: 'pratica', itens: [
            { t: 'escolha', p: R`Em $\Q$, qual é o ideal gerado por $2$?`, op: [R`Todo o $\Q$.`, R`Os racionais com numerador par.`, R`$2\Z$.`, R`$\{0,2\}$.`], c: 0,
              exp: R`$2$ é invertível em $\Q$, então o ideal é $\Q$. Compare: em $\Z$, $\langle2\rangle=2\Z$ é um ideal próprio.` }
          ] }
        ]
      },

      /* =============================================================== 3.2 */
      {
        id: 2,
        titulo: 'Ideais principais; os ideais de ℤ e de ℤₙ',
        resumo: [
          R`Num anel comutativo com unidade: $\langle a\rangle=\{ra\mid r\in R\}$ (ideal <b>principal</b>) e $\langle a_1,\dots,a_n\rangle=\{r_1a_1+\cdots+r_na_n\}$.`,
          R`Todo ideal de $\Z$ é $\langle n\rangle=n\Z$ para um único $n\geq0$.`,
          R`Os ideais de $\Z_n$ são os $\langle d\rangle$ com $d\mid n$ (um para cada divisor), e $\langle a\rangle=\langle\mdc(a,n)\rangle$.`,
          R`Em $\Z$: $\langle a\rangle+\langle b\rangle=\langle\mdc(a,b)\rangle$ e $\langle a\rangle\cap\langle b\rangle=\langle\mmc(a,b)\rangle$.`
        ],
        cartoes: [
          { id: 'c3.2a', frente: R`O que é o ideal principal $\langle a\rangle$?`, verso: R`Num anel comutativo com unidade, $\langle a\rangle=\{ra\mid r\in R\}$, o menor ideal que contém $a$.` },
          { id: 'c3.2b', frente: R`Quantos ideais tem $\Z_n$?`, verso: R`Um para cada divisor positivo $d$ de $n$: os $\langle d\rangle$.` },
          { id: 'c3.2c', frente: R`Por que todo ideal de $\Z$ é principal?`, verso: R`Se $A\neq\{0\}$, seja $d$ o menor positivo de $A$. Para $a\in A$, $a=qd+r$ com $0\le r\lt d$ e $r=a-qd\in A$, logo $r=0$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Ideais gerados', html: R`
            <p>Seja $R$ um anel comutativo com unidade. Para $a\in R$, o conjunto $\langle a\rangle=\{ra\mid r\in R\}$ é um ideal, o <b>ideal principal gerado por $a$</b>. Mais geralmente,
            $$\begin{aligned}&\langle a_1,\dots,a_n\rangle=\\&\quad\{r_1a_1+\cdots+r_na_n\mid r_i\in R\}\end{aligned}$$
            é o <b>ideal gerado</b> por $a_1,\dots,a_n$: o menor ideal que contém esses elementos.</p>` },
          { t: 'atencao', titulo: 'Mesma notação, dois significados', html: R`<p>$\langle a\rangle$ também é a notação do subgrupo cíclico gerado por $a$. O contexto decide: em $\Z_{12}$, o subgrupo cíclico $\langle 8\rangle=\{0,8,4\}$ coincide com o ideal $\langle8\rangle=\{r\cdot8\}$; mas em $\Q$, o subgrupo aditivo gerado por $1$ é $\Z$, e o ideal $\langle1\rangle$ é $\Q$.</p>` },
          { t: 'teo', rotulo: 'Os ideais de ℤ', html: R`<p>Todo ideal de $\Z$ é da forma $\langle n\rangle=n\Z$, para um único $n\geq0$.</p>` },
          { t: 'exemplo', titulo: 'Demonstração', aberto: true, enunciado: R`Por que todo ideal de $\Z$ é principal?`, solucao: R`
            <p>Seja $A\neq\{0\}$ um ideal (o ideal nulo é $\langle0\rangle$). Como $a\in A\Rightarrow-a\in A$, $A$ tem elementos positivos; seja $d$ o menor deles. Claro que $\langle d\rangle\subset A$. Dado $a\in A$, divida: $a=qd+r$ com $0\le r\lt d$. Então $r=a-qd\in A$ e, pela escolha de $d$, $r=0$. Assim $a\in\langle d\rangle$. É a mesma demonstração de que todo subgrupo de $\Z$ é cíclico.</p>` },
          { t: 'html', html: R`
            <h3>Os ideais de $\Z_n$</h3>
            <p>Em $\Z_n$, os ideais são exatamente os subgrupos aditivos (por quê? todo subgrupo de $\Z_n$ é cíclico, $\langle d\rangle$, e $r\cdot(kd)=(rk)d$ continua nele). Há um para cada divisor positivo $d$ de $n$, e $\langle d\rangle$ tem $n/d$ elementos. Um gerador qualquer $a$ dá o mesmo ideal que $\mdc(a,n)$: em $\Z_{20}$, $\langle 8\rangle=\langle4\rangle=\{0,4,8,12,16\}$.</p>` },
          { t: 'lab', w: 'zn', n: 20, titulo: 'Os ideais de ℤ₂₀', html: R`A lista de ideais aparece no fim. Mude $n$ e compare com a lista dos divisores de $n$.` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'num', r: 6, p: R`Em $\Z$, $\langle12\rangle+\langle18\rangle=\langle d\rangle$, com $d\gt0$. Quem é $d$?`, rot: '$d=$', exp: R`$12u+18v$ percorre os múltiplos de $\mdc(12,18)=6$ (Bézout: $6=18-12$).` },
            { t: 'num', r: 36, p: R`Em $\Z$, $\langle12\rangle\cap\langle18\rangle=\langle m\rangle$, com $m\gt0$. Quem é $m$?`, rot: '$m=$', exp: R`Os múltiplos comuns de $12$ e $18$ são os múltiplos de $\mmc(12,18)=36$.` },
            { t: 'conjmod', n: 18, r: [0, 6, 12], p: R`Liste os elementos do ideal $\langle 12\rangle$ de $\Z_{18}$.`, exp: R`$\mdc(12,18)=6$, então $\langle12\rangle=\langle6\rangle=\{0,6,12\}$. Confira: $2\cdot12=24=6$.` },
            { t: 'num', r: 9, p: R`Quantos ideais tem $\Z_{36}$?`, exp: R`Os divisores de $36$: $1,2,3,4,6,9,12,18,36$. São $9$.` },
            { t: 'vf', p: R`$\langle4\rangle\cup\langle6\rangle$ é um ideal de $\Z$.`, r: false, exp: R`$6-4=2$ não está na união. A soma $\langle4\rangle+\langle6\rangle=\langle2\rangle$ é o menor ideal que contém os dois.` }
          ] },
          { t: 'alem', titulo: 'Para ir além', html: R`<p>Em $\Z$ e em $\Z_n$ todo ideal é principal. Em $\Z[x]$ não: o ideal $\langle x,2\rangle$ (polinômios com termo constante par) não é da forma $\langle f\rangle$. Já em $F[x]$, com $F$ corpo, todo ideal volta a ser principal, graças à divisão de polinômios. Esse é o tema de um dos seminários.</p>` },
          { t: 'reforco', geradores: ['ideais'] }
        ]
      },

      /* =============================================================== 3.3 */
      {
        id: 3,
        titulo: 'O anel quociente',
        resumo: [
          R`Se $A$ é ideal de $R$, as classes $r+A$ formam o <b>anel quociente</b> $R/A$, com $(r+A)+(s+A)=(r+s)+A$ e $(r+A)(s+A)=rs+A$.`,
          R`O produto só fica bem definido porque $A$ é ideal: com um subanel que não é ideal, a regra depende dos representantes.`,
          R`$r+A=s+A\iff r-s\in A$. Exemplo: $\Z/n\Z=\Z_n$.`
        ],
        cartoes: [
          { id: 'c3.3a', frente: R`Quando $r+A=s+A$?`, verso: R`Exatamente quando $r-s\in A$.` },
          { id: 'c3.3b', frente: R`Por que o produto $(r+A)(s+A)=rs+A$ exige que $A$ seja ideal?`, verso: R`Trocando representantes, $(r+a_1)(s+a_2)=rs+ra_2+a_1s+a_1a_2$; para cair em $rs+A$, é preciso $ra_2,a_1s\in A$: absorção.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Como $(R,+)$ é abeliano, todo ideal $A$ é um subgrupo normal de $(R,+)$, e já sabemos somar classes: $(r+A)+(s+A)=(r+s)+A$. A novidade é multiplicá-las:
            $$(r+A)(s+A)=rs+A.$$
            Para que isso faça sentido, o resultado não pode depender dos representantes escolhidos.</p>` },
          { t: 'teo', rotulo: 'Teorema (existência do anel quociente)', html: R`<p>Seja $A$ um subanel de $R$. O conjunto das classes $\{r+A\mid r\in R\}$ é um anel com as operações acima se, e somente se, $A$ é um ideal de $R$. Esse anel é o <b>anel quociente</b> $R/A$.</p>` },
          { t: 'pratica', titulo: 'Fixação: a parte central da demonstração', itens: [
            { t: 'lacunas', p: R`Suponha que $A$ é ideal, $r+A=r'+A$ e $s+A=s'+A$. Complete o argumento de que $rs+A=r's'+A$.`,
              texto: R`Escreva $r'=r+a_1$ e $s'=s+a_2$, com $a_1,a_2\in A$, o que é possível porque {{0}}. Então $r's'=rs+ra_2+a_1s+a_1a_2$. Os termos $ra_2$ e $a_1s$ estão em $A$ porque {{1}}; o termo $a_1a_2$ está em $A$ porque {{2}}. Somando, $r's'-rs\in A$, pois {{3}}. Logo $r's'+A=rs+A$.`,
              lac: [
                { op: ['r′ − r e s′ − s estão em A', 'A é fechado para o produto', 'R é comutativo', 'A tem unidade'], c: 0 },
                { op: ['A absorve produtos por elementos de R', 'A é um subgrupo de (R,+)', 'R tem unidade', 'a₁ e a₂ são invertíveis'], c: 0 },
                { op: ['A é fechado para o produto de seus elementos', 'A contém a unidade', 'a₁a₂ = 0', 'R é um domínio'], c: 0 },
                { op: ['A é fechado para a soma', 'A absorve produtos', 'r′s′ = rs', 'A é finito'], c: 0 }
              ],
              exp: R`<p>A hipótese “ideal” entrou só na segunda lacuna. É exatamente como, com grupos, a normalidade de $H$ garantia que $(aH)(bH)=abH$ estava bem definido.</p>` }
          ] },
          { t: 'exemplo', titulo: 'Exemplo: o que dá errado com um subanel', enunciado: R`Em $R=\Z\oplus\Z$, tome o subanel $S=\{(a,a)\mid a\in\Z\}$. Mostre que a regra $(r+S)(t+S)=rt+S$ não está bem definida.`, solucao: R`
            <p>$(0,0)+S=(1,1)+S$, pois $(1,1)-(0,0)\in S$. Multiplicando os dois representantes por $(1,0)$: $(0,0)(1,0)=(0,0)$ e $(1,1)(1,0)=(1,0)$. Mas $(1,0)-(0,0)=(1,0)\notin S$: as classes $(0,0)+S$ e $(1,0)+S$ são diferentes. A mesma classe, multiplicada pela mesma classe, daria dois resultados.</p>` },
          { t: 'html', html: R`
            <h3>Primeiros exemplos</h3>
            <ul><li>$\Z/n\Z=\{0+n\Z,\dots,(n-1)+n\Z\}$ é o nosso $\Z_n$: as contas módulo $n$ são as contas com classes.</li>
            <li>$2\Z/6\Z=\{0+6\Z,\ 2+6\Z,\ 4+6\Z\}$, com $(4+6\Z)(4+6\Z)=16+6\Z=4+6\Z$. A unidade é $4+6\Z$.</li>
            <li>$R/\{0\}$ é uma cópia de $R$, e $R/R$ tem um único elemento.</li></ul>` },
          { t: 'pratica', itens: [
            { t: 'num', r: 4, p: R`Quantos elementos tem $3\Z/12\Z$?`, exp: R`As classes de $0,3,6,9$: são $4$. (Em geral, $|n\Z/m\Z|=m/n$ quando $n\mid m$.)` },
            { t: 'escolha', p: R`Em $\Z/10\Z$, a classe $27+10\Z$ é igual a…`, op: [R`$7+10\Z$`, R`$2+10\Z$`, R`$27+\Z$`, R`$3+10\Z$`], c: 0, exp: R`$27-7=20\in10\Z$.` },
            { t: 'mod', n: 6, r: 2, p: R`Em $2\Z/6\Z$, o produto $(2+6\Z)(4+6\Z)$ é a classe de qual elemento de $\{0,2,4\}$?`, rot: '$=$', exp: R`$2\cdot4=8$ e $8-2=6\in6\Z$: a classe é $2+6\Z$.` }
          ] }
        ]
      },

      /* =============================================================== 3.4 */
      {
        id: 4,
        titulo: 'Calculando no quociente',
        resumo: [
          R`No quociente, <b>os elementos do ideal valem $0$</b>: em $R/\langle a\rangle$, troque $a$ por $0$.`,
          R`$\R[x]/\langle x^2+1\rangle$: toda classe é $a+bx+\langle x^2+1\rangle$, e $x^2=-1$ (é uma cópia de $\C$).`,
          R`$\Z_p[x]/\langle f\rangle$, com $\operatorname{grau}f=d$: $p^d$ elementos, os restos de grau menor que $d$.`,
          R`$\Z[i]/\langle a+bi\rangle$ com $\mdc(a,b)=1$: $a^2+b^2$ elementos, representados por $0,1,\dots,a^2+b^2-1$.`
        ],
        cartoes: [
          { id: 'c3.4a', frente: R`Em $\Z_2[x]/\langle x^2+x+1\rangle$, quanto vale $x^2$?`, verso: R`$x^2=-x-1=x+1$ (coeficientes em $\Z_2$).` },
          { id: 'c3.4b', frente: R`Quantos elementos tem $\Z_p[x]/\langle f\rangle$ se $f$ tem grau $d$?`, verso: R`$p^d$: os polinômios de grau menor que $d$ (restos da divisão por $f$).` },
          { id: 'c3.4c', frente: R`Em $\Z[i]/\langle 2+i\rangle$, $i$ é igual a qual inteiro?`, verso: R`$i=-2=3$, e o anel tem $5$ elementos: $0,1,2,3,4$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Dizer que $r+A=s+A$ é dizer que $r-s\in A$. Na prática: <b>os elementos do ideal podem ser tratados como $0$</b>, exatamente como fazemos em $\Z_{12}$ quando escrevemos $12=0$. Para calcular em $R/\langle a\rangle$, use a regra $a=0$ e simplifique.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: ℝ[x]/⟨x²+1⟩', enunciado: R`Calcule $(2x-1)(x+4)$ em $\R[x]/\langle x^2+1\rangle$ e explique por que toda classe tem a forma $a+bx+\langle x^2+1\rangle$.`, solucao: R`
            <p>Com $x^2=-1$: $(2x-1)(x+4)=2x^2+7x-4=-2+7x-4=7x-6$. (Omitimos o “$+\langle x^2+1\rangle$”.)</p>
            <p>Dividindo qualquer $f$ por $x^2+1$, $f=q\cdot(x^2+1)+(a+bx)$, e $f-(a+bx)\in\langle x^2+1\rangle$. Logo toda classe é a de um polinômio de grau $\le1$, e as contas são as de $\C$ com $x$ no papel de $i$: compare $(2i-1)(i+4)=-6+7i$.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: um corpo com 9 elementos, de novo', enunciado: R`Descreva $\Z_3[x]/\langle x^2+1\rangle$.`, solucao: R`
            <p>As classes são $a+bx$ com $a,b\in\Z_3$: $9$ elementos. A regra é $x^2=-1=2$. Por exemplo, $(1+x)(1+2x)=1+3x+2x^2=1+0+2\cdot2=5=2$. É o mesmo anel $\Z_3[i]$ do capítulo 2, com $x$ no lugar de $i$, e é um corpo.</p>` },
          { t: 'lab', w: 'quoc', p: 3, f: 'x^2+1', titulo: 'Experimente: ℤₚ[x]/⟨f⟩', html: R`Troque $p$ e $f$. Compare $x^2+1$ com $p=3$ (corpo) e com $p=2$ ou $p=5$ (não é corpo). Use os botões para alguns polinômios prontos.` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'poli', mod: 0, f: [1, 0, 1], r: 'x+7', p: R`Em $\R[x]/\langle x^2+1\rangle$, calcule $(x+2)(3-x)$ e responda na forma $ax+b$.`, exp: R`$(x+2)(3-x)=-x^2+x+6=1+x+6=x+7$.` },
            { t: 'poli', mod: 2, f: [1, 1, 0, 1], r: 'x^2+x', p: R`Em $\Z_2[x]/\langle x^3+x+1\rangle$, calcule $x^4$ (resposta com grau menor que $3$).`, dica: R`$x^3=x+1$ (lembre que $-1=1$ em $\Z_2$).`,
              exp: R`$x^4=x\cdot x^3=x(x+1)=x^2+x$.` },
            { t: 'tabua', p: R`O anel $\Z_2[x]/\langle x^2\rangle$ tem os elementos $0,1,x,x+1$, com a regra $x^2=0$. Complete a tábua de multiplicação.`,
              lin: ['1', 'x', 'x+1'], col: ['1', 'x', 'x+1'], cel: { t: 'poli', mod: 2, f: [0, 0, 1] },
              r: [['1', 'x', 'x+1'], ['x', '0', 'x'], ['x+1', 'x', '1']], dadas: [[true, true, true], [true, false, false], [true, false, false]],
              exp: R`$x\cdot x=0$, $x(x+1)=x^2+x=x$ e $(x+1)^2=x^2+2x+1=1$. Assim $x$ é nilpotente (e divisor de zero) e $x+1$ é invertível: esse anel não é domínio.` }
          ] },
          { t: 'html', html: R`
            <h3>Os inteiros gaussianos módulo um ideal</h3>
            <p>Em $\Z[i]/\langle 2+i\rangle$ vale $2+i=0$, ou seja, $i=-2$. Então também $(2+i)(2-i)=4-i^2=5=0$. Toda classe $a+bi$ é igual à classe do inteiro $a-2b$, que módulo $5$ é um de $0,1,2,3,4$. Esses cinco são distintos (seria preciso mostrar que, por exemplo, $1\notin\langle 2+i\rangle$), e o quociente tem $5$ elementos.</p>` },
          { t: 'video', src: 'videos/gauss-quociente.mp4', legenda: R`O ideal $\langle 2+i\rangle$ no plano e as cinco classes de $\Z[i]/\langle2+i\rangle$.` },
          { t: 'lab', w: 'gauss', a: 3, b: 2, titulo: 'Cada cor, uma classe', html: R`Os pontos com contorno são os múltiplos de $a+bi$. Note que o ideal é um “quadriculado” girado, e que as cores se repetem com o mesmo padrão: o plano fica dividido em $a^2+b^2$ classes.` },
          { t: 'pratica', itens: [
            { t: 'num', r: 13, p: R`Quantos elementos tem $\Z[i]/\langle3+2i\rangle$?`, exp: R`$3^2+2^2=13$. (No laboratório acima, conte as cores.)` },
            { t: 'mod', n: 13, r: 5, p: R`Em $\Z[i]/\langle3+2i\rangle$, a classe de $i$ é a de qual inteiro entre $0$ e $12$?`, rot: '$i=$',
              dica: R`De $3+2i=0$ vem $2i=-3$, e $13=0$. Multiplique por $2^{-1}=7$ (em $\Z_{13}$).`,
              exp: R`$i=-3\cdot7=-21=5$ (módulo $13$). Confira: $i^2=25=12=-1$ em $\Z_{13}$, como devia ser.` }
          ] },
          { t: 'reforco', geradores: ['quocpoli', 'quocgauss'] }
        ]
      },

      /* =============================================================== 3.5 */
      {
        id: 5,
        titulo: 'Ideais primos e maximais',
        resumo: [
          R`Num anel comutativo: $A$ é <b>primo</b> se $A\neq R$ e $ab\in A\Rightarrow a\in A$ ou $b\in A$; <b>maximal</b> se $A\neq R$ e não há ideal estritamente entre $A$ e $R$.`,
          R`$R$ comutativo com unidade: $R/A$ é domínio $\iff$ $A$ é primo; $R/A$ é corpo $\iff$ $A$ é maximal.`,
          R`Todo ideal maximal é primo (todo corpo é domínio). Em $\Z$: $\langle n\rangle$ é primo $\iff$ $n$ é primo ou $n=0$; maximal $\iff$ $n$ é primo.`
        ],
        cartoes: [
          { id: 'c3.5a', frente: R`Definição de ideal primo.`, verso: R`Ideal próprio $A$ de um anel comutativo tal que $ab\in A$ implica $a\in A$ ou $b\in A$.` },
          { id: 'c3.5b', frente: R`Definição de ideal maximal.`, verso: R`Ideal próprio $A$ tal que, se $B$ é ideal com $A\subset B\subset R$, então $B=A$ ou $B=R$.` },
          { id: 'c3.5c', frente: R`Como reconhecer primo e maximal pelo quociente?`, verso: R`($R$ comutativo com unidade) $A$ primo $\iff R/A$ domínio; $A$ maximal $\iff R/A$ corpo.` },
          { id: 'c3.5d', frente: R`Quais são os ideais maximais de $\Z_n$?`, verso: R`Os $\langle p\rangle$ com $p$ primo dividindo $n$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definições', html: R`
            <p>Seja $R$ um anel comutativo e $A$ um ideal <b>próprio</b> ($A\neq R$).</p>
            <ul><li>$A$ é <b>primo</b> se $a,b\in R$ e $ab\in A$ implicam $a\in A$ ou $b\in A$.</li>
            <li>$A$ é <b>maximal</b> se, sempre que $B$ é um ideal com $A\subset B\subset R$, tem-se $B=A$ ou $B=R$.</li></ul>` },
          { t: 'html', html: R`
            <p>O nome “primo” vem de $\Z$: $\langle p\rangle$ é primo exatamente quando $p\mid ab\Rightarrow p\mid a$ ou $p\mid b$, que é a propriedade dos números primos. Já $\langle 6\rangle$ não é primo: $2\cdot3\in\langle6\rangle$, mas $2,3\notin\langle6\rangle$.</p>
            <p>Os maximais de $\Z$: $\langle n\rangle\subset\langle m\rangle$ significa $m\mid n$. Então $\langle n\rangle$ é maximal quando $n$ não tem divisores além de $1$ e $n$: $n$ primo.</p>` },
          { t: 'teo', rotulo: 'Teorema (primo e maximal pelo quociente)', html: R`<p>Seja $R$ um anel comutativo com unidade e $A$ um ideal de $R$. Então:</p>
            <ol><li>$R/A$ é um domínio de integridade $\iff$ $A$ é primo;</li><li>$R/A$ é um corpo $\iff$ $A$ é maximal.</li></ol>
            <p><b>Corolário.</b> Todo ideal maximal é primo (porque todo corpo é domínio).</p>` },
          { t: 'exemplo', titulo: 'Demonstração de (1)', aberto: true, enunciado: R`Por que $R/A$ é domínio exatamente quando $A$ é primo?`, solucao: R`
            <p>$R/A$ é comutativo com unidade $1+A$, e $1+A\neq0+A$ exatamente quando $A\neq R$. O produto $(a+A)(b+A)=ab+A$ é nulo exatamente quando $ab\in A$; uma classe $a+A$ é nula quando $a\in A$. Logo “em $R/A$, produto nulo obriga fator nulo” se traduz, palavra por palavra, em “$ab\in A$ obriga $a\in A$ ou $b\in A$”.</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'grade', p: R`Use o critério do quociente.`, cab: ['primo?', 'maximal?'], linhas: [
              { rot: R`$\langle 7\rangle\subset\Z$`, r: [0, 0] },
              { rot: R`$\langle 10\rangle\subset\Z$`, r: [1, 1] },
              { rot: R`$\{0\}\subset\Z$`, r: [0, 1] },
              { rot: R`$\langle 3\rangle\subset\Z_{12}$`, r: [0, 0] },
              { rot: R`$\langle 4\rangle\subset\Z_{12}$`, r: [1, 1] },
              { rot: R`$\langle x^2+1\rangle\subset\Z_3[x]$`, r: [0, 0] },
              { rot: R`$\langle x^2+1\rangle\subset\Z_2[x]$`, r: [1, 1] }
            ], exp: R`<p>$\Z/\{0\}$ é uma cópia de $\Z$: domínio, não corpo. $\Z_{12}/\langle3\rangle$ tem $3$ elementos e é como $\Z_3$ (corpo); $\Z_{12}/\langle4\rangle$ é como $\Z_4$, onde $2\cdot2=0$. Em $\Z_2[x]$, $(x+1)^2=x^2+1$: o produto está no ideal e $x+1$ não.</p>` },
            { t: 'conjmod', r: [2, 5], p: R`Os ideais maximais de $\Z_{50}$ são da forma $\langle d\rangle$ com $d\mid50$. Liste esses $d$.`, exp: R`$\Z_{50}/\langle d\rangle$ é como $\Z_d$, corpo exatamente quando $d$ é primo: $d=2$ e $d=5$.` },
            { t: 'lacunas', p: R`Complete: por que todo ideal maximal é primo (num anel comutativo com unidade)?`,
              texto: R`Se $A$ é maximal, então $R/A$ é {{0}}. Todo corpo é {{1}}, logo $R/A$ é domínio. Pelo critério do quociente, isso significa que $A$ é {{2}}.`,
              lac: [{ op: ['um corpo', 'um domínio que não é corpo', 'finito', 'isomorfo a ℤ'], c: 0 }, { op: ['um domínio de integridade', 'finito', 'um ideal', 'não comutativo'], c: 0 }, { op: ['primo', 'maximal', 'principal', 'nulo'], c: 0 }],
              exp: R`<p>A recíproca é falsa: $\{0\}$ é primo em $\Z$, mas não é maximal ($\{0\}\subset2\Z\subset\Z$).</p>` }
          ] },
          { t: 'html', html: R`
            <h3>Polinômios de grau 2 ou 3 sobre $\Z_p$</h3>
            <p>Se $f\in\Z_p[x]$ tem grau $2$ ou $3$, então $\Z_p[x]/\langle f\rangle$ é corpo exatamente quando $f$ <b>não tem raízes</b> em $\Z_p$. Uma direção é fácil: se $f(r)=0$, então $f=(x-r)g$ com $\operatorname{grau}g\geq1$, e $(x-r)g=0$ no quociente com os dois fatores não nulos. Teste no laboratório: $x^2+x+1$ sobre $\Z_2$ não tem raízes (corpo com $4$ elementos); $x^2+1$ sobre $\Z_5$ tem as raízes $2$ e $3$ (não é corpo).</p>` },
          { t: 'alem', titulo: 'Para ir além', html: R`<p>A outra direção usa fatoração de polinômios: $\langle f\rangle$ é maximal em $F[x]$ exatamente quando $f$ é <b>irredutível</b>. É assim que se constroem todos os corpos finitos e o próprio $\C=\R[x]/\langle x^2+1\rangle$. Esse é o tema de um dos seminários.</p>` },
          { t: 'pratica', itens: [
            { t: 'escolha', p: R`Qual destes ideais é maximal em $\Z_5[x]$?`, op: [R`$\langle x^2+2\rangle$`, R`$\langle x^2+1\rangle$`, R`$\langle x^2-4\rangle$`, R`$\langle x^2\rangle$`], c: 0,
              exp: R`Os quadrados em $\Z_5$ são $0,1,4,4,1$. $x^2=-2=3$ não tem solução, então $x^2+2$ não tem raízes e o quociente é corpo (com $25$ elementos). Os outros têm raízes: $x^2+1$ ($x=2,3$), $x^2-4$ ($x=2,3$), $x^2$ ($x=0$).` }
          ] },
          { t: 'reforco', geradores: ['maximal'] }
        ]
      },

      /* =============================================================== 3.6 */
      {
        id: 6,
        titulo: 'Revisão do capítulo',
        resumo: [R`Ideal, teste do ideal, ideais principais, $R/A$, primo $\leftrightarrow$ domínio, maximal $\leftrightarrow$ corpo.`],
        cartoes: [
          { id: 'c3.6a', frente: R`Por que os únicos ideais de um corpo são $\{0\}$ e ele mesmo?`, verso: R`Um ideal não nulo contém um invertível, e então contém $1$ e é o corpo todo.` }
        ],
        blocos: [
          { t: 'pratica', titulo: 'Revisão', itens: [
            { t: 'vf', p: R`Se $A$ e $B$ são ideais de $R$, então $A\cap B$ é ideal de $R$.`, r: true, exp: R`Diferenças e produtos por elementos de $R$ ficam em $A$ e em $B$.` },
            { t: 'vf', p: R`$\Z_6/\langle 2\rangle$ é um corpo.`, r: true, exp: R`$\langle2\rangle=\{0,2,4\}$ tem índice $2$; o quociente tem $2$ elementos e é como $\Z_2$. Como $2$ é primo, $\langle2\rangle$ é maximal em $\Z_6$.` },
            { t: 'num', r: 8, p: R`Quantos elementos tem $\Z_2[x]/\langle x^3+x+1\rangle$?`, exp: R`$2^3=8$: os polinômios $a+bx+cx^2$ com $a,b,c\in\Z_2$. (É um corpo: $x^3+x+1$ não tem raízes em $\Z_2$.)` },
            { t: 'poli', mod: 3, f: [1, 0, 1], r: '2x', p: R`Em $\Z_3[x]/\langle x^2+1\rangle$, calcule $x^{-1}$.`, dica: R`$x\cdot x=x^2=-1$. Então $x\cdot(-x)=1$.`, exp: R`$x\cdot(-x)=-x^2=1$, logo $x^{-1}=-x=2x$.` },
            { t: 'escolha', p: R`Em $\Z\oplus\Z$, o ideal $\{(a,0)\mid a\in\Z\}$ é…`, op: ['primo, mas não maximal', 'maximal', 'nem primo', 'o anel todo'], c: 0,
              exp: R`$(a,b)(c,d)=(ac,bd)$ está no ideal quando $bd=0$, isto é, $b=0$ ou $d=0$: primo. Não é maximal, pois está contido em $\{(a,2b)\}$, que é ideal próprio.` },
            { t: 'aberta', p: R`Seja $R$ comutativo com unidade e $a\in R$. Mostre que $\langle a\rangle=R$ se, e somente se, $a$ é invertível.`,
              modelo: R`Se $a$ é invertível, $\langle a\rangle$ contém um invertível, logo é $R$. Se $\langle a\rangle=R$, então $1\in\langle a\rangle$: existe $r$ com $ra=1$, e $a$ é invertível.` }
          ] }
        ]
      }
    ]
  });
})();
