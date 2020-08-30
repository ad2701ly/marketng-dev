<template>
  <div>
    <div class="has-text-centered judul is-uppercase">
      <b-icon icon="cash-refund" /><span>Cek Fee Marketing</span>
    </div>
    <p class="subjudul has-text-centered">
      List Fee Marketing
    </p>
    <p class="subjudul has-text-centered">
      Periode {{ new Date($store.state.tanggal[0].checkpoint).toLocaleString('id-ID',{day:'2-digit',month:'long',year:'numeric'}) }} - {{ new Date($store.state.tanggal[0].checkpoint2).toLocaleString('id-ID',{day:'2-digit',month:'long',year:'numeric'}) }}
    </p>
    <b-table :data="tampungan">
      <template slot-scope="mark">
        <b-table-column field="no" label="No.">
          {{ mark.index + 1 }}
        </b-table-column>
        <b-table-column field="nama" label="Nama">
          {{ mark.row.nama }}
        </b-table-column>
        <b-table-column field="milktawa" label="Milktawa">
          {{ mark.row.totalMilktawa }} pcs
        </b-table-column>
        <b-table-column field="ektamil" label="Ektamil">
          {{ mark.row.totalEktamil }} pcs
        </b-table-column>
        <b-table-column field="gim" label="GIM">
          {{ mark.row.totalGim }} pcs
        </b-table-column>
        <b-table-column field="total" label="Total Penjualan">
          {{ mark.row.totalMilktawa + mark.row.totalEktamil + mark.row.totalGim }} pcs
        </b-table-column>
        <b-table-column field="fee" label="Fee Dibayarkan">
          Rp. {{ hitungFee(mark.row.totalMilktawa + mark.row.totalEktamil + mark.row.totalGim) }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tampungan: []
    }
  },
  mounted () {
    this.getMarketingFee()
  },
  methods: {
    async getMarketingFee () {
      const fd = new FormData()
      fd.append('action', 'getMarketingFee')
      fd.append('tanggal', JSON.stringify(this.$store.state.tanggal))

      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.tampungan = get
    },
    hitungFee (x) {
      if (x < 100) {
        return (x * 5000).toLocaleString('id-ID')
      }
    }
  }
}
</script>

<style>

</style>
