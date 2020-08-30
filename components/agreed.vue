<template>
  <b-modal :active.sync="$store.state.modalPersetujuan" :on-cancel="cancelModal" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-info is-4 has-text-centered is-uppercase">
          <b-icon icon="grease-pencil" /> <span>
            Smart People Millktawa</span>
        </p>
      </header>
      <section class="modal-card-body">
        Isi Smart People
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
