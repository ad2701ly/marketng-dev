<template>
  <div class="front">
    <p class="has-text-centered is-size-1 is-uppercase">
      Selamat datang
    </p>
    <div class="columns">
      <div class="column has-text-centered is-capitalized">
        <p>Nama : {{ $store.state.userData.nama }}</p>
        <p>Alamat : {{ $store.state.userData.alamatL }}</p>
      </div>
    </div>

    <p class="has-text-centered is-size-4 is-capitalized">
      Untuk Memulai, Silakan Pilih menu yang tersedia
    </p>
    <p class="judul has-text-centered">
      Informasi Harga
    </p>
    <b-table :data="hargas">
      <template slot-scope="props">
        <b-table-column field="barang" label="Nama Barang">
          {{ props.row.nama }}
        </b-table-column>
        <b-table-column field="harga" label="Harga">
          Rp. {{ parseInt(props.row.harga).toLocaleString('id-ID') }}
        </b-table-column>
      </template>
    </b-table>
    <div class="rainbow">
      <div class="has-text-centered bagian-header is-size-4">
        {{ banner.judul }}
      </div>
      <div class="bagian-content" v-html="banner.deskripsi" />
    </div>

    <b-modal :active.sync="bannerON" has-modal-card>
      <div class="modal-card">
        <section class="modal-card-body">
          <p class="judul has-text-centered">
            Promo
          </p>
          <b-carousel>
            <b-carousel-item v-for="sumber in source" :key="sumber.id">
              <p class="has-text-centered is-uppercase is-5">
                {{ sumber.judul }}
              </p>
              <figure class="image">
                <img :src="sumber.location" alt="">
              </figure>
            </b-carousel-item>
          </b-carousel>
        </section>
      </div>
    </b-modal>

    <b-loading :active.sync="pageLoading" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageLoading: false,
      bannerON: false,
      banner: '',
      source: [],
      hargas: [
        { code: 'x', barang: 'x', harga: 'x' }
      ]
    }
  },
  mounted () {
    this.getHarga()
    this.getPromo()
    this.ambilPromo()
  },
  methods: {
    async ambilPromo () {
      const fd = new FormData()
      fd.append('action', 'ambilPromo')

      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (get) {
        this.banner = get
      } else {
        this.$buefy.snackbar.open('Cek Koneksi')
      }
    },
    async getHarga () {
      this.pageLoading = true
      const fd = new FormData()
      fd.append('action', 'getHarga')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.hargas = get
      this.pageLoading = false
    },
    async getPromo () {
      const fd = new FormData()
      fd.append('action', 'getPromo')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (get !== false) {
        this.bannerON = true
        this.source = get
      }
    }
  }

}
</script>

<style scoped>
.front{
  position: relative;
  padding: 2% 0;
}
.rainbow{
  border:solid 2px;
  border-top-color: springgreen;
  border-left-color: steelblue;
  border-bottom-color: tomato;
  border-right-color: yellowgreen;
  padding: 3%;
}

@keyframes rotatingRainbow {

}

</style>
