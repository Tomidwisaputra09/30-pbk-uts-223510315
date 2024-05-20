<template>
  <section class="post-section">
    <h1>POSTINGAN USER</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="selectedUser">
      <div v-for="post in userPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const users = ref([]);
const selectedUser = ref(null);
const userPosts = ref([]);

watch(selectedUser, (newVal) => {
  if (newVal) {
    fetchPosts(newVal);
  }
});

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

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Paste here the CSS related to the Posts section */
</style>
