<template>
  <div v-if="cmsContent">
    <div v-if="cmsContent.childrenData._embedded.content">
      <div
        v-for="(content, index) in cmsContent.childrenData._embedded.content"
        :key="index"
      >
        <div
          v-for="(childContent, index) in content.childrenData._embedded
            .content"
          :key="index"
        >
          <div v-if="childContent.highligted">
            <HighlightCard
              :title="childContent.headline"
              :bodyText="childContent.bodyText"
              :url="childContent._url"
            ></HighlightCard>
          </div>
        </div>
      </div>
    </div>
    <div class="container-row">
      <sectionCard
        v-for="(card, index) in cmsContent.childrenData._embedded.content"
        :url="card._url"
        :key="index"
        :headline="card.documentationHeadline"
        :description="card.documentationDescription"
        :image="card.image"
        :icon="card.icon?.src"
        :style="'light'"
      >
      </sectionCard>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const localStorageContent = ref();
const cmsContent = ref();

onMounted(async () => {
  localStorageContent.value = ref(
    JSON.parse(window.localStorage.getItem("documentation"))
  );
  cmsContent.value = localStorageContent.value._value;
  console.log(cmsContent.value.childrenData._embedded.content);
});

//const { data } = useContent(`${route.query.id}/children`);
</script>

<style></style>
