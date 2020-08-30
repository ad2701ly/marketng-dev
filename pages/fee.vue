<template>
  <div>
    <div class="has-text-centered judul is-uppercase">
      <b-icon icon="cash-multiple" /><span>Cek Fee</span>
    </div>
    <p class="has-text-centered">
      Periode {{ new Date($store.state.tanggal[0].checkpoint).toLocaleString('id-ID',{day:'2-digit',month:'long',year:'numeric'}) }} - {{ new Date($store.state.tanggal[0].checkpoint2).toLocaleString('id-ID',{day:'2-digit',month:'long',year:'numeric'}) }}
    </p>
    <b-table :data="bayaran.bayaran">
      <template slot-scope="pai">
        <b-table-column field="tanggal" subheading="Total Penjualan" label="Tanggal Order">
          {{ pai.row.tanggal }}
        </b-table-column>
        <b-table-column field="ektamil" :subheading="bayaran.totalEktamil" label="Ektamil">
          {{ pai.row.ektamil }}
        </b-table-column>
        <b-table-column field="milktawa" :subheading="bayaran.totalMilktawa" label="Milktawa">
          {{ pai.row.milktawa }}
        </b-table-column>
        <b-table-column field="gim" :subheading="bayaran.totalGIM" label="GIM">
          {{ pai.row.gim }}
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
            <p>Ayo Bertransaksi</p>
          </div>
        </section>
      </template>
      <template slot="footer">
        <th>
          <div class="th-wrap">
            Total Penjualan Milktawa : {{ bayaran.totalMilktawa }}
          </div>
          <div class="th-wrap">
            Total Penjualan GIM : {{ bayaran.totalGIM }}
          </div>
          <div class="th-wrap">
            Total Penjualan Ektamil : {{ bayaran.totalEktamil }}
          </div>
          <div class="th-wrap">
            Fee : Rp. {{ kalkulasi.toLocaleString('id-ID') }}
          </div>
        </th>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bayaran: { totalMilktawa: 0, totalGIM: 0, totalEktamil: 0 }
    }
  },
  computed: {
    kalkulasi () {
      const itung = this.bayaran.totalMilktawa + this.bayaran.totalGIM + this.bayaran.totalEktamil
      let bayar = 0
      if (itung < 101) {
        bayar = itung * 5000
      } else if (itung < 301) {
        bayar = (100 * 5000) + (itung - 100) * 7000
      } else if (itung < 501) {
        bayar = (100 * 5000) + (200 * 7000) + (itung - 300) * 8000
      } else {
        bayar = (100 * 5000) + (200 * 7000) + (200 * 8000) + (itung - 500) * 10000
      }
      return bayar
    }
  },
  mounted () {
    this.getFee()
  },
  methods: {
    async getFee () {
      const fd = new FormData()
      fd.append('action', 'getFee')
      fd.append('id', this.$store.state.userData.id)
      fd.append('tanggal', JSON.stringify(this.$store.state.tanggal))
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (get !== false) {
        this.bayaran = get
      } else {
        this.$buefy.toast.open('Gagal Proses, Cek Koneksi')
      }
    }
  }

}
</script>

<style>

</style>
