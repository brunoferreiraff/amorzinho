

const form = document.getElementById('coupleForm');
form.addEventListener('submit', function (e) {
    e.preventDefault(); //nao enviar o formulário e dar refresh na página.


    let person1 = document.getElementById('person1').value;
    let person2 = document.getElementById('person2').value;
    const startDate = document.getElementById('startDate').value;
    //     // precisa colocar value senão ele não pega o que foi colocado no form.
    console.log(`O ${person1} comecou a namorar a ${person2} no dia ${startDate}`);

    // Criar objeto com os dados
      const dados = {
        pessoa1: person1,
        pessoa2: person2,
        data: startDate
      };
      
      // Salvar no localStorage
      localStorage.setItem('casal', JSON.stringify(dados));
      
      console.log('✅ Dados salvos!', dados);
      
      // TROCAR O CONTEÚDO DA SEÇÃO
      mostrarResultado(dados);
    });
    
    // Função para mostrar o resultado (substituindo "Como funciona")
    function mostrarResultado(dados) {
      // ESCONDER a parte "Como funciona"
      document.getElementById('comoFunciona').classList.add('hidden');
      
      // MOSTRAR a parte de resultado
      document.getElementById('resultado').classList.remove('hidden');
      
      // Preencher nome do casal com emoji
      document.getElementById('casalNomes').textContent = 
        `💑 ${dados.pessoa1} & ${dados.pessoa2}`;
      
      // Calcular e mostrar tempo juntos
      atualizarTempo(dados.data);
      
      // Atualizar a cada segundo
      setInterval(() => atualizarTempo(dados.data), 1000);
      
      // Rolar até a seção
      document.getElementById('infoSection').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
    
    // Função para calcular tempo juntos e próximo aniversário
    function atualizarTempo(dataInicio) {
      const inicio = new Date(dataInicio + 'T00:00:00');
      const agora = new Date();
      
      // ========================================
      // 1. CALCULAR TEMPO JUNTOS
      // ========================================
      const diff = agora - inicio;
      const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const anos = Math.floor(totalDias / 365);
      const meses = Math.floor((totalDias % 365) / 30);
      const dias = Math.floor((totalDias % 365) % 30);
      
      // Montar texto do tempo juntos
      let textoTempo = '';
      
      if (anos > 0) {
        textoTempo += `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
      }
      
      if (meses > 0) {
        if (textoTempo) textoTempo += ', ';
        textoTempo += `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
      }
      
      if (dias > 0 || textoTempo === '') {
        if (textoTempo) textoTempo += ' e ';
        textoTempo += `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
      }
      
      document.getElementById('tempoJuntos').textContent = textoTempo;
      
      // ========================================
      // 2. CALCULAR PRÓXIMO ANIVERSÁRIO
      // ========================================
      
      // Pegar o mês e dia da data de início
      const mesInicio = inicio.getMonth(); // 0-11
      const diaInicio = inicio.getDate();  // 1-31
      
      // Criar data do aniversário neste ano
      const anoAtual = agora.getFullYear();
      let proximoAniversario = new Date(anoAtual, mesInicio, diaInicio);
      
      // Se o aniversário já passou este ano, pegar o do próximo ano
      if (proximoAniversario < agora) {
        proximoAniversario = new Date(anoAtual + 1, mesInicio, diaInicio);
      }
      
      // Formatar data do próximo aniversário
      const dataAniversario = proximoAniversario.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      
      document.getElementById('proximoAniversario').textContent = dataAniversario;
      
      // ========================================
      // 3. CALCULAR DIAS RESTANTES
      // ========================================
      const diffAniversario = proximoAniversario - agora;
      const diasRestantes = Math.ceil(diffAniversario / (1000 * 60 * 60 * 24));
      
      let textoDias = '';
      if (diasRestantes === 0) {
        textoDias = '🎉 É HOJE! Feliz aniversário de namoro!';
      } else if (diasRestantes === 1) {
        textoDias = '1 dia (É amanhã! 🎊)';
      } else {
        textoDias = `${diasRestantes} dias`;
      }
      
      document.getElementById('diasRestantes').textContent = textoDias;
    }
    
    // Quando a página carregar, verificar se já tem dados salvos
    window.addEventListener('load', function() {
      const dadosSalvos = localStorage.getItem('casal');
      
      if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        // Preencher formulário
        document.getElementById('person1').value = dados.pessoa1;
        document.getElementById('person2').value = dados.pessoa2;
        document.getElementById('startDate').value = dados.data;
        
        // Mostrar resultado
        mostrarResultado(dados);
      }
    });


