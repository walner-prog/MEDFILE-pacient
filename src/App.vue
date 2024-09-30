<template>
  <head>
  

  </head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div id="app" :class="theme" class="container-fluid" >
    <!-- Navbar -->
     <div class=" bg-nabvar">
      <div class="container nabar">
     
          <nav class="navbar fixed-top bg-nabvar navbar-expand-lg" :class="{ 'bg-light': !isDarkTheme, 'dark-theme': isDarkTheme }">
          <router-link class="navbar-brand" to="/">
            <img src="@/assets/logo-sin-fondo.png" alt="Logo" class="logo img-fluid" />
          </router-link>
          <button class="navbar-toggler bt-cyan" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon boton-nav"></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav d-flex justify-content-between w-100">
              <li class="nav-item flex-grow-1 text-center">
                <router-link class="nav-link " to="/agendar-cita">Agendar Cita</router-link>
              </li>
              <li class="nav-item flex-grow-1 text-center">
                <router-link class="nav-link " to="/citas-agendadas">Citas Agendadas</router-link>
              </li>
              <li class="nav-item flex-grow-1 text-center">
                <router-link class="nav-link" to="/historial-citas">Historial Citas</router-link>
              </li>
              <li class="nav-item flex-grow-1 text-center">
                <router-link class="nav-link" to="/notificaciones-pendientes">Notificaciones Pendientes</router-link>
              </li>
              <li class="nav-item flex-grow-1 text-center">
                <router-link class="nav-link " to="/quienes-somos">Quienes somos</router-link>
              </li>
              
            <!-- Selector de tema -->
            <div class="nav-item flex-grow-1 text-center theme-toggle position-relative ml-4 mb-1" @click="toggleTheme">
              <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </div>

            <div class="nav-item flex-grow-1 text-center mt-2 position-relative">
              <i class="fas fa-bell" style="font-size: 24px; cursor: pointer;"></i>
              <span v-if="notificaciones > 0" class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle mr-5">
                {{ notificaciones }}
              </span>
            </div>
            
            <div class="nav-item flex-grow-1 text-center mt-2 position-relative">
              <i class="fas fa-envelope" style="font-size: 24px; cursor: pointer;"></i>
              <span v-if="mensajes > 0" class="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                {{ mensajes }}
              </span>
            </div>
            
            
      
            <!-- Icono de inicio de sesión -->
            <div class=" nav-item flex-grow-1 text-center login-icon mt-1" @click="toggleLoginCard">
             
              <img src="@/assets/author2.jpg" width="50" height="50" class="img-fluid rounded-circle" alt="Imagen circular">

            </div>
            </ul>
            
          </div>
        </nav>
        <div v-if="showLoginCard" class="login-card mt-5" style="position: absolute; right: 20px; top: 60px; width: 250px;">
          <div class="card mt-5">
  
            <div class="upper">
  
             
              
            </div>
  
            <div class="user text-center">
  
              <div class="profile">
  
                <img src="@/assets/author2.jpg" width="100" height="100" class="img-fluid rounded-circle" alt="Imagen circular">
                
              </div>
  
            </div>
  
  
            <div class="mt-5 text-center">
  
              <h5 class="card-title">Juan Pérez</h5>
            
  
              <button class="btn btn-danger" @click="cerrarSesion">Cerrar Sesión</button>
  
  
              <div class="d-flex justify-content-between align-items-center mt-4 px-4">
  
                <div class="stats">
                  <h6 class="mb-0">Citas</h6>
                  <span>3</span>
  
                </div>
  
  
                <div class="stats">
                  
  
                </div>
  
  
                <div class="stats">
                  <h6 class="mb-0">Citas pendientes</h6>
                  <span>2</span>
  
                </div>
             
              </div>
              
            </div>
             
           </div>
        </div>
      </div>
     </div>
    <br> <br>   <br> <br>   <br> <br>   

    <!-- Vista del Router -->
    <router-view></router-view>

    <!-- Footer -->
    <footer class=" text-light pt-5 mt-5">
      <div class="container-fluid">
        <div class="row">
          <!-- Sección de logo y descripción -->
        

          <!-- Sección de enlaces rápidos -->
          <div class="col-md-4">
            <h5>Enlaces rápidos</h5>
            <ul class="list-unstyled">
              <li>
                <router-link class="text-light" to="/agendar-cita">Agendar Cita</router-link>
              </li>
              <li>
                <router-link class="text-light" to="/citas-agendadas">Citas Agendadas</router-link>
              </li>
              <li>
                <router-link class="text-light" to="/historial-citas">Historial Citas</router-link>
              </li>
              <li>
                <router-link class="text-light" to="/notificaciones-pendientes">Notificaciones</router-link>
              </li>
            </ul>
          </div>

          <!-- Sección de contacto -->
          <div class="col-md-4">
            <h5>Contáctanos</h5>
            <ul class="list-unstyled">
              <li><i class="fas fa-phone"></i> +505 1234-5678</li>
              <li><i class="fas fa-envelope"></i> soporte@medfile.com</li>
              <li><i class="fas fa-map-marker-alt"></i> Managua, Nicaragua</li>
            </ul>
          </div>

          <!-- Sección de redes sociales -->
          <div class="col-md-4">
            <h5>Síguenos</h5>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#" class="text-light">
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-light">
                  <i class="fab fa-twitter fa-2x"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-light">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Pie de página -->
        <div class="text-center mt-4">
          <p>&copy; 2024 MEDFILE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkTheme: true, // Estado del tema
      showLoginCard: false, // Estado para mostrar/ocultar la card de sesión
      notificaciones: 0, // Simula la cantidad de notificaciones no vistas
      mensajes: 0
    };
  },
  computed: {
    theme() {
      return this.isDarkTheme ? 'dark-theme' : 'light-theme';
    },
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    },
    loadTheme() {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkTheme = savedTheme === 'dark';
    },
    toggleLoginCard() {
      this.showLoginCard = !this.showLoginCard;
    },
    cerrarSesion() {
      alert('Sesión cerrada');
      this.showLoginCard = false;
    }
  },
  mounted() {
    this.loadTheme(); // Cargar el tema al iniciar
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login-card {
  z-index: 1000;
}

.logo {
  max-width: 100%; /* Ajusta el tamaño del logo al contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  width: 100px; /* Establece un ancho máximo */
}

.container thead {
  background-color: darkslategray;
  color: darkgreen;
}

nav {
  padding: 30px;
  
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #0071bc;
}

.tr-encabezado {
  background-color: darkslategray;
}

.boton-nav {
  background-color: transparent; /* Fondo transparente */
  border: none; /* Sin borde */
  padding: 8px; /* Espaciado interno */
  border-radius: 4px; /* Bordes redondeados */
  transition: background-color 0.3s ease; /* Transición suave para el fondo */
}

.boton-nav:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Color de fondo al pasar el ratón */
}

.boton-nav:focus {
  outline: none; /* Sin contorno en el foco */
}

.bt-cyan {
  background-color: #06b6d4; /* Cyan 500 de Tailwind CSS */
  color: white;
}

.bt-primario {
  background-color: #0071bc; /* Azul primario */
  color: white;
}
.primario {
  background-color: #0071bc; /* Azul primario */

}
.bt-secundario {
  background-color: #7ac943; /* Verde secundario */
  color: white;
}

.bt-tercer {
  background-color: #29abe2; /* Azul terciario */
  color: white;
}


.nav-link {
  position: relative; /* Para posicionar el pseudo-elemento */
}

.nav-link:hover {
  color:#7ac943; 
}

.nav-link::after {
  content: ""; /* Necesario para mostrar el pseudo-elemento */
  display: block; /* Lo hace un bloque */
  width: 0; /* Inicia con un ancho de 0 */
  height: 2px; /* Altura de la línea */
  background: #7ac943; /* Color de la línea */
  transition: width 0.3s ease; /* Transición suave */
  position: absolute; /* Posición absoluta para alinearlo */
  left: 0; /* Alinear a la izquierda */
  bottom: -2px; /* Espaciado desde el texto */

}

.nav-link:hover::after {
  width: 100%; /* Se expande al 100% al pasar el ratón */
}

footer {
  background-color: #303030FF;
  color: #b3b3b3;
}

footer h5 {
  color: #f1f1f1;
  font-weight: 600;
}

footer p, footer li {
  font-size: 14px;
}

footer a {
  color: #b3b3b3;
  transition: color 0.3s ease-in-out;
}

footer a:hover {
  color: #fff;
}

footer .list-inline-item a {
  margin-right: 10px;
}

footer .list-inline-item a i {
  color: #b3b3b3; /* Color de íconos en el pie de página */
  transition: color 0.3s ease-in-out;
}

footer .list-inline-item a:hover i {
  color: #fff; /* Color de íconos al pasar el ratón */
}

/* Estilos de tema oscuro */
.dark-theme {
  background-color: #000000FF;
  color: #ffffff;
}

.dark-theme  .bg-light{
  background-color: #03050EFF;
  color: #ffffff;
}
.light-theme .bg-light {
  background-color:#D9E4FFFF;
}
.dark-theme .card {
  background-color: #252932FF; /* Fondo oscuro para la tarjeta */
  color: #ffffff; /* Color del texto dentro de la tarjeta */
  border: 1px solid #444; /* Color del borde de la tarjeta (opcional) */
}

.dark-theme .card i {
  color: #497FFDFF; /* Color de los iconos dentro de la tarjeta */
}

.dark-theme h1,
.dark-theme h2,
.dark-theme h3,
.dark-theme h4,
.dark-theme h5,
.dark-theme h6 {
  color: #ffffff; /* Color blanco para todos los encabezados en modo oscuro */
}

.dark-theme p,
.dark-theme span
 {
  color: #919191FF; /* Color blanco para todos los encabezados en modo oscuro */
}
.dark-theme nav .navbar-nav li a {
  color: #ffffff; /* Color para enlaces en modo oscuro */
}


.dark-theme footer {
  background-color: #03050EFF; /* Fondo oscuro para el pie de página */
  color: #ffffff;
}



.theme-toggle i {
  font-size: 1.5em; /* Tamaño del icono */
}
.theme-toggle {
  cursor: pointer;
  margin-left: auto; /* Para alinear a la derecha */
  color: #0071bc; /* Color del icono */
  padding: 10px; /* Añade padding para aumentar el área de clic */
  display: flex; /* Asegura que el contenido se alinee correctamente */
  align-items: center; /* Centra el icono verticalmente */
}
.badge {
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
