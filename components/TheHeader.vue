<template>
  <header class="umbraco-header container">
    <div class="container-row">
      <nav class="col-span-full w-full mx-auto flex justify-between items-center p-4">
        <NuxtLink class="mr-auto text-white font-semibold" to="/">Umbraco Bachelor</NuxtLink>
        <div class="space-x-4">
          <NuxtLink class="text-white hover:underline" to="/">Home</NuxtLink>
          <NuxtLink class="text-white hover:underline" to="/documentation">Documentation</NuxtLink>
          <NuxtLink class="text-white hover:underline" to="/form">Form</NuxtLink>
          <NuxtLink class="text-white hover:underline" to="/login">login</NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.umbraco-header {
  background-color: #35404d;
}
</style>
