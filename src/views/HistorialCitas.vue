<template>
  <div class="container">
    <h2>Historial de Citas</h2>
    <div class="table-responsive" data-aos="fade-up" data-aos-duration="500">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th class="primario">#</th>
            <th class=" primario"><i class="fas fa-calendar-day"></i> Fecha</th>
            <th class=" primario"><i class="fas fa-clock"></i> Hora</th>
            <th class=" primario"><i class="fas fa-user-md"></i> Doctor</th>
            <th class="primario"><i class="fas fa-file-medical"></i> Tipo de Cita</th>
            <th class=" primario" >Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cita, index) in paginatedCitas" :key="cita.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cita.fecha }}</td>
            <td>{{ cita.hora }}</td>
            <td>{{ cita.doctor_nombre }} {{ cita.doctor_apellido }}</td>
            <td>{{ cita.tipo_cita }}</td>
            <td style="width: 300px">
              <button class="btn btn-info btn-sm me-1" @click="verDetalles(cita)">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="cancelarCita(cita.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
            
          </tr>
        </tbody>
      </table>
      <!-- Cambia el nombre del componente aquí -->
      <CitasPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="onPageChanged"
      ></CitasPagination>
      <p v-if="historial.length === 0">No tienes citas anteriores.</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import CitasPagination from './CitasPagination.vue'; // Asegúrate de crear un componente de paginación

export default {
  components: {
    CitasPagination
  },
  data() {
    return {
      historial: [],
      currentPage: 1,
      itemsPerPage: 5 // Cambia el número de citas por página según necesites
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.historial.length / this.itemsPerPage);
    },
    paginatedCitas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.historial.slice(start, start + this.itemsPerPage);
    }
  },
  created() {
    this.obtenerHistorialCitas();
  },
  methods: {
    async obtenerHistorialCitas() {
      // Simulación de una solicitud a la API para obtener el historial de citas del paciente
      this.historial = [
        { id: 1, fecha: "2023-09-15", hora: "10:00", doctor_nombre: "Luis", doctor_apellido: "Rodríguez", tipo_cita: "Consulta General" },
        { id: 2, fecha: "2023-09-16", hora: "11:00", doctor_nombre: "Ana", doctor_apellido: "Sofía", tipo_cita: "Chequeo" },
        { id: 1, fecha: "2023-09-15", hora: "10:00", doctor_nombre: "Luis", doctor_apellido: "Rodríguez", tipo_cita: "Consulta General" },
        { id: 2, fecha: "2023-09-16", hora: "11:00", doctor_nombre: "Ana", doctor_apellido: "Sofía", tipo_cita: "Chequeo" },
        // Añade más citas simuladas aquí
      ];
    },
    verDetalles(cita) {
      // Lógica para abrir el modal con detalles de la cita
      console.log('Detalles de la cita:', cita);
    },
    cancelarCita(id) {
      // Lógica para cancelar la cita
      console.log('Cancelar cita con ID:', id);
    },
    onPageChanged(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>
<style scoped>
.primario {
  background-color: #0071bc; /* Azul primario */

}
</style>