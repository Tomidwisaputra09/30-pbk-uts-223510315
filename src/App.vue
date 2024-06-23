<template>
  <main class="app">
    <header>
      <nav>
        <ul>
          <li @click="showTodos">To Do List</li>
          <li @click="showPosts">Post</li>
          <li @click="showUsers">User</li>
          <li @click="showAlbums">Albums</li>
        </ul>
      </nav>
    </header>
    <Todos v-if="showingTodos" />
    <Posts v-else-if="showingPosts" />
    <User v-else-if="showingUsers" />
    <Albums v-else-if="showingAlbums" @navigateToPhotos="navigateToPhotos" />
    <Photos v-else-if="showingPhotos" :albumId="selectedAlbumId" />
  </main>
</template>

<script setup>
import { ref } from "vue";
import Todos from "./components/Todos.vue";
import Posts from "./components/Posts.vue";
import User from "./components/User.vue";
import Albums from "./components/Albums.vue";
import Photos from "./components/Photos.vue";

const showingTodos = ref(false);
const showingPosts = ref(false);
const showingUsers = ref(false);
const showingAlbums = ref(true);
const showingPhotos = ref(false);
const selectedAlbumId = ref(null);

const showTodos = () => {
  resetStates();
  showingTodos.value = true;
};

const showPosts = () => {
  resetStates();
  showingPosts.value = true;
};

const showUsers = () => {
  resetStates();
  showingUsers.value = true;
};

const showAlbums = () => {
  resetStates();
  showingAlbums.value = true;
};

const navigateToPhotos = (albumId) => {
  selectedAlbumId.value = albumId;
  resetStates();
  showingPhotos.value = true;
};

const resetStates = () => {
  showingTodos.value = false;
  showingPosts.value = false;
  showingUsers.value = false;
  showingAlbums.value = false;
  showingPhotos.value = false;
};
</script>
