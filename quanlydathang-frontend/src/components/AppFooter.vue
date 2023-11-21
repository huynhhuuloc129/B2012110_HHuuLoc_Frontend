<template>

</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push({ name: "home page" });
    },
    goToMyRoom() {
      this.$router.push({ name: "myroom" });
    },

  },
  mounted() {
  }
}
</script>


<style></style>