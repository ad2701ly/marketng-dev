<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="cash-plus" /><span class="judul is-uppercase">Order Sekarang</span>
    </div>
    <hr>

    <p class="subjudul">
      Pilih Produk
    </p>
    <p class="has-text-centered is-size-7">Bisa Geser kanan dan kiri untuk memilih Produk</p>
    <b-carousel-list :data="produks" :items-to-show="3">
      <template slot="item" slot-scope="prop">
        <div v-if="prop.list.aktif==1">
          <figure class="image is-1by1">
            <img :src="prop.list.lokasi" alt="">
          </figure>
          <p class="has-text-centered has-text-weight-bold">
            {{ prop.list.nama }}
          </p>
          <p class="has-text-centered">Rp. {{ parseInt(prop.list.harga).toLocaleString('id-ID') }}</p>
          <b-button type="is-info" expanded @click="tampilkanIsi(prop.list)">
            Pesan
          </b-button>
        </div>
      </template>
    </b-carousel-list>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <b-field label="Tulis Kecamatan Penerima" label-position="on-border">
          <b-autocomplete v-model="cariKota" :data="dataObj" field="subdistrict_name" max-height="100px" @select="option => pilihKota = option">
            <template slot-scope="jas">
              <p>{{ jas.option.subdistrict_name }}, {{ jas.option.type }} {{ jas.option.city }}</p>
            </template>
            <template slot="empty">
              <p>Pastikan Minimal 3 Karakter dan nama kecamatan Valid</p>
              <p>Tidak Menemukan Hasil dari {{cariKota}}</p>
            </template>
          </b-autocomplete>
        </b-field>
      </div>

      <div class="column is-4">
        Berat Pesanan Anda = {{ abot }} gram
      </div>
    </div>
    <p class="has-text-centered subtitle">
      Masukkan Data Penerima
    </p>
    <b-field label="Nama Penerima" label-position="on-border">
      <b-input v-model="namaPenerima" type="text" icon="account" />
    </b-field>
    <b-field label="Nomer Telpon Penerima" label-position="on-border">
      <b-input v-model="telpPenerima" type="number" icon="android" />
    </b-field>
    <b-field label="Alamat Lengkap" label-position="on-border">
      <b-input v-model="alamat" type="textarea" size="is-small" />
    </b-field>

    <hr>
    <b-button icon-left="cash" type="is-info" expanded :loading="cekDulu" @click="cekOngkir">
      Cek Ongkos Kirim
    </b-button>
    <b-message v-show="hasil==''" type="is-info" has-icon>
      Mohon Isikan data Terlebih Dahulu
    </b-message>
    <div v-show="hasil!==''" class="container">
      <p class="subtitle has-text-centered">
        Pilih Layanan Expedisi Yang Ada Di Bawah Ini
      </p>

      <b-field label="Pilih Layanan">
        <b-select v-model="sambungan" placeholder="" icon="cash" @input="pecah">
          <optgroup v-for="hasi in hasil" :key="hasi.code" :label="hasi.name">
            <option v-show="hasi.costs.length===0" disabled>
              --Tidak Terjangkau--
            </option>
            <option v-for="taduk in hasi.costs" :key="taduk.service" :value="hasi.code+','+taduk.cost[0].value">
              {{ taduk.service }} - Rp. {{ parseInt(taduk.cost[0].value).toLocaleString('id-ID') }} <span v-if="taduk.cost[0].etd !== ''"> - {{ taduk.cost[0].etd }} Hari </span> <span v-else>Tidak Diketahui</span>
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>

    <b-button type="is-info" expanded icon-left="cash-register" @click="modalTotalan=true">
      Cek Pesanan
    </b-button>

    <b-modal :active.sync="modalTotalan" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Keranjang Balanja Anda
          </p>
        </header>
        <section class="modal-card-body">
          <b-table :data="orders">
            <template slot-scope="prop">
              <b-table-column label="Nama Produk" field="nama" subheading="Ongkos Kirim">
                {{ prop.row.nama }}
              </b-table-column>
              <b-table-column label="Jumlah Order" field="pesan">
                {{prop.row.pesan}}
                </b-table-column>
              <b-table-column label="Harga" field="harga" :subheading="'Rp. '+parseInt(pilihLayanan).toLocaleString('id-ID')">
                Rp. {{(prop.row.pesan * prop.row.harga).toLocaleString('id-ID')}}
              </b-table-column>
            </template>
            <template slot="footer">
              <th>Total</th>
              <th></th>
              <th> Rp. {{ parseInt(total).toLocaleString('is-ID') }}</th>
            </template>
            
          </b-table>
          <br>
          <p>Mohon transfer ke rekening dibawah ini</p>
          <div class="columns">
            <div class="column">
              <p class="has-text-centered">
                Mandiri
              </p>
              <p class="has-text-centered">
                9000019093781
              </p>
              <p class="has-text-centered">
                SUPARIYO
              </p>
            </div>
            <div class="column">
              <p class="has-text-centered">
                BRI
              </p>
              <p class="has-text-centered">
                0344 0101 5698 537
              </p>
              <p class="has-text-centered">
                SUPARIYO
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-info" icon-left="cash-multiple" expanded @click="itung">
            Proses Order
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
      cekDulu: false,
      orders: [],
      produks: [],
      cariKota: '',
      pilihKota: '',
      alamat: '',
      namaPenerima: '',
      telpPenerima: '',
      pilihKurir: '',
      hasil: '',
      pilihLayanan: '',
      modalTotalan: false,
      sambungan: '',
      itemSementara: {}
    }
  },
  computed: {
    abot () {
      if (this.orders.length > 0) {
        return this.orders.map(a => a.berat * a.pesan).reduce((a, b) => {
          return a + b
        })
      } else {
        return 0
      }
    },
    total () {
      if (this.orders.length>0) {
      const x = this.orders.map(a => a.pesan * a.harga).reduce((a, b) => {
        return a + b
      })        
      return x + this.pilihLayanan

      }else{
      return 0

      }

    },
    dataObj () {
      if (this.cariKota.length>=3) {
        return this.$store.state.getJson.filter((x)=>{
          return x.subdistrict_name.toLowerCase().includes(this.cariKota.toLowerCase())
        })
      }
    }
  },
  mounted () {
    this.getHarga()
    // this.getCity()
  },
  methods: {
    async getHarga () {
      const fd = new FormData()
      fd.append('action', 'getHarga')
      const cek = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.produks = cek
    },
    async cekOngkir () {
      this.cekDulu = true
      const fd = new FormData()
      fd.append('action', 'cekOngkir')
      fd.append('tujuan', this.pilihKota.subdistrict_id)
      fd.append('asal', 249)
      fd.append('berat', this.abot)
      fd.append('kurir', this.pilihKurir)
      const cek = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.hasil = cek.rajaongkir.results

      this.cekDulu = false
    },
    tampilkanIsi (x) {
      this.$buefy.dialog.prompt({
        message: 'Pesan ' + x.nama + ' Berapa pcs?',
        type: 'is-info',
        confirmText: 'Masukkan ke Keranjang',
        cancelText: 'Batalkan',
        inputAttrs: {
          type: 'number',
          value: '1'
        },
        onConfirm: (value) => {
          x.pesan = value
          this.orders.push(x)
        }
      })
    },
    pecah () {
      const pecah = this.sambungan.split(',')
      this.pilihKurir = pecah[0]
      this.pilihLayanan = parseInt(pecah[1])
    },
    async itung () {
      const fd = new FormData()
      fd.append('action', 'order')
      fd.append('barang', JSON.stringify(this.orders))
      fd.append('jasa', this.pilihKurir)
      fd.append('harga', this.pilihLayanan)
      fd.append('id', this.$store.state.userData.id)
      fd.append('alamatKirim', this.alamat)
      fd.append('telp', this.telpPenerima)
      fd.append('nama', this.namaPenerima)

      const data = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (data === true) {
        this.modalTotalan = false
        this.$buefy.toast.open('Sukses Order, Mohon Ditunggu')
      } else {
        this.$buefy.toast.open('Gagal Order, Mohon Diulangi')
      }
    }
  }
}
</script>

<style>

</style>
