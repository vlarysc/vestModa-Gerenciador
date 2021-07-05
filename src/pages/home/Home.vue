<template>
  <div class="home">
    <div class="mb-4">
      <LayoutNewProduct />
    </div>
    <div>
      <span><strong>Catalogo de Produtos</strong></span>
    </div>
    <div v-for="(produto, i) in vestModa" :key="i">
      <div v-if="vestModa.length">
        <div class="row">
          <div class="col-6 home-box">
            <div class="text-product">
              <div class="img-container">
                <img :src="produto.foto" height="180" width="180" alt="" />
              </div>
              <div class="row products-container">
                <small> <strong>Produto: </strong> {{ produto.produto }} </small>

                <small><strong>Estoque: </strong> {{ produto.estoque }} </small>

                <small><strong>Preço: </strong> {{ produto.preco }} </small>

                <small><strong>Categoria: </strong> {{ produto.categorias[0].name }} </small>
              </div>
            </div>
            <div class="btn-group">
              <button class="btn-edit">Editar</button>
              <button class="btn-del">Deletar</button>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <small class="velse">Não foi encontrado nem um produto</small>
      </template>
    </div>
  </div>
</template>

<script>
import groupBy from "lodash.groupby";
import moment from "moment";
import LayoutNewProduct from "../layout/LayoutNewProduct.vue";

export default {
  name: "Home",
  components: { LayoutNewProduct },
  data() {
    return {
      vestModa: []
    };
  },
  mounted() {
    console.log(this.vestModa);
  },
  computed: {
    grupoMeses() {
      let grupoMeses = [];

      const mesAtual = () => {
        grupoMeses.push({
          data: [],
          total: 0,
          mes: moment().format("MM/YYYY")
        });
      };

      if (this.vestModa.length) {
        const meses = groupBy(this.vestModa, (i) => {
          return moment(i.createdAt).format("MM/YYYY");
        });

        const sortMes = Object.keys(meses).sort((a, b) => {
          if (moment(`${a} 01`, "MM/YYYY HH").isBefore(moment(`${b} 01`, "MM/YYYY HH"))) {
            return -1;
          } else {
            return +1;
          }
        });

        grupoMeses = sortMes.map((mes) => ({
          mes,
          data: meses[mes],
          total: meses[mes].map((i) => +i.valor).reduce((a, c) => a + c, 0)
        }));

        const ultimoMes = moment(grupoMeses[grupoMeses.length - 1].mes, "MM/YYYY");

        if (!ultimoMes.isSame(moment(), "mes")) {
          mesAtual();
        }
      } else {
        mesAtual();
      }
      return grupoMeses;
    }
  },
  created() {
    this.getDados();
    console.log("hi", this.getDados());
  },
  methods: {
    getDados() {
      const ref = this.$firebase.database().ref(`/${window.uid}`);
      ref.on("value", (data) => {
        const values = data.val();
        this.vestModa = Object.keys(values).map((i) => values[i]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    margin: 5px;
    width: 500px;
    display: flex;
    font-size: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 3px solid var(--ligther);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
  }
}

.velse {
  display: flex;
  justify-content: center;
}

.text-product {
  display: flex;
  justify-content: space-around;
}

.btn-group {
  position: relative;
  left: 100px;
  top: 15px;
}

.btn-del {
  min-width: 125px;
  background-color: red;
  color: white;
}

.btn-edit {
  min-width: 125px;
  margin-right: 20px;
  background-color: yellow;
  color: black;
}

.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  border: 3px solid var(--featured-dark);
}

.products-container {
  margin-left: 20px;
}
</style>
