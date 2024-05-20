<template>
  <section class="todo-section">
    <!-- Tampilan Todos -->
    <section class="greeting">
      <!-- Greeting Section -->
    </section>
    <center><h1>LIST POSTINGAN YANG SUDAH DIBACA</h1></center>
    <section class="create-todo">
      <!-- Create Todo Section -->
      <!-- Form untuk menambahkan Todos -->
      <form id="new-todo-form" @submit.prevent="addTodo">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Masukkan List Anda...."
          v-model="input_content"
        />
        <h4>Kategori Postingan</h4>
        <div class="options">
          <!-- Opsi Kategori -->
          <label>
            <input
              type="radio"
              name="category"
              id="category1"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <div>Tema Sedih</div>
          </label>
          <label>
            <input
              type="radio"
              name="category"
              id="category2"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <div>Tema Lainnya</div>
          </label>
        </div>
        <input type="submit" value="Add todo" />
      </form>
    </section>
    <section class="todo-list">
      <!-- List Todos -->
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
        <div
          v-for="todo in todos_asc"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <!-- Item Todo -->
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span
              :class="`bubble ${
                todo.category == 'business' ? 'business' : 'personal'
              }`"
            ></span>
          </label>
          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const todos = ref([]);
const input_content = ref("");
const input_category = ref(null);
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Paste here the CSS related to the Todos section */
</style>
