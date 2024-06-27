import { saveEvento, getAllEventos, removeEvento, selectOneEvento, editEvento } from "./firebase-config.js";

let id = 0;

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });
    
    if (document.querySelectorAll('.is-invalid').length === 0) {
        const evento = {
            nombre: document.getElementById('nombre').value.trim(),
            fecha: document.getElementById('fecha').value,
            tipo: document.getElementById('tipo').value
        };

        if (document.getElementById('btnGuardar').value === 'Guardar') {
            try {
                await saveEvento(evento);
                Swal.fire({
                    title: "Guardado!",
                    text: "El evento se ha guardado correctamente.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Error al guardar el evento: ", error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al guardar el evento.",
                    icon: "error"
                });
            }
        } else {
            try {
                await editEvento(id, evento);
                id = 0;
                Swal.fire({
                    title: "Editado!",
                    text: "El evento se ha editado correctamente.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Error al editar el evento: ", error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al editar el evento.",
                    icon: "error"
                });
            }
        }
        limpiar();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getAllEventos(eventos => {
        let tabla = '';
        eventos.forEach(doc => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.fecha}</td>
                <td>${item.tipo}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', async () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await removeEvento(btn.id);
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El evento ha sido eliminado.",
                                icon: "success"
                            });
                        } catch (error) {
                            console.error("Error al eliminar el evento: ", error);
                            Swal.fire({
                                title: "Error",
                                text: "Hubo un problema al eliminar el evento.",
                                icon: "error"
                            });
                        }
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                try {
                    const evento = await selectOneEvento(btn.id);
                    document.getElementById('nombre').value = evento.nombre;
                    document.getElementById('fecha').value = evento.fecha;
                    document.getElementById('tipo').value = evento.tipo;
                    document.getElementById('btnGuardar').value = 'Editar';
                    document.getElementById('btnGuardar').disabled = false; // Habilitar botón editar
                    id = btn.id;
                } catch (error) {
                    console.error("Error al obtener el evento para editar: ", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al obtener el evento para editar.",
                        icon: "error"
                    });
                }
            });
        });
    });
});
