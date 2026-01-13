

const form = document.getElementById('coupleForm');
form.addEventListener('submit', function (e) {
    e.preventDefault(); //nao enviar o formulário e dar refresh na página.


    const person1 = document.getElementById('person1').value;
    const person2 = document.getElementById('person2').value;
    const startDate = document.getElementById('startDate').value;
    //     // precisa colocar value senão ele não pega o que foi colocado no form.
    console.log(`O ${person1} comecou a namorar a ${person2} no dia ${startDate}`);

    // Criar objeto com os dados
    const dados = {
        pessoa1: person1,
        pessoa2: person2,
        data: startDate
    };
    localStorage.setItem('casal', JSON.stringify(dados)); //Isso serve para salvar os dados no localStorage
    console.log('Dados foram salvos', dados);

    mostrarResultado(dados); //função para mostrar os dados e substituir os lugares que eu sinalizei
});

function mostrarResultado(dados) {
    document.getElementById('comoFunciona').classList.add('hidden'); // Isso aqui torna o 'comofunciona' em hidden, ou seja, o esconde
    document.getElementById('resultado').classList.remove('hidden'); // Isso aqui torna o 'resultado' em hidden, ou seja, o mostra
    document.getElementById('casalNomes').textContent = `💑 ${dados.pessoa1} ${dados.pessoa2} 💕`; //coloca no ID 'casalnomes' os dados puxados

    atualizarTempo(dados.data);
    setInterval(() => atualizarTempo(dados.data), 1000);
    document.getElementById('infosection').scrollIntoView({
        behavior: 'smooth'
    }); //função para rolar até a parte que tem o card do casal.
}

function atualizarTempo(dataInicio) {
    const inicio = new Date(dataInicio + 'T00:00:00');
    const agora = new Date();

    const difer = agora - inicio;
    const totalDias = Math.floor(difer / (1000 * 60 * 60 * 24)); //transforma a diferença da data agora e inicio em dias
    const anos = Math.floor(totalDias / 365); //divide os dias por dias do ano
    const meses = Math.floor(totalDias % 365); // descobre os meses
   const dias = Math.floor(difer / (totalDias % 365) % 30); //descobre quantos dias

    let textTempo = '';

    if (anos > 0) {
        textTempo += `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    }
    if (meses > 0) {
        textTempo += `${meses} ${meses === 1 ? 'mês' : 'meses'}`
    }

    if (dias > 0 || textTempo === '') {
        if (textTempo) textTempo += ' e ';
        textTempo += `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }

    document.getElementById('tempoJuntos').textContent = textTempo;

} 