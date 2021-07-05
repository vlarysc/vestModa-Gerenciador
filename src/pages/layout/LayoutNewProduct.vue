<template>
  <div class="w-100 d-flex pt-3">
    <button class="btn-position btn-lg btn-outline-primary w-70" @click="novoGasto()">
      <nobr>
        <i class="fa fa-plus"></i>

        Novo Produto
      </nobr>
    </button>

    <form @submit.prevent="adicionarGasto()">
      <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLiveLabel">Adicionar um novo produto</h5>
              <button type="button" class="btn-close" @click="close()"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="d-flex form-group col-4">
                  <label for="" class="label-position">Produto:</label>
                  <input type="text" v-model="form.produto" class="form-control" required />
                </div>
                <div class="d-flex form-group col-4">
                  <label for="" class="estoque-width label-position">Estoque:</label>
                  <input type="text" v-model="form.estoque" class="form-control" required />
                </div>
                <div class="d-flex form-group col-4">
                  <label for="" class="label-position">Preço:</label>
                  <money v-model="form.preco" v-bind="money" class="form-control" required></money>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-6">
                  <div class="elements-select">
                    <label class="label-position mt-2 typo__label">Categoria: </label>
                    <multiselect
                      v-model="form.categorias"
                      tag-placeholder="Adicione uma categoria"
                      placeholder="Pesquisar Categoria"
                      label="name"
                      track-by="code"
                      :options="options"
                      :multiple="true"
                      :taggable="true"
                      @tag="addTag"
                    ></multiselect>
                  </div>
                </div>

                <div class="foto form-group mt-4 col-5 flex-column d-flex align-items-center">
                  <input type="file" ref="input" class="d-none" @change="lerArquivo($event)" accept="image/*" />
                  <button type="button" @click="openFile()" class="btn w-50 btn-outline-secondary">
                    Foto do Produto
                  </button>
                  <div v-if="form.foto" class="mt-2">
                    <img src="form.foto.name" class="rounded mx-auto d-block" alt="" />
                    {{ form.foto.name }}
                    <button type="button" class="btn badge badge-light" @click="form.foto = ''">
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <template v-if="loading">
                <button class="btn btn-primary" disabled>
                  <i class="fa fa-spinner fa-spin"></i>
                  Adicionando...
                </button>
              </template>
              <template v-else>
                <button class="btn btn-primary">Adicionar</button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade"
        :style="{ display: showModal ? 'block' : 'none' }"
        :class="{ show: showModal }"
      ></div>
    </form>
  </div>
</template>

<script>
import { Money } from "v-money";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Money,
    Multiselect
  },
  data() {
    return {
      loading: false,
      showModal: false,

      options: [
        { name: "Feminino", code: "vu" },
        { name: "Masculino", code: "js" },
        { name: "Infantil", code: "os" }
      ],
      form: {
        produto: "",
        estoque: 0,
        preco: 0,
        foto: "",
        categorias: []
      }
    };
  },
  computed: {
    nomeArquivo() {
      const foto = this.form.foto;
      if (foto) {
        const split = foto.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    lerArquivo(event) {
      this.form.foto = event.target.files[0];
    },
    openFile() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    close() {
      this.showModal = false;
    },
    novoGasto() {
      this.showModal = true;
    },
    async adicionarGasto() {
      this.loading = true;
      let url = "";
      try {
        this.$root.$emit("Spinner::show");
        const ref = this.$firebase.database().ref(window.uid);
        const id = ref.push().key;

        if (this.form.foto) {
          const validarName = await this.$firebase
            .storage()
            .ref(window.uid)
            .child(this.nomeArquivo)
            .put(this.form.foto);

          url = await validarName.ref.getDownloadURL();
        }

        const item = {
          id,
          ...this.form,
          foto: url,
          createdAt: new Date().getTime()
        };

        ref.child(id).set(item, (err) => {
          if (err) {
            this.$root.$emit("Notify::show", {
              tipo: "danger",
              menssagem: "Não foi possível adicionar novo gasto, tente novamente"
            });
          } else {
            this.$root.$emit("Notify::show", {
              tipo: "success",
              menssagem: "Gasto inserido com sucesso!"
            });
            this.close();
          }
        });
      } catch (err) {
        this.$root.$emit("Norify::show", {
          tipo: "danger",
          menssagem: "Não foi possível adicionar novo gasto, tente novamente"
        });
      } finally {
        this.loading = false;
        this.$root.$emit("Spinner::hide");
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.modal {
  color: rgb(32, 29, 29);
}
.btn-position {
  display: flex;
  justify-content: start;
}

// select

.optionbox select {
  background: var(--featured);
  color: #fff;
  padding: 10px;
  width: 200px;
  height: 40px;
  border: none;
  font-size: 0.8rem;
  outline: none;
  margin: 20px;
}

.form-group {
  height: 30px;
}

.label-position {
  margin-right: 10px;
}

.elements-select {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
}

.label-select {
  margin-top: 10px;
}

.foto {
  margin-left: 33px;
}

.estoque-position {
  margin-top: 30px;
}
</style>
