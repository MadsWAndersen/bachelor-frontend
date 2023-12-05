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
	transition: all 0.4s ease;
	@apply ease-umbraco-ease;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateX(3%);
}

.slide-enter-to {
	opacity: 1;
	transform: translateX(0);
}
</style>
