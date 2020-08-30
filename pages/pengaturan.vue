<template>
  <section>
    <div class="has-text-centered is-uppercase">
      <b-icon icon="cog" custom-class="mdi-spin" /><span class="judul">Pengaturan Akun</span>
    </div>

    <div class="columns">
      <div class="column is-5">
        <b-field label="User">
          <b-input v-model="dataDiri.user" disabled placeholder="User Akun" />
        </b-field>
        <b-field label="Password">
          <b-input v-model="dataDiri.real" placeholder="Password Akun" />
        </b-field>
        <b-button type="is-info" icon-left="file-send" expanded @click="sendData">
          Submit
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      dataDiri: {
        user: '',
        password: '',
        real: ''
      }
    }
  },
  mounted () {
    this.getUserData()
  },
  methods: {
    async getUserData () {
      const getUser = new FormData()
      getUser.append('action', 'getAkun')
      getUser.append('id', this.$store.state.userData.id)
      const connect = await this.$axios.$post(this.$store.state.host + 'marketing.php', getUser)
      this.dataDiri = connect
    },
    async sendData () {
      const sentData = new FormData()
      sentData.append('action', 'updateAkun')
      sentData.append('id', this.$store.state.userData.id)
      sentData.append('password', btoa(this.dataDiri.real))

      const update = await this.$axios.$post(this.$store.state.host + 'marketing.php', sentData)

      if (update) {
        this.$buefy.toast.open('Data Diri Sudah Diubah')
      } else {
        this.$buefy.toast.open('Gagal Update, Mohon Cek Kembali')
      }
      // this.getUserData()
    }
  }
}
</script>

<style>

</style>
