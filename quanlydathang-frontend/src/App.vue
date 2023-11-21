<template>
  <div id="app">
    <div>
      <router-view @isShowHeaderAndFooter="handleHeaderAndFooter" />
    </div>
  </div>
</template>


<script>

export default {
  components: {
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