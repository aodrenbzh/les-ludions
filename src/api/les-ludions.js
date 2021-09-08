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
      search: "",
      blogs: {
        value: [],
        isLoading: false
      },
      article: null
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
    this.blogs = {
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
    async getLabels() {
      var that = this;
      if (this.labels && this.labels.isLoading) return Promise.resolve(this.labels.value);
      this.labels = {
        value: {},
        isLoading: true
      };
      return db.collection("Labels")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((label) => {
            that.labels.value[label.id] = label.data().Label
          });
          return that.labels.value;
        }).catch(
          (error) => null
        );
    },
    async getEvents() {
      var that = this;
      if (this.events && this.events.isLoading) return Promise.resolve(this.events.value);
      this.events = {
        value: [],
        isLoading: true
      };
      return db.collection("Evenements")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((event) => {
            let temp = {
              id: event.id,
              titre: event.data().Titre,
              display: event.data().Display,
              reservable: event.data().Reservable,
              content: event.data().Content,
              description: event.data().Description
            };
            var storageRef = str.ref();
            var imagesRef = storageRef.child("/events");
            imagesRef.listAll().then(
              images => {
                images.items.forEach(
                  (itemRef) => {
                    itemRef.getMetadata().then(
                      meta => {
                        if (meta.name.indexOf(temp.id) > -1) {
                          storageRef.child(meta.fullPath).getDownloadURL().then(
                            url => {
                              var i = {
                                name: meta.name,
                                src: url
                              };
                              temp.image = i;
                              that.events.value.push(temp);
                            }
                          )
                        }
                      }
                    );
                  }
                );
              });
          });
          return that.events.value;
        }).catch(
          (error) => null
        );
    },
    async getReservations() {
      var that = this;
      if (this.reservations && this.reservations.isLoading) return Promise.resolve(this.reservations.value);
      this.reservations = {
        value: {},
        isLoading: true
      };
      return db.collection("Reservations")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((res) => {
            var temp = {
              label: res.data().Label
            };
            db.collection("Reservations").doc(res.id).collection('Spectacles').get().then(
              ss => {
                var spectacles = [];
                ss.forEach(s => spectacles.push(
                  {
                    id: s.id,
                    label: s.data().Label,
                    prix: s.data().Prix
                  }
                ));
                temp.spectacles = spectacles;
              }
            );
            that.reservations.value[res.id] = temp;
          });
          return that.reservations.value;
        }).catch(
          (error) => null
        );
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
    },
    async sendPigeon(pigeon) {
      var input = {
        ...pigeon,
        to: ['festival.Ludions@laposte.net', 'les.ludions50@gmail.com'],
        message: {
          subject: 'Pigeon reçu de la part de ' + pigeon.Auteur,
          text: pigeon.Auteur + ' (' + pigeon.Email + ') a envoyé ce message : ' + pigeon.Contenu,
          html: `<p><strong>Mail </strong>: ` + pigeon.Email + `</p>
          <p><strong>Auteur </strong>: `+ pigeon.Auteur + `</p>
          <p><strong>Contenu </strong>:&nbsp;</p>
          <p><br></p><p>` + pigeon.Contenu + `</p>`,
        }
      };
      return await db.collection("Pigeons").add(input);
    },
    async addDemande(demande, jour, label) {
      var input = {
        ...demande,
        jour: jour,
        to: ['festival.Ludions@laposte.net', 'les.ludions50@gmail.com'],
        message: {
          subject: 'Reservation reçue de la part de ' + demande.Prenom + ' ' + demande.Nom,
          text: demande.Prenom + ' ' + demande.Nom + ' (' + demande.Email + ' - ' + demande.Phone + ') a reservé ' + demande.Places + ' places pour ' + demande.Spectacle + ' le ' + jour,
          html: `<p><strong>Mail </strong>: ` + demande.Email + `</p>
          <p><strong>Auteur </strong>: `+ demande.Prenom + ' ' + demande.Nom + `</p>
          <p><strong>Téléphone </strong>: `+ demande.Phone + `</p>
          <p><strong>Spectacle </strong>: `+ demande.Places + ' places pour ' + label + ' le ' + jour + `</p>`,
        }
      };
      await db.collection("Pigeons").add(input);
      return await db.collection("Reservations").doc(jour).collection('Spectacles').doc(demande.Spectacle).collection('Demandes').add(demande);
    },

    async getBlogs() {
      var that = this;
      if (!this.blogs || (this.blogs && !this.blogs.isLoading)) {
        this.blogs = {
          value: [],
          isLoading: true
        };
        let allBlogs = [];
        let blogs = await db.collection("Blog").get();
        blogs.forEach(
          async blog => {
            let dataBlog = blog.data();
            let tempBlog = {
              id: blog.id,
              titre: dataBlog.Titre,
              description: dataBlog.Description,
              blocs: []
            };

            let imageBlogRef =  await str.ref().child("blogs/" + blog.id).listAll();
            imageBlogRef.items.forEach(
              async i => {
                if (i.name == "resized_" + dataBlog.Image) {
                  let url = await str.ref().child(i.fullPath).getDownloadURL();
                  tempBlog.image = {
                    name: i.name,
                    src: url
                  };
                }
              }
            );

            let blocs = await db.collection("Blog").doc(blog.id).collection("Paragraphes").get();
            blocs.forEach(
              async bloc => {
                let dataBloc = bloc.data();
                var tempBloc = {
                  texte: dataBloc.Texte
                };
                imageBlogRef.items.forEach(
                  async i => {
                    if (i.name == "resized_" + dataBloc.Image) {
                      let url = await str.ref().child(i.fullPath).getDownloadURL();
                      tempBloc.image = {
                        name: i.name,
                        src: url
                      };
                    }
                  }
                );
                tempBlog.blocs.push(tempBloc);
              }
            );

            allBlogs.push(tempBlog);
          }
        );
        that.blogs.value = allBlogs;
      }
      return Promise.resolve(this.blogs.value);
    },
    async getArticle(id) {
      var that = this;
      if (!this.article || !this.article.isLoading || (this.article.value.id != id)) {
        this.article = {
          value: {},
          isLoading: true
        };
        let art = await db.collection("Blog").doc(id).get();

        let dataArtice = art.data();
            let tempArt = {
              id: art.id,
              titre: dataArtice.Titre,
              description: dataArtice.Description,
              blocs: []
            };

            let imageBlogRef =  await str.ref().child("blogs/" + art.id).listAll();
            imageBlogRef.items.forEach(
              async i => {
                if (i.name == "resized_" + dataArtice.Image) {
                  let url = await str.ref().child(i.fullPath).getDownloadURL();
                  tempArt.image = {
                    name: i.name,
                    src: url
                  };
                }
              }
            );

            let blocs = await db.collection("Blog").doc(art.id).collection("Paragraphes").get();
            blocs.forEach(
              async bloc => {
                let dataBloc = bloc.data();
                var tempBloc = {
                  texte: dataBloc.Texte,
                  ordre: dataBloc.Ordre
                };
                imageBlogRef.items.forEach(
                  async i => {
                    if (i.name == "resized_" + dataBloc.Image) {
                      let url = await str.ref().child(i.fullPath).getDownloadURL();
                      tempBloc.image = {
                        name: i.name,
                        src: url
                      };
                    }
                  }
                );
                tempArt.blocs.push(tempBloc);
              }
            );

        tempArt.blocs = tempArt.blocs.sort((a,b) => (a.ordre > b.ordre) ? 1 : ((b.ordre > a.ordre) ? -1 : 0));
        that.article.value = tempArt;
      }
      return Promise.resolve(this.article.value);
    },
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