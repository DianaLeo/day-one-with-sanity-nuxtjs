<script setup lang="ts">
import type {SanityDocument} from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type {ImageUrlBuilder} from "@sanity/image-url/lib/types/builder";
// import type { Image } from '@sanity/types'
import {PortableText} from "@portabletext/vue"
import {urlFor} from "~/utils"
import TwoColumns from "~/components/TwoColumns.vue";

const config = useRuntimeConfig()
const route = useRoute()

const EVENT_QUERY = `*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
  ...,
  headline->,
  venue->
}`;

const {data: event} = await useSanityQuery<SanityDocument[]>(EVENT_QUERY,{
  slug: route.params.slug,
})

const {
  name,
  date,
  headline,
  image,
  video,
  // file,
  details,
  content,
  eventType,
  doorsOpen,
  venue,
  tickets,
} = event.value
console.log("image=",image.asset._ref)
console.log("video=",video.asset._ref)
// console.log("file=",file.asset._ref)

const eventImageUrl = image
    ? urlFor(image)?.quality(100).width(1100).height(620).url()
    : null;
const eventDate = new Date(date).toDateString();
const eventTime = new Date(date).toLocaleTimeString();
const doorsOpenTime = new Date(
    new Date(date).getTime() + doorsOpen * 60000
).toLocaleTimeString();

const serializers = {
  types: {
    importedComponent: TwoColumns,
    // dynamicComponent: defineAsyncComponent({
    //   loadingComponent: () => 'Loading...',
    //   loader: () => import('~/components/TwoColumns.vue'),
    // }),
  },
}
</script>

<template>
  <main class="container mx-auto grid gap-12 p-12">
    <div class="mb-4">
      <NuxtLink to="/">← Back to events</NuxtLink>
    </div>
    <div class="grid items-top gap-12 sm:grid-cols-2">
      <div>
        <img
            :src=" eventImageUrl || 'https://via.placeholder.com/550x310'"
            :alt="name || 'Event'"
            class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height="310"
            width="550"
            loading="lazy"
        />
<!--        <SanityImage v-if="image" :asset-id="image.asset._ref" auto="format">-->
<!--          <template #default="{ src }">-->
<!--            <img-->
<!--                :src="src"-->
<!--                :alt="name || 'Event'"-->
<!--                class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"-->
<!--                height="310"-->
<!--                width="550"-->
<!--                style="image-resolution: 300dpi"-->
<!--                loading="lazy"-->
<!--            />-->
<!--          </template>-->
<!--        </SanityImage>-->
        <SanityFile v-if="video" :asset-id="video.asset._ref">
          <template #default="{ src }">
            <video width="550" height="150" autoplay muted>
              <source :src="src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </template>
        </SanityFile>
<!--        <SanityFile v-if="file" :asset-id="file.asset._ref">-->
<!--          <template #default="{ src }">-->
<!--            <a :href="src">Click here to read this text file</a>-->
<!--          </template>-->
<!--        </SanityFile>-->
      </div>
      <div class="flex flex-col justify-center space-y-4">
        <div class="space-y-4">
          <div v-if="eventType" class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
            {{ eventType.replace("-", " ") }}
          </div>
          <h1 v-if="name" class="text-4xl font-bold tracking-tighter mb-8">
            {{ name }}
          </h1>
          <dl v-if="headline?.name" class="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
            <dd class="font-semibold">Artist</dd>
            <dt>{{ headline?.name }}</dt>
          </dl>
          <dl class="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
            <dd class="font-semibold">Date</dd>
            <div>
              <dt v-if="eventDate">{{ eventDate }}</dt>
              <dt v-if="eventTime">{{ eventTime }}</dt>
            </div>
          </dl>
          <dl v-if="doorsOpenTime" class="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
            <dd class="font-semibold">Doors Open</dd>
            <div class="grid gap-1">
              <dt>Doors Open</dt>
              <dt>{{ doorsOpenTime }}</dt>
            </div>
          </dl>
          <dl v-if="venue?.name" class="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
            <div class="flex items-start">
              <dd class="font-semibold">Venue</dd>
            </div>
            <div class="grid gap-1">
              <dt>{{ venue.name }}</dt>
            </div>
          </dl>
        </div>
        <div v-if="details && details.length > 0" class="prose max-w-none">
          <PortableText :value="details" />
        </div>
        <div v-if="content && content.length > 0" class="prose max-w-none">
          <TwoColumns :values="content"/>
        </div>
        <a v-if="tickets"
            class="flex items-center justify-center rounded-md bg-blue-500 p-4 text-white"
            :href="tickets"
        >
          Buy Tickets
        </a>
      </div>
    </div>
  </main>
</template>

