import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_ROUTES, client } from '../api';
import type { Bookmark } from '@/interfaces/bookmark.interface';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Bookmark[]>([]);
  const activeSort = ref<string>('date');

  async function fetchBookmarks(categoryId: number, sort: string) {
    const { data } = await client().get<Bookmark[]>(API_ROUTES.bookmarks.get(categoryId), {
      params: {
        sort,
      },
    });
    bookmarks.value = data;
  }

  async function deleteBookmark(id: number, categoryId: number) {
    await client().delete<Bookmark[]>(API_ROUTES.bookmarks.delete(id));
    fetchBookmarks(categoryId, activeSort.value);
  }

  async function createBookmark(category_id: number, url: string) {
    const { data } = await client().post<Bookmark>(API_ROUTES.bookmarks.post, {
      category_id,
      url,
    });
    bookmarks.value.push(data);
  }
  return { bookmarks, activeSort, fetchBookmarks, deleteBookmark, createBookmark };
});
