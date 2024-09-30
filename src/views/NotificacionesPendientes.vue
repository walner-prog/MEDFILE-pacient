<template>
  <div class="container mt-5">
    <h4 class="mb-4 text-left">Notificaciones Pendientes</h4>

    <div v-if="notificaciones.length" class="list-group">
      <div
        v-for="notificacion in notificaciones"
        :key="notificacion.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
      <div class="row">
        <div class="col-lg-6">
          <div>
            <h5 class="mb-1 text-success text-left">{{ notificacion.titulo }}</h5>
            <p class="mb-1 text-left">{{ notificacion.mensaje }}</p>
            <small class="text-muted text-left">Fecha: {{ formatFecha(notificacion.fecha) }}</small>
          </div>
        </div>
        <div class="col-lg-6">
          
        <span class="badge primario text-white p-4 w-50 mb-2">{{ notificacion.tipo }}</span>
        <div class="">
          <button class="btn btn-info btn-sm text-white  mr-1" @click="confirmarCita(notificacion.id)">Confirmar</button>
          <button class="btn btn-secondary text-white btn-sm  mr-1" @click="reprogramarCita(notificacion.id)">Reprogramar</button>
          <button class="btn btn-warning text-white btn-sm  mr-1" @click="cancelarCita(notificacion.id)">Cancelar</button>
        </div>
        </div>
      </div>
       
      </div>
    </div>

    <div v-else class="alert alert-success">
      No tienes notificaciones pendientes.
    </div>

    <button @click="toggleHistorial" class="btn btn-info mt-4 text-white">
      {{ mostrarHistorial ? 'Ocultar' : 'Mostrar' }} Historial de Notificaciones
    </button>

    <div v-if="mostrarHistorial" class="mt-4">
      <h4>Historial de Notificaciones</h4>
      <ul class="list-group">
        <li v-for="historia in historialNotificaciones" :key="historia.id" class="list-group-item">
          <h5 class="mb-1">{{ historia.titulo }}</h5>
          <p class="mb-1">{{ historia.mensaje }}</p>
          <small class="text-muted">Fecha: {{ formatFecha(historia.fecha) }}</small>
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <h4 class="mb-4 text-left">Recordatorios de Medicamentos</h4>
        <div class="table-responsive" data-aos="fade-up" data-aos-duration="500">
          <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" class="primario text-white">Medicamento</th>
              <th scope="col" class="primario text-white">Dosis</th>
              <th scope="col" class="primario text-white">Frecuencia</th>
              <th scope="col" class="primario text-white">Fecha</th>
              <th scope="col" class="primario text-white">Hora</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recordatorio in recordatorios" :key="recordatorio.id">
              <td>{{ recordatorio.medicamento }}</td>
              <td>{{ recordatorio.dosis }}</td>
              <td>{{ recordatorio.frecuencia }}</td>
              <td>{{ formatFecha(recordatorio.fecha) }}</td>
              <td>{{ recordatorio.hora }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <div class="col-lg-4"> 
        <div class="mt-4 card mb-1 p-1">
          <h5 class="mb-4 text-center mt-2">Agregar Recordatorio Personalizado</h5>
          <form @submit.prevent="agregarRecordatorio">
            <div class="mb-3 input-group">
              <span class="input-group-text"><i class="fas fa-pills"></i></span>
              <input type="text" 
                     v-model="nuevoRecordatorio.medicamento" 
                     class="form-control" 
                     placeholder="Nombre del Medicamento" 
                     required />
            </div>
            <div class="mb-3 input-group">
              <span class="input-group-text"><i class="fas fa-syringe"></i></span>
              <input type="text" 
                     v-model="nuevoRecordatorio.dosis" 
                     class="form-control" 
                     placeholder="Dosis" 
                     required />
            </div>
            <div class="mb-3 input-group">
              <span class="input-group-text"><i class="fas fa-clock"></i></span>
              <input type="text" 
                     v-model="nuevoRecordatorio.frecuencia" 
                     class="form-control" 
                     placeholder="Ej. Cada 8 horas" 
                     required />
            </div>
            <div class="mb-3 input-group">
              <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
              <input type="date" 
                     v-model="nuevoRecordatorio.fecha" 
                     class="form-control" 
                     required />
            </div>
            <div class="mb-3 input-group">
              <span class="input-group-text"><i class="fas fa-clock"></i></span>
              <input type="time" 
                     v-model="nuevoRecordatorio.hora" 
                     class="form-control" 
                     required />
            </div>
            <button type="submit" class="btn btn-primary mb-2">Agregar Recordatorio</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

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
      notificaciones: [],
      historialNotificaciones: [],
      recordatorios: [],
      nuevoRecordatorio: {
        medicamento: '',
        dosis: '',
        frecuencia: '',
        fecha: '',
        hora: ''
      },
      mostrarHistorial: false,
    };
  },
  created() {
    this.obtenerCitasAgendadas();
    this.cargarRecordatorios();
  },
  methods: {
    formatFecha(fecha) {
      return dayjs(fecha).format('D [de] MMMM [de] YYYY');
    },
    async obtenerCitasAgendadas() {
      this.citas = [
        {
          id: 1,
          fecha: "2024-09-30",
          hora: "08:00",
          doctor_id: 1,
          paciente_expediente: "23412345",
          tipo_cita: "Consulta General",
          notas: "Traer resultados de exámenes."
        },
        {
          id: 2,
          fecha: "2024-09-27", // Cita pasada
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

      this.generarNotificaciones(this.citas);
    },
    generarNotificaciones(citas) {
      const hoy = dayjs();

      citas.forEach(cita => {
        const fechaCita = dayjs(`${cita.fecha} ${cita.hora}`);
        const diferenciaDias = fechaCita.diff(hoy, 'day');

        // Notificaciones para citas próximas
        if (diferenciaDias <= 7 && diferenciaDias >= 0) {
          this.notificaciones.push({
            id: cita.id,
            titulo: `Recordatorio de Cita`,
            mensaje: `Tienes una cita con el Dr. ${this.getDoctorNombre(cita.doctor_id)} el ${this.formatFecha(fechaCita)} a las ${cita.hora}.`,
            fecha: fechaCita.format('YYYY-MM-DD'),
            tipo: 'Cita Próxima'
          });
        }

        // Notificaciones para citas pasadas
        if (diferenciaDias < 0) {
          this.historialNotificaciones.push({
            id: cita.id,
            titulo: `Cita Pasada`,
            mensaje: `Tuviste una cita con el Dr. ${this.getDoctorNombre(cita.doctor_id)} el ${this.formatFecha(fechaCita)} a las ${cita.hora}.`,
            fecha: fechaCita.format('YYYY-MM-DD'),
            tipo: 'Cita Completada'
          });
        }
      });
    },
    getDoctorNombre(doctor_id) {
      const doctor = doctores.find(doc => doc.id === doctor_id);
      return doctor ? `${doctor.nombre} ${doctor.apellido}` : 'Desconocido';
    },
    confirmarCita(id) {
      alert(`Cita ${id} confirmada.`);
    },
    reprogramarCita(id) {
      alert(`Cita ${id} reprogramada.`);
    },
    cancelarCita(id) {
      alert(`Cita ${id} cancelada.`);
    },
    cargarRecordatorios() {
      const recordatoriosGuardados = JSON.parse(localStorage.getItem('recordatorios')) || [];
      this.recordatorios = recordatoriosGuardados;
    },
    agregarRecordatorio() {
      const nuevoRecordatorio = {
        id: this.recordatorios.length + 1,
        medicamento: this.nuevoRecordatorio.medicamento,
        dosis: this.nuevoRecordatorio.dosis,
        frecuencia: this.nuevoRecordatorio.frecuencia,
        fecha: this.nuevoRecordatorio.fecha,
        hora: this.nuevoRecordatorio.hora
      };
      this.recordatorios.push(nuevoRecordatorio);
      localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
      this.nuevoRecordatorio = { medicamento: '', dosis: '', frecuencia: '', fecha: '', hora: '' }; // Reiniciar el formulario
    },
    toggleHistorial() {
      this.mostrarHistorial = !this.mostrarHistorial;
    },
  }
};
</script>

<style scoped>
.primario {
  background-color: #0071bc; /* Azul primario */

}
.list-group-item {
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

.badge {
  font-size: 0.9rem;
  padding: 1em;
  width:100px;
 
}
.primario {
  background-color: #0071bc; /* Azul primario */

}
</style>
