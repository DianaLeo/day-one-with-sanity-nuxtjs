<script setup lang="ts">
import type {SanityDocument} from "@sanity/client"

// const EVENTS_QUERY = `*[_type == "event"]{_id, name, slug, date}|order(date desc)`;
// const {data: events} = await useSanityQuery<SanityDocument[]>(EVENTS_QUERY)

const query = gql`
    query GetEvents {
        allEvent{
          _id
          name
          slug{current}
          date
        }
}
`
const { data } = await useAsyncQuery(query)
const events = computed(()=>data.value.allEvent)
</script>

<template>
  <main class="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
    <h1 class="text-4xl font-bold tracking-tighter">
      Events
    </h1>
    <ul class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <li
          v-for="event in events"
          :key=event._id
          class="bg-white p-4 rounded-lg"
      >
        <NuxtLink
            class="hover:underline"
            :to="`/events/${event.slug.current}`"
        >
          <h2 class="text-xl font-semibold">{{ event?.name }}</h2>
          <p class="text-gray-500">
            {{ new Date(event?.date).toLocaleDateString() }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
