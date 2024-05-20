<template>
  <section class="user-section">
    <h1>USER DETAILS</h1>
    <select v-model="selectedUser" @change="fetchUserDetails">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="userDetails">
      <h3>{{ userDetails.name }}</h3>
      <p><strong>Email:</strong> {{ userDetails.email }}</p>
      <p><strong>Phone:</strong> {{ userDetails.phone }}</p>
      <p>
        <strong>Website:</strong>
        <a :href="userDetails.website" target="_blank">{{
          userDetails.website
        }}</a>
      </p>
      <p><strong>Company:</strong> {{ userDetails.company.name }}</p>
      <p>
        <strong>Address:</strong> {{ userDetails.address.street }},
        {{ userDetails.address.city }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const selectedUser = ref(null);
const userDetails = ref(null);

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await response.json();
};

const fetchUserDetails = async () => {
  if (selectedUser.value) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${selectedUser.value}`
    );
    userDetails.value = await response.json();
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Paste here the CSS related to the User section */
.user-section {
  margin-top: 2rem;
}

.user-section h1 {
  color: rgb(10, 9, 11);
  text-align: center;
}

.user-section select {
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid var(--primary);
  border-radius: 5px;
  background-color: #fff;
  color: var(--dark);
  cursor: pointer;
}

.user-section select:hover {
  background-color: var(--primary);
  color: #fff;
}

.user-section option {
  background-color: #fff;
  color: var(--dark);
}

.user-section option:hover {
  background-color: var(--primary);
  color: #fff;
}

.user-section div {
  background-color: var(--light);
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-section div h3 {
  color: rgba(115, 0, 192, 0.966);
}

.user-section div p {
  color: var(--dark);
}
</style>
