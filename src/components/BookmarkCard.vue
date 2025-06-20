<script setup lang="ts">
import IconTrashWhite from '@/icons/IconTrashWhite.vue';
import type { Bookmark } from '@/interfaces/bookmark.interface';
import IconLinkWhite from '@/icons/IconLinkWhite.vue';
import ButtonIconBig from './ButtonIconBig.vue';
import { useBookmarkStore } from '@/stores/bookmarks.store';
import { ref } from 'vue';
import PopupConfirm from './PopupConfirm.vue';

const { title, image, url, id, category_id } = defineProps<Bookmark>();
const bookmark = useBookmarkStore();
const isOpened = ref<boolean>(false);

function openLink() {
  window.open(url, '_blank');
}

function deleteBookmark() {
  isOpened.value = !isOpened.value;
  bookmark.deleteBookmark(id, category_id);
}
</script>

<template>
  <div class="bookmark-card">
    <div class="bookmark-card__image" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="bookmark-card__title">
      {{ title }}
    </div>
    <div class="bookmark-card__footer">
      <ButtonIconBig @click="isOpened = !isOpened">
        <IconTrashWhite />
      </ButtonIconBig>
      <ButtonIconBig @click="openLink">
        <IconLinkWhite />
      </ButtonIconBig>
    </div>
    <PopupConfirm
      text="Вы уверены?"
      :is-opened="isOpened"
      @cancel="isOpened = !isOpened"
      @ok="deleteBookmark()"
    />
  </div>
</template>

<style scoped>
.bookmark-card {
  border-radius: 30px;
  background: var(--color-fg);
  box-shadow: 0px 10px 10px 0px rgba(245, 245, 247, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.bookmark-card__image {
  min-height: 160px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  background-position: center;
}
.bookmark-card__title {
  color: var(--color-bg);
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bookmark-card__title:hover {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
  width: auto;
  border: none;
  padding: 15px;
  display: block;
}
.bookmark-card__footer {
  display: flex;
  justify-content: space-between;
}
</style>
