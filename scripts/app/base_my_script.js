let count = 0;
let count_prefeito = 0;
let numero_vereador = "";
let numero_prefeito = "";
let partido = "";
let nome_verador = "";
let aux_confirm = "vereador";
let voto_em_branco = false;

$(".audio_tecla, .audio_confirma").trigger('load');

const audio_tecla = () => {
	$(".audio_tecla").trigger('play');
};
const audio_confirma = () => {
	$(".audio_confirma").trigger('play');
};
const audio_confirma_parcial = () => {
	$(".audio_confirma_parcial").trigger('play');
};

const display_information_vereador = (flag) => {

	const info_vereador = $(".vote_to,.type,.number,.numbers");
	const info_complementar = $("#type_name,#partido_name,.container_information_keys");
	if(flag) {
		info_vereador.show();
		
	} else {
		info_vereador.hide();
	}
	info_complementar.hide();
};
const display_information_fim = (flag) => {

	const info_fim  = $(".fim,.votou,.nova_simulacao");
	if(flag) {
		info_fim.show();
	} else {
		info_fim.hide();
	}
	
};

const initialize_vereador = () => {

	$(".type").html("Vereador");
	$(".numbers").html(`<li>&nbsp;&nbsp;</li>
                            <li>&nbsp;&nbsp;</li>
                            <li>&nbsp;&nbsp;</li>
                            <li>&nbsp;&nbsp;</li>
                            <li class="last">&nbsp;&nbsp;</li>`);
	$(".numbers li").eq(0).attr("class","active_number");
	$(".type,.numbers").show();
};

const initialize_prefeito = () => {

	count = 0;
	$(".type").html("Prefeito");
	$(".numbers").html(`<li class="active_number">&nbsp;&nbsp;</li>
                            <li>&nbsp;&nbsp;</li>`);
	$(".type,.numbers").show();
};

initialize_vereador();

// display_information_vereador(true)

$(".aux_number").on("click", (e)=> { 

	audio_tecla();

	if(aux_confirm=="vereador") {
		if(count<=4) {
			$(".numbers li").eq(count).html(e.target.value);
			$(".numbers li").attr("class","");
			$(".numbers li").eq(count+1).attr("class","active_number");
			numero_vereador = numero_vereador.concat(e.target.value);

			if(count==1) {
				partido_vereador = Number(numero_vereador);
				if(partido_vereador==22) {
					partido = "Partido: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PL";
				}
				else {
					partido = "PARTIDO NÃO CADASTRADO NO SIMULADOR";
				}

				$("#partido_name").html(partido).show();
				$(".vote_to,.number,.container_information_keys").show();
				$("#type_name").hide();
			}
			if(count==4) {
				if(Number(numero_vereador)==22333) {
					nome_vereador = "Nome: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PA Pedro Augusto";
					$(`#vereador${numero_vereador},.container_information_keys`).show();
				} else {
					nome_vereador = "CANDIDATO NÃO É O PA";
				}
				$("#type_name").html(nome_vereador).show();
			}
	  		count++
	  	}
	}

  	if(aux_confirm=="prefeito") {

  		if(count_prefeito<=1) {
  			$(".numbers li").eq(count_prefeito).html(e.target.value);
  			$(".numbers li").attr("class","");
			$(".numbers li").eq(count_prefeito+1).attr("class","active_number");
			numero_prefeito = numero_prefeito.concat(e.target.value);
	  		if(count_prefeito==1) {
				partido_type = Number(numero_prefeito);
				if(partido_type==40) {
					partido = "Partido: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PSB";
					nome_prefeito = "Nome: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dinair Veloso";
					$(`#prefeito${partido_type},.container_information_keys`).show();
				}
				else {
					partido = "PARTIDO NÃO CADASTRADO NO SIMULADOR";
					nome_prefeito = "Não cadastrado";
				}

				$("#partido_name").html(partido).show();
				$(".vote_to,.number,.container_information_keys").show();
				$("#type_name").html(nome_prefeito).show();
			}
			count_prefeito++
		}
  	}
		
});

$(".corrige").on("click", ()=> { 
	zerar_informacoes();
});
const zerar_informacoes = () => {
	count = 0;
	count_prefeito = 0;
	numero_vereador = "";
	numero_prefeito = "";
	$(".numbers li").html("&nbsp;&nbsp;").attr("class","");
	$(".numbers li").eq(0).attr("class","active_number");
	$("#partido_name,#type_name,.container_information_keys,.candidato_photo,.voto_em_branco,.vote_to,.number").hide();
	$(".type,.numbers").show();
};
$(".branco").on("click", ()=> { 

	if(aux_confirm=="vereador") {
		if(Number(numero_vereador)==0) {
			$(".voto_em_branco").show();
			$(".type,.number,.numbers").hide();
			$(".vote_to,.container_information_keys").show();
			voto_em_branco = true;
		}
		else {
			alert("nao pode");
		}
	}
	if(aux_confirm=="prefeito") {
		if(Number(numero_prefeito)==0) {
			$(".voto_em_branco").show();
			$(".type,.number,.numbers").hide();
			$(".vote_to,.container_information_keys").show();
			voto_em_branco = true;
		}
		else {
			alert("nao pode");
		}
	}

});
$(".confirma").on("click", ()=> {
	
	
	if(aux_confirm=="vereador") {
		
		if(count>=2 || voto_em_branco) {
			audio_confirma_parcial();
			aux_confirm = "prefeito";
			$(".vote_to,.number, #type_name,#partido_name,.container_information_keys").hide();
			$(".voto_em_branco,.candidato_photo").hide();
			initialize_prefeito();
			voto_em_branco = false;
		}
	}
	else if(aux_confirm=="prefeito") {
		if(count_prefeito==2 || voto_em_branco) {
			audio_confirma();	
			display_information_vereador(false);
			display_information_fim(true);
			$(".voto_em_branco,.candidato_photo").hide();	
			$(".block_urna").show();
		}
	}
	else {
		alert("Não pode");
	}
	
});

$(".nova_simulacao").on("click", ()=> { 
	zerar_informacoes();
	display_information_vereador(true);
	display_information_fim(false);
});