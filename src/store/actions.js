import firebase from "firebase/app";
import "firebase/firestore";

export function getDados(context) {
  let produtos = [];
  firebase
    .firestore()
    .collection("usuario")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        produtos.push(doc.data());
        console.log("test", doc.data());
      });
      context.commit("setData", produtos);
    });
}

export async function setDados() {
  this.loading = true;
  let url = "";
  try {
    this.$root.$emit("Spinner::show");
    const ref = this.$firebase.database().ref(window.uid);
    const id = ref.push().key;

    if (this.form.foto) {
      const validarName = await this.$firebase.storage().ref(window.uid).child(this.nomeArquivo).put(this.form.foto);

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
    this.form = {
      produto: "",
      estoque: 0,
      preco: 0,
      foto: "",
      categorias: []
    };
  }
}
