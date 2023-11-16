<template>
  <header class="umbraco-header">
    <nav class="container mx-auto flex justify-between items-center p-4">
      <NuxtLink class="text-white font-semibold" to="/"
        >Umbraco Bachelor</NuxtLink
      >
      <div class="space-x-4">
        <NuxtLink class="text-white hover:underline" to="/">Home</NuxtLink>
        <NuxtLink class="text-white hover:underline" to="/about"
          >About</NuxtLink
        >
        <NuxtLink class="text-white hover:underline" to="/form">Form</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.umbraco-header {
  background-color: #35404d;
}
</style>
