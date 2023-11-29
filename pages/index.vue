<template>
  <div v-if="data">
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
    </div>

    <div class="container-row">
      <versionTag class="col-span-1" :version="'12.12.12'" />
      <docButton
        url="https://github.com/MadsWAndersen/bachelor-frontend/branches"
        target="_blank"
        title="documentation"
        spanText="prev"
        :btnStyle="'prev'"
        class="contain col-span-3"
      />
      <docButton
        url="https://github.com/MadsWAndersen/bachelor-frontend/branches"
        target="_blank"
        title="documentation"
        spanText="next"
        :btnStyle="'next'"
        class="contain col-span-3"
      />
    </div>

    <div class="container-row"></div>

    <div class="container-row">
      <sectionCard
        v-for="(card, index) in data._embedded.content"
        v-if="data"
        class="col-span-3"
        :url="card._url"
        :key="index"
        :headline="card.documentationHeadline"
        :description="card.documentationDescription"
        :image="card.image"
        :icon="card.svg"
        :style="'light'"
      >
        <linkButton
          class="z-20"
          :url="card._url"
          :title="'Go to ' + card.documentationHeadline"
          :style="'dark'"
        />
      </sectionCard>
    </div>
  </div>
</template>

<script setup>
const { data } = useContent();

const localStorageContent = ref();
const cmsContent = ref();

onMounted(async () => {
  localStorageContent.value = ref(
    JSON.parse(window.localStorage.getItem("documentation"))
  );
  cmsContent.value = localStorageContent.value._value;
  console.log(cmsContent.value.childrenData._embedded.content);
});
</script>
