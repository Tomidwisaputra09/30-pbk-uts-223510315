<template>
  <main class="app">
    <header>
      <nav>
        <ul>
          <li @click="showTodos">To Do List</li>
          <li @click="showPosts">Post</li>
        </ul>
      </nav>
    </header>

    <!-- TODO SECTION -->
    <section v-if="showingTodos" class="todo-section">
      <!-- Tampilan Todos -->
      <section class="greeting">
        <!-- Greeting Section -->
      </section>
      <center><h1>LIST POSTINGAN YANG SUDAH DIBACA</h1></center>
      <section class="create-todo">
        <!-- Create Todo Section -->
        <!-- <center><h1>DAFTAR TUGAS ANDA</h1></center> -->
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

    <!-- POST SECTION -->
    <section v-else-if="showingPosts" class="post-section">
      <!-- Tampilan Post -->
      <h1>POSTINGAN USER</h1>
      <!-- Form untuk memilih user -->
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <!-- Tampilkan Postingan sesuai dengan user yang dipilih -->
      <div v-if="selectedUser">
        <div v-for="post in userPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

// Data Todos
const todos = ref([]);
const name = ref("");
const input_content = ref("");
const input_category = ref(null);
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

// Data Postingan
const users = ref([]);
const selectedUser = ref(null);
const userPosts = ref([]);

// Watchers untuk Todos
watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

// Watchers untuk Postingan
watch(selectedUser, (newVal) => {
  if (newVal) {
    fetchPosts(newVal);
  }
});

// Methods untuk Todos
const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

// Methods untuk Postingan
const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await response.json();
};

const fetchPosts = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  userPosts.value = await response.json();
};

// Lifecycle hook untuk memuat data awal
onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  fetchUsers();
});

// State untuk menentukan tampilan
const showingTodos = ref(true);
const showingPosts = ref(false);

// Methods untuk navigasi antara Todos dan Post
const showTodos = () => {
  showingTodos.value = true;
  showingPosts.value = false;
};

const showPosts = () => {
  showingTodos.value = false;
  showingPosts.value = true;
};
</script>
