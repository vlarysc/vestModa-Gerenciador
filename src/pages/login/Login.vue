<template>
  <form @submit.prevent="login()" class="form-login">
    <div class="card">
      <div class="card-header">
        <h1 class="mb-0"><strong>V</strong>estModa</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input v-model="email" required class="form-control" type="email" placeholder="E-mail" />
        </div>
        <div class="form-group">
          <input v-model="senha" required class="form-control" type="password" placeholder="Senha" />
        </div>
        <button class="btn btn-primary mt-1" :disabled="loading">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
            <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  nome: "Login",
  data() {
    return {
      loading: false,
      email: "",
      senha: ""
    };
  },
  methods: {
    async login() {
      this.loading = true;
      const email = this.email;
      const senha = this.senha;
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, senha);
        window.uid = res.user.uid;
        this.$router.push({ name: "Home" });
      } catch (err) {
        let menssagem = "";

        switch (err.code) {
          case "auth/user-not-found":
            menssagem = "Não foi possível localizar o usuário";
            break;
          case "auth/wrong-password":
            menssagem = "Senha inválida";
            break;
          default:
            menssagem = "Não foi possível fazer login, tente novamente";
        }
        this.$root.$emit("Notify::show", {
          menssagem,
          tipo: "danger"
        });
      }
      this.loading = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (window.uid) {
        vm.$router.push({ name: "Home" });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-left: 155px;
}
.form-login {
  background: #603813; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #b29f94, #603813); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #b29f94,
    #603813
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 25%;
    color: var(--featured);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-group {
    padding: 5px;
  }
}
.card-header {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
