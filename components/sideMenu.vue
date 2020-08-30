<template>
  <b-sidebar :open.sync="$store.state.panel" :on-cancel="closePanel" overlay right fullheight>
    <figure class="image jaga-jarak">
      <img src="/logo-milktawa.png" alt="">
    </figure>
    <b-menu class="container">
      <b-menu-list v-if="$store.state.admin" label="Administration Zone">
        <b-menu-item label="List Marketing" icon="account-group" tag="nuxt-link" to="karyawan" />
        <b-menu-item label="Brosur Menu" icon="newspaper" tag="nuxt-link" to="brosurUpload" />
        <b-menu-item v-show="$store.state.superAdmin" label="Atur Produk" icon="cash" tag="nuxt-link" to="managementProduk" />
        <b-menu-item label="Pesanan Marketing" icon="order-bool-descending" tag="nuxt-link" to="updatePesanan" />
        <b-menu-item label="Cek Fee Marketing" icon="cash-refund" tag="nuxt-link" to="cekFeeMarketing" />
        <b-menu-item label="Set Promo" icon="router" tag="nuxt-link" to="promo" />
      </b-menu-list>
      <b-menu-list label="Marketing Zone">
        <b-menu-item icon="newspaper" label="Brosur" tag="nuxt-link" to="brochure" />
        <b-menu-item icon="cash-plus" label="Order" tag="nuxt-link" to="biaya" />
        <b-menu-item icon="order-bool-ascending-variant" label="Status Pesanan" tag="nuxt-link" to="pesenan" />
        <b-menu-item icon="cash-multiple" label="Cek Fee" tag="nuxt-link" to="fee" />
      </b-menu-list>
      <b-menu-list label="Options Zone">
        <b-menu-item icon="help-box" label="Tutorial" tag="nuxt-link" to="tutorialMarketing" />
        <b-menu-item label="Pengaturan Akun" icon="cog" tag="nuxt-link" to="pengaturan" />
        <b-menu-item label="Log Out" icon="power" @click="logOut" />
      </b-menu-list>
    </b-menu>
  </b-sidebar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['panel'])
  },
  methods: {

    ...mapMutations(['SET_LOGIN', 'SET_USER_DATA', 'SET_PANEL', 'SET_ADMIN']),
    logOut () {
      window.localStorage.setItem('status', 0)
      window.localStorage.setItem('user', {})
      window.localStorage.setItem('admin', 0)
      this.SET_LOGIN(false)
      this.SET_ADMIN(false)
      this.SET_USER_DATA([])
      this.$router.replace('/')
    },
    closePanel () {
      this.SET_PANEL(false)
    }
  }
}
</script>

<style scoped>
.jaga-jarak{
  margin: 5% auto 1%;
}
</style>
