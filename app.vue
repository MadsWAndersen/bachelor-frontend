<template>
  <Transition name="slide">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </Transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
