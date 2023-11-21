<template>
  <div id="app">
    <div>
      <app-header v-if="visible" />
      <router-view @isShowHeaderAndFooter="handleHeaderAndFooter" />
      <app-footer v-if="visible" />
    </div>
  </div>
</template>


<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      isShowHeaderAndFooter: false,
    };
  },
  computed: {
    visible() {
      return this.isShowHeaderAndFooter;
    },
  },

  methods: {
    handleHeaderAndFooter(status) {
      this.isShowHeaderAndFooter = status;
    },
  },
  mounted() {

  }
}
</script>


<style>
body {
  background-color: #EEEFEA;
}
</style>