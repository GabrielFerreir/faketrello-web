function calc() {
    var geral = 0;
    var vetQntd = [];
    var arrayResultadoPesos = [];
    const FA = 1.35;
    var FPb = 0, Step3 = 0;
    var meses = 0;
    var entrada, saida, consulta, vInterface, arquivo;

    var tables = document.getElementById('colunas').value;
    var dropDown = document.getElementById('language').value;
    var qntdProgrammers = parseInt(document.getElementById('programmers').value);
    var tipoSistema = document.getElementById('types').value;
    var priceHour = document.getElementById('priceHour').value;

    var languages = [
        {lang: 'Java', loc: 20},
        {lang: 'COBOL', loc: 100},
        {lang: 'VB', loc: 20},
        {lang: 'Gerador de Codigo', loc: 15}
    ];
    var tiposDeSistema = [
        {type: 'Sistema Web', Kloc: 3300},
        {type: 'Comércio Eletronico', Kloc: 3600},
        {type: 'Sistema Comercial', Kloc: 2500}
    ];

    var filterLang = languages.filter(item => {
        return item.lang === dropDown
    });
    var filterTipoSistema = tiposDeSistema.filter(item => {
        return item.type === tipoSistema
    });

    if (tables) {
        tables = tables.split(' ');

        for (i = 0; i < tables.length; i++) {
            geral += parseInt(tables[i])
        }
        //Entrada
        var coluna = calculaColunas(4, 5, 15, 16, tables);
        entrada = calculaLinhas(0, 1, 2, 2, 3, coluna);
        vetQntd.push(entrada);

        //Saida
        tables.push(geral);
        coluna = calculaColunas(5, 6, 19, 20, tables);
        saida = calculaLinhas(0, 1, 2, 3, 4, coluna);
        vetQntd.push(saida);

        //Consulta
        coluna = calculaColunas(4, 5, 15, 16, tables);
        consulta = calculaLinhas(0, 1, 2, 2, 3, coluna);
        vetQntd.push(consulta);

        //Arquivo
        tables.pop();
        coluna = calculaColunas(19, 20, 50, 51, tables);
        arquivo = calculaLinhas(1, 1, 2, 5, 6, coluna);
        vetQntd.push(arquivo);

        //Interface
        tables.push(geral);
        coluna = calculaColunas(19, 20, 50, 51, tables);
        vInterface = calculaLinhas(1, 1, 2, 5, 6, coluna);
        vetQntd.push(vInterface);
        console.log(vetQntd);

        //Entrada
        arrayResultadoPesos.push(vetQntd[0].simples * 3);
        arrayResultadoPesos.push(vetQntd[0].medio * 4);
        arrayResultadoPesos.push(vetQntd[0].complexo * 6);

        //Saida
        arrayResultadoPesos.push(vetQntd[1].simples * 4);
        arrayResultadoPesos.push(vetQntd[1].medio * 5);
        arrayResultadoPesos.push(vetQntd[1].complexo * 7);

        //Consulta
        arrayResultadoPesos.push(vetQntd[2].simples * 3);
        arrayResultadoPesos.push(vetQntd[2].medio * 4);
        arrayResultadoPesos.push(vetQntd[2].complexo * 6);

        //Arquivos
        arrayResultadoPesos.push(vetQntd[3].simples * 7);
        arrayResultadoPesos.push(vetQntd[3].medio * 10);
        arrayResultadoPesos.push(vetQntd[3].complexo * 15);

        //Interface
        arrayResultadoPesos.push(vetQntd[4].simples * 5);
        arrayResultadoPesos.push(vetQntd[4].medio * 7);
        arrayResultadoPesos.push(vetQntd[4].complexo * 10);
        console.log(arrayResultadoPesos);

        //Calculo do FP bruto
        for (i = 0; i < arrayResultadoPesos.length; i++) {
            FPb += arrayResultadoPesos[i]
        }
        console.log('FPb: ' + FPb);

        Step3 = FPb * FA * filterLang[0].loc;
        meses = Step3 / (qntdProgrammers * filterTipoSistema[0].Kloc);

        var arrayCasaDecimal = meses.toString().split('.');
        arrayCasaDecimal[1] = arrayCasaDecimal[1].substring(0, 2);

        meses = parseFloat(arrayCasaDecimal[0] + "." + arrayCasaDecimal[1]);

        var preco = meses * 132 * priceHour;
        arrayCasaDecimal = preco.toString().split('.');
        arrayCasaDecimal[1] = arrayCasaDecimal[1].substring(0, 2);

        preco = parseFloat(arrayCasaDecimal[0] + "." + arrayCasaDecimal[1]);

        console.log('R$' + preco);
        console.log('Prazo:');
        console.log('Meses: ' + meses);


        //Calculo de meses
        arrayCasaDecimal = meses.toString().split('.');
        var dias = parseFloat('0.' + arrayCasaDecimal[1]) * 22;
        console.log('Dias: ' + dias);

        arrayCasaDecimal = dias.toString().split('.');
        var horas = parseFloat('0.' + arrayCasaDecimal[1]) * 6;
        console.log('Horas: ' + horas);
        arrayCasaDecimal = horas.toString().split('.');
        var minutos = parseFloat('0.' + arrayCasaDecimal[1]) * 60;
        console.log('Minutos: ' + minutos);
        arrayCasaDecimal = minutos.toString().split('.');
        var segundos = parseFloat('0.' + arrayCasaDecimal[1]) * 60;
        console.log('Segundos: ' + segundos)
    } else {
        console.log('ta null')
    }

}

function calculaColunas(a, b, c, d, tables) {
    var coluna = {um: 0, dois: 0, tres: 0};

    for (var i = 0; i < tables.length; i++) {
        if (1 <= parseInt(tables[i]) && parseInt(tables[i]) <= a) {
            coluna.um++
        }
        else if (b <= parseInt(tables[i]) && parseInt(tables[i]) <= c) {
            coluna.dois++
        }
        else if (d <= parseInt(tables[i])) {
            coluna.tres++
        }
    }

    return coluna
}

function calculaLinhas(a, b, c, d, e, coluna) {
    var linha = {simples: 0, medio: 0, complexo: 0};

    //Linha 1
    if (coluna.um === a || coluna.um === b) {
        linha.simples += coluna.um;
    }
    else if (coluna.um >= c && coluna.um <= d) {
        linha.simples += coluna.um;
    }
    else if (coluna.um >= e) {
        linha.medio += coluna.um;
    }

    //Linha2
    if (coluna.dois === a || coluna.dois === b) {
        linha.simples += coluna.dois;
    }
    else if (coluna.dois >= c && coluna.dois <= d) {
        linha.medio += coluna.dois;
    }
    else if (coluna.dois >= e) {
        linha.complexo += coluna.dois;
    }

    //Linha 3
    if (coluna.tres === a || coluna.tres === b) {
        linha.medio += coluna.tres;
    }
    else if (coluna.tres >= c && coluna.tres <= d) {
        linha.complexo += coluna.tres;
    }
    else if (coluna.tres >= e) {
        linha.complexo += coluna.tres;
    }
    return linha;
}