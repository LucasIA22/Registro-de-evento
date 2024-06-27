const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');

    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
    }
};

// Función para limpiar el formulario
const limpiar = () => {
    document.getElementById('eventoForm').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
};

// Función para validar un email
const validaEmail = (email) => {
    const formato = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return formato.test(email);
};

// Función para validar el formato de fecha (no permitir fechas futuras)
const validarFecha = (fecha) => {
    const hoy = new Date();
    const fechaSeleccionada = new Date(fecha);
    return fechaSeleccionada <= hoy;
};

// Función para validar un RUN chileno
const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            const tmp = rutCompleto.split('-');
            const digv = tmp[1];
            const rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    };
    return Fn.validaRut(run);
};


const mostrarAlerta = (icono, titulo, mensaje) => {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje
    });
};


export { verificar, limpiar, validaEmail, validarFecha, validarRun, mostrarAlerta };
