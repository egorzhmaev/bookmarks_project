<script setup lang="ts">
import { onMounted } from 'vue';
import { useCategoriesStore } from '../stores/categories.store';
import ButtonIcon from './ButtonIcon.vue';
import IconPlus from '@/icons/IconPlus.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const store = useCategoriesStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  store.fetchCategories();
});

function logout() {
  authStore.clearToken();
  router.push({ name: 'auth' });
}
</script>

<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in store.categories" :key="item.name">
      <RouterLink active-class="active-link" :to="`/main/${item.alias}`">{{
        item.name
      }}</RouterLink>
    </li>
    <li>
      <ButtonIcon @click="store.createCategory">
        <IconPlus />
      </ButtonIcon>
    </li>
    <li class="list-item">
      <a href="#" @click="logout">Выход</a>
    </li>
  </ul>
</template>

<style scoped>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 34px;
  margin: 0;
  padding: 0;
}
.category-list li {
  list-style: none;
}
.list-item {
  list-style: none;
}
.list-item a {
  text-decoration: none;
  font-size: 14px;
  transition: all 0.5s;
  color: var(--color-fg);
}
.list-item a:hover,
.list-item a.active-link {
  font-size: 24px;
  font-weight: 700;
}
</style>
