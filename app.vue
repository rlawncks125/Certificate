<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
body {
  @apply px-[1rem];

  white-space: pre-wrap;
}

table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
ul,
ol {
  // li {
  //   &::marker {
  //     content: "-";
  //   }
  // }
}

th,
td {
  border: 1px solid #444444;
  padding: 10px;
}

.content {
  p {
    margin: 0.2rem 0;
  }
}
</style>
