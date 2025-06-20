<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fg);
  cursor: pointer;
  height: 50px;
  padding: 12px 24px;
  border-radius: 50px;
  border: none;
  color: var(--color-bg);
  font-size: 18px;
}
.button:hover {
  background: var(--color-fg-hover);
}
</style>
