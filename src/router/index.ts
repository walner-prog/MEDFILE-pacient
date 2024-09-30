import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Importar las vistas
import HomeView from '../views/HomeView.vue'
import AgendarCita from '../views/AgendarCita.vue'
import CitasAgendadas from '../views/CitasAgendadas.vue'
import HistorialCitas from '../views/HistorialCitas.vue'
import NotificacionesPendientes from '../views/NotificacionesPendientes.vue'
import CitasPagination from '../views/CitasPagination.vue'; // Ruta correcta
import AutoevaluacionesInteractivas from '../views/AutoevaluacionesInteractivas.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/agendar-cita',
    name: 'agendar-cita',
    component: AgendarCita
  },
  {
    path: '/autoevaluacionesInteractivas',
    name: 'autoevaluacionesInteractivas',
    component: AutoevaluacionesInteractivas
  },
  {
    path: '/paginacion',
    name: 'paginacion',
    component: CitasPagination // Cambio en el path y uso de CitasPagination
  },
  {
    path: '/citas-agendadas',
    name: 'citas-agendadas',
    component: CitasAgendadas // Aquí el nombre correcto para citas agendadas
  },
  {
    path: '/historial-citas',
    name: 'historial-citas',
    component: HistorialCitas
  },
  {
    path: '/notificaciones-pendientes',
    name: 'notificaciones-pendientes',
    component: NotificacionesPendientes
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
