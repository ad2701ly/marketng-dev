<template>
  <b-modal :active.sync="$store.state.registerModal" :on-cancel="cancelModal" full-screen has-modal-card>
    <b-loading :active.sync="prosesSek" is-full-page />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">
          <b-icon icon="grease-pencil" /><span>Formulir Pendaftaran</span>
        </p>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">
          <div v-for="regist in register" :key="regist.id" class="column" :class="regist.size">
            <b-field :label="regist.display" label-position="inside">
              <b-input v-model="regist.value" :type="regist.type" :icon="regist.icon" :placeholder="regist.name" required />
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p>Target Marketing Online atau Marketplace</p>
            <div class="columns is-multiline">
              <div v-for="sosmed in checkbox" :key="sosmed.id" class="column is-3">
                {{ sosmed.display }}
              </div>
            </div>
          </div>
          <div class="column">
            <b-field>
              <b-upload
                v-model="dropFiles"
                multiple
                type="is-info"
                drag-drop
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon
                        icon="upload"
                        size="is-large"
                      />
                    </p>
                    <p>Upload Data Diri Anda disini</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div class="tags">
              <span
                v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary"
              >
                {{ file.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                />
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons dowo">
          <b-button
            expanded
            type="is-info"
            class="is-marginless"
            icon-left="check-all"
            :loading="prosesSek"
            @click="registerNow"
          >
            Saya Setuju dan Daftarkan
          </b-button>
          <b-button expanded type="is-danger" icon-left="close" @click="SET_REGISTER_MODAL_ACTIVE(false)">
            Batalkan
          </b-button>
        </div>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      register: [
        { id: 'nama', display: 'Nama', value: '', type: 'text', icon: 'rename-box', size: 'is-3' },
        { id: 'noHP', display: 'No HP / WA', value: '', type: 'number', icon: 'cellphone-android', size: 'is-3' },
        { id: 'email', display: 'Email', value: '', type: 'text', icon: 'email', size: 'is-3' },
        { id: 'noKTP', display: 'No Identitas', value: '', type: 'number', icon: 'id-card', size: 'is-3' },
        { id: 'alamatL', display: 'Alamat KTP', value: '', type: 'textarea', icon: '', size: 'is-6' },
        { id: 'alamatD', display: 'Alamat Domisili', value: '', type: 'textarea', icon: '', size: 'is-6' },
        { id: 'bank', display: 'Nama Bank', value: '', type: 'text', icon: 'bank', size: 'is-4' },
        { id: 'pemegang', display: 'Nama Pemegang', value: '', type: 'text', icon: 'account', size: 'is-4' },
        { id: 'noRek', display: 'Nomer Rekening', value: '', type: 'text', icon: 'credit-card', size: 'is-4' }

      ],
      checkbox: [
        { id: 'facebook', display: 'Facebook' },
        { id: 'twiter', display: 'Twitter' },
        { id: 'shopee', display: 'Shopee' },
        { id: 'bukalapak', display: 'Bukalapak' },
        { id: 'instagram', display: 'Instagram' },
        { id: 'blibli', display: 'Blibli' },
        { id: 'olx', display: 'OLX' },
        { id: 'lazada', display: 'Lazada' },
        { id: 'tokopedia', display: 'Tokopedia' },
        { id: 'dll', display: 'Dan Lain Lain' }
      ],
      dropFiles: [],
      prosesSek: false
    }
  },
  methods: {
    ...mapMutations(['SET_REGISTER_MODAL_ACTIVE']),
    cancelModal () {
      this.SET_REGISTER_MODAL_ACTIVE(false)
    },
    async registerNow () {
      this.prosesSek = true
      const fd = new FormData()

      fd.append('action', 'register')
      fd.append('data', JSON.stringify(this.register))
      fd.append('sosmed', JSON.stringify(this.sosmed))
      if (this.dropFiles[0] === undefined) {
        this.$buefy.toast.open('Dimohon Untuk menyertakan foto KTP')
      } else {
        fd.append('ktp', this.dropFiles[0], this.dropFiles[0].name)

        const upload = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
        if (upload.status === 1) {
          // this.$buefy.toast.open('Data Telah Terinput')
          this.SET_REGISTER_MODAL_ACTIVE(false)
          this.$buefy.dialog.alert({
            title: 'Data Login anda',
            message: 'User Anda :' + upload.username + ', <br> Password Anda :' + upload.password + ' <br> <b>Gunakan Info ini untuk Login<b>',
            confirmText: 'Saya Mengerti'
          })
        } else {
          this.$buefy.toast.open('Data belum terinput, Mohon Ulangi lagi')
        }
      }
      this.prosesSek = false
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.dowo{
  width: 100%;
}

</style>
