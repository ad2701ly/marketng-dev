<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="newspaper" /><span class="judul is-uppercase">Upload Brosur</span>
    </div>
    <section>
      <div class="columns">
        <div class="column is-2">
          <b-field>
            <b-upload
              v-model="fileToUpload"
              multiple
              expanded
            >
              <a class="button is-info">
                <b-icon icon="file" />
                <span>Pilih File</span>
              </a>
            </b-upload>
          </b-field>
          <b-button icon-left="upload" :loading="loading" expanded @click="uploadBrosur">
            Upload
          </b-button>
        </div>
        <div class="column">
          <div class="tags">
            <span
              v-for="(file, index) in fileToUpload"
              :key="index"
              class="tag is-primary"
            >
              {{ file.name }}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile(index)"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <p class="has-text-centered subtitle">
      Daftar Gambar
    </p>
    <div class="columns is-multiline">
      <div v-for="(gambar,x) in dataGambar" :key="gambar.id" class="column is-3">
        <figure class="image">
          <img :src="gambar.location" alt="" @click="imageModal(x)">
        </figure>
      </div>
    </div>

    <b-modal :active.sync="imageInfo" has-modal-card>
      <div class="modal-card">
        <section class="modal-card-body">
          <figure class="modal-image">
            <img :src="gambarSementara.location" alt="">
          </figure>

          <p class="has-text-centered">
            Promo Setting
          </p>
          <b-field label="Judul Promo" label-position>
            <b-input v-model="gambarSementara.judul" icon-left="newspaper" />
          </b-field>
          <b-field>
            <b-switch v-model="gambarSementara.promo" :true-value="1" :false-value="0">
              Set Promo
            </b-switch>
          </b-field>
          <b-button expanded type="is-info" icon-left="disk-save" @click="setPromo">
            Simpan Data
          </b-button>
          <b-button expanded type="is-danger" icon-left="close" @click="imageInfo=false">
            Batalkan
          </b-button>
          <b-button expanded type="is-danger" icon-left="delete" @click="hapusGambar">
            Hapus
          </b-button>
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      imageInfo: false,
      fileToUpload: [],
      dataGambar: [],
      gambarSementara: { judul: '' }
    }
  },
  mounted () {
    this.getImages()
  },
  methods: {
    deleteDropFile (index) {
      this.fileToUpload.splice(index, 1)
    },
    async uploadBrosur () {
      this.loading = true
      const file = new FormData()
      let i = 0
      file.append('action', 'uploadBrosur')
      this.fileToUpload.forEach((element) => {
        file.append('data[' + i + ']', element)

        i += 1
      })
      const brosurUpload = await this.$axios.post(this.$store.state.host + 'marketing.php', file)
      if (brosurUpload) {
        this.$buefy.toast.open('Sukses Upload Brosur')
      }
      this.loading = false
      this.getImages()
    },
    async getImages () {
      const fd = new FormData()
      fd.append('action', 'getImage')

      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (get !== false) {
        this.dataGambar = get
      } else {
        this.$buefy.toast.open('Cek Koneksi')
      }
    },
    imageModal (x) {
      this.imageInfo = true
      this.gambarSementara = this.dataGambar[x]
    },
    async setPromo () {
      const fd = new FormData()
      fd.append('action', 'setPromo')
      fd.append('data', JSON.stringify(this.gambarSementara))

      const update = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (update) {
        this.imageInfo = false
        this.$buefy.toast.open('Sukses Tersimpan')
      } else {
        this.$buefy.toast.open('Cek Koneksi Anda')
      }
    },
    async hapusGambar () {
      const fd = new FormData()
      fd.append('action', 'hapusGambar')
      fd.append('data', JSON.stringify(this.gambarSementara))

      const elete = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (elete) {
        this.$buefy.snackbar.open('Sukses Hapus Gambar')
        this.imageInfo = false
        this.getImages()
      } else {
        this.$buefy.snackbar.open('Gagal Hapus Gambar')
      }
    }
  }

}
</script>

<style scoped>
.margin{
    padding-top: 5%;
    display: block;
}
.modal-image{
width: 70%;
margin: auto;
}
</style>
