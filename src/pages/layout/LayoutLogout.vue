<template>
  <button class="btn btn-logout" @click="logout()">
    <i class="fa fa-power-off"></i>
    Sair
  </button>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$firebase.auth().signOut();
      this.$router.push({ name: "Login" });
      console.log("oi");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-logout {
  width: 100%;
  cursor: pointer;
  color: white;
  &:hover {
    color: var(--featured);
  }
}
</style>
