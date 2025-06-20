<script setup lang="ts">
import IconPlusBig from '@/icons/IconPlusBig.vue';
import ButtonIcon from './ButtonIcon.vue';
import IconOk from '@/icons/IconOk.vue';
import InputString from './InputString.vue';
import { ref } from 'vue';
import { useBookmarkStore } from '@/stores/bookmarks.store';

const isEdited = ref<boolean>();
const newBookmarkName = ref<string>();
const bookmarkStore = useBookmarkStore();
const { category_id } = defineProps<{ category_id: number }>();

function toggleEdit() {
  isEdited.value = !isEdited.value;
}

function addBokmark() {
  if (!newBookmarkName.value) {
    return;
  }
  bookmarkStore.createBookmark(category_id, newBookmarkName.value);
  newBookmarkName.value = '';
  toggleEdit();
}
</script>

<template>
  <div class="bookmark-add">
    <div>
      <ButtonIcon :size="48" v-if="!isEdited" @click="toggleEdit">
        <IconPlusBig />
      </ButtonIcon>
    </div>
    <div class="bookmark-input" v-if="isEdited">
      <InputString v-model="newBookmarkName" is-focused />
      <ButtonIcon @click="addBokmark">
        <IconOk />
      </ButtonIcon>
    </div>
  </div>
</template>

<style scoped>
.bookmark-add {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px dashed var(--color-fg);
}
.bookmark-input {
  display: flex;
  gap: 8px;
}
</style>
