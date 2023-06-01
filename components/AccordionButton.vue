<script setup lang="ts">
const btnRef = ref();

const onClick = (event: any) => {
  btnRef.value.classList.toggle("checked");
};
</script>

<template>
  <div>
    <div ref="btnRef" class="button" @click="onClick">
      <div class="flex items-center gap-1 p-1">
        <Icon name="uil:arrow-right" class="inline-block text-[1.4rem]" />
        <slot name="button"></slot>
      </div>
    </div>

    <div class="content-wrap">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.button {
  & ~ .content-wrap {
    overflow: hidden;
    max-height: 0;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    box-sizing: border-box;
  }

  svg {
    @apply text-[1.8rem];
    transition: transform 0.1s ease-in-out;
  }
  display: inline-block;
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  font-family: "Farfetch Basis", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
  max-width: none;
  min-height: 44px;
  outline: none;
  padding: 0.5rem 1rem;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  @apply cursor-pointer text-[1rem] font-[700] m-0 overflow-hidden relative text-center;

  &:hover,
  &:focus {
    opacity: 0.75;
  }
}
.button.checked {
  & ~ .content-wrap {
    max-height: 100%;
  }
  svg {
    transform: rotateZ(90deg);
  }
}

.content {
  border: 1px solid black;
  border-top: 0;
  border-radius: 0 0 8px 8px;

  @apply p-2 py-[1rem];
}
</style>
