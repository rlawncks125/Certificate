<script setup lang="ts">
const onClick = (event: any) => {
  const el = event.target.parentElement as HTMLElement;
  el.classList.toggle("checked");
};
</script>

<template>
  <div>
    <div class="button bg-teal-300 p-1" @click="onClick">
      <slot name="button"></slot>
    </div>

    <div class="content">
      <div class="p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.button {
  cursor: pointer;

  & ~ .content {
    background: #ffffcc;
    overflow: hidden;
    max-height: 0;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    box-sizing: border-box;
  }
}
.button.checked {
  & ~ .content {
    max-height: 100vh;
  }
}
</style>
