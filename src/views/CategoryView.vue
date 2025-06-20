<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories.store';
import { useBookmarkStore } from '@/stores/bookmarks.store.ts';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import type { Category } from '@/interfaces/category.interface';
import { useRouter } from 'vue-router';
import CategoryHeader from '@/components/CategoryHeader.vue';
import BookmarkCard from '@/components/BookmarkCard.vue';
import BookmarkSort from '@/components/BookmarkSort.vue';
import BookmarkAdd from '@/components/BookmarkAdd.vue';

const router = useRouter();
function redirectToMain() {
  router.push({
    name: 'NotFound',
  });
}

const route = useRoute();
const category = ref<Category>();
const categoryStore = useCategoriesStore();
const bookmarkStore = useBookmarkStore();

function sortBookmarks(sort: string) {
  bookmarkStore.activeSort = sort;
  if (category.value) {
    bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
  }
}

onMounted(() => {
  category.value = categoryStore.getCategoryByAlias(route.params.alias);
  if (category.value) {
    bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
  }
});

watch(
  () => ({
    alias: route.params.alias,
    categories: categoryStore.categories,
  }),
  (data) => {
    category.value = categoryStore.getCategoryByAlias(data.alias);
    if (category.value) {
      bookmarkStore.fetchBookmarks(category.value.id, bookmarkStore.activeSort);
    } else redirectToMain();
  },
);
</script>

<template>
  <CategoryHeader v-if="category" :category="category" />
  <BookmarkSort :option="bookmarkStore.activeSort" @sort="sortBookmarks" />
  <div class="category-list">
    <BookmarkCard v-for="item in bookmarkStore.bookmarks" :key="item.id" v-bind="item" />
    <BookmarkAdd v-if="category" :category_id="category.id" />
  </div>
</template>

<style scoped>
.category-list {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(10, 350px);
  gap: 24px;
}
</style>
