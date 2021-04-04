import firebase from "../firebase";
var fb = require('firebase');
const db = firebase.firestore();
const str = firebase.storage();

export default {
  name: 'store',
  data() {
    return {
      name: "",
      date: new Date().toISOString().slice(0, 10),
      artistes: {
        value: [],
        isLoading: false
      },
      defaultData: null,
      search: ""
    };
  },
  mounted() {
    this.name = "";
    this.date = new Date().toISOString().slice(0, 10);
    this.defaultData = null;
    this.search = "";
    this.artistes = {
      value: [],
      isLoading: false
    };
  },
  methods: {
    
    async getDefault() {
      if (this.defaultData) return Promise.resolve(this.defaultData);
      this.defaultData = {
        galerie: {
          name: '',
          src: ''
        }
      };
      var storageRef = str.ref();
      var imagesRef = storageRef.child("/default");
      let images = await imagesRef.listAll();
      images.items.forEach(
        async (itemRef) => {
          let meta = await itemRef.getMetadata();
          let url = await storageRef.child(meta.fullPath).getDownloadURL();
          this.defaultData.galerie = {
            name: meta.name,
            src: url
          };
        }
      );
      return Promise.resolve(this.defaultData);

    },
    getArtistes() {
      var that = this;
      if (this.artistes && this.artistes.isLoading) return Promise.resolve(this.artistes.value);
      this.artistes = {
        value: [],
        isLoading: true
      };
      return db.collection("Artistes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((art) => {
            var temp = {
              id: art.id,
              Nom: art.data().Nom,
              Prenom: art.data().Prenom,
              Metier: art.data().Metier,
              Description: art.data().Description,
              Bio: art.data().Bio,
              Maison: art.data().Maison,
              Display: art.data().Display
            };
            db.collection("Artistes").doc(art.id).collection('Socials').get().then(
              socials => {
                var ss = [];
                socials.forEach(s => {
                  ss.push({
                    id: s.id,
                    Lien: s.data().Lien
                  });
                });
                temp.Socials = ss;
              }
            );

            db.collection("Artistes").doc(art.id).collection('LivreDOr').get().then(
              livreDOR => {
                var cc = [];
                livreDOR.forEach(c => {
                  cc.push({
                    id: c.id,
                    Auteur: c.data().Auteur,
                    Contenu: c.data().Contenu,
                    Date: c.data().Date.toDate()
                  });
                });
                temp.LivreDOR = cc;
                // that.artistes.value.push(temp);
              }
            );

            var storageRef = str.ref();
            var imagesRef = storageRef.child("/" + art.id);
            imagesRef.listAll().then(
              images => {
                var tempI = [];
                images.items.forEach(
                  (itemRef) => {
                    itemRef.getMetadata().then(
                      meta => {
                        storageRef.child(meta.fullPath).getDownloadURL().then(
                          url => {
                            var i = {
                              name: meta.name,
                              src: url
                            };
                            tempI.push(i);
                          }
                        )
                      }
                    );
                  }
                );
                temp.galerie = tempI;
                that.artistes.value.push(temp);
              }
            );
          });
          return that.artistes.value;
        })
        .catch((error) => {
          return [];
        });
    },
    async getImagesFromArtiste(id) {
      if (this.artistes.value.find(a => a.id == id).galerie) return Promise.resolve(this.artistes.value.find(a => a.id == id).galerie);
      var result = [];
      var storageRef = str.ref();
      var imagesRef = storageRef.child("/" + id);
      let images = await imagesRef.listAll();
      images.items.forEach(
        async (itemRef) => {
          let meta = await itemRef.getMetadata();
          let url = await storageRef.child(meta.fullPath).getDownloadURL();
          result.push({
            name: meta.name,
            src: url
          });
        }
      );
      this.artistes.value[this.artistes.value.findIndex(a => a.id == id)].galerie = result;
      return Promise.resolve(result);
    },
    async addComment(comment, artisteId) {
      return await db.collection("Artistes").doc(artisteId).collection('LivreDOr').add(comment);
    }

    // async getLivreDOr(id) {
    //   if (this.artistes.value.find(a => a.id == id).livreDOr) return Promise.resolve(this.artistes.value.find(a => a.id == id).livreDOr);
    //   var result = [];
    //   var storageRef = str.ref();
    //   var imagesRef = storageRef.child("/" + id);
    //   let images = await imagesRef.listAll();
    //   images.items.forEach(
    //     async (itemRef) => {
    //       let meta = await itemRef.getMetadata();
    //       let url = await storageRef.child(meta.fullPath).getDownloadURL();
    //       result.push({
    //         name: meta.name,
    //         src: url
    //       });
    //     }
    //   );
    //   this.artistes.value[this.artistes.value.findIndex(a => a.id == id)].galerie = result;
    //   return Promise.resolve(result);
    // }
  }
}