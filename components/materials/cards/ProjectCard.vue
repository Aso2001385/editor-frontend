<!-- eslint-disable vue/no-v-html -->
<template>
  <v-card class="mx-auto" max-width="400" hover :disabled="disabled" @click.prevent="click">
    <div class="pt-4 px-4" :style="'backgroundColor:' + backColor + '; height: 12rem'">
      <div class="warp" v-html="text"></div>
    </div>
    <v-divider />
    <v-card-subtitle class="py-0 mt-2"> {{ updatedAt | elapsedDateTime }} ago </v-card-subtitle>
    <v-card-title class="pt-0">{{ name }}</v-card-title>
  </v-card>
</template>

<script>
import { getDiff } from '@/lib/common'

export default {
  filters: {
    elapsedDateTime(dateTime) {
      const now = new Date()
      const past = new Date(dateTime)
      const diffMs = now.getTime() - past.getTime()
      return getDiff(diffMs)
    },
  },
  props: {
    clickCallback: {
      type: Function,
      default: () => {},
    },
    receive: {
      type: Object,
      default: () => ({
        id: 0,
        name: '',
        text: '',
        backgroundColor: '',
        primaryColor: '',
        secondaryColor: '',
        updatedAt: '',
      }),
    },
    isSetLocal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: false,
    }
  },
  computed: {
    id: {
      get() {
        return this.receive.id
      },
      set(newVal) {
        this.$emit('changeId', { index: this.index, key: 'name', value: newVal })
      },
    },
    name: {
      get() {
        return this.receive.name
      },
    },
    text: {
      get() {
        return this.receive.text
      },
    },
    backColor: {
      get() {
        return this.receive.backgroundColor
      },
    },
    primaryColor: {
      get() {
        return this.receive.primaryColor
      },
    },
    secondaryColor: {
      get() {
        return this.receive.secondaryColor
      },
    },
    updatedAt: {
      get() {
        return '2021-11-29 10:11:43'
      },
    },
  },
  methods: {
    async click() {
      this.disabled = true
      try {
        await this.clickCallback()
      } catch (error) {
        console.log(error)
      }
      this.disabled = false
    },
  },
}
</script>

<style lang="scss">
#project-names {
  background: #eee;
  overflow: hidden;
  width: 30%;

  #project-name {
    overflow: hidden;
    white-space: nowrap;
  }
}
.container {
  background: #eee;
  overflow: hidden;
  width: 100%;
  height: 100%;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.warp {
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
