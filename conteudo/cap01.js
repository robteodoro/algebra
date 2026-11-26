/* Capítulo 1 — Anéis: definição, exemplos, unidade e invertíveis, propriedades, subanéis.
   Terminologia das listas: "unidade" = neutro da multiplicação; "invertível" = tem inverso multiplicativo; U(R).
   Use R`...` (String.raw); nunca escreva o par "cifrão + chave". Para "<" em fórmulas, use \lt. */
(function () {
  L.registrarCapitulo({
    num: 1,
    titulo: 'Anéis',
    subtitulo: 'Duas operações ao mesmo tempo: definição, exemplos, unidade e elementos invertíveis, as primeiras propriedades e os subanéis.',

    secoes: [
      /* =============================================================== 1.1 */
      {
        id: 1,
        titulo: 'O que é um anel',
        resumo: [
          R`Um <b>anel</b> $R$ tem duas operações: $(R,+)$ é um grupo abeliano, a multiplicação é associativa e valem as duas distributivas $a(b+c)=ab+ac$ e $(b+c)a=ba+ca$.`,
          R`<b>Não</b> se exige: comutatividade do produto, unidade, inversos multiplicativos, cancelamento.`,
          R`$R$ é <b>comutativo</b> quando $ab=ba$ para todos $a,b\in R$.`
        ],
        cartoes: [
          { id: 'c1.1a', frente: R`Definição de anel.`, verso: R`Um conjunto $R$ com $+$ e $\cdot$ tal que $(R,+)$ é grupo abeliano, $\cdot$ é associativa e valem $a(b+c)=ab+ac$ e $(b+c)a=ba+ca$.` },
          { id: 'c1.1b', frente: R`O que a definição de anel <b>não</b> exige da multiplicação?`, verso: R`Que seja comutativa, que exista unidade, que os elementos tenham inverso, que valha o cancelamento.` },
          { id: 'c1.1c', frente: R`Por que são necessárias <b>duas</b> leis distributivas?`, verso: R`Porque a multiplicação pode não ser comutativa: $a(b+c)=ab+ac$ não implica $(b+c)a=ba+ca$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Com grupos estudamos conjuntos com <b>uma</b> operação. Mas os objetos mais familiares da matemática têm <b>duas</b>: em $\Z$, em $\Z_n$, nos polinômios e nas matrizes, somamos e multiplicamos, e as duas operações conversam por meio da distributiva.</p>
            <p>Um anel é a estrutura que guarda exatamente o que essas situações têm em comum. A soma é tão boa quanto possível (um grupo abeliano); da multiplicação, pede-se o mínimo.</p>` },
          { t: 'teo', rotulo: 'Definição (anel)', html: R`
            <p>Um <b>anel</b> é um conjunto $R$ com duas operações, uma adição $(a,b)\mapsto a+b$ e uma multiplicação $(a,b)\mapsto ab$, tais que, para todos $a,b,c\in R$:</p>
            <ol><li>$a+b=b+a$;</li><li>$(a+b)+c=a+(b+c)$;</li><li>existe $0\in R$ com $a+0=a$;</li><li>para cada $a$, existe $-a\in R$ com $a+(-a)=0$;</li>
            <li>$a(bc)=(ab)c$;</li><li>$a(b+c)=ab+ac$ e $(b+c)a=ba+ca$.</li></ol>
            <p>Em resumo: $(R,+)$ é um <b>grupo abeliano</b>, a multiplicação é <b>associativa</b> e vale a <b>distributiva</b> dos dois lados. Se, além disso, $ab=ba$ para todos $a,b$, dizemos que $R$ é um <b>anel comutativo</b>.</p>` },
          { t: 'atencao', titulo: 'O que não se exige', html: R`
            <p>A definição <b>não</b> pede que:</p>
            <ul><li>a multiplicação seja comutativa (as matrizes $2\times2$ formam um anel);</li>
            <li>exista um elemento neutro da multiplicação (os inteiros pares formam um anel, e $1\notin2\Z$);</li>
            <li>os elementos não nulos tenham inverso multiplicativo (em $\Z$, só $\pm1$ têm);</li>
            <li>valha o cancelamento $ab=ac\Rightarrow b=c$ (em $\Z_6$, $2\cdot1=2\cdot4$).</li></ul>
            <p>Cada uma dessas propriedades, quando presente, dá nome a um tipo especial de anel, e boa parte do curso consiste em ver o que muda quando ela vale.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: a mesma soma, outra multiplicação', enunciado: R`Em $\Z$, mantenha a soma usual e defina $a\ast b=a$. Isso é um anel?`, solucao: R`
            <p>$(\Z,+)$ é grupo abeliano e $\ast$ é associativa: $(a\ast b)\ast c=a=a\ast(b\ast c)$. A distributiva à direita vale: $(b+c)\ast a=b+c=b\ast a+c\ast a$. Mas a distributiva à esquerda falha:
            $$a\ast(b+c)=a,\qquad a\ast b+a\ast c=2a.$$
            Com $a=1$: $1\neq2$. <b>Não é anel</b>, e o exemplo mostra que as duas distributivas são independentes.</p>` },
          { t: 'pratica', titulo: 'Fixação: é anel?', itens: [
            { t: 'grade', p: R`Em cada linha, decida se cada condição vale. Use “sim” só quando a condição vale para <b>todos</b> os elementos.`,
              cab: [R`$(R,+)$ grupo abeliano?`, R`produto associativo?`, R`distributivas?`, R`é anel?`],
              linhas: [
                { rot: R`$(\N,+,\cdot)$`, r: [1, 0, 0, 1] },
                { rot: R`$(\Z,+,\cdot)$`, r: [0, 0, 0, 0] },
                { rot: R`$(\Z,+,\ast)$ com $a\ast b=0$`, r: [0, 0, 0, 0] },
                { rot: R`$(\Z,+,\ast)$ com $a\ast b=a+b$`, r: [0, 0, 1, 1] }
              ],
              exp: R`<p>Em $\N$ falta o oposto aditivo: $-1\notin\N$. O produto $a\ast b=0$ é chato, mas cumpre tudo (é o “anel de produto nulo”). Com $a\ast b=a+b$, a distributiva falha: $1\ast(1+1)=3$, enquanto $1\ast1+1\ast1=4$.</p>` },
            { t: 'vf', p: R`Em um anel, a multiplicação precisa ser comutativa.`, r: false, exp: R`Não é exigido. As matrizes $M_2(\Z)$ formam um anel não comutativo.` },
            { t: 'vf', p: R`Em um anel, a adição precisa ser comutativa.`, r: true, exp: R`Sim: $(R,+)$ é um grupo <b>abeliano</b>. (Curiosamente, com unidade isso até decorreria dos outros axiomas: expanda $(1+1)(a+b)$ de dois jeitos.)` },
            { t: 'escolha', p: R`O conjunto dos números ímpares, com a soma e o produto usuais, não é um anel. Por quê?`,
              op: [R`A soma de dois ímpares não é ímpar: a adição nem é uma operação no conjunto.`, R`O produto de dois ímpares é par.`, R`Falta a distributiva.`, R`O produto não é associativo.`], c: 0,
              exp: R`$1+1=2$ não é ímpar. O produto de ímpares é ímpar, e as propriedades da soma e do produto, quando fazem sentido, são herdadas de $\Z$.` }
          ] },
          { t: 'html', html: R`
            <h3>Notações</h3>
            <p>Escrevemos $a-b$ para $a+(-b)$. Para um inteiro positivo $n$, $n\cdot a$ (ou $na$) significa $a+a+\cdots+a$, com $n$ parcelas, e $(-n)a=n(-a)$, $0\cdot a=0$. Já $a^n=aa\cdots a$, com $n$ fatores.</p>
            <p>Cuidado: em $n\cdot a$, o $n$ é um inteiro e <b>não</b> precisa ser um elemento de $R$. Por exemplo, em $\Z_3$ vale $3\cdot a=0$ para todo $a$, e em $2\Z$ faz sentido escrever $3\cdot 4=12$ mesmo que $3\notin2\Z$.</p>` },
          { t: 'pratica', itens: [
            { t: 'mod', n: 7, r: 6, p: R`Em $\Z_7$, calcule $5\cdot 4$, isto é, $4+4+4+4+4$.`, rot: '$=$', exp: R`$20=2\cdot7+6$, então $5\cdot4=6$ em $\Z_7$.` },
            { t: 'mod', n: 6, r: 0, p: R`Em $\Z_6$, calcule $6\cdot a$ para $a=5$.`, rot: '$=$', exp: R`$6\cdot5=30=0$ em $\Z_6$. Em $\Z_6$, $6\cdot a=0$ para todo $a$: isso será a <b>característica</b> (capítulo 2).` }
          ] }
        ]
      },

      /* =============================================================== 1.2 */
      {
        id: 2,
        titulo: 'Uma coleção de exemplos',
        resumo: [
          R`Comutativos com unidade: $\Z$, $\Q$, $\R$, $\C$, $\Z_n$, $\Z[x]$, $\Z[i]=\{a+bi\mid a,b\in\Z\}$.`,
          R`$M_2(\Z)$: não comutativo, com unidade $I$. $\ 2\Z$ (e $n\Z$, $n\geq2$): comutativo sem unidade.`,
          R`<b>Soma direta</b> $R\oplus S=\{(r,s)\}$, com as operações coordenada a coordenada.`
        ],
        cartoes: [
          { id: 'c1.2a', frente: R`Dê um anel não comutativo.`, verso: R`$M_2(\Z)$: com $A=\begin{bmatrix}1&1\\0&1\end{bmatrix}$ e $B=\begin{bmatrix}1&0\\1&1\end{bmatrix}$, $AB\neq BA$.` },
          { id: 'c1.2b', frente: R`Dê um anel sem unidade.`, verso: R`$2\Z$, os inteiros pares: nenhum par $e$ satisfaz $e\cdot2=2$.` },
          { id: 'c1.2c', frente: R`Como se opera em $R\oplus S$?`, verso: R`Coordenada a coordenada: $(r,s)+(r',s')=(r+r',s+s')$ e $(r,s)(r',s')=(rr',ss')$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Quase toda pergunta sobre anéis é testada nos mesmos poucos exemplos. Vale a pena conhecê-los bem: eles serão a nossa “bancada de testes”.</p>
            <ul>
              <li>$\Z$, $\Q$, $\R$, $\C$, com as operações usuais.</li>
              <li>$\Z_n=\{0,1,\dots,n-1\}$, com soma e produto <b>módulo $n$</b>.</li>
              <li>$\Z[x]$: polinômios com coeficientes inteiros. Mais geralmente, $R[x]$, com coeficientes num anel comutativo $R$ (por exemplo, $\Z_2[x]$, $\R[x]$).</li>
              <li>$M_2(\Z)$: matrizes $2\times2$ com entradas inteiras, com a soma e o produto de matrizes.</li>
              <li>$n\Z=\{0,\pm n,\pm2n,\dots\}$, os múltiplos de $n$.</li>
              <li>$\Z[i]=\{a+bi\mid a,b\in\Z\}$, os <b>inteiros gaussianos</b>, e $\Z[\sqrt d\,]=\{a+b\sqrt d\mid a,b\in\Z\}$.</li>
              <li>As funções $f\colon\R\to\R$, com $(f+g)(x)=f(x)+g(x)$ e $(fg)(x)=f(x)g(x)$.</li>
            </ul>` },
          { t: 'lab', w: 'zn', n: 6, titulo: 'As tábuas de ℤ₆', html: R`Alterne entre adição e multiplicação e mude $n$. Repare que a tábua da adição é sempre um “quadrado latino” (é a tábua de um grupo), e a da multiplicação não.` },
          { t: 'exemplo', titulo: 'Exemplo: as matrizes não comutam', enunciado: R`Em $M_2(\Z)$, calcule $AB$ e $BA$ para $A=\begin{bmatrix}1&1\\0&1\end{bmatrix}$ e $B=\begin{bmatrix}1&0\\1&1\end{bmatrix}$.`, solucao: R`
            $$AB=\begin{bmatrix}2&1\\1&1\end{bmatrix},\qquad BA=\begin{bmatrix}1&1\\1&2\end{bmatrix}.$$
            <p>Logo $AB\neq BA$: $M_2(\Z)$ não é comutativo. A unidade é a identidade $I$.</p>` },
          { t: 'teo', rotulo: 'Construção (soma direta)', html: R`
            <p>Dados anéis $R$ e $S$, o conjunto $R\oplus S=\{(r,s)\mid r\in R,\ s\in S\}$ é um anel com as operações <b>coordenada a coordenada</b>:
            $$\begin{aligned}(r,s)+(r',s')&=(r+r',\,s+s'),\\(r,s)(r',s')&=(rr',\,ss').\end{aligned}$$
            O mesmo vale para $R_1\oplus R_2\oplus\cdots\oplus R_k$.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: um produto nulo', enunciado: R`Em $\Z\oplus\Z$, calcule $(1,0)(0,1)$ e $(1,0)(1,0)$.`, solucao: R`
            <p>$(1,0)(0,1)=(1\cdot0,\,0\cdot1)=(0,0)$: um produto <b>nulo</b> com dois fatores <b>não nulos</b>, coisa que nunca acontece em $\Z$. E $(1,0)^2=(1,0)$: um elemento que é igual ao seu quadrado sem ser $0$ nem a unidade $(1,1)$. Voltaremos a esses fenômenos no capítulo 2.</p>` },
          { t: 'pratica', titulo: 'Fixação: contas nos exemplos', itens: [
            { t: 'mod', n: 12, r: 4, p: R`Em $\Z_{12}$, calcule $8\cdot 5$.`, rot: '$=$', exp: R`$40=3\cdot12+4$.` },
            { t: 'multi', p: R`Em $\Z_4\oplus\Z_6$, calcule $(3,4)\cdot(2,5)=(u,v)$, com $0\le u\lt4$ e $0\le v\lt6$.`, campos: [{ rot: '$u=$', r: 2 }, { rot: '$v=$', r: 2 }],
              exp: R`$u=3\cdot2=6=2$ em $\Z_4$ e $v=4\cdot5=20=2$ em $\Z_6$.` },
            { t: 'poli', v: 'i', r: '8-i', p: R`Em $\Z[i]$, calcule $(2+3i)(1-2i)$.`, exp: R`$(2+3i)(1-2i)=2-4i+3i-6i^2=(2+6)+(-4+3)i=8-i$, usando $i^2=-1$.` },
            { t: 'mat', p: R`Em $M_2(\Z)$, calcule $\begin{bmatrix}0&1\\0&0\end{bmatrix}\begin{bmatrix}0&1\\0&0\end{bmatrix}$.`, r: [[0, 0], [0, 0]],
              exp: R`O produto é a matriz nula, embora o fator não seja nulo: em $M_2(\Z)$ há <b>produtos nulos com fatores não nulos</b>.` }
          ] },
          { t: 'tabela', titulo: 'Ficha técnica (primeira versão)', cab: ['Anel', 'comutativo?', 'unidade', 'finito?'], linhas: [
            [R`$\Z$`, 'sim', R`$1$`, 'não'], [R`$\Z_n$`, 'sim', R`$1$`, R`sim, $n$ elementos`], [R`$2\Z$`, 'sim', 'não tem', 'não'],
            [R`$\Z[x]$`, 'sim', R`o polinômio $1$`, 'não'], [R`$M_2(\Z)$`, 'não', R`$I$`, 'não'], [R`$\Z_2\oplus\Z_3$`, 'sim', R`$(1,1)$`, R`sim, $6$ elementos`]
          ] },
          { t: 'pratica', itens: [
            { t: 'num', r: 24, p: R`Quantos elementos tem o anel $\Z_2\oplus\Z_3\oplus\Z_4$?`, exp: R`$2\cdot3\cdot4=24$ ternos $(a,b,c)$.` },
            { t: 'escolha', p: R`Qual é a unidade de $\Z\oplus\Z_5$?`, op: [R`$(1,1)$`, R`$(1,0)$`, R`$(0,1)$`, R`Não tem unidade.`], c: 0, exp: R`$(1,1)(a,b)=(a,b)$ para todo $(a,b)$. Já $(1,0)(a,b)=(a,0)$.` },
            { t: 'escolha', p: R`Qual destes anéis é comutativo, mas não tem unidade?`, op: [R`$6\Z$`, R`$\Z_6$`, R`$M_2(\Z)$`, R`$\Z[x]$`], c: 0,
              exp: R`$6\Z$: se $e\cdot6=6$ com $e$ inteiro, então $e=1\notin6\Z$. Os outros têm unidade ($M_2(\Z)$ nem é comutativo).` }
          ] },
          { t: 'reforco', geradores: ['operar'] }
        ]
      },

      /* =============================================================== 1.3 */
      {
        id: 3,
        titulo: 'Unidade e elementos invertíveis',
        resumo: [
          R`<b>Unidade</b>: elemento $1\neq0$ com $1a=a1=a$ para todo $a$. <b>Invertível</b>: $a$ tal que existe $b$ com $ab=ba=1$. $U(R)$ = conjunto dos invertíveis.`,
          R`A unidade, se existe, é única; o inverso de um elemento, se existe, é único.`,
          R`Em $\Z_n$: $a$ é invertível $\iff\mdc(a,n)=1$; assim $U(\Z_n)=U(n)$.`,
          R`$U(\Z)=\{\pm1\}$, $U(\Q)=\Q\setminus\{0\}$, $U(\Z[i])=\{\pm1,\pm i\}$.`
        ],
        cartoes: [
          { id: 'c1.3a', frente: R`Unidade × elemento invertível: qual a diferença?`, verso: R`A unidade é o neutro da multiplicação, $1$. Um elemento é invertível quando tem inverso: $ab=ba=1$. A unidade é invertível, mas há outros invertíveis (em $\Z_5$, todos os não nulos).` },
          { id: 'c1.3b', frente: R`Quando $a$ é invertível em $\Z_n$?`, verso: R`Exatamente quando $\mdc(a,n)=1$. (Bézout: $ax+ny=1$ dá $ax=1$ em $\Z_n$.)` },
          { id: 'c1.3c', frente: R`Por que o inverso, quando existe, é único?`, verso: R`Se $ab=ba=1$ e $ac=ca=1$, então $b=b1=b(ac)=(ba)c=1c=c$.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definições', html: R`
            <p>Seja $R$ um anel. Um elemento $1\in R$, com $1\neq0$, é a <b>unidade</b> de $R$ se $1a=a1=a$ para todo $a\in R$; nesse caso, $R$ é um <b>anel com unidade</b>.</p>
            <p>Se $R$ tem unidade, um elemento $a$ é <b>invertível</b> quando existe $b\in R$ com $ab=ba=1$; escrevemos $b=a^{-1}$. O conjunto dos invertíveis de $R$ é $U(R)$.</p>` },
          { t: 'atencao', titulo: 'Cuidado com as palavras', html: R`<p>Neste curso, <b>unidade</b> é sempre o neutro da multiplicação (o $1$), e <b>invertível</b> é o elemento que tem inverso. Alguns textos usam “unidade” para os invertíveis; aqui, não. A unidade é invertível ($1\cdot1=1$), mas pode haver muitos outros invertíveis.</p>` },
          { t: 'teo', rotulo: 'Teorema (unicidade)', html: R`<p>Se um anel tem unidade, ela é única. Se um elemento tem inverso, o inverso é único.</p>` },
          { t: 'exemplo', titulo: 'Demonstração', aberto: true, enunciado: R`Por que vale o teorema acima?`, solucao: R`
            <p>Se $1$ e $1'$ são unidades, então $1=1\cdot1'=1'$ (a primeira igualdade porque $1'$ é unidade; a segunda porque $1$ é). Se $b$ e $c$ são inversos de $a$:
            $$b=b1=b(ac)=(ba)c=1c=c.$$
            Repare que só usamos a associatividade, nada de comutatividade.</p>` },
          { t: 'html', html: R`
            <h3>Os invertíveis de $\Z_n$</h3>
            <p>Em $\Z_{12}$: $5\cdot5=25=1$, então $5^{-1}=5$; já $4$ não é invertível, pois $4x$ é sempre múltiplo de $4$ e, reduzindo módulo $12$, sobra $0$, $4$ ou $8$, nunca $1$. O critério geral:</p>` },
          { t: 'teo', rotulo: 'Proposição', html: R`<p>Em $\Z_n$, o elemento $a$ é invertível se, e somente se, $\mdc(a,n)=1$. Portanto $U(\Z_n)=U(n)$, o grupo que já conhecemos.</p>` },
          { t: 'exemplo', titulo: 'Por quê?', aberto: true, enunciado: R`Justifique a proposição.`, solucao: R`
            <p>Se $\mdc(a,n)=1$, existem inteiros $x,y$ com $ax+ny=1$ (Bézout). Reduzindo módulo $n$: $ax=1$ em $\Z_n$.</p>
            <p>Se $d=\mdc(a,n)\gt1$, então $a\cdot\frac nd=\frac ad\cdot n=0$ em $\Z_n$, com $\frac nd\neq0$. Se $a$ tivesse inverso, multiplicando por $a^{-1}$ teríamos $\frac nd=0$, absurdo.</p>` },
          { t: 'lab', w: 'zn', n: 12, titulo: 'Quem tem inverso em ℤ₁₂?', html: R`Toque em um elemento da primeira coluna. As linhas dos invertíveis passam por todos os elementos (e contêm um $1$); as dos outros só têm múltiplos de $\mdc(a,n)$.` },
          { t: 'pratica', titulo: 'Fixação: inversos em ℤₙ', itens: [
            { t: 'mod', n: 11, r: 4, p: R`Em $\Z_{11}$, determine $3^{-1}$.`, rot: R`$3^{-1}=$`, exp: R`$3\cdot4=12=1$ em $\Z_{11}$.` },
            { t: 'mod', n: 15, r: null, p: R`Em $\Z_{15}$, determine $6^{-1}$ (ou escreva “não existe”).`, rot: R`$6^{-1}=$`, exp: R`$\mdc(6,15)=3$: não existe. De fato, $6\cdot5=30=0$ em $\Z_{15}$.` },
            { t: 'conjmod', n: 10, r: [1, 3, 7, 9], p: R`Liste $U(\Z_{10})$.`, exp: R`Os $a$ com $\mdc(a,10)=1$: $1,3,7,9$. ($3\cdot7=21=1$ e $9\cdot9=81=1$.)` },
            { t: 'vf', p: R`Em um anel com unidade, todo elemento não nulo é invertível.`, r: false, exp: R`Falso: em $\Z$, $2$ não é invertível; em $\Z_{12}$, $4$ não é. Os anéis em que isso vale são os <b>corpos</b> (capítulo 2).` }
          ] },
          { t: 'html', html: R`
            <h3>Outros exemplos</h3>
            <ul><li>$U(\Z)=\{1,-1\}$ e $U(\Q)=\Q\setminus\{0\}$.</li>
            <li>Em $\Z[i]$, use a <b>norma</b> $N(a+bi)=a^2+b^2$, que satisfaz $N(zw)=N(z)N(w)$. Se $zw=1$, então $N(z)N(w)=1$, e como as normas são inteiros não negativos, $N(z)=1$. As soluções de $a^2+b^2=1$ dão $U(\Z[i])=\{1,-1,i,-i\}$.</li>
            <li>Em $M_2(\R)$, os invertíveis são as matrizes de determinante não nulo; em $M_2(\Z)$ é preciso mais: a inversa também precisa ter entradas inteiras.</li></ul>` },
          { t: 'pratica', itens: [
            { t: 'escolha', p: R`Quantos elementos invertíveis tem $\Z[\sqrt{-2}\,]=\{a+b\sqrt{-2}\mid a,b\in\Z\}$? (Use a norma $N(a+b\sqrt{-2})=a^2+2b^2$.)`, op: ['2', '4', '1', 'infinitos'], c: 0,
              exp: R`Um invertível precisa ter norma $1$, e $a^2+2b^2=1$ só tem as soluções $(\pm1,0)$. Logo os invertíveis são $\pm1$.` },
            { t: 'escolha', p: R`No anel $\Z\oplus\Z$, quais elementos são invertíveis?`, op: [R`$(\pm1,\pm1)$, os quatro`, R`Só $(1,1)$`, R`Todos os $(a,b)$ com $a\neq0$ e $b\neq0$`, R`$(1,1)$ e $(-1,-1)$`], c: 0,
              exp: R`$(a,b)(c,d)=(1,1)$ exige $ac=1$ e $bd=1$ em $\Z$, ou seja, $a,b\in\{\pm1\}$.` },
            { t: 'aberta', p: R`Mostre que, num anel com unidade, $U(R)$ é um grupo com a multiplicação. (Por que o produto de invertíveis é invertível?)`,
              modelo: R`Se $a,b\in U(R)$, então $(ab)(b^{-1}a^{-1})=a(bb^{-1})a^{-1}=aa^{-1}=1$ e, do mesmo modo, $(b^{-1}a^{-1})(ab)=1$; logo $ab\in U(R)$. A associatividade vem do anel, $1\in U(R)$ e o inverso de $a$ é $a^{-1}\in U(R)$ (pois $a$ é o inverso dele).` }
          ] },
          { t: 'reforco', geradores: ['inverso', 'unz'] }
        ]
      },

      /* =============================================================== 1.4 */
      {
        id: 4,
        titulo: 'Propriedades que decorrem dos axiomas',
        resumo: [
          R`Em qualquer anel: $a0=0a=0$; $a(-b)=(-a)b=-(ab)$; $(-a)(-b)=ab$; $a(b-c)=ab-ac$.`,
          R`Com unidade: $(-1)a=-a$ e $(-1)(-1)=1$.`,
          R`<b>Não</b> valem em geral: $ab=ac,\ a\neq0\Rightarrow b=c$; $(a+b)^2=a^2+2ab+b^2$ (só se $ab=ba$); $a^2=a\Rightarrow a\in\{0,1\}$.`
        ],
        cartoes: [
          { id: 'c1.4a', frente: R`Como se prova $a0=0$ num anel qualquer?`, verso: R`$a0=a(0+0)=a0+a0$; somando $-(a0)$ dos dois lados, $0=a0$.` },
          { id: 'c1.4b', frente: R`Por que $(-a)(-b)=ab$?`, verso: R`$(-a)(-b)=-(a(-b))=-(-(ab))=ab$, usando duas vezes $x(-y)=-(xy)$ e que $-(-z)=z$ no grupo $(R,+)$.` },
          { id: 'c1.4c', frente: R`Em que anéis $(a+b)^2=a^2+2ab+b^2$?`, verso: R`Quando $ab=ba$. Em geral, $(a+b)^2=a^2+ab+ba+b^2$.` }
        ],
        blocos: [
          { t: 'html', html: R`
            <p>Num anel qualquer não há divisão, não há cancelamento e pode não haver unidade. As demonstrações se fazem jogando a <b>distributiva</b> contra o fato de $(R,+)$ ser um <b>grupo</b> (onde se pode cancelar somas).</p>` },
          { t: 'teo', rotulo: 'Regras da multiplicação', html: R`
            <p>Sejam $a,b,c$ elementos de um anel $R$. Então:</p>
            <ol><li>$a0=0a=0$;</li><li>$a(-b)=(-a)b=-(ab)$;</li><li>$(-a)(-b)=ab$;</li><li>$a(b-c)=ab-ac$ e $(b-c)a=ba-ca$.</li></ol>
            <p>Se $R$ tem unidade, também $(-1)a=-a$ e $(-1)(-1)=1$.</p>` },
          { t: 'exemplo', titulo: 'Demonstração de (1)', aberto: true, enunciado: R`Por que $a0=0$?`, solucao: R`
            <p>Como $0+0=0$, temos $a0=a(0+0)=a0+a0$ (distributiva). Então $a0+0=a0+a0$ e, cancelando $a0$ no grupo $(R,+)$, $0=a0$. Do mesmo modo, $0a=0$.</p>` },
          { t: 'pratica', titulo: 'Fixação: uma demonstração com lacunas', itens: [
            { t: 'lacunas', p: R`Complete a demonstração de que $a(-b)=-(ab)$ e, depois, de que $(-a)(-b)=ab$.`,
              texto: R`Pela distributiva, $a(-b)+ab=a\big((-b)+b\big)$, e o fator entre parênteses é igual a {{0}}. Logo $a(-b)+ab=0$, pela regra {{1}}. Assim $a(-b)$ é {{2}} de $ab$ no grupo $(R,+)$, isto é, $a(-b)=-(ab)$. Para a segunda: $(-a)(-b)=-\big((-a)b\big)$ pela regra que acabamos de provar, e $(-a)b=-(ab)$ de modo análogo; logo $(-a)(-b)=-(-(ab))=ab$, porque {{3}}.`,
              lac: [
                { op: ['0', '1', 'b', '−b'], c: 0 },
                { op: ['a0 = 0', '1·a = a', 'a + 0 = a', 'ab = ba'], c: 0 },
                { op: ['o oposto (simétrico aditivo)', 'o inverso multiplicativo', 'o neutro', 'um múltiplo'], c: 0 },
                { op: ['num grupo, o oposto do oposto é o próprio elemento', 'o anel é comutativo', 'o anel tem unidade', 'vale o cancelamento do produto'], c: 0 }
              ],
              exp: R`<p>Em nenhum passo usamos comutatividade do produto ou unidade: o resultado vale em <b>qualquer</b> anel.</p>` }
          ] },
          { t: 'atencao', titulo: 'Hábitos de ℤ que não valem em todo anel', html: R`
            <ul><li><b>Cancelamento:</b> em $\Z_6$, $2\cdot1=2\cdot4$, mas $1\neq4$.</li>
            <li><b>Quadrado da soma:</b> $(a+b)^2=a^2+ab+ba+b^2$, que só vira $a^2+2ab+b^2$ se $ab=ba$.</li>
            <li><b>$a^2=a$:</b> em $\Z_6$, $3^2=9=3$ e $4^2=16=4$, e nem $3$ nem $4$ é $0$ ou $1$.</li>
            <li><b>Produto nulo:</b> em $\Z_6$, $2\cdot3=0$ com $2\neq0$ e $3\neq0$.</li></ul>
            <p>Estratégia: <b>antes de provar, teste em um anel pequeno</b> ($\Z_6$, $\Z_8$, $M_2(\Z)$, $\Z\oplus\Z$). O contraexemplo costuma estar lá.</p>` },
          { t: 'pratica', itens: [
            { t: 'grade', p: R`Quais destas igualdades valem em <b>todo</b> anel (com unidade, quando ela aparece)?`, cab: ['vale sempre?'], linhas: [
              { rot: R`$(-1)a=-a$`, r: [0] },
              { rot: R`$(a+b)(a-b)=a^2-b^2$`, r: [1] },
              { rot: R`$(-a)^2=a^2$`, r: [0] },
              { rot: R`$ab=ac$ e $a\neq0$ $\Rightarrow b=c$`, r: [1] },
              { rot: R`$(a+b)^2=a^2+ab+ba+b^2$`, r: [0] }
            ], exp: R`<p>$(a+b)(a-b)=a^2-ab+ba-b^2$, que só é $a^2-b^2$ quando $ab=ba$. O cancelamento falha em $\Z_6$. Já $(-a)^2=(-a)(-a)=a^2$ pela regra 3.</p>` },
            { t: 'aberta', p: R`Mostre que, se um anel $R$ tem um elemento $1$ com $1a=a1=a$ para todo $a$ e $1=0$, então $R=\{0\}$. (É por isso que a definição de unidade exige $1\neq0$.)`,
              modelo: R`Para todo $a\in R$: $a=1a=0a=0$, pela regra $0a=0$. Logo o único elemento é $0$.` },
            { t: 'escolha', p: R`Em $M_2(\Z)$, considere $A=\begin{bmatrix}1&0\\0&0\end{bmatrix}$ e $B=\begin{bmatrix}0&1\\0&0\end{bmatrix}$. Então $(A+B)^2$ é igual a:`,
              op: [R`$A^2+AB+BA+B^2$, que aqui é diferente de $A^2+2AB+B^2$`, R`$A^2+2AB+B^2$`, R`$A^2+B^2$`, R`a matriz nula`], c: 0,
              exp: R`$AB=B$ e $BA=0$, logo $AB\neq BA$. Temos $(A+B)^2=A^2+AB+BA+B^2=A+B$, enquanto $A^2+2AB+B^2=A+2B$.` }
          ] }
        ]
      },

      /* =============================================================== 1.5 */
      {
        id: 5,
        titulo: 'Subanéis',
        resumo: [
          R`$S\subset R$ é <b>subanel</b> se é anel com as operações de $R$.`,
          R`<b>Teste do subanel</b>: $S\neq\varnothing$ é subanel $\iff$ $a-b\in S$ e $ab\in S$ sempre que $a,b\in S$.`,
          R`A unidade de um subanel pode ser diferente da do anel (ou nem existir): $\{0,2,4\}\subset\Z_6$ tem unidade $4$.`
        ],
        cartoes: [
          { id: 'c1.5a', frente: R`Teste do subanel.`, verso: R`$S\neq\varnothing$ é subanel de $R$ se, e só se, $a-b\in S$ e $ab\in S$ para todos $a,b\in S$.` },
          { id: 'c1.5b', frente: R`Um subanel de um anel com unidade tem a mesma unidade?`, verso: R`Não necessariamente: $\{0,2,4\}\subset\Z_6$ tem unidade $4$; $2\Z\subset\Z$ nem tem unidade.` }
        ],
        blocos: [
          { t: 'teo', rotulo: 'Definição e teste do subanel', html: R`
            <p>Um subconjunto $S$ de um anel $R$ é um <b>subanel</b> de $R$ se $S$ é um anel com as operações de $R$.</p>
            <p><b>Teste:</b> um subconjunto não vazio $S$ é subanel se, e somente se, para todos $a,b\in S$,
            $$a-b\in S\quad\text{e}\quad ab\in S.$$</p>` },
          { t: 'html', html: R`
            <p>A primeira condição é o teste do subgrupo para $(S,+)$; a segunda diz que $S$ é fechado para o produto. As demais propriedades (associatividade, distributivas, comutatividade da soma) são <b>herdadas</b> de $R$.</p>
            <p>Exemplos: $\{0\}$ e $R$; $n\Z\subset\Z$; $\Z\subset\Q\subset\R\subset\C$; $\Z[i]\subset\C$; as matrizes diagonais em $M_2(\Z)$; as funções com $f(0)=0$ dentro de todas as funções.</p>` },
          { t: 'exemplo', titulo: 'Exemplo: a unidade muda', enunciado: R`Mostre que $S=\{0,3,6,9,12\}$ é um subanel de $\Z_{15}$ e encontre a unidade de $S$.`, solucao: R`
            <p>$S$ são os múltiplos de $3$ em $\Z_{15}$; diferenças e produtos de múltiplos de $3$ são múltiplos de $3$ (e reduzir módulo $15$ preserva isso, pois $3\mid15$). Procurando $e\in S$ com $e\cdot3=3$: $6\cdot3=18=3$. Conferindo: $6\cdot6=36=6$, $6\cdot9=54=9$, $6\cdot12=72=12$. A unidade de $S$ é $6$, e não $1$ (que nem está em $S$).</p>` },
          { t: 'pratica', titulo: 'Fixação: é subanel?', itens: [
            { t: 'grade', p: R`Para cada $S\subset R$, aplique o teste do subanel.`, cab: [R`$a-b\in S$?`, R`$ab\in S$?`, 'subanel?'], linhas: [
              { rot: R`ímpares $\subset\Z$`, r: [1, 0, 1] },
              { rot: R`$\{0,4,8\}\subset\Z_{12}$`, r: [0, 0, 0] },
              { rot: R`$\{f\in\Z[x]\mid f(0)=1\}\subset\Z[x]$`, r: [1, 0, 1] },
              { rot: R`$\left\{\begin{bmatrix}a&b\\0&c\end{bmatrix}\right\}\subset M_2(\Z)$`, r: [0, 0, 0] },
              { rot: R`$\{0,1\}\subset\Z_4$`, r: [1, 0, 1] }
            ], exp: R`<p>Ímpares: $3-1=2$ não é ímpar. $f(0)=1$: $(f-g)(0)=0$. Em $\Z_4$, $0-1=3\notin\{0,1\}$. As triangulares superiores são fechadas para diferença e produto: $\begin{bmatrix}a&b\\0&c\end{bmatrix}\begin{bmatrix}a'&b'\\0&c'\end{bmatrix}=\begin{bmatrix}aa'&ab'+bc'\\0&cc'\end{bmatrix}$.</p>` },
            { t: 'mod', n: 6, r: 4, p: R`Qual é a unidade do subanel $\{0,2,4\}$ de $\Z_6$?`, rot: R`$1_S=$`, exp: R`$4\cdot2=8=2$ e $4\cdot4=16=4$: a unidade é $4$.` },
            { t: 'vf', p: R`A interseção de dois subanéis de $R$ é um subanel de $R$.`, r: true, exp: R`Se $a,b\in S\cap T$, então $a-b$ e $ab$ estão em $S$ e em $T$. E $0\in S\cap T$, que portanto não é vazio.` },
            { t: 'vf', p: R`$2\Z\cup3\Z$ é um subanel de $\Z$.`, r: false, exp: R`$3-2=1$ não está em $2\Z\cup3\Z$.` }
          ] },
          { t: 'pratica', itens: [
            { t: 'aberta', p: R`Mostre que $\Z[\sqrt3\,]=\{a+b\sqrt3\mid a,b\in\Z\}$ é um subanel de $\R$.`,
              modelo: R`Não é vazio ($0=0+0\sqrt3$). A diferença $(a+b\sqrt3)-(c+d\sqrt3)=(a-c)+(b-d)\sqrt3$ está no conjunto. O produto $(a+b\sqrt3)(c+d\sqrt3)=(ac+3bd)+(ad+bc)\sqrt3$ também, pois $ac+3bd$ e $ad+bc$ são inteiros.` }
          ] },
          { t: 'reforco', geradores: ['unidsub'] }
        ]
      },

      /* =============================================================== 1.6 */
      {
        id: 6,
        titulo: 'Revisão do capítulo',
        resumo: [R`Anel, anel comutativo, unidade, invertível, $U(R)$, subanel: veja as seções anteriores.`],
        cartoes: [
          { id: 'c1.6a', frente: R`Dê um anel finito não comutativo.`, verso: R`$M_2(\Z_2)$, com $16$ elementos.` }
        ],
        blocos: [
          { t: 'html', html: R`<p>Questões que misturam o capítulo. Tente sem voltar às seções; depois confira.</p>` },
          { t: 'pratica', titulo: 'Revisão', itens: [
            { t: 'escolha', p: R`Qual é um exemplo de anel finito não comutativo?`, op: [R`$M_2(\Z_2)$`, R`$\Z_2\oplus\Z_3$`, R`$\Z_8$`, R`$\Z_2[x]$`], c: 0,
              exp: R`$M_2(\Z_2)$ tem $2^4=16$ elementos e as mesmas matrizes $A,B$ do exemplo de $M_2(\Z)$ não comutam. $\Z_2[x]$ é infinito e comutativo.` },
            { t: 'mod', n: 13, r: 9, p: R`Em $\Z_{13}$, resolva $3x=1$.`, rot: '$x=$', exp: R`$x=3^{-1}=9$, pois $27=2\cdot13+1$.` },
            { t: 'mod', n: 13, r: 7, p: R`Em $\Z_{13}$, resolva $3x+5=0$.`, rot: '$x=$', exp: R`$3x=-5=8$, logo $x=3^{-1}\cdot8=9\cdot8=72=7$ (pois $72=5\cdot13+7$). Confira: $3\cdot7+5=26=0$ em $\Z_{13}$.` },
            { t: 'vf', p: R`Se $a$ é invertível e $ab=ac$, então $b=c$.`, r: true, exp: R`Multiplique à esquerda por $a^{-1}$: $b=a^{-1}ab=a^{-1}ac=c$. O cancelamento vale para elementos <b>invertíveis</b>.` },
            { t: 'vf', p: R`Em um anel com unidade, $0$ pode ser invertível.`, r: false, exp: R`Se $0\cdot b=1$, então $1=0$ (pois $0b=0$), o que a definição de unidade proíbe.` },
            { t: 'conjmod', n: 8, r: [1, 3, 5, 7], p: R`Liste os elementos $a\in\Z_8$ com $a^2=1$.`, exp: R`$1^2=1$, $3^2=9=1$, $5^2=25=1$, $7^2=49=1$. Em $\Z_8$ a equação $x^2=1$ tem quatro soluções, mais do que as duas “de sempre”.` },
            { t: 'aberta', p: R`Seja $R$ um anel com unidade e $e\in R$ tal que $e^2=e$. Mostre que $f=1-e$ também satisfaz $f^2=f$ e que $ef=fe=0$.`,
              modelo: R`$(1-e)^2=1-e-e+e^2=1-2e+e=1-e$, usando $1\cdot e=e\cdot1=e$ e $e^2=e$. E $e(1-e)=e-e^2=0$, $(1-e)e=e-e^2=0$. (Em $\Z_6$: $e=3$ dá $f=4$, e $3\cdot4=0$.)` }
          ] }
        ]
      }
    ]
  });
})();
