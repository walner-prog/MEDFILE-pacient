<template>
  <div>
    <h3>Autoevaluaciones Interactivas</h3>

    <!-- Pregunta 1 -->
    <div class="mb-3">
      <label for="question1" class="form-label">En las últimas dos semanas, ¿te has sentido triste o deprimido la mayor parte del tiempo?</label>
      <select v-model="evaluationAnswers.question1" class="form-control" required>
        <option value="" disabled>Selecciona una opción</option>
        <option value="nunca">Nunca</option>
        <option value="rara_vez">Rara vez</option>
        <option value="a_menudo">A menudo</option>
        <option value="siempre">Siempre</option>
      </select>
    </div>

    <!-- Pregunta 2 -->
    <div class="mb-3">
      <label for="question2" class="form-label">¿Tienes dificultad para dormir o descansar adecuadamente?</label>
      <select v-model="evaluationAnswers.question2" class="form-control" required>
        <option value="" disabled>Selecciona una opción</option>
        <option value="nunca">Nunca</option>
        <option value="rara_vez">Rara vez</option>
        <option value="a_menudo">A menudo</option>
        <option value="siempre">Siempre</option>
      </select>
    </div>

    <!-- Botón para evaluar las respuestas -->
    <button @click="evaluateAnswers" class="btn btn-primary">Evaluar</button>

    <!-- Resumen de Resultados -->
    <div v-if="showResults" class="result-summary mt-4">
      <h5>Resumen de Resultados</h5>
      <p>{{ evaluationSummary }}</p>
      <p v-if="recommendation">
        Te recomendamos realizar ejercicios de respiración y hablar con un profesional para obtener orientación.
      </p>
      <router-link v-if="recommendation" class="btn bt-indigo w-50" to="/contactar-profesional">Contactar a un Profesional</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutoevaluacionesInteractivas",
  data() {
    return {
      evaluationAnswers: {
        question1: "",
        question2: "",
      },
      showResults: false,
      evaluationSummary: "",
      recommendation: false,
    };
  },
  methods: {
    evaluateAnswers() {
      // Lógica para evaluar las respuestas
      const { question1, question2 } = this.evaluationAnswers;

      // Resumen básico basado en las respuestas
      if (question1 === "siempre" || question2 === "siempre") {
        this.evaluationSummary = "Tus respuestas indican que podrías estar experimentando síntomas de estrés o depresión.";
        this.recommendation = true;
      } else if (question1 === "a_menudo" || question2 === "a_menudo") {
        this.evaluationSummary = "Parece que puedes estar lidiando con ciertos niveles de ansiedad o estrés.";
        this.recommendation = true;
      } else {
        this.evaluationSummary = "Tus respuestas no muestran señales significativas de estrés o ansiedad, pero es importante seguir monitorizando tu bienestar.";
        this.recommendation = false;
      }

      // Mostrar resultados
      this.showResults = true;
    }
  }
};
</script>

<style scoped>
.result-summary {
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
</style>
