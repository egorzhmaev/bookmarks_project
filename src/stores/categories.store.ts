import { defineStore } from 'pinia';
import type { Category } from '../interfaces/category.interface';
import { ref } from 'vue';
import { API_ROUTES, client } from '../api';
import { v4 as uuidv4 } from 'uuid';

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    const { data } = await client().get<Category[]>(API_ROUTES.categories.get);
    categories.value = data;
  }

  async function createCategory() {
    const { data } = await client().post<Category>(API_ROUTES.categories.get, {
      name: 'Новая категория',
      alias: uuidv4(),
    });
    categories.value.push(data);
  }

  async function updateCategory(categoryId: number, name: string, alias: string) {
    await client().put<Category>(API_ROUTES.categories.update(categoryId), {
      name,
      alias,
    });
    fetchCategories();
  }

  async function deleteCategory(categoryId: number) {
    await client().delete<Category>(API_ROUTES.categories.delete(categoryId));
    fetchCategories();
  }

  function getCategoryByAlias(alias: string | string[]): Category | undefined {
    if (typeof alias == 'string') {
      return categories.value.find((c) => c.alias == alias);
    }
    return;
  }

  return {
    categories,
    fetchCategories,
    createCategory,
    getCategoryByAlias,
    updateCategory,
    deleteCategory,
  };
});
