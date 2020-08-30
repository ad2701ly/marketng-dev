<template>
  <b-modal :active.sync="$store.state.registerModal" :on-cancel="cancelModal" full-screen has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">
          <b-icon icon="grease-pencil" /><span>Formulir Pendaftaran</span>
        </p>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">
  
            <b-field label="No. Identitas" label-position="inside">
              <b-input v-model="daftar.nik" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="Nama Akun" label-position="inside">
              <b-input v-model="daftar.akun" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="Nama Lengkap" label-position="inside">
              <b-input v-model="daftar.nama" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="No HP" label-position="inside">
              <b-input v-model="daftar.hp" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="Email" label-position="inside">
              <b-input v-model="daftar.email" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="Password" label-position="inside">
              <b-input v-model="daftar.pass" type="" icon="" placeholder="" required />
            </b-field>
            <b-field label="Kecamatan Anda" label-position="on-border">
              <b-autocomplete v-model="cariKec" :data="dataObj" field="subdistrict_name" max-height="100px" @select="option => kota = option">
                <template slot-scope="jas">
                  <p>{{ jas.option.subdistrict_name }}, {{ jas.option.type }} {{ jas.option.city }}</p>
                </template>
                <template slot="empty">
                  <p>Pastikan Minimal 3 Karakter dan nama kecamatan Valid</p>
                  <p>Tidak Menemukan Hasil dari {{cariKec}}</p>
                </template>
              </b-autocomplete>
            </b-field> 
            <b-field label="Alamat" label-position="inside">
              <b-input v-model="daftar.alamat" type="textarea" icon="" placeholder="" required />
            </b-field>
        
        </div>    
      </section>
      <footer class="modal-card-foot">
        <div class="buttons dowo">
          <b-button
            expanded
            type="is-info"
            class="is-marginless"
            icon-left="check-all"
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
      daftar:{},
      cariKec:'',
      kota:{}

    }
  },
  computed:{
    dataObj () {
      if (this.cariKec.length>=3) {
        return this.$store.state.getJson.filter((x)=>{
          return x.subdistrict_name.toLowerCase().includes(this.cariKec.toLowerCase())
        })
      }
    }
  },
  methods: {
    ...mapMutations(['SET_REGISTER_MODAL_ACTIVE','SET_LOADING']),
    cancelModal () {
      this.SET_REGISTER_MODAL_ACTIVE(false)
    },
    async registerNow () {
      this.SET_LOADING(true)
      const fd = new FormData()
      fd.set('data', JSON.stringify(this.register))
      fd.set('gabung',new Date().getTime())
      try {
      const upload = await this.$axios.$post(this.$store.state.host + 'daftarPengguna.php', fd)   
      } catch (error) {
        
      }
     

  
        this.SET_LOADING(false)
    }
  }
}
</script>

<style scoped>
.dowo{
  width: 100%;
}

</style>
