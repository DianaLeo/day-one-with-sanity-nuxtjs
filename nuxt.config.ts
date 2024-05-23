// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sanity", "@nuxtjs/tailwindcss","@nuxtjs/apollo"],
  sanity: {
    projectId: 'qqgdwdt3',
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    visualEditing: {
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL || 'http://localhost:3333',
      token: "skHiriWyeBhSGAMK1iTPXSSlDMzRHq2E4e8WuvZxc38ZWU1BuUuLLRUAP9nlHIW99FzuscfITetqR2OKu4hT9IJ8teReTUeTkY4Xt5QDW5CkjZFPfSxVC9iiYIsgHPqDLtPl64D7pRbnQxlNl5CvYBKj5u1xXN3pfAZe266R0YBMrDtwzTlh",
      stage: true,
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://qqgdwdt3.api.sanity.io/v2023-08-01/graphql/production/experiment"
      }
    },
  },
})