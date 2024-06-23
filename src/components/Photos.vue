<template>
  <div class="photos">
    <h2>Photos of Album {{ albumId }}</h2>
    <div class="photo-list">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="photo-item"
        @click="showFullPhoto(photo.url)"
      >
        <img :src="photo.thumbnailUrl" alt="Thumbnail" />
      </div>
    </div>
    <div
      v-if="selectedPhotoUrl"
      class="full-photo-overlay"
      @click="hideFullPhoto"
    >
      <img :src="selectedPhotoUrl" alt="Full Photo" class="full-photo" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps(["albumId"]);

const photos = ref([]);
const selectedPhotoUrl = ref(null);

// Fetch photos of selected album from JSONPlaceholder API
const fetchPhotos = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${props.albumId}/photos`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

// Load photos of selected album on component mount
onMounted(async () => {
  photos.value = await fetchPhotos();
});

// Show full-size photo when thumbnail is clicked
const showFullPhoto = (photoUrl) => {
  selectedPhotoUrl.value = photoUrl;
};

// Hide full-size photo
const hideFullPhoto = () => {
  selectedPhotoUrl.value = null;
};
</script>

<style scoped>
.photos {
  padding: 20px;
}

.photo-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo-item {
  cursor: pointer;
}

.full-photo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.full-photo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}
</style>
