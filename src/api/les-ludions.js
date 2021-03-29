import firebase from "../firebase";
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
              Spectacle: art.data().Spectacle,
              Planning: art.data().Planning
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
    }
  }
}