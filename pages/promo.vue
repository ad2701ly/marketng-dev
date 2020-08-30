<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="monitor-speaker" /><span class="judul is-uppercase">Update Promo</span>
    </div>

    <b-field label="Judul">
      <b-input v-model="judul" />
    </b-field>

    <b-field label="Deskripsi Promo">
      <vue-editor v-model="deskripsi" />
    </b-field>
    <b-button type="is-info" expanded icon-left="email-newsletter" @click="updateBrosur">
      Update Promo
    </b-button>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      judul: '',
      deskripsi: '<h2>Deskripsikan Promo Anda</h2>'

    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    async updateBrosur () {
      const fp = new FormData()
      fp.append('action', 'updatePromo')
      fp.append('judul', this.judul)
      fp.append('deskripsi', this.deskripsi)

      const uploadFile = await this.$axios.$post(this.$store.state.host + 'marketing.php', fp)

      if (uploadFile) {
        this.$buefy.snackbar.open('Sukses Simpan Data')
      } else {
        this.$buefy.snackbar.open('Gagal Simpan Data')
      }
    }
  }
}
</script>

<style>

</style>
