<script setup lang="ts">
import { useProfileStore } from '../stores/profile.store';
import { onMounted } from 'vue';

const store = useProfileStore();

onMounted(() => {
  store.fetchProfile();
});
</script>

<template>
  <div class="profile-avatar">
    <img src="/public/avatar.png" alt="Изображение пользователя" class="profile-avatar__image" />
    <div v-if="store.profile">
      Привет, <strong>{{ store.profile.name }}!</strong>
    </div>
  </div>
</template>

<style scoped>
.profile-avatar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 18px;
  margin-bottom: 40px;
}
.profile-avatar__image {
  width: 80px;
  height: 80px;
}
</style>
