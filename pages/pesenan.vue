<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="order-bool-ascending-variant" /><span class="judul is-uppercase">Status Pesanan</span>
    </div>
    <b-table :data="orderan">
      <template slot-scope="props">
        <b-table-column field="tanggal" label="Invoice" numeric>
          {{ new Date(props.row.tanggal).toLocaleDateString('id-ID',{day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'}) }}
        </b-table-column>

        <b-table-column field="status" label="Status Pesanan">
          <b-tag class="tag is-info is-capitalized">
            {{ props.row.status }}
          </b-tag>
        </b-table-column>

        <b-table-column v-if="props.row.status!=='pesenan'" field="bukti" width="30%" label="Foto Resi">
          <figure class="image">
            <img :src="props.row.bukti" alt="">
          </figure>
        </b-table-column>

        <b-table-column v-else field="buktiPembayaran" width="30%" label="Bukti Pembayaran">
          <figure class="image">
            <img :src="props.row.buktiPembayaran" alt="">
          </figure>
        </b-table-column>

        <b-table-column label="Action">
          <b-button
            v-show="props.row.buktiPembayaran==='' && props.row.status==='pesenan'"
            expanded
            type="is-info"
            icon-left="transfer"
            :loading="buttonLoading"
            @click="konfirm(props.index)"
          >
            Konfirmasi Pembayaran
          </b-button>
          <b-button
            v-show="props.row.buktiPembayaran!=='' && props.row.status==='pesenan'"
            disabled
            expanded
            type="is-info"
            icon-left="chair-rolling"
            @click="konfirm(props.index)"
          >
            Menunggu Resi
          </b-button>
          <b-button
            v-show="props.row.status==='Dikirim'"
            :loading="loadingModal"
            expanded
            type="is-info"
            icon-left="truck-check"
            @click="cekResi(props.index)"
          >
            Cek Resi
          </b-button>
        </b-table-column>

        <b-table-column v-show="props.row.buktiPembayaran==='' && props.row.status==='pesenan'" field="delete" label="Salah Order?">
          <b-button type="is-danger" expanded icon-left="delete" @click="modalOn(props.index)">
            Batalkan Pesanan
          </b-button>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="package-variant"
                size="is-large"
              />
            </p>
            <p>Belum Ada Pesenan, Order yuk</p>
          </div>
        </section>
      </template>
    </b-table>

    <b-modal :active.sync="deleteModal" has-modal-card>
      <div class="modal-card">
        <section class="modal-card-body">
          <b-icon icon="information" /><span>Anda Yakin Ingin Menghapus Orderan Ini?</span>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <b-button icon-left="close" type="is-info" expanded @click="deleteModal=false">
              Tidak Jadi
            </b-button>
            <b-button icon-left="delete" type="is-danger" expanded @click="hapusPesenan">
              Ya, Hapus Permanen
            </b-button>
          </div>
        </footer>
      </div>
    </b-modal>

    <b-modal :active.sync="trackingModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title has-text-centered" type="is-info">
            <b-icon icon="truck-check" size="is-small" /> <span> Hasil Tracking</span>
          </div>
        </header>
        <section class="modal-card-body">
          <div class="columns is-multiline is-gapless">
            <div class="column">
              Status : {{ tracking.delivery_status.status }}
            </div>
            <div class="column">
              Penerima : {{ tracking.details.receiver_name }}
            </div>
            <div class="column">
              Alamat : {{ tracking.details.destination }}
            </div>
          </div>
          <b-table :data="tracking.manifest" :columns="columns" />
        </section>
      </div>
    </b-modal>
    <b-loading :active.sync="loading" />
    <b-modal :active.sync="konfirmModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title has-text-centered">
            <b-icon icon="transfer" size="is-small" /><span>Konfirmasi Pembayaran</span>
          </div>
        </header>
        <section class="modal-card-body">
          <b-table :data="upload">
            <template slot-scope="pat">
              <b-table-column field="nama" label="Nama Penerima">
                {{ pat.row.nama }}
              </b-table-column>
              <b-table-column field="telp" label="Telp Penerima">
                {{ pat.row.telp }}
              </b-table-column>
              <b-table-column field="alamat" label="Alamat Penerima">
                {{ pat.row.alamat }}
              </b-table-column>
              <b-table-column field="pesanan" label="Pesanan">
                <div v-for="(pesen,index) in (JSON.parse(pat.row.barang))" :key="index">
            <p>{{ pesen.nama }} : {{ pesen.pesan }} pcs</p>
          </div>
              </b-table-column>
            </template>
          </b-table>
          <b-field class="file">
            <b-upload v-model="fileToUpload">
              <a class="button is-info">
                <b-icon icon="upload" />
                <span>Pilih file Bukti Pembayaran</span>
              </a>
            </b-upload>
            <span v-if="fileToUpload" class="file-name">
              {{ fileToUpload.name }}
            </span>
          </b-field>
          <b-button type="is-info" icon-left="file-send" :loading="loading" expanded @click="sent">
            Kirim Bukti Pembayaran
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
      buttonLoading: false,
      deleteModal: false,
      detailedPesanan: '',
      loadingModal: false,
      loading: false,
      orderan: [],
      tracking: {
        delivery_status: { status: 'Mbuh' },
        details: { destination: 'Jembatan', receiver_name: 'Paijo' }
      },
      konfirmModal: false,
      trackingModal: false,
      upload: [{ id: '7', barang: '[{"name":"Milktawa","value":"1","code":"milktawa","flipswitch":true,"berat":250,"rego":"18000"},{"name":"GIM","value":0,"code":"gim","flipswitch":false,"berat":250,"rego":"24000"}]', idOrder: '48', jasa: '', harga: '12000', resi: '', bukti: '', status: 'pesenan', tanggal: '2020-05-02 10:33:18', alamat: '', telp: '', nama: '', buktiPembayaran: '', pemesan: 'Satria' }],
      columns: [
        { field: 'city_name', label: 'Posisi Barang' },
        { field: 'manifest_code', label: 'Status' },
        { field: 'manifest_date', label: 'Tanggal' },
        { field: 'manifest_time', label: 'Jam' },
        { field: 'manifest_description', label: 'Keterangan' }

      ],
      fileToUpload: []
    }
  },
  mounted () {
    this.getPesenan()
  },
  methods: {
    async getPesenan () {
      const fd = new FormData()
      fd.append('action', 'getPesenan')
      fd.append('id', this.$store.state.userData.id)
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (get !== false) {
        this.orderan = get
      }
    },
    async cekResi (x) {
      this.loadingModal = true
      const fd = new FormData()
      fd.append('action', 'cekResi')
      fd.append('resi', this.orderan[x].resi)
      fd.append('kurir', this.orderan[x].jasa)

      const cek = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.tracking = cek.rajaongkir.result
      this.trackingModal = true
      this.loadingModal = false
    },
    konfirm (x) {
      this.konfirmModal = true
      this.upload[0] = this.orderan[x]
    },
    async sent () {
      this.buttonLoading = true
      const form = new FormData()
      form.append('action', 'updatePembayaran')
      form.append('data', JSON.stringify(this.upload))
      form.append('bukti', this.fileToUpload)

      const upload = await this.$axios.$post(this.$store.state.host + 'marketing.php', form)
      if (upload) {
        this.$buefy.toast.open('Bukti Pembayaran Telah Dikirim')
        this.loading = false
        this.konfirmModal = false
        this.getPesenan()
      } else {
        this.$buefy.toast.open('Pengiriman Gagal, Mohon Cek Koneksi')
      }
      this.buttonLoading = false
    },
    modalOn (x) {
      this.detailedPesanan = this.orderan[x]
      this.deleteModal = true
    },
    async hapusPesenan () {
      const fd = new FormData()
      fd.append('action', 'hapusPesenan')
      fd.append('id', this.detailedPesanan.id)

      const delas = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)

      if (delas) {
        this.$buefy.toast.open('Berhasil Hapus Pesanan')
        this.deleteModal = false
        this.getPesenan()
      } else {
        this.$buefy.toast.open('Berhasil Hapus Pesanan')
      }
    }
  }
}
</script>

<style>

</style>
