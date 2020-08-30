<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="account-group" /><span class="judul is-uppercase">Data Marketing</span>
    </div>

    <b-table :data="marketings">
      <template slot-scope="karya">
        <b-table-column field="nama" label="Nama">
          {{ karya.row.nama }}
        </b-table-column>
        <b-table-column field="alamatD" label="Domisili">
          {{ karya.row.alamatD }}
        </b-table-column>
        <b-table-column field="alamatL" label="Alamat KTP">
          {{ karya.row.alamatL }}
        </b-table-column>
        <b-table-column field="npHP" label="No. HP">
          {{ karya.row.noHP }}
        </b-table-column><b-table-column field="email" label="Email">
          {{ karya.row.email }}
        </b-table-column>
        </b-table-column><b-table-column field="ktp" label="Action">
          <b-button
            icon-left="account-details"
            type="is-info"
            expanded
            outlined
            @click="detailed(karya.index)"
          >
            Lihat Identitas
          </b-button>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active.sync="openModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-capitalized">
            Detail Profile {{ detailedMarketing.nama }}
          </p>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-2">
              <figure class="image">
                <img :src="detailedMarketing.ktp" alt="">
              </figure>
            </div>
            <div class="column">
              <div v-for="(detail,key) in detailedMarketing" :key="key">
                {{ key }} : {{ detail }}
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-info" expanded icon-left="check" @click="openModal=false">
            OK
          </b-button>
          <b-button type="is-danger" icon-left="delete" expanded @click="hapusMarketing">
            Hapus Akun
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openModal: false,
      marketings: [{ nama: 'Mr.X' }],
      detailedMarketing: ''
    }
  },
  mounted () {
    this.getListMarketing()
  },
  methods: {
    async getListMarketing () {
      const fd = new FormData()
      fd.append('action', 'getMarketing')
      const get = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      this.marketings = get
    },
    detailed (x) {
      this.openModal = true
      this.detailedMarketing = this.marketings[x]
    },
    async hapusMarketing () {
      const fd = new FormData()
      fd.append('action', 'hapusMarketing')
      fd.append('id', this.detailedMarketing.id)

      const busek = await this.$axios.$post(this.$store.state.host + 'marketing.php', fd)
      if (busek) {
        this.$buefy.toast.open('Data Marketing Telah diHapus')
        this.getListMarketing()
        this.openModal = false
      } else {
        this.$buefy.toast.open('Gagal Hapus, Mohon Ulangi')
      }
    }
  }
}
</script>

<style>

</style>
