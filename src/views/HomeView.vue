<template>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css" />


   
    
    <!-- Carrusel de imágenes -->
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up" data-aos-duration="500">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/medfile3.jpeg" class="d-block w-100" alt="Imagen 1">
        </div>
        <div class="carousel-item">
          <img src="@/assets/medf.jpeg" class="d-block w-100" alt="Imagen 2">
        </div>
        <div class="carousel-item">
          <img src="@/assets/medfile3.jpeg" class="d-block w-100" alt="Imagen 3">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

   
    <div class="container-fluid" data-aos="fade-up">

      <div class="row mt-4 justify-content-center " data-aos-duration="500">
        <div class="col-md-12 mb-2">
        
        </div>
      </div>
    </div>
    
    <!-- Sección de Servicios -->
    <div class="services mt-5" data-aos="fade-up" data-aos-duration="500">
      <h2>Servicios Disponibles</h2>
      <p>Ofrecemos una plataforma fácil y accesible para que nuestros pacientes agenden citas, revisen su historial médico, y reciban notificaciones sobre sus citas pendientes.</p>
      <div class="row mt-4">
        <div class="col-md-4 mb-2" v-for="service in services" :key="service.id">
          <div class="card shadow">
            <div class="card-body text-center">
              <h5 class="card-title">{{ service.title }}</h5>
              <p class="card-text">{{ service.description }}</p>
              <router-link class="btn bt-primario w-50" :class="service.buttonClass" :to="service.link">
                {{ service.buttonText }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
 

  <div class="mental-health mt-5 border p-2 border-radius" data-aos="fade-up" data-aos-duration="500">
    <h2 class="text-center">Apoyo en Salud Mental</h2>
    <p class="text-center">
      Nuestra plataforma ofrece un enfoque innovador en el cuidado de la salud mental, permitiendo a los pacientes acceder a recursos valiosos y apoyo personalizado.
    </p>
    
    <div class="row mt-4">
      <div class="col-lg-6 mb-1">
        <img src="@/assets/terapia.jpeg" alt="Descripción de la imagen" class="img-fluid" />
       
      </div>
      
      <div class="col-md-6 mb-1">
        <div class="card shadow text-center">
          <div class="card-body">
            <h5 class="card-title">Autoevaluaciones Interactivas</h5>
            <p class="">
              Realiza autoevaluaciones psicológicas diseñadas para ayudarte a evaluar tu estado emocional y mental en base a tu historial clínico. Estas evaluaciones están orientadas a identificar signos de estrés, ansiedad o depresión, especialmente si estás lidiando con alguna enfermedad.
              <br> Además, te proporcionaremos recomendaciones personalizadas y, si es necesario, te sugeriremos contactar a un profesional de la salud mental para recibir apoyo.
            </p>
            <router-link class="btn bt-indigo w-50" to="/autoevaluacionesInteractivas">Empezar Evaluación</router-link>
          </div>
          
        </div>
        <div class="card shadow text-center mt-5">
          <div class="card-body">
            <h5 class="card-title">Terapias en Línea</h5>
            <p class="">
              Accede a sesiones de terapia en línea con profesionales certificados en salud mental desde la comodidad de tu hogar. Nuestras terapias virtuales están diseñadas para ofrecerte el apoyo emocional y psicológico que necesitas en momentos difíciles, ya sea que estés enfrentando estrés, ansiedad, depresión o problemas relacionados con una enfermedad. Las sesiones son confidenciales y flexibles, permitiendo que recibas atención personalizada sin importar tu ubicación.
            </p>
            <router-link class="btn bt-indigo w-50" to="/terapia-en-linea">Solicitar Terapia</router-link>
          </div>
          
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-6 mt-2 mb-2">
        <div class="card shadow text-center">
          <div class="card-body">
            <h5 class="card-title">Agendar Cita</h5>
            <p class="">
              ¡Agendar tu cita médica nunca ha sido tan fácil! Solo sigue estos simples pasos: llena el formulario con tus datos y preferencias, selecciona la fecha y hora disponibles, y confirma tu cita en minutos. Además, podrás revisar fácilmente tus citas agendadas y acceder al historial completo de tus consultas previas, todo desde un solo lugar. Nuestro sistema te garantiza un proceso rápido, sencillo y totalmente accesible.
            </p>
            <router-link class="btn bt-primario w-50" to="/agendar-cita">Agenda Ahora</router-link>
          </div>
          
          
        </div>
        <div class="card shadow text-center mt-5 mb-2">
          <div class="card-body">
            <h5 class="card-title">Recursos en Línea</h5>
            <p class="">
              Explora una amplia colección de recursos diseñados para apoyarte en tu bienestar emocional y mental. Desde artículos informativos hasta videos guiados por profesionales, encontrarás herramientas prácticas para comprender y gestionar tu salud mental. Aprende estrategias de afrontamiento, técnicas de relajación y consejos útiles que te ayudarán en tu día a día, todo al alcance de un clic.
            </p>
            <router-link class="btn bt-tercer w-50" to="/recursos">Ver Recursos</router-link>
          </div>
          
          
          
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <img src="@/assets/citas.jpeg" alt="Descripción de la imagen" class="img-fluid" />
      </div>
    </div>
  
    
  </div>
  <br>
</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Agendar Cita',
          description: 'Agenda tu cita de manera rápida y sencilla.',
          buttonText: 'Agendar Ahora',
          buttonClass: 'bt-primario',
          link: '/agendar-cita',
        },
        {
          id: 2,
          title: 'Historial de Citas',
          description: 'Consulta tu historial de citas fácilmente.',
          buttonText: 'Ver Historial',
          buttonClass: 'bt-secundario',
          link: '/historial-citas',
        },
        {
          id: 3,
          title: 'Notificaciones',
          description: 'Recibe notificaciones de tus citas pendientes.',
          buttonText: 'Ver Notificaciones',
          buttonClass: 'bt-tercer',
          link: '/notificaciones-pendientes',
        },
      ],
      doctores: [
        { id: 1, nombre: "Carlos Eduardo", apellido: "Gómez Ramírez", especialidad: "Ansiedad", contacto: "carlos@example.com" },
        { id: 2, nombre: "Ana Sofía", apellido: "López Herrera", especialidad: "Depresión", contacto: "ana@example.com" },
        { id: 3, nombre: "Miguel Ángel", apellido: "Martínez Pineda", especialidad: "Terapia Cognitivo-Conductual", contacto: "miguel@example.com" },
        { id: 4, nombre: "Laura Fernanda", apellido: "Sánchez Ortiz", especialidad: "Estrés Postraumático", contacto: "laura@example.com" },
        { id: 5, nombre: "José Luis", apellido: "Rodríguez Vega", especialidad: "Trastornos de Ansiedad Generalizada", contacto: "jose@example.com" }
      ],
      searchTerm: '',
      doctorSeleccionado: null,
    };
  },
  computed: {
    resultadosFiltrados() {
      return this.doctores.filter(doctor => {
        return (
          doctor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          doctor.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          doctor.especialidad.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    }
  },
  methods: {
    seleccionarDoctor(doctor) {
      this.doctorSeleccionado = doctor;
    }
  }
};
    
  

</script>
<style scoped>
.search-bar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5rem;
}

.card-text {
  font-size: 1.1rem;
}

.b-pagination {
  justify-content: center;
}

.services {
  text-align: center;
}

.btn {
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn:hover {
  filter: brightness(90%);
}


.bt-cyan {
  background-color: #06b6d4; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-primario {
  background-color: #0071bc; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-primario:hover {
  background-color: #09466FFF; /* Cyan 500 de Tailwind CSS */
  color: white;
}


.bt-indigo {
  background-color: #9F1FFBFF; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-indigo:hover {
  background-color: #720394FF; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-secundario {
  background-color: #7ac943; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-secundario:hover {
  background-color: #63A534FF; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-tercer {
  background-color: #29abe2; /* Cyan 500 de Tailwind CSS */
  color: white;
}


.bt-tercer:hover {
  background-color: #2187B3FF; /* Cyan 500 de Tailwind CSS */
  color: white;
}
</style>
