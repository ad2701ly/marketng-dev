<template>
  <div>
    <nav-atas class="fixed-top" />

    <menu-samping />
    <div class="isi" :class="{'container': $store.state.loginState}">
      <div :class="{'container': $store.state.loginState}">
        <nuxt class="full" />
      </div>
    </div>

    <b-loading :active.sync="loadingSek" />
    <modal-login />
    <per-setujuan />
    <modal-daftar />
    <floating-action-button class="fixed-bottom" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import getJson from '@/static/dadi.json'
import sideMenu from '@/components/sideMenu.vue'

import loginModal from '@/components/loginModal.vue'
import agreed from '@/components/agreed.vue'
import registerModal from '@/components/registerModal.vue'
import navbars from '@/components/navbars.vue'
import fab from '@/components/fab.vue'

export default {
  components: {
    'menu-samping': sideMenu,
    'modal-login': loginModal,
    'per-setujuan': agreed,
    'modal-daftar': registerModal,
    'nav-atas': navbars,
    'floating-action-button': fab
  },
  data () {
    return {
      getJson,

      loadingSek: true

    }
  },
  computed: {
    ...mapState(['loginState', 'admin', 'userData', 'panel'])
  },
  beforeMount () {
    if (parseInt(window.localStorage.getItem('status'))) {
      this.SET_LOGIN(true)
      this.SET_ADMIN(parseInt(window.localStorage.getItem('admin')))
      this.SET_SUPER_ADMIN(parseInt(window.localStorage.getItem('super')))
      this.SET_USER_DATA(JSON.parse(window.localStorage.getItem('user')))

      if (this.$router.currentRoute.path !== '/secret') {
        this.$buefy.toast.open('Anda sudah Login. Menuju Halaman Dashboard')
        this.$router.replace('/secret')
      }
    } else {
      this.SET_LOGIN(false)

      if (this.$router.currentRoute.path !== '/') {
        this.$buefy.toast.open('Anda belum Login. Menuju Halaman awal')
        this.$router.replace('/')
      }
    }
  },
  mounted () {
    this.getDate()
    this.loadingSek = false
    this.tanggalan()
    this.SET_ALAMAT(getJson)
  },
  methods: {
    ...mapMutations(['SET_LOGIN', 'SET_USER_DATA', 'SET_TANGGAL', 'SET_ALAMAT', 'SET_ADMIN', 'SET_SUPER_ADMIN']),
    logOut () {
      this.loadingSek = true
      this.$cookies.set('status', false)
      this.$cookies.set('data', { nama: 'Mr. X', alamatL: 'Suro karo boyo', ktp: 'nodata' })
      this.SET_LOGIN(false)
      this.SET_USER_DATA([])
      this.$router.replace('/')
      this.loadingSek = false
    },

    async getDate () {
      const fd = new FormData()
      const date = new Date()
      if (date.getDay() === 1) {
        fd.append('action', 'setCheckpoint')
        const set = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
        if (!set) {
          this.$buefy.toast.open('Cek Koneksi Anda')
        }
      }
    },

    async tanggalan () {
      const fd = new FormData()
      fd.append('action', 'getCheckpoint')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (get !== false) {
        this.SET_TANGGAL(get)
      } else {
        this.$buefy.toast.open('Cek kembali koneksi anda')
      }
    }
  }
}

</script>

<style>
.container{
padding:2%;
margin: auto;
}
.judul{
  font-family: 'Source Sans Pro', sans-serif;
  font-size: x-large;
}

.subjudul{
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

.center-image{
  display: block;
  margin: auto;
}

.isi{
    padding: 3em 0 3em;
}

.fixed-bottom{
  position:fixed;
  bottom: 0;
  z-index: 10;
}

.fixed-top{
  position:fixed;
  top: 0;
  z-index: 10;
}

.full{
  width: 100%;
  height: 100%;

}
.speeddial{
  position: fixed;
  z-index: 100;
  right: 1em;
  bottom: 1em;
}
</style>
