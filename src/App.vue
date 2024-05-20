<template>
  <main class="app">
    <header>
      <nav>
        <ul>
          <li @click="showTodos">To Do List</li>
          <li @click="showPosts">Post</li>
          <li @click="showUsers">User</li>
        </ul>
      </nav>
    </header>
    <Todos v-if="showingTodos" />
    <Posts v-else-if="showingPosts" />
    <User v-else-if="showingUsers" />
  </main>
</template>

<script setup>
import { ref } from "vue";
import Todos from "./components/Todos.vue";
import Posts from "./components/Posts.vue";
import User from "./components/User.vue";

const showingTodos = ref(true);
const showingPosts = ref(false);
const showingUsers = ref(false);

const showTodos = () => {
  showingTodos.value = true;
  showingPosts.value = false;
  showingUsers.value = false;
};

const showPosts = () => {
  showingTodos.value = false;
  showingPosts.value = true;
  showingUsers.value = false;
};

const showUsers = () => {
  showingTodos.value = false;
  showingPosts.value = false;
  showingUsers.value = true;
};
</script>

<style scoped>
/* Your existing CSS for App.vue */
</style>
