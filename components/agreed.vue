<template>
  <b-modal :active.sync="$store.state.modalPersetujuan" :on-cancel="cancelModal" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-info is-4 has-text-centered is-uppercase">
          <b-icon icon="grease-pencil" /> <span>
            Daftar Marketing</span>
        </p>
      </header>
      <section class="modal-card-body">
        <p class="subtitle has-text-centered is-capitalized">
          bacalah dengan seksama sebelum melanjutkan
        </p>
        <div class="boxed">
          <p class="subjudul">
            Kewajiban Marketing
          </p>
          <ol>
            <li>Anda Menawarkan Produk Ke Konsumen</li>
            <li>Konsumen Membeli dengan transfer ke kami</li>
            <li>Kami Mengirim Produk Ke konsumen</li>
            <li>Kami Membayar Fee sesuai dengan pruduk yang anda jual</li>
          </ol>
        </div>
        <div class="boxed">
          <p class="subjudul">
            Hak Marketing
          </p>
          <ol>
            <li>Anda Sebagai Marketing, Tugas Anda Hanyalah <b>Memperomosikan</b> langsung Produk kami.</li>
            <li>Marketing Mendapatkan Fee 5000 / box, Jika Penjualan mencapai 100 setiap minggunya</li>
          </ol>
        </div>
        <!-- <b-button
          tag="a"
          type="is-info"
          outlined
          href="https://milktawa.id/download/mou.png"
          expanded
          target="blank"
        >
          Pahami sebelum melanjutkan
        </b-button> -->
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-info" expanded icon-left="check" @click="SET_REGISTER_MODAL_ACTIVE(true), SET_AGREED_MODAL_ACTIVE(false)">
          Saya Paham dan Lanjut Mendaftar
        </b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['SET_AGREED_MODAL_ACTIVE', 'SET_REGISTER_MODAL_ACTIVE']),
    cancelModal () {
      this.SET_AGREED_MODAL_ACTIVE(false)
    }
  }
}
</script>

<style scoped>
.boxed{
  padding: 1em;
  padding-left: 2em;
  margin: 0.5em;
  border:black 1px dashed;
}
</style>
