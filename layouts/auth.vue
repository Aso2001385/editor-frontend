<template>
  <v-app>
    <v-app-bar color="grey darken-3" app clipped-left>
      <v-toolbar-title class="white--text"
        ><strong
          ><NuxtLink to="/projects" style="color: white; text-decoration: none">FRIDAY</NuxtLink></strong
        ></v-toolbar-title
      >
    </v-app-bar>
    <v-main app light class="grey lighten-3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      nav_lists: [
        {
          icon: 'mdi-close-circle-outline',
          name: 'close-circle-cutline',
        },
      ],
      drawer: false,
    }
  },
}
</script>
