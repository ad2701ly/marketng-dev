<template>
  <div class="navbar-gawean">
    <div v-if="!($store.state.loginState)">
      <b-button size="is-medium" type="is-info" icon-left="login" class="isine gawean" @click="SET_LOGIN_MODAL_ACTIVE(true)">
        Login
      </b-button>
      <b-button size="is-medium" type="is-info" icon-left="lead-pencil" class="isine gawean" @click="SET_AGREED_MODAL_ACTIVE(true)">
        Register
      </b-button>
    </div>
    <div v-else>
      <b-button
        size="is-medium"
        type="is-info"
        icon-left="menu-open"
        class="gawean"
        expanded
        @click="SET_PANEL(true)"
      >
        Menu
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Navbars',
  data () {
    return {
      malesan: false
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN_MODAL_ACTIVE', 'SET_AGREED_MODAL_ACTIVE', 'SET_PANEL'])
  }
}
</script>

<style scoped>

  .navbar-gawean{
    padding: 0.4em 0 0.4em;
  }

.navbar-gawean{
  background-color: #167df0;
  margin: auto;
  display: inline-block;
  width: 100%;
}
.isine{
  margin: auto;
  display: inline-block;
  width: 49%;
}
</style>
