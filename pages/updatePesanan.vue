<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="order-bool-descending" /><span class="judul is-uppercase">List Pesanan Marketing</span>
    </div>
    <b-field label="Pilih Minggu Penjualan" label-position="inside">
      <b-datepicker
        v-model="dates"
        placeholder="Ganti Tanggal"
        :month-names="$store.state.namaBulan"
        :day-names="$store.state.namaHari"
        range
      />
      <span class="control">
        <b-button typs="is-info" @click="gantiMasa">Submit Tanggal</b-button>
      </span>
    </b-field>
    <b-table :data="orderan">
      <template slot-scope="props">
        <b-table-column field="tanggal" label="Tanggal Invoice" numeric>
          {{ new Date(props.row.tanggal).toLocaleDateString('id-ID',{'datestyle': 'full','month':'long','year':'numeric', 'day':'2-digit'}) }}
        </b-table-column>

        <b-table-column field="pemesan" label="Pengirim" numeric>
          {{ props.row.pemesan }}
        </b-table-column>

        <b-table-column field="barang" label="Pesanan">
          <div v-for="(pesen,index) in (JSON.parse(props.row.barang))" :key="index">
            <p>{{ pesen.nama }} : {{ pesen.pesan }} pcs</p>
          </div>
        </b-table-column>

        <b-table-column field="jasa" label="Expedisi" numeric>
          <p class="is-uppercase">
            {{ props.row.jasa }}
          </p>
        </b-table-column>

        <b-table-column field="nama" label="Nama Penerima" numeric>
          {{ props.row.nama }}
        </b-table-column>

        <b-table-column field="telpPenerima" label="No Telp Penerima" numeric>
          {{ props.row.telp }}
        </b-table-column>

        <b-table-column field="harga" label="Biaya Kirim" numeric>
          Rp. {{ parseInt(props.row.harga).toLocaleString('id-ID') }}
        </b-table-column>

        <b-table-column field="alamat" label="Alamat Tujuan">
          {{ props.row.alamat }}
        </b-table-column>

        <b-table-column field="buktiPembayaran" label="Struk Pembayaran" width="10%">
          <figure class="image">
            <img :src="props.row.buktiPembayaran" alt="">
          </figure>
        </b-table-column>

        <b-table-column field="bukti" label="Foto Resi" width="10%">
          <figure class="image">
            <img :src="props.row.bukti" alt="">
          </figure>
        </b-table-column>

        <b-table-column field="resi" label="No Resi">
          {{ props.row.resi }}
        </b-table-column>
        <b-table-column label="Aksi">
          <b-button expanded type="is-info" size="is-small" icon-left="lead-pencil" @click="openModal=true,action='Update',orderId=props.row.id">
            Input Resi
          </b-button>
          <b-button expanded type="is-danger" size="is-small" icon-left="delete" @click="openModal=true,action='Hapus',orderId=props.row.id">
            Hapus Pesanan
          </b-button>
        </b-table-column>
      </template>
    </b-table>

    <b-modal has-modal-card :active.sync="openModal">
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <b-icon icon="lead-pencil" /><span>{{ action }} Pesanan</span>
        </header>
        <section v-show="action==='Hapus'" class="modal-card-body">
          <p>Apakah Anda yakin ingin menghapus transaksi ini?</p>
        </section>
        <section v-show="action==='Update'" class="modal-card-body">
          <b-field label="Input Resi" label-position="on-border">
            <b-input v-model="resi" />
          </b-field>
          <b-field class="file">
            <b-upload v-model="file">
              <a class="button is-primary is-info">
                <b-icon icon="upload" />
                <span>Upload Bukti Resi Disini</span>
              </a>
            </b-upload>
            <span class="file-name">
              {{ file.name }}
            </span>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button v-show="action==='Update'" type="is-info" expanded @click="eksekusi">
            Kirim Resi
          </b-button>
          <b-button v-show="action==='Hapus'" type="is-danger" expanded @click="eksekusi">
            Hapus Pesanan
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
      dates: [],
      orderan: [
        { jasa: 'x', jumlah: 'x', barang: '[{"name":"x","value":0}]' }],
      openModal: false,
      resi: '',
      file: { name: 'Belum ada file yang di upload' },
      orderId: '',
      action: ''

    }
  },
  mounted () {
    this.getPesenan()
  },
  methods: {
    async getPesenan () {
      const fd = new FormData()
      fd.append('action', 'getPesenan')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.orderan = get
    },
    async eksekusi () {
      const fd = new FormData()
      fd.append('action', 'eksekusi')
      fd.append('perintah', this.action)
      fd.append('id', this.orderId)
      fd.append('data', this.file)
      fd.append('resi', this.resi)
      const upload = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (upload) {
        this.$buefy.snackbar.open('Sukses Update Data')
        this.openModal = false
        this.getPesenan()
      } else {
        this.$buefy.snackbar.open('Gagal Update Pesanan, Mohon Ulangi')
      }
      this.getPesenan()
    },
    async gantiMasa () {
      const start = new Date(this.dates[0])
      const end = new Date(this.dates[1])
      const fd = new FormData()
      fd.append('action', 'gantiMasa')
      fd.append('dataStart', start.getFullYear() + '-' + start.getMonth() + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds())
      fd.append('dataEnd', end.getFullYear() + '-' + end.getMonth() + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds())
      const det = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (det) {
        this.$buefy.toast.open('Berhasil diUpdate')
      } else {
        this.$buefy.toast.open('Mohon diulangi Nggih')
      }
    }
  }
}
</script>

<style>

</style>
