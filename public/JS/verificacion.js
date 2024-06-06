const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombres: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    apellidos: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
    fecha_nacimiento: /^\d{4}-\d{2}-\d{2}$/,
    genero: /^(Masculino|Femenino|Otro)$/,
    documento_Identidad_student: /^\d{1,12}$/,
    telefono: /^\d{9}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    postular: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    Colegio_Anterior: /^[a-zA-ZÀ-ÿ\s]{1,66}$/,
    tutor_nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    tutor_apellido: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
    tutor_numero_identificacion: /^\d{1,12}$/
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'nombres':
        case 'apellidos':
        case 'postular':
        case 'Colegio_Anterior':
        case 'tutor_nombre':
        case 'tutor_apellido':
            validarCampo(expresiones.nombres, e.target, e.target.name);
            break;
        case 'fecha_nacimiento':
            validarCampo(expresiones.fecha_nacimiento, e.target, e.target.name);
            break;
        case 'genero':
            validarCampo(expresiones.genero, e.target, e.target.name);
            break;
        case 'documento_Identidad_student':
        case 'telefono':
        case 'tutor_numero_identificacion':
            validarCampo(expresiones.documento_Identidad_student, e.target, e.target.name);
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, e.target.name);
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    if (!document.querySelectorAll('.formulario__grupo-correcto').length === inputs.length) {
        e.preventDefault();
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
