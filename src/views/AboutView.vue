<!-- src/components/ProductList.vue -->

<template>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">
  <!-- BootstrapVue CSS via CDN -->

 <link rel="stylesheet" href="../assets/bootstrap.css">

  </head>
  <div class=" container">
    <h2>Lista de Productos</h2>
    <!-- Agregar un campo de entrada para la búsqueda por categoría -->
<input v-model="categoriaBusqueda" placeholder="Buscar por categoría " value="category" >
<button class="buscarcategory" @click="filtrarPorCategoria">Buscar</button>
<!--<input v-model="name" placeholder="Buscar por nombre del producto " value="category">
<button @click="filtrarProductosPorNombre">Buscar</button>
     -->
     <div class="table-responsive">
      <table class="table table-bordered text-bg-info text-white">
        <thead>
          <tr class="">
            <th>ID</th>
            <th @click="ordenarPor('name')">Nombre</th>
            <th>Descripción</th>
            <th >Precio</th>
            <th >Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr class=" text-white" v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }} USD</td>
            <td>{{ product.category }}</td>
            <!-- Resto de las celdas de la fila -->
          </tr>
        </tbody>
      </table>
    </div>


    <b-pagination
    v-if="totalPages > 1"
    v-model="currentPage"
    :total-rows="totalProducts"
    :per-page="productsPerPage"
    aria-controls="my-table"
  ></b-pagination>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  
  data() {
    return {
      products: [],
      
      orden: { columna: null, direccion: 1 }, // Inicialmente, no hay orden

      categoriaBusqueda: '', // Inicialmente, la búsqueda está vacía
    };

    
  },
  mounted() {

    this.obtenerProductos();

    // Hacer la solicitud para obtener todos los productos al cargar el componente
    axios.get('https://apiproduct-nveo.onrender.com/products')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
  methods: {
// Optener toods los productos
    async obtenerProductos() {
      try {
        const response = await axios.get('https://apiproduct-nveo.onrender.com/products');
        this.productos = response.data;
        this.totalProducts = this.productos.length;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
      
    // aptualizar  un  producto
    async actualizarProducto(productId, updatedProduct) {
      try {
        const response = await axios.put(`https://apiproduct-nveo.onrender.com/products/${productId}`, updatedProduct);
        console.log(response.data); // Aquí puedes manejar la respuesta de la API
      } catch (error) {
        console.error('Error al actualizar el producto', error);
      }
    },

    mostrarFormularioActualizar(producto) {
      // Aquí puedes abrir un formulario modal o navegar a otra página para actualizar el producto
      console.log('Mostrar formulario para actualizar:', producto);
    },

     // Eliminar  un  producto
    async eliminarProducto(productId) {
      try {
        await axios.delete(`https://apiproduct-nveo.onrender.com/products/${productId}`);
        this.obtenerProductos();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    },
    async filtrarProductosPorNombre(name) {
      try {
        const response = await axios.get(`https://apiproduct-nveo.onrender.com/products/filter/name?name=${name}`);
        console.log(response.data); // Aquí puedes manejar la respuesta de la API
         // Filtrar los productos por categoría
         this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(this.name.toLowerCase())
      );
      this.totalProducts = this.products.length;
      } catch (error) {
        console.error('Error al filtrar productos por nombre', error);
      }
    },

    ordenarPor(columna) {
    // Cambiar la columna de orden si ya está ordenando por ella, de lo contrario, establecer la nueva columna
    this.orden.columna = this.orden.columna === columna ? null : columna;
    // Cambiar la dirección de orden
    this.orden.direccion = this.orden.direccion === 1 ? -1 : 1;

    // Ordenar los productos
    if (this.orden.columna) {
      this.products.sort((a, b) => {
        const comparison = a[this.orden.columna].localeCompare(b[this.orden.columna]);
        return this.orden.direccion * comparison;
      });
    }
  },

  filtrarPorCategoria() {
    if (this.categoriaBusqueda.trim() === '') {
      // Si la búsqueda está vacía, muestra todos los productos
     // this.fetchProducts();
      this. obtenerProductos();
    } else {
      // Filtrar los productos por categoría
      this.products = this.products.filter(product =>
        product.category.toLowerCase().includes(this.categoriaBusqueda.toLowerCase())
      );
      this.totalProducts = this.products.length;
    }
    this. obtenerProductos();
  },
 
  },
  

};



</script>

<style scoped>
/* Estilos específicos del componente */
.container {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #39CD39;
  color: #FFFFFF;
}

.table-responsive {
  overflow-x: auto;
}

.button-container {
  margin-top: 10px;
}

button {
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: #FFFFFF;
  cursor: pointer;
}

button:focus {
  outline: none;
}

.input-container {
  margin-right: 10px;
}

.input-container input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.input-container input::placeholder {
  color: #999;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

</style>