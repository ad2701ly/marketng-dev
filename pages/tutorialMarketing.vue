<template>
  <div>
    <div class="has-text-centered">
      <b-icon icon="help-box" /><span class="judul is-uppercase">Tutorial Bagi Pemula</span>
    </div>
    <hr>
    <b-button outlined expanded type="is-info" icon-left="help-circle-outline" @click="open('start')">
      Tampilan Awal
    </b-button>

    <b-modal :active.sync="tutorialOn" has-modal-card :on-cancel="batal">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Tutorial {{ selectedTutorial.judul }}
          </p>
        </header>
        <section class="modal-card-body">
          <div class="columns is-mobile">
            <div class="column is-2">
              <b-button
                v-show="halaman!==0"
                class="depan"
                size="is-small"
                type="is-info"
                outlined
                icon-left="chevron-left"
                @click="prev"
              />
            </div>
            <div class="column is-8 container">
              <div v-show="selectedTutorial.isi[halaman].gambar===''" transition="fade">
                <p class="is-size-4 is-capitalized has-text-centered">
                  {{ selectedTutorial.isi[halaman].content }}
                </p>
              </div>
              <div v-show="selectedTutorial.isi[halaman].gambar!==''" transition="fade">
                <figure class="image display">
                  <img :src="selectedTutorial.isi[halaman].gambar" alt="">
                </figure>
                <p>{{ selectedTutorial.isi[halaman].content }}</p>
              </div>
            </div>
            <div class="column is-2">
              <b-button
                v-show="halaman!==(totalHalaman-1)"
                type="is-info"
                class="depan"
                size="is-small"
                outlined
                icon-left="chevron-right"
                @click="next"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-info" expanded icon-left="check" @click="batal">
            Saya Mengerti
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
      // Pagination
      halaman: 0,
      totalHalaman: 0,
      tutorialOn: false,
      selectedTutorial: { isi: [{ content: '', gambar: '' }] },
      tampilanAwal: {
        judul: 'Halaman Awal',
        isi: [
          { gambar: '', content: 'Tutorial mengenai Pengenalan Halaman dan Menu beserta fungsinya' },
          { gambar: 'tutorial/1/1.png', content: 'Tampilan Utama Setelah Anda Login, Terdapat foto data diri, Nama dan Alamat, Informasi Harga, Informasi Promo, Pada Bagian atas terdapat tombol menu yang menampilkan apa saja yang bisa anda lakukan di aplikasi ini' },
          { gambar: 'tutorial/1/2.png', content: 'Tampilan ini merupakan tampilan saat anda klik tombol menu, muncul beberapa menu pilihan, Slide berikutnya menjelaskan tiap tiap menu' }
        ]
      }
    }
  },
  methods: {
    batal () {
      this.tutorialOn = false
      this.halaman = 0
    },
    open (c) {
      this.tutorialOn = true
      switch (c) {
        case 'start':
          this.selectedTutorial = this.tampilanAwal
          break
      }

      this.totalHalaman = this.selectedTutorial.isi.length
    },
    prev () {
      this.halaman -= 1
    },
    next () {
      this.halaman += 1
    }
  }

}
</script>

<style>
.display{
    width: 90%;
    margin: auto;
},
.depan{
  position: fixed;
  top: 50%;
  z-index: 100;
}
</style>
