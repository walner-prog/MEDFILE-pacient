<template>
  <br>
  <div class="row">
    <div class="col-lg-6" data-aos="fade-up">
      <img src="@/assets/citas.jpeg" alt="Descripción de la imagen" class="img-fluid" />
    </div>
    <div class="col-lg-6">
      <div class="agendar-cita" data-aos="fade-up">
        <h2 class="text-center mb-4">Agendar Cita</h2>
    
        <!-- Formulario de agendamiento -->
        <form @submit.prevent="agendarCita" class="needs-validation">
    
          <!-- Número de expediente -->
          <div class="form-group" data-aos="fade-up">
            <label for="expediente">
              <i class="fas fa-file-alt"></i> Número de Expediente:
            </label>
            <input
              v-model="no_expediente"
              @blur="buscarPaciente"
              type="text"
              id="expediente"
              class="form-control"
              required
            />
            <small v-if="errorNoExpediente" class="text-danger">
              Expediente no encontrado. Verifique o ingrese manualmente.
            </small>
          </div>
    
          <!-- Información del paciente -->
          <div v-if="paciente" class="form-group mt-3" data-aos="fade-up">
            <p class=" text-primary card"><strong>Paciente:</strong> 
               {{ paciente.nombre }} {{ paciente.apellido }} 
               <strong>Expediente:</strong>   {{ paciente.expediente }}
              </p>
          </div>
    
          <!-- Búsqueda de Doctor -->
          <div class="form-group" data-aos="fade-up">
            <label for="doctor">
              <i class="fas fa-user-md"></i> Buscar Doctor:
            </label>
            <input
              v-model="doctorQuery"
              @input="buscarDoctor"
              type="text"
              id="doctor"
              class="form-control"
              placeholder="Buscar doctor por nombre o apellido..."
              required 
              autocomplete="off"
            />
            
            <!-- Resultados de búsqueda de doctor -->
            <ul class="list-group mt-2" v-if="doctores.length">
              <li
                class="list-group-item"
                v-for="doctor in doctores"
                :key="doctor.id"
                @click="seleccionarDoctor(doctor)"
              >
                {{ doctor.nombre }} {{ doctor.apellido }}
              </li>
            </ul>
          </div>
    
          <!-- Fecha de la cita -->
          <div class="form-group" data-aos="fade-up">
            <label for="fecha">
              <i class="fas fa-calendar-alt"></i> Fecha de la Cita:
            </label>
            <input
              v-model="fecha_cita"
              type="date"
              id="fecha"
              class="form-control"
              required
            />
          </div>
    
          <!-- Hora de la cita -->
          <div class="form-group" data-aos="fade-up">
            <label for="hora">
              <i class="fas fa-clock"></i> Hora de la Cita:
            </label>
            <input
              v-model="hora_cita"
              type="time"
              id="hora"
              class="form-control"
              required
            />
          </div>
    
          <!-- Tipo de cita -->
          <div class="form-group" data-aos="fade-up">
            <label for="tipo">
              <i class="fas fa-stethoscope"></i> Tipo de Cita:
            </label>
            <select v-model="tipo_cita" id="tipo" class="form-control" required>
              <option value="consulta_general">Consulta General</option>
              <option value="especialidad">Especialidad</option>
              <option value="especialidad">Control</option>
            </select>
          </div>
    
          <!-- Botón de Agendar -->
          <button type="submit" class="btn btn-primary btn-block mt-4" >
            <i class="fas fa-calendar-check"></i> Agendar Cita
          </button>
    
        </form>
    
        <!-- Alerta de confirmación -->
        <div v-if="mensajeAlerta" class="alert alert-success mt-4" data-aos="fade-in">
          <strong>{{ mensajeAlerta }}</strong>
          <p>Cita agendada con el doctor <strong>{{ doctorSeleccionado }}</strong> para el día <strong>{{ fecha_cita }}</strong> a las <strong>{{ hora_cita }}</strong>.</p>
        </div>
        
      </div>
    </div>
  </div>
 
  <br> <br> <br>

</template>
<script>
const pacientes = [
  { expediente: "23412345", nombre: "Juan Carlos", apellido: "Pérez López", cedula: "001-123456-0001X" },
  { expediente: "43254321", nombre: "Ana María", apellido: "González Sánchez", cedula: "001-987654-0001X" },
  { expediente: "54367890", nombre: "Carlos Eduardo", apellido: "Ramírez Hernández", cedula: "001-111222-0001X" }
];

const doctores = [
  { id: 1, nombre: "Carlos Eduardo", apellido: "Gómez Ramírez" },
  { id: 2, nombre: "Ana Sofía", apellido: "López Herrera" },
  { id: 3, nombre: "Miguel Ángel", apellido: "Martínez Pineda" },
  { id: 4, nombre: "Laura Fernanda", apellido: "Sánchez Ortiz" },
  { id: 5, nombre: "José Luis", apellido: "Rodríguez Vega" }
];

export default {
  data() {
    return {
      no_expediente: "",
      paciente: null,
      doctorQuery: "",
      doctores: [],
      doctor_id: null,
      doctorSeleccionado: "",
      fecha_cita: "",
      hora_cita: "",
      tipo_cita: "consulta_general",
      mensajeAlerta: "",
      errorNoExpediente: false,
    };
  },
 
  methods: {
    // Buscar información del paciente usando el no_expediente
    buscarPaciente() {
      const pacienteEncontrado = pacientes.find(p => p.expediente === this.no_expediente);
      if (pacienteEncontrado) {
        this.paciente = pacienteEncontrado;
        this.errorNoExpediente = false;
      } else {
        this.errorNoExpediente = true;
        this.paciente = null;
      }
    },

    // Búsqueda de doctores basada en el nombre o apellido
    buscarDoctor() {
      this.doctores = doctores.filter(doctor => 
        doctor.nombre.toLowerCase().includes(this.doctorQuery.toLowerCase()) || 
        doctor.apellido.toLowerCase().includes(this.doctorQuery.toLowerCase())
      );
    },

    // Seleccionar un doctor de la lista y llenar el campo con su nombre
    seleccionarDoctor(doctor) {
      this.doctor_id = doctor.id;
    this.doctorSeleccionado = `${doctor.nombre} ${doctor.apellido}`;
    this.doctorQuery = `${doctor.nombre} ${doctor.apellido}`; // Rellena el campo de búsqueda con el nombre del doctor
    this.doctores = []; // Limpiar lista después de seleccionar
    },

    agendarCita() {
  // Limpiar cualquier mensaje de alerta anterior
  this.mensajeAlerta = "";

  // Verificar si todos los campos requeridos están llenos
  if (this.doctor_id && this.fecha_cita && this.hora_cita && this.tipo_cita) {
    // Mostrar el mensaje de éxito con los detalles de la cita
    this.mensajeAlerta = `Cita creada exitosamente con el doctor ${this.doctorSeleccionado} para el día ${this.fecha_cita} a las ${this.hora_cita}.`;

    // Resetear el formulario después de mostrar el mensaje de éxito
    
      this.resetForm();
      // Esto es para dar tiempo de que el mensaje de éxito se muestre antes de resetear
  } else {
    // Mostrar mensaje de error si faltan campos
    this.mensajeAlerta = "Por favor, complete todos los campos.";
  }
},


    // Resetear el formulario
    resetForm() {
      this.no_expediente = "";
      this.paciente = null;
      this.doctorQuery = "";
      this.doctores = [];
      this.doctor_id = null;
      this.fecha_cita = "";
      this.hora_cita = "";
      this.tipo_cita = "consulta_general";
      setTimeout(() => {
        this.mensajeAlerta = "";
      }, 3000);
    }
  }
};
</script>
<style scoped>
.agendar-cita {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
}

h2 {
  font-size: 1.8rem;
  color: #2857A7FF;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #2857A7FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #4E82DBFF;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
