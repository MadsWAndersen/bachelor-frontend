<template>
	<div>
		<div v-if="breadcrumbs">
			<nuxt-link class="text-um-blue opacity-70 m-0 hover:opacity-100 hover:underline" v-for="n in breadcrumbs"
				:to="n.url"> {{
					n.name }} -> </nuxt-link>


		</div>
	</div>
</template>

<script setup>
const props = defineProps(['data'])
const breadcrumbs = ref([{
	"name": "home",
	"url": "/"
}]);

var filtered = props.data.split('/').filter(function (el) {
	return el != "";
});
let pathsteps = "";
for (let i = 0; i < filtered.length; i++) {
	pathsteps += "/" + filtered[i];
	breadcrumbs.value.push({
		"name": filtered[i],
		"url": pathsteps
	})
}

</script>

<style lang="scss" scoped></style>
