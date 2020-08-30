<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="cash" /><span class="judul is-uppercase">Management Produk</span>
    </div>
    <b-button type="is-info" @click="modal=true, produk={}, mode=1">
      Tambah Produk
    </b-button>
    <b-table :data="products">
      <template slot-scope="prop">
        <b-table-column label="No" field="no">
          {{ prop.index+1 }}
        </b-table-column>
        <b-table-column label="Nama" field="nama">
          {{ prop.row.nama }}
        </b-table-column>
        <b-table-column label="Harga" field="harga">
          Rp. {{ parseInt(prop.row.harga).toLocaleString('id-ID') }}
        </b-table-column>
        <b-table-column label="Berat" field="berat">
          {{ prop.row.berat }} gram
        </b-table-column>
        <b-table-column label="Gambar" field="gambar">
          <figure class="image is-128x128 cover">
            <img :src="prop.row.lokasi" alt="" class="cover">
          </figure>
        </b-table-column>
        <b-table-column label="Action" field="action">
          <b-button type="is-info" @click="modal=true, produk=prop.row, mode=0">
            Edit Info
          </b-button>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="modal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <b-switch v-model="produk.aktif" type="is-info" :rounded="false" />
          <span v-show="mode==0" class="modal-card-title judul has-text-centered">
            Edit {{ produk.nama }}
          </span>
          <span v-show="mode==1" class="modal-card-title judul has-text-centered">
            Tambah Produk
          </span>
        </header>
        <section class="modal-card-body">
          <b-field label="Nama Produk" label-position="on-border">
            <b-input v-model="produk.nama" />
          </b-field>
          <b-field label="Harga" label-position="on-border">
            <b-input v-model="produk.harga" />
          </b-field>
          <b-field label="Berat" label-position="on-border">
            <b-input v-model="produk.berat" />
          </b-field>
          <b-field class="file">
            <b-upload v-model="produk.gambar">
              <a class="button is-info">
                <b-icon icon="upload" />
                <span>Upload Foto Produk</span>
              </a>
            </b-upload>
            <span v-if="produk.gambar" class="file-name">
              {{ produk.gambar.name }}
            </span>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button v-show="mode==0" type="is-info" icon-left="content-save" expanded @click="updateProduk">
            Simpan Data
          </b-button>
          <b-button v-show="mode==1" type="is-info" icon-left="content-save" expanded @click="tambahProduk">
            Tambah Data
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      products: [
        { code: 'x', barang: 'x', harga: 'x' }
      ],
      produk: {},
      mode: ''
    }
  },
  mounted () {
    this.getHarga()
  },
  methods: {
    async getHarga () {
      const fd = new FormData()
      fd.append('action', 'getHarga')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.products = get
    },
    async updateProduk () {
      const fd = new FormData()
      fd.append('action', 'updateHarga')
      fd.append('data', JSON.stringify(this.produk))
      fd.append('gambar', this.produk.gambar)
      const update = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (update) {
        this.modal = false
        this.$buefy.toast.open('Sukses update Data')
        this.getHarga()
      } else {
        this.$buefy.toast.open('Gagal Update, coba lagi')
      }
    },
    async tambahProduk () {
      const fd = new FormData()
      fd.set('action', 'tambahProduk')
      fd.set('data', JSON.stringify(this.produk))
      fd.set('gambar', this.produk.gambar)
      const tambah = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (tambah) {
        this.modal = false
        this.$buefy.toast.open('Sukses tambah Data')
        this.getHarga()
      } else {
        this.$buefy.toast.open('Gagal Update, coba lagi stsu hubungi customer service')
      }
    }
  }
}
</script>

<style>

</style>
