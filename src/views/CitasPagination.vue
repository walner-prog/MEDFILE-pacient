<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <!-- Botón Anterior -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
          Anterior
        </a>
      </li>
      
      <!-- Números de Página -->
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
      
      <!-- Botón Siguiente -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
          Siguiente
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.6;
}
.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
.page-link {
  color: #007bff;
}
</style>
