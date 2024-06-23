<template>
  <section class="album-section">
    <h1>ALBUMS</h1>
    <select v-model="selectedAlbum" @change="fetchAlbumDetails">
      <option value="" disabled selected>Select an album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.title }}
      </option>
    </select>
    <div v-if="albumDetails">
      <h3>{{ albumDetails.title }}</h3>
      <p><strong>User ID:</strong> {{ albumDetails.userId }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["navigateToPhotos"]);

const albums = ref([]);
const selectedAlbum = ref(null);
const albumDetails = ref(null);

// Fetch albums from JSONPlaceholder API
const fetchAlbums = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

// Fetch details of the selected album
const fetchAlbumDetails = async () => {
  if (selectedAlbum.value) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${selectedAlbum.value}`
    );
    albumDetails.value = await response.json();
    emit("navigateToPhotos", selectedAlbum.value);
  }
};

// Load albums on component mount
onMounted(async () => {
  albums.value = await fetchAlbums();
});
</script>

<style scoped>
.album-section {
  margin-top: 2rem;
}

.album-section h1 {
  color: rgb(10, 9, 11);
  text-align: center;
}

.album-section select {
  margin: 1rem 0;
  padding: 0.25rem; /* Reduced padding */
  font-size: 1rem; /* Reduced font size */
  border: 2px solid var(--primary); /* Reduced border size */
  border-radius: 5px;
  background-color: #fff;
  color: var(--dark);
  cursor: pointer;
  width: 205px;
  height: 40px;
}

.album-section select:hover {
  background-color: var(--primary);
  color: #fff;
}

.album-section option {
  background-color: #fff;
  color: var(--dark);
}

.album-section option:hover {
  background-color: var(--primary);
  color: #fff;
}

.album-section div {
  background-color: var(--light);
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.album-section div h3 {
  color: rgba(115, 0, 192, 0.966);
}

.album-section div p {
  color: var(--dark);
}
</style>
