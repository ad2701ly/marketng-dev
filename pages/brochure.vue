<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="newspaper" /><span class="judul is-uppercase">Daftar Brosur</span>
      <p class="has-text-centered">
        Sentuh Gambar Untuk Melihat Lebih Besar
      </p>
    </div>

    <div class="columns is-multiline">
      <div v-for="(file,index) in files" :key="index" class="column is-3">
        <figure class="image">
          <a :href="file.location" download type="application/octet-stream">
            <img :src="file.location" alt="brosur">
            <!-- <img :src="file.location" alt="brosur" @click="tyr(index)"> -->
          </a>
        </figure>
      </div>
    </div>

    <b-modal :active.sync="imageModal">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img :src="imageSementara.location" alt="">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <b-button type="is-info" expanded icon-left="check" outlined @click="imageModal=false">
              Ok
            </b-button>
            <b-button
              type="is-info"
              expanded
              icon-left="download"
              outlined
            >
              Download Brosur
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import Downloader from "js-file-downloader"
export default {
  data () {
    return {
      imageModal: false,
      files: [
        { location: 'undefined' }
      ],
      imageSementara: []
    }
  },
  mounted () {
    this.getImage()
  },
  methods: {
    async getImage () {
      const get = await this.$axios.$get(this.$store.state.host + '/marketing.php', { params: { action: 'getImage' } })
      if (get) {
        this.files = get
      } else {
        this.$buefy.toast.open('Cek Koneksi Anda')
      }
    },
    tyr (x) {
      this.imageModal = true
      this.imageSementara = this.files[x]
    }
    /*     down(){
     const down=new Downloader({url:  this.imageSementara.location})
     console.log(down);

    } */
  }

}
</script>

<style>

</style>
