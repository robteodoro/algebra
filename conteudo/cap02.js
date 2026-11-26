/* Capítulo 2 — Domínios de integridade e corpos: divisores de zero, cancelamento, corpos,
   característica, idempotentes e nilpotentes. "Divisor de zero" só em anéis comutativos;
   em M_2(Z), "produto nulo com fatores não nulos". Use R`...`; nunca o par "cifrão + chave". */
(function () {
  L.registrarCapitulo({
    num: 2,
    titulo: 'Domínios de integridade e corpos',
    subtitulo: 'Quando um produto nulo obriga um fator nulo, quando se pode dividir, e o que a característica conta.',

    secoes: [
      /* =============================================================== 2.1 */
      {
        id: 1,
        titulo: 'Divisores de zero',
        resumo: [
          R`Num anel comutativo $R$, um <b>divisor de zero</b> é um $a\neq0$ tal que $ab=0$ para algum $b\neq0$.`,
          R`Um elemento invertível nunca é divisor de zero.`,
          R`Em $\Z_n$, todo $a\neq0$ é invertível (se $\mdc(a,n)=1$) ou divisor de zero (se $\mdc(a,n)\gt1$).`
        ],
        cartoes: [
          { id: 'c2.1a', frente: R`O que é um divisor de zero?`, verso: R`Num anel comutativo, um elemento $a\neq0$ para o qual existe $b\neq0$ com $ab=0$.` },
          { id: 'c2.1b', frente: R`Por que um invertível não pode ser divisor de zero?`, verso: R`Se $a$ é invertível e $ab=0$, então $b=a^{-1}ab=a^{-1}0=0$.` },
          { id: 'c2.1c', frente: R`Quem são os divisores de zero de $\Z_n$?`, verso: R`Os $a\neq0$ com $\mdc(a,n)\gt1$: se $d=\mdc(a,n)$, então $a\cdot\frac nd=0$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Em $\Z$, se $ab=0$ então $a=0$ ou $b=0$. É isso que nos deixa resolver $(x-2)(x-3)=0$ dizendo “$x=2$ ou $x=3$”. Em muitos anéis essa propriedade <b>falha</b>:</p>
            <ul><li>em $\Z_6$: $2\cdot3=0$;</li><li>em $\Z\oplus\Z$: $(1,0)(0,1)=(0,0)$;</li>
            <li>nas funções $\R\to\R$: $f$ nula para $x\le0$ e $g$ nula para $x\ge0$, ambas não nulas, com $fg=0$.</li></ul>` },
          { t: 'teo', rotulo: 'Definição (divisor de zero)', html: R`<p>Seja $R$ um anel comutativo. Um elemento <b>não nulo</b> $a\in R$ é um <b>divisor de zero</b> se existe $b\in R$, $b\neq0$, com $ab=0$.</p>` },
          { t: 'atencao', titulo: 'Detalhes da definição', html: R`
            <ul><li>O $0$ não é divisor de zero (por definição, divisores de zero são não nulos).</li>
            <li>Só falamos de divisores de zero em anéis <b>comutativos</b>. Em $M_2(\Z)$, dizemos que há <b>produtos nulos com fatores não nulos</b>, como $\begin{bmatrix}0&1\\0&0\end{bmatrix}^2=0$.</li></ul>` },
          { t: 'teo', rotulo: 'Invertível ou divisor de zero', html: R`
            <p>(i) Num anel comutativo com unidade, um elemento invertível não é divisor de zero.</p>
            <p>(ii) Em $\Z_n$, todo elemento não nulo é invertível ou divisor de zero: $a$ é invertível se $\mdc(a,n)=1$; se $d=\mdc(a,n)\gt1$, então $a\cdot\frac nd=0$ com $\frac nd\neq0$.</p>` },
          { t: 'video', src: 'videos/multiplicar-zn.mp4', legenda: R`Multiplicar por $a$ em $\Z_{12}$: quando $x\mapsto ax$ é bijetora, $a$ é invertível; quando colapsa, $a$ é divisor de zero.` },
          { t: 'lab', w: 'zn', n: 18, titulo: 'Os dois tipos de elemento de ℤₙ', html: R`Linhas verdes: invertíveis (têm um $1$). Linhas vermelhas: divisores de zero (têm um $0$ fora da coluna do $0$). Em $\Z_n$ não há terceira possibilidade.` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'conjmod', n: 18, r: [2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16], p: R`Liste os divisores de zero de $\Z_{18}$.`,
              exp: R`São os $a\neq0$ com $\mdc(a,18)\gt1$, ou seja, os múltiplos de $2$ ou de $3$: $2,3,4,6,8,9,10,12,14,15,16$. Os outros seis, $1,5,7,11,13,17$, são invertíveis.` },
            { t: 'mod', n: 15, r: [3, 6, 9, 12], p: R`Em $\Z_{15}$, dê um $b\neq0$ com $10b=0$.`, rot: '$b=$', exp: R`$\mdc(10,15)=5$, e $10\cdot3=30=0$. Também servem $6$, $9$ e $12$.` },
            { t: 'vf', p: R`Em $\Z\oplus\Z$, todo elemento não nulo é invertível ou divisor de zero.`, r: false,
              exp: R`$(2,3)$ não é invertível (só $(\pm1,\pm1)$ são) e não é divisor de zero: $(2,3)(c,d)=(0,0)$ obriga $c=d=0$. A dicotomia de $\Z_n$ depende de $\Z_n$ ser <b>finito</b>.` },
            { t: 'escolha', p: R`Em qual destes anéis existe um divisor de zero?`, op: [R`$\Z_2\oplus\Z_2$`, R`$\Z_7$`, R`$\Z$`, R`$\Q$`], c: 0, exp: R`$(1,0)(0,1)=(0,0)$ em $\Z_2\oplus\Z_2$.` }
          ] },
          { t: 'reforco', geradores: ['divzero'] }
        ]
      },

      /* =============================================================== 2.2 */
      {
        id: 2,
        titulo: 'Domínios de integridade e o cancelamento',
        resumo: [
          R`<b>Domínio de integridade</b>: anel comutativo com unidade e sem divisores de zero ($ab=0\Rightarrow a=0$ ou $b=0$).`,
          R`Exemplos: $\Z$, $\Z[i]$, $\Z[x]$, $\Z[\sqrt2\,]$, $\Z_p$ ($p$ primo). Não são: $\Z_n$ ($n$ composto), $\Z\oplus\Z$.`,
          R`<b>Cancelamento</b>: num domínio, $ab=ac$ e $a\neq0$ implicam $b=c$.`
        ],
        cartoes: [
          { id: 'c2.2a', frente: R`Definição de domínio de integridade.`, verso: R`Anel comutativo com unidade sem divisores de zero.` },
          { id: 'c2.2b', frente: R`Lei do cancelamento num domínio: enunciado e demonstração.`, verso: R`Se $a\neq0$ e $ab=ac$, então $a(b-c)=0$; como não há divisores de zero, $b-c=0$.` },
          { id: 'c2.2c', frente: R`Num domínio, quais são as soluções de $x^2=x$?`, verso: R`$x(x-1)=0$, logo $x=0$ ou $x=1$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definição', html: R`<p>Um <b>domínio de integridade</b> é um anel comutativo com unidade que não tem divisores de zero. Equivalentemente: $ab=0$ implica $a=0$ ou $b=0$.</p>` },
          { t: 'html', html: R`
            <p><b>São domínios:</b> $\Z$; $\Q$, $\R$, $\C$; $\Z[i]$ e $\Z[\sqrt d\,]$ (são subanéis de $\C$ com a unidade $1$, e em $\C$ não há divisores de zero); $\Z[x]$ (o coeficiente líder de um produto é o produto dos coeficientes líderes); $\Z_p$ com $p$ primo.</p>
            <p><b>Não são:</b> $\Z_n$ com $n$ composto ($n=rs$ dá $r\cdot s=0$); $\Z\oplus\Z$; $M_2(\Z)$ (nem é comutativo); $2\Z$ (não tem unidade).</p>` },
          { t: 'teo', rotulo: 'Teorema (cancelamento)', html: R`<p>Sejam $a,b,c$ elementos de um domínio de integridade. Se $a\neq0$ e $ab=ac$, então $b=c$.</p>` },
          { t: 'exemplo', titulo: 'Demonstração', aberto: true, enunciado: R`Por que o cancelamento vale num domínio?`, solucao: R`
            <p>De $ab=ac$ vem $ab-ac=0$, isto é, $a(b-c)=0$. Como $a\neq0$ e não há divisores de zero, $b-c=0$. Reciprocamente, num anel comutativo com unidade em que vale o cancelamento, $ab=0=a0$ com $a\neq0$ dá $b=0$: não há divisores de zero. As duas propriedades são equivalentes.</p>` },
          { t: 'pratica', titulo: 'Fixação: a ficha técnica', itens: [
            { t: 'grade', p: R`Complete a ficha.`, cab: ['comutativo?', 'tem unidade?', 'tem divisor de zero?', 'domínio?'], linhas: [
              { rot: R`$\Z_{9}$`, r: [0, 0, 0, 1] },
              { rot: R`$\Z_{11}$`, r: [0, 0, 1, 0] },
              { rot: R`$3\Z$`, r: [0, 1, 1, 1] },
              { rot: R`$\Z[x]$`, r: [0, 0, 1, 0] },
              { rot: R`$\Z_3\oplus\Z$`, r: [0, 0, 0, 1] }
            ], exp: R`<p>$\Z_9$: $3\cdot3=0$. $3\Z$ não tem unidade, logo não é domínio (mas também não tem divisores de zero!). Em $\Z_3\oplus\Z$: $(1,0)(0,1)=(0,0)$.</p>` },
            { t: 'escolha', p: R`Em $\Z_{12}$, vale $4\cdot2=4\cdot5$. O que isso mostra?`, op: [R`Que o cancelamento falha: $\Z_{12}$ não é domínio.`, R`Que $2=5$ em $\Z_{12}$.`, R`Que $4$ é invertível.`, R`Nada: é só uma coincidência.`], c: 0,
              exp: R`$4\cdot2=8=20=4\cdot5$, mas $2\neq5$. Em termos de divisores de zero: $4(5-2)=4\cdot3=12=0$.` },
            { t: 'aberta', p: R`Mostre que num domínio de integridade as únicas soluções de $x^2=1$ são $x=1$ e $x=-1$. Encontre em $\Z_{15}$ uma solução diferente de $\pm1$.`,
              modelo: R`$x^2-1=(x-1)(x+1)=0$, e num domínio um dos fatores é zero: $x=1$ ou $x=-1$. Em $\Z_{15}$: $4^2=16=1$ (e também $11^2=121=1$), com $4\neq\pm1$.` }
          ] }
        ]
      },

      /* =============================================================== 2.3 */
      {
        id: 3,
        titulo: 'Corpos',
        resumo: [
          R`<b>Corpo</b>: anel comutativo com unidade em que todo elemento não nulo é invertível.`,
          R`Todo corpo é domínio. Todo domínio <b>finito</b> é corpo. ($\Z$ é domínio infinito e não é corpo.)`,
          R`$\Z_n$ é corpo $\iff$ $\Z_n$ é domínio $\iff$ $n$ é primo.`
        ],
        cartoes: [
          { id: 'c2.3a', frente: R`Definição de corpo.`, verso: R`Anel comutativo com unidade em que todo elemento não nulo é invertível.` },
          { id: 'c2.3b', frente: R`Por que todo domínio finito é corpo?`, verso: R`Para $a\neq0$, $x\mapsto ax$ é injetora (cancelamento); num conjunto finito, injetora é sobrejetora, então $ax=1$ para algum $x$.` },
          { id: 'c2.3c', frente: R`Um corpo com $9$ elementos.`, verso: R`$\Z_3[i]=\{a+bi\mid a,b\in\Z_3\}$, com $i^2=-1$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definição', html: R`<p>Um <b>corpo</b> é um anel comutativo com unidade em que todo elemento não nulo é invertível. Num corpo, “dividir por $a\neq0$” faz sentido: $b/a=ba^{-1}$.</p>` },
          { t: 'html', html: R`<p>Exemplos: $\Q$, $\R$, $\C$, $\Z_p$ com $p$ primo. Também $\Q[\sqrt2\,]=\{a+b\sqrt2\mid a,b\in\Q\}$: racionalizando,
            $$\frac1{a+b\sqrt2}=\frac{a}{a^2-2b^2}-\frac{b}{a^2-2b^2}\sqrt2,$$ e $a^2-2b^2\neq0$ se $(a,b)\neq(0,0)$, porque $\sqrt2$ é irracional.</p>` },
          { t: 'teo', rotulo: 'Teorema', html: R`<p>(i) Todo corpo é um domínio de integridade.</p><p>(ii) Todo domínio de integridade <b>finito</b> é um corpo.</p><p>Em particular, $\Z_p$ é corpo para todo primo $p$.</p>` },
          { t: 'exemplo', titulo: 'Demonstração', aberto: true, enunciado: R`Por que valem (i) e (ii)?`, solucao: R`
            <p>(i) Num corpo, se $ab=0$ e $a\neq0$, então $b=a^{-1}(ab)=a^{-1}0=0$.</p>
            <p>(ii) Seja $D$ um domínio finito e $a\neq0$. A função $x\mapsto ax$ de $D$ em $D$ é injetora: $ax=ay$ implica $x=y$ pelo cancelamento. Uma função injetora de um conjunto finito nele mesmo é sobrejetora, então existe $x$ com $ax=1$. Logo $a$ é invertível.</p>` },
          { t: 'dica', titulo: 'Para lembrar', html: R`<p>$$\begin{aligned}&\text{corpos}\\ \subset\ &\text{domínios}\\ \subset\ &\text{anéis comutativos com unidade}.\end{aligned}$$ As inclusões são estritas: $\Z$ é domínio e não é corpo; $\Z_6$ é comutativo com unidade e não é domínio. Para anéis <b>finitos</b>, as duas primeiras classes coincidem.</p>` },
          { t: 'lab', w: 'zn', n: 7, titulo: 'Compare ℤ₇ com ℤ₈', html: R`Em $\Z_7$ todas as linhas não nulas passam por todos os elementos. Troque para $n=8$ e veja o que acontece.` },
          { t: 'exemplo', titulo: 'Exemplo: um corpo com 9 elementos', enunciado: R`Mostre que $\Z_3[i]=\{a+bi\mid a,b\in\Z_3\}$, com $i^2=-1$, é um corpo.`, solucao: R`
            <p>É comutativo, com unidade $1$ e $9$ elementos. Como é finito, basta ver que é domínio. Note que $(a+bi)(a-bi)=a^2+b^2$, e em $\Z_3$ os quadrados são $0,1,1$; logo $a^2+b^2=0$ só se $a=b=0$. Assim, para $a+bi\neq0$, $c=a^2+b^2$ é invertível em $\Z_3$ e
            $$(a+bi)^{-1}=c^{-1}(a-bi).$$
            Por exemplo, $(1+i)^{-1}=2^{-1}(1-i)=2(1+2i)=2+i$; confira: $(1+i)(2+i)=2+3i+i^2=1+0i=1$.</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'poli', v: 'i', mod: 3, r: '2+2i', p: R`Em $\Z_3[i]$, calcule $(1+2i)^{-1}$.`, dica: R`$(1+2i)(1-2i)=1+4=5=2$ em $\Z_3$, e $2^{-1}=2$.`,
              exp: R`$(1+2i)^{-1}=2^{-1}(1-2i)=2(1+i)=2+2i$. Confira: $(1+2i)(2+2i)=2+2i+4i+4i^2=(2-4)+6i=-2=1$ em $\Z_3$.` },
            { t: 'escolha', p: R`$\Z_5[i]$ é um corpo?`, op: ['Não: $(2+i)(2-i)=0$.', 'Sim: é finito.', 'Sim: $5$ é primo.', 'Não: não tem unidade.'], c: 0,
              exp: R`$(2+i)(2-i)=4-i^2=5=0$ em $\Z_5$: há divisores de zero. Ser finito não basta; é preciso ser domínio.` },
            { t: 'vf', p: R`Todo domínio de integridade é um corpo.`, r: false, exp: R`$\Z$ é domínio, e $2$ não tem inverso em $\Z$. O teorema só vale para domínios finitos.` },
            { t: 'vf', p: R`Um subanel de um corpo, que contenha a unidade do corpo, é sempre um domínio de integridade.`, r: true,
              exp: R`Ele é comutativo, tem unidade e herda a ausência de divisores de zero. É assim que se vê que $\Z[i]\subset\C$ é domínio. Mas não precisa ser corpo: $\Z\subset\Q$.` },
            { t: 'mod', n: 13, r: 9, p: R`No corpo $\Z_{13}$, calcule $\dfrac{5}{2}$, isto é, $5\cdot2^{-1}$.`, rot: '$=$', exp: R`$2^{-1}=7$ ($2\cdot7=14=1$), então $5\cdot7=35=9$. Confira: $2\cdot9=18=5$.` }
          ] },
          { t: 'reforco', geradores: ['zpi'] }
        ]
      },

      /* =============================================================== 2.4 */
      {
        id: 4,
        titulo: 'Característica',
        resumo: [
          R`$\car R$ é o menor inteiro $n\geq1$ com $nx=0$ para todo $x\in R$; se não existir, $\car R=0$.`,
          R`Com unidade: $\car R$ é a ordem aditiva de $1$ (ou $0$, se ela for infinita), pois $nx=(n\cdot1)x$.`,
          R`A característica de um domínio de integridade é $0$ ou um número primo.`,
          R`$\car\Z_n=n$, $\car\Z=\car\Q=0$, $\car(\Z_m\oplus\Z_n)=\mmc(m,n)$.`
        ],
        cartoes: [
          { id: 'c2.4a', frente: R`Definição de característica.`, verso: R`O menor $n\geq1$ tal que $nx=0$ para todo $x\in R$; se não existir, $\car R=0$.` },
          { id: 'c2.4b', frente: R`Como calcular a característica de um anel com unidade?`, verso: R`É a ordem de $1$ no grupo $(R,+)$; se $1$ tem ordem infinita, é $0$.` },
          { id: 'c2.4c', frente: R`Por que a característica de um domínio é $0$ ou primo?`, verso: R`Se $\car D=n=st$ com $1\lt s,t\lt n$, então $0=n\cdot1=(s\cdot1)(t\cdot1)$, e um dos fatores seria $0$, contra a minimalidade de $n$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definição', html: R`<p>A <b>característica</b> de um anel $R$, $\car R$, é o menor inteiro positivo $n$ tal que $nx=0$ para todo $x\in R$. Se não existe tal $n$, dizemos que $\car R=0$.</p>` },
          { t: 'html', html: R`<p>Exemplos: $\car\Z_n=n$; $\car\Z=\car\Q=\car\R=0$. E $\car\Z_3[x]=3$: o anel é infinito, mas $3f(x)=0$ para todo polinômio $f$.</p>` },
          { t: 'teo', rotulo: 'Teorema (característica de um anel com unidade)', html: R`<p>Seja $R$ um anel com unidade. Se $1$ tem ordem infinita no grupo $(R,+)$, então $\car R=0$; se $1$ tem ordem $n$, então $\car R=n$.</p>` },
          { t: 'exemplo', titulo: 'Por quê?', aberto: true, enunciado: R`Justifique o teorema.`, solucao: R`
            <p>Para todo $x$, $nx=x+\cdots+x=(1+\cdots+1)x=(n\cdot1)x$ (distributiva). Logo, se $n\cdot1=0$, então $nx=0$ para todo $x$; e se $nx=0$ para todo $x$, em particular $n\cdot1=0$. Assim, o menor $n$ que anula todos os elementos é o menor que anula $1$.</p>` },
          { t: 'teo', rotulo: 'Teorema (característica de um domínio)', html: R`<p>A característica de um domínio de integridade é $0$ ou um número primo.</p>` },
          { t: 'pratica', titulo: 'Fixação: a demonstração', itens: [
            { t: 'lacunas', p: R`Complete a demonstração do teorema acima.`,
              texto: R`Seja $D$ um domínio com $\car D=n\gt0$, e suponha que $n=st$ com $1\le s,t\le n$. Pela distributiva, $0=n\cdot1=$ {{0}}. Como $D$ {{1}}, temos $s\cdot1=0$ ou $t\cdot1=0$. Pelo teorema anterior, $\car D$ é a {{2}}, então $n\le s$ ou $n\le t$. Logo $s=n$ ou $t=n$, e $n$ só tem os divisores triviais. Além disso, $n\neq1$, porque {{3}}. Portanto $n$ é primo.`,
              lac: [
                { op: ['(s·1)(t·1)', 's·t·1·1', '(s+1)(t+1)', 's·1 + t·1'], c: 0 },
                { op: ['não tem divisores de zero', 'é finito', 'tem unidade', 'é comutativo'], c: 0 },
                { op: ['ordem aditiva de 1', 'quantidade de elementos de D', 'ordem multiplicativa de 1', 'menor elemento não nulo'], c: 0 },
                { op: ['1·1 = 1 ≠ 0 (a unidade não é nula)', 'D é infinito', 'todo primo é maior que 1', 'D é comutativo'], c: 0 }
              ],
              exp: R`<p>Cuidado: a recíproca é falsa. $\Z_3\oplus\Z_3$ tem característica $3$ e não é domínio, pois $(1,0)(0,1)=(0,0)$.</p>` },
            { t: 'num', r: 12, p: R`Qual é a característica de $\Z_6\oplus\Z_4$?`, exp: R`A ordem de $(1,1)$ é $\mmc(6,4)=12$.` },
            { t: 'num', r: 0, p: R`Qual é a característica de $2\Z$?`, exp: R`Para nenhum $n\geq1$ vale $nx=0$ para todo $x\in2\Z$ (por exemplo, $n\cdot2=2n\neq0$). A característica é $0$. Repare que aqui não há unidade, então usamos a definição diretamente.` },
            { t: 'num', r: 5, p: R`Qual é a característica de $M_2(\Z_5)$?`, exp: R`A unidade é $I$, e $kI=0$ exatamente quando $5\mid k$.` },
            { t: 'escolha', p: R`Um domínio de integridade $D$ satisfaz $14\cdot1=0$. Quanto pode ser $\car D$?`, op: [R`$2$ ou $7$`, R`$14$`, R`$1$, $2$, $7$ ou $14$`, R`$0$`], c: 0,
              exp: R`A ordem de $1$ divide $14$, então é $1,2,7$ ou $14$; como $\car D$ é primo (não é $0$, pois $14\cdot1=0$), sobram $2$ e $7$.` }
          ] },
          { t: 'html', html: R`
            <h3>Um fato curioso em característica 2</h3>
            <p>Se $\car R=2$ e $R$ é comutativo, então $2xy=0$, e portanto $(x+y)^2=x^2+2xy+y^2=x^2+y^2$. Por exemplo, em $\Z_2[x]$: $(x+1)^2=x^2+1$.</p>` },
          { t: 'pratica', itens: [
            { t: 'poli', mod: 2, r: 'x^4+1', p: R`Em $\Z_2[x]$, expanda $(x+1)^4$.`, exp: R`$(x+1)^4=\big((x+1)^2\big)^2=(x^2+1)^2=x^4+1$. (Em $\Z[x]$, seria $x^4+4x^3+6x^2+4x+1$; todos os coeficientes do meio são pares.)` }
          ] },
          { t: 'reforco', geradores: ['car'] }
        ]
      },

      /* =============================================================== 2.5 */
      {
        id: 5,
        titulo: 'Idempotentes, nilpotentes e equações em ℤₙ',
        resumo: [
          R`$a$ é <b>idempotente</b> se $a^2=a$; <b>nilpotente</b> se $a^k=0$ para algum $k\geq1$.`,
          R`Num domínio, os únicos idempotentes são $0$ e $1$, e o único nilpotente é $0$.`,
          R`Num domínio, uma equação $(x-r)(x-s)=0$ só tem as soluções $r$ e $s$. Em $\Z_n$ composto, pode haver mais.`
        ],
        cartoes: [
          { id: 'c2.5a', frente: R`Idempotentes de $\Z_6$ e de $\Z_{10}$.`, verso: R`$\Z_6$: $0,1,3,4$. $\Z_{10}$: $0,1,5,6$.` },
          { id: 'c2.5b', frente: R`Quantas soluções tem $x^2=1$ em $\Z_8$?`, verso: R`Quatro: $1,3,5,7$. Num domínio, seriam só $\pm1$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definições', html: R`<p>Um elemento $a$ de um anel é <b>idempotente</b> quando $a^2=a$ e <b>nilpotente</b> quando $a^k=0$ para algum inteiro $k\geq1$.</p>` },
          { t: 'html', html: R`
            <p>$0$ e $1$ são sempre idempotentes, e $0$ é sempre nilpotente. Os outros denunciam que o anel não é domínio:</p>
            <ul><li>se $a^2=a$, então $a(a-1)=0$; num domínio, $a=0$ ou $a=1$;</li>
            <li>se $a^k=0$ com $k$ mínimo e $a\neq0$, então $k\geq2$ e $a\cdot a^{k-1}=0$ com $a^{k-1}\neq0$: $a$ é divisor de zero.</li></ul>
            <p>Em $\Z_{12}$: os idempotentes são $0,1,4,9$ ($4^2=16=4$, $9^2=81=9$); os nilpotentes são $0$ e $6$ ($6^2=36=0$).</p>` },
          { t: 'pratica', titulo: 'Fixação', itens: [
            { t: 'conjmod', n: 15, r: [0, 1, 6, 10], p: R`Liste os idempotentes de $\Z_{15}$.`, exp: R`$6^2=36=6$ e $10^2=100=10$ em $\Z_{15}$. Os demais não servem (teste!).` },
            { t: 'conjmod', n: 27, r: [0, 3, 6, 9, 12, 15, 18, 21, 24], p: R`Liste os nilpotentes de $\Z_{27}$.`, exp: R`$a^k$ é múltiplo de $27=3^3$ para algum $k$ exatamente quando $3\mid a$. Por exemplo, $3^3=27=0$.` },
            { t: 'tabua', p: R`Complete as casas vazias da tábua de multiplicação de $\Z_6$ e localize os idempotentes na diagonal.`,
              lin: ['1', '2', '3', '4', '5'], col: ['1', '2', '3', '4', '5'], cel: { t: 'mod', n: 6 },
              r: [[1, 2, 3, 4, 5], [2, 4, 0, 2, 4], [3, 0, 3, 0, 3], [4, 2, 0, 4, 2], [5, 4, 3, 2, 1]],
              dadas: [[true, true, true, true, true], [true, false, false, false, true], [true, false, false, false, true], [true, false, false, false, true], [true, true, true, true, true]],
              exp: R`Na diagonal, $3\cdot3=3$ e $4\cdot4=4$: os idempotentes são $0,1,3,4$. E as casas com $0$ mostram os divisores de zero $2,3,4$.` }
          ] },
          { t: 'html', html: R`
            <h3>Resolver equações</h3>
            <p>Em $\Z_7$ (corpo), $x^2-1=(x-1)(x+1)=0$ tem só as soluções $1$ e $6$. Em $\Z_8$, a mesma equação tem quatro: $1,3,5,7$. A fatoração vale nos dois anéis; o que muda é que em $\Z_8$ um produto nulo não obriga um fator nulo ($3-1=2$ e $3+1=4$, e $2\cdot4=0$).</p>` },
          { t: 'lab', w: 'zn', n: 8, titulo: 'Os quadrados em ℤ₈', html: R`Olhe a diagonal da tábua: ela mostra $a^2$ para cada $a$.` },
          { t: 'pratica', itens: [
            { t: 'conjmod', n: 15, r: [1, 4, 11, 14], p: R`Resolva $x^2=1$ em $\Z_{15}$.`, exp: R`$1^2=1$, $4^2=16=1$, $11^2=121=1$, $14^2=196=1$. São $4$ soluções.` },
            { t: 'conjmod', n: 11, r: [3, 8], p: R`Resolva $x^2=9$ em $\Z_{11}$.`, exp: R`$\Z_{11}$ é corpo: $(x-3)(x+3)=0$ dá $x=3$ ou $x=-3=8$.` },
            { t: 'vf', p: R`Em qualquer anel comutativo com unidade, se $a$ é nilpotente então $a$ não é invertível.`, r: true,
              exp: R`Se $a^k=0$ e $a$ tivesse inverso, $1=(a^{-1})^ka^k=0$, absurdo.` }
          ] },
          { t: 'reforco', geradores: ['equacao', 'idemnil'] }
        ]
      },

      /* =============================================================== 2.6 */
      {
        id: 6,
        titulo: 'Revisão do capítulo',
        resumo: [R`Divisores de zero, domínios, corpos, característica, idempotentes e nilpotentes.`],
        cartoes: [
          { id: 'c2.6a', frente: R`Dê um domínio infinito de característica $p$.`, verso: R`$\Z_p[x]$, os polinômios com coeficientes em $\Z_p$.` }
        ],
        blocos: [
          { t: 'pratica', titulo: 'Revisão', itens: [
            { t: 'escolha', p: R`Qual destes é um domínio de integridade infinito de característica $5$?`, op: [R`$\Z_5[x]$`, R`$\Z_5\oplus\Z$`, R`$\Z_5$`, R`$5\Z$`], c: 0,
              exp: R`$\Z_5[x]$: o produto de polinômios não nulos tem coeficiente líder não nulo (produto em $\Z_5$, que é corpo). $\Z_5\oplus\Z$ tem divisores de zero e característica $0$.` },
            { t: 'vf', p: R`Um corpo finito pode ter característica $0$.`, r: false, exp: R`Num anel finito, $1$ tem ordem aditiva finita, então a característica é positiva (e, num corpo, prima).` },
            { t: 'grade', p: R`Classifique.`, cab: ['domínio?', 'corpo?'], linhas: [
              { rot: R`$\Z_{17}$`, r: [0, 0] }, { rot: R`$\Z[\sqrt5\,]$`, r: [0, 1] }, { rot: R`$\Z_2[i]$`, r: [1, 1] }, { rot: R`$\Q[\sqrt3\,]$`, r: [0, 0] }
            ], exp: R`<p>$\Z[\sqrt5\,]$: subanel de $\R$, domínio, mas $2$ não é invertível. $\Z_2[i]$: $(1+i)^2=1+2i+i^2=2i=0$.</p>` },
            { t: 'mod', n: 20, r: [0, 10], p: R`Em $\Z_{20}$, dê um nilpotente $a$ com $a^2=0$.`, rot: '$a=$', exp: R`$10^2=100=0$ em $\Z_{20}$. (O $0$ também satisfaz, claro.)` },
            { t: 'aberta', p: R`Seja $D$ um domínio de integridade e $a,b\in D$ com $a^2=b^2$. Mostre que $a=b$ ou $a=-b$. Dê um contraexemplo em $\Z_8$.`,
              modelo: R`Como $D$ é comutativo, $(a-b)(a+b)=a^2+ab-ba-b^2=a^2-b^2=0$. Sem divisores de zero, $a-b=0$ ou $a+b=0$. Em $\Z_8$: $1^2=3^2=1$, mas $3\neq\pm1$ (pois $-1=7$).` }
          ] }
        ]
      }
    ]
  });
})();
