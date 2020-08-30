<template>
  <div>
    <b-modal :active.sync="$store.state.loginModal" has-modal-card :on-cancel="close" @keydown.enter="lof('a')">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-capitalized has-text-centered">
            Masuk Untuk melanjutkan
          </p>
        </header>
        <section class="modal-card-body">
          <b-field label="User" label-position="inside">
            <b-input v-model="login.user" type="text" icon="account" placeholder="Masukkan ID Number" />
          </b-field>
          <div class="columns">
            <div v-show="!showPassword" class="column">
              <b-field label="Password" label-position="inside">
                <b-input
                  v-model="real"
                  type="password"
                  icon="account-key"
                  placeholder="Masukkan Password"
                  icon-right="cog"
                  icon-right-clickable
                  @icon-right-click="show(true)"
                />
              </b-field>
            </div><div v-show="showPassword" class="column">
              <b-field label="Password" label-position="inside">
                <b-input
                  v-model="real"
                  type="text"
                  icon="account-key"
                  placeholder="Masukkan Password"
                  icon-right="cog-off"
                  icon-right-clickable
                  @icon-right-click="show(false)"
                />
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button icon-left="login" type="is-info" expanded :loading="loadingState" @click="loginNow">
            Login
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      showPassword: false,
      loadingState: false,
      login: {
        user: '',
        pass: ''
      },
      real: ''
    }
  },
  mounted () {
    this.login.user = window.localStorage.getItem('userData')
    this.real = atob(window.localStorage.getItem('pass'))
  },
  methods: {
    ...mapMutations(['SET_LOGIN_MODAL_ACTIVE', 'SET_LOGIN', 'SET_USER_DATA', 'SET_ADMIN', 'SET_SUPER_ADMIN']),
    close () {
      this.SET_LOGIN_MODAL_ACTIVE(false)
    },
    show (x) {
      this.showPassword = x
    },
    async loginNow () {
      this.loadingState = true
      const fd = new FormData()
      this.login.pass = btoa(this.real)
      fd.append('action', 'tryLogin')
      fd.append('data', JSON.stringify(this.login))
      if (this.login.user !== '' && this.login.pass !== '') {
        try {
          const tryLogin = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
          if (tryLogin !== '') {
            this.SET_USER_DATA(tryLogin)
            window.localStorage.setItem('status', 1)
            window.localStorage.setItem('user', JSON.stringify(tryLogin))
            window.localStorage.setItem('userData', this.login.user)
            window.localStorage.setItem('pass', this.login.pass)
            if (tryLogin.role === 'admin') {
              this.SET_ADMIN(true)
              window.localStorage.setItem('admin', 1)
            } else if (tryLogin.role === 'super') {
              this.SET_ADMIN(true)
              this.SET_SUPER_ADMIN(true)
              window.localStorage.setItem('admin', 1)
              window.localStorage.setItem('super', 1)
            } else {
              this.SET_ADMIN(false)
              this.SET_SUPER_ADMIN(false)

              window.localStorage.setItem('admin', 0)
              window.localStorage.setItem('super', 0)
            }
            this.SET_LOGIN_MODAL_ACTIVE(false)
            this.SET_LOGIN(true)
            this.$router.replace('/secret')
          } else {
            this.$buefy.toast.open('Mohon Ulangi pengisian data')
          }
        } catch (error) {
          this.$buefy.snackbar.open('Mohon Ulangi dengan data yang sesuai')
        }
        this.loadingState = false
      } else {
        this.loadingState = false

        this.$buefy.snackbar.open({
          type: 'is-danger',
          message: 'Mohon Lengkapi Form bawah ini',
          position: 'is-top',
          duration: 5000
        })
      }
    }
  }
}
</script>

<style>

</style>
