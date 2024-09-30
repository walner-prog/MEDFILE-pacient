<template>
  <div class="container mt-4">
    <h4 class=" mb-4 text-left">Mis Citas Agendadas</h4>
    <div class="table-responsive" data-aos="fade-up" data-aos-duration="500">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th class="primario"><i class="fas fa-calendar-day"></i> Fecha</th>
            <th class="primario"><i class="fas fa-clock"></i> Hora</th>
            <th class="primario"><i class="fas fa-user-md"></i> Doctor</th>
            <th class="primario"><i class="fas fa-user"></i> Paciente</th>
            <th class="primario"><i class="fas fa-file-medical"></i> Tipo de Cita</th>
            <th class="primario"><i class="fas fa-flag"></i> Estado</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="citas.length">
            <tr v-for="cita in citas" :key="cita.id" @click="abrirModal(cita)">
              <td>{{ cita.fecha }}</td>
              <td>{{ cita.hora }}</td>
              <td>{{ getDoctorNombre(cita.doctor_id) }}</td>
              <td>{{ getPacienteNombre(cita.paciente_expediente) }}</td>
              <td>{{ cita.tipo_cita }}</td>
              <td>
                <span :class="{'badge': true, 'badge-primary': isCitaCompletada(cita.fecha), 'badge-warning': !isCitaCompletada(cita.fecha)}">
                  {{ isCitaCompletada(cita.fecha) ? 'Completada' : 'Pendiente' }}
                </span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="6" class="text-center">No tienes citas agendadas.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Detalles de la Cita -->
    <div class="modal fade" id="modalCitaDetalles" tabindex="-1" role="dialog" aria-labelledby="modalCitaDetallesLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCitaDetallesLabel">
              <i class="fas fa-calendar-alt"></i> Detalles de la Cita
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cerrarModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <i class="fas fa-calendar-day"></i> <strong>Fecha:</strong> {{ citaSeleccionada.fecha }}
            </div>
            <div class="mb-3">
              <i class="fas fa-clock"></i> <strong>Hora:</strong> {{ citaSeleccionada.hora }}
            </div>
            <div class="mb-3">
              <i class="fas fa-user-md"></i> <strong>Doctor:</strong> {{ getDoctorNombre(citaSeleccionada.doctor_id) }}
            </div>
            <div class="mb-3">
              <i class="fas fa-user"></i> <strong>Paciente:</strong> {{ getPacienteNombre(citaSeleccionada.paciente_expediente) }}
            </div>
            <div class="mb-3">
              <i class="fas fa-file-medical"></i> <strong>Tipo de Cita:</strong> {{ citaSeleccionada.tipo_cita }}
            </div>
            <div class="mb-3">
              <i class="fas fa-sticky-note"></i> <strong>Notas:</strong> {{ citaSeleccionada.notas || 'No hay notas disponibles.' }}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
            <button class="btn btn-secondary" @click="descargarRecibo(citaSeleccionada.id)">
              <i class="fas fa-file-download"></i> Descargar Recibo
            </button>
            <button class="btn btn-success" @click="enviarMensajeDoctor(citaSeleccionada.doctor_id)">
              <i class="fas fa-envelope"></i> Enviar Mensaje
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas Simuladas -->
    <div class="mt-4" data-aos="fade-up" data-aos-duration="500">
      <h3 class="mb-3 text-left">Estadísticas de Citas</h3>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Resumen de Citas</h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="alert alert-info text-center">
                <h4 class="mb-0 text-muted">{{ citas.length }}</h4>
                <p class="mb-0 ">Total de citas</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="alert alert-warning text-center">
                <h4 class="mb-0 text-muted">{{ citas.filter(cita => !isCitaCompletada(cita.fecha)).length }}</h4>
                <p class="mb-0 ">Citas pendientes</p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="alert alert-success text-center">
                <h4 class="mb-0 text-muted">{{ citas.filter(cita => isCitaCompletada(cita.fecha)).length }}</h4>
                <p class="mb-0 ">Citas completadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable no-undef */

const pacientes = [
  { expediente: "23412345", nombre: "Juan Carlos", apellido: "Pérez López", cedula: "001-123456-0001X" },
  { expediente: "43254321", nombre: "Ana María", apellido: "González Sánchez", cedula: "001-987654-0001X" },
  { expediente: "54367890", nombre: "Carlos Eduardo", apellido: "Ramírez Hernández", cedula: "001-111222-0001X" }
];

const doctores = [
  { id: 1, nombre: "Carlos Eduardo", apellido: "Gómez Ramírez", contacto: "carlos@example.com" },
  { id: 2, nombre: "Ana Sofía", apellido: "López Herrera", contacto: "ana@example.com" },
  { id: 3, nombre: "Miguel Ángel", apellido: "Martínez Pineda", contacto: "miguel@example.com" },
  { id: 4, nombre: "Laura Fernanda", apellido: "Sánchez Ortiz", contacto: "laura@example.com" },
  { id: 5, nombre: "José Luis", apellido: "Rodríguez Vega", contacto: "jose@example.com" }
];

export default {
  data() {
    return {
      citas: [],
      citaSeleccionada: {}, // Para almacenar la cita seleccionada
      recordatoriosMostrados: {}, // Para almacenar cuándo se mostraron las notificaciones
    };
  },
  created() {
    this.obtenerCitasAgendadas();
    this.verificarCitasPendientes(); // Llamada para verificar citas pendientes
  },
  methods: {
    async obtenerCitasAgendadas() {
      // Simulación de una solicitud a la API para obtener las citas del paciente
     this.citas = [
        {
          id: 1,
          fecha: "2024-10-01",
          hora: "08:00",
          doctor_id: 1,
          paciente_expediente: "23412345",
          tipo_cita: "Consulta General",
          notas: "Traer resultados de exámenes."
        },
        {
          id: 2,
          fecha: "2024-09-28", // Cita pasada
          hora: "14:00",
          doctor_id: 2,
          paciente_expediente: "23412345",
          tipo_cita: "Especialidad",
          notas: "Consulta sobre alergias."
        },
        {
          id: 3,
          fecha: "2024-10-10",
          hora: "16:00",
          doctor_id: 3,
          paciente_expediente: "23412345",
          tipo_cita: "Control",
          notas: "Revisión de rutina."
        },

      ];
       // Verificar citas pendientes después de cargar las citas
         this.verificarCitasPendientes();
    },
    getDoctorNombre(doctor_id) {
      const doctor = doctores.find(doc => doc.id === doctor_id);
      return doctor ? `${doctor.nombre} ${doctor.apellido}` : 'Desconocido';
    },
    getPacienteNombre(expediente) {
      const paciente = pacientes.find(pac => pac.expediente === expediente);
      return paciente ? `${paciente.nombre} ${paciente.apellido}` : 'Desconocido';
    },
    abrirModal(cita) {
      this.citaSeleccionada = cita;
      $('#modalCitaDetalles').modal('show');
    },
    cerrarModal() {
      $('#modalCitaDetalles').modal('hide');
      this.citaSeleccionada = {};
    },
    isCitaCompletada(fecha) {
      const citaFecha = new Date(fecha);
      const hoy = new Date();
      return citaFecha < hoy;
    },
    descargarRecibo(citaId) {
      // Buscar la cita por ID
      const cita = this.citas.find(c => c.id === citaId);
      if (!cita) {
        alert('Cita no encontrada.');
        return;
      }

      // Crear el PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Título
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text('Recibo de Cita', pageWidth / 2, 20, null, null, 'center');

      // Dibuja un rectángulo para el encabezado
      doc.setFillColor(200, 220, 255);
      doc.rect(10, 25, pageWidth - 20, 10, 'F');

      // Detalles de la cita
      doc.setFontSize(12);
      doc.setTextColor(50);
      doc.text(`ID de Cita: ${cita.id}`, 20, 40);
      doc.text(`Fecha: ${cita.fecha}`, 20, 50);
      doc.text(`Hora: ${cita.hora}`, 20, 60);
      doc.text(`Paciente: ${this.getPacienteNombre(cita.paciente_expediente)}`, 20, 70);
      doc.text(`Doctor: ${this.getDoctorNombre(cita.doctor_id)}`, 20, 80);
      doc.text(`Tipo de Cita: ${cita.tipo_cita}`, 20, 90);
      doc.text(`Notas: ${cita.notas}`, 20, 100);

      // Pie de página
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('Gracias por elegirnos!', pageWidth / 2, pageHeight - 20, null, null, 'center');

      // Línea de separación
      doc.setDrawColor(100);
      doc.line(10, pageHeight - 25, pageWidth - 10, pageHeight - 25);

      // Descargar el PDF
      doc.save(`recibo_cita_${cita.id}.pdf`);
    },

    
    enviarMensajeDoctor(doctorId) {
      const doctor = doctores.find(doc => doc.id === doctorId);
      if (doctor) {
        alert(`Mensaje enviado a ${doctor.nombre} ${doctor.apellido}.`);
        // Aquí podrías implementar la lógica para enviar un mensaje real.
      }
    },
    verificarCitasPendientes() {
      const hoy = new Date();
      this.citas.forEach(cita => {
        const citaFecha = new Date(cita.fecha);
        const diferencia = (citaFecha - hoy) / (1000 * 60 * 60 * 24); // Diferencia en días

        // Verificar si la cita es en 3 días o menos
        if (diferencia <= 3 && diferencia >= 0) {
          const key = `cita-${cita.id}`;
          const now = Date.now();

          // Inicializar el objeto de recordatorio si no existe
          if (!this.recordatoriosMostrados[key]) {
            this.recordatoriosMostrados[key] = { count: 0, lastShown: 0 };
          }

          // Mostrar notificación solo si no ha llegado a 3 veces
          if (this.recordatoriosMostrados[key].count < 3) {
            // Comprobar si ha pasado 24 horas desde la última notificación
            const tiempoDesdeUltimaNotificacion = now - this.recordatoriosMostrados[key].lastShown;
            if (tiempoDesdeUltimaNotificacion >= 24 * 60 * 60 * 1000 / 3) {
              this.recordatoriosMostrados[key].count++;
              this.recordatoriosMostrados[key].lastShown = now;
              this.mostrarRecordatorio(cita);
            }
          }
        }

        // Mostrar recordatorio una semana antes
        if (diferencia === 7) {
          const key = `cita-semana-${cita.id}`;
          if (!this.recordatoriosMostrados[key]) {
            this.recordatoriosMostrados[key] = { count: 1, lastShown: Date.now() };
            this.mostrarRecordatorio(cita);
          }
        }
      });
    },

  mostrarRecordatorio(cita) {
    Swal.fire({
      title: 'Recordatorio de Cita',
      text: `Tienes una cita agendada para el ${cita.fecha} a las ${cita.hora} con el Dr. ${this.getDoctorNombre(cita.doctor_id)}`,
      icon: 'info',
      customClass: {
        popup: 'custom-popup', // Clase personalizada
      },
    });
  },
},

  
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

.custom-popup {
  width: 500px; /* Cambia este valor según tus necesidades */
}
.primario {
  background-color: #0071bc; /* Azul primario */

}
.badge{
width: 100px;
color:rgb(86, 86, 86);
}
</style>
