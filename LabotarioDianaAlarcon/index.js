const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	clave: /^.{8,12}$/, // 8 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
const campos = {
	nombre: false,
	clave: false,
	email: false,
}
const validarFormulario=(e)=>{
	switch(e.target.name){
		case"nombre":
			validarCampo(expresiones.nombre,e.target,'nombre');	
		break;
		case"email":
		validarCampo(expresiones.email,e.target,'email');	
		break;
		case"clave":
		validarCampo(expresiones.clave,e.target,'clave');
		validarClave2();
		break;
		case"clave2":
		validarClave2();
		break;
	}
}
//valida los campos
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('form_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('form_grupo_correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .form_input_error`).classList.remove('form_input_error_activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('form_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('form_grupo_correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .form_input_error`).classList.add('form_input_error_activo');
		campos[campo] = false;
	}
}
//validar campos rellenos
const valorObligatorio=(valor)=>{
	document.getElementById(`grupo_${valor}`).classList.add('form_grupo_incorrecto');
	document.getElementById(`grupo_${valor}`).classList.remove('form_grupo_correcto');
	document.querySelector(`#grupo_${valor} i`).classList.add('fa-times-circle');
	document.querySelector(`#grupo_${valor} i`).classList.remove('fa-check-circle');
	document.querySelector(`#grupo_${valor} .form_error`).classList.add('form_error_activo');
}
//comprobar que las claves coincidan
const validarClave2 = () => {
	const inputClave = document.getElementById('clave');
	const inputClave2 = document.getElementById('clave2');

	if(inputClave.value !== inputClave2.value){
		document.getElementById(`grupo_clave2`).classList.add('form_grupo_incorrecto');
		document.getElementById(`grupo_clave2`).classList.remove('form_grupo_correcto');
		document.querySelector(`#grupo_clave2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_clave2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_clave2 .form_input_error`).classList.add('form_input_error_activo');
		campos['clave'] = false;
	} else {
		document.getElementById(`grupo_clave2`).classList.remove('form_grupo_incorrecto');
		document.getElementById(`grupo_clave2`).classList.add('form_grupo_correcto');
		document.querySelector(`#grupo_clave2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_clave2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_clave2 .form_input_error`).classList.remove('form_input_error_activo');
		campos['clave'] = true;
	}
}
inputs.forEach((input) =>{
	input.addEventListener('keyup',validarFormulario);
	input.addEventListener('blur',validarFormulario)
});
//acciones del boton enviar
formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
	if(campos.nombre&&campos.email&&campos.clave){
		document.getElementById('form_mensaje_exito').classList.add('form_mensaje_exito_activo');
		setTimeout(()=>{
			document.getElementById('form_mensaje_exito').classList.remove('form_mensaje_exito_activo');
		},2000);
		
	formulario.reset();
	}else{
		valorObligatorio('nombre');
		valorObligatorio('email');
		valorObligatorio('clave');
		valorObligatorio('clave2');

		setTimeout(()=>{
			document.querySelector(`#grupo_nombre .form_error`).classList.remove('form_error_activo');
			document.querySelector(`#grupo_email .form_error`).classList.remove('form_error_activo');
			document.querySelector(`#grupo_clave .form_error`).classList.remove('form_error_activo');
			document.querySelector(`#grupo_clave2 .form_error`).classList.remove('form_error_activo');
		},2000)
	}
});