<template>
  <div class="front">
    <p class="shadowed is-size-2 has-text-centered is-uppercase">
      Mitra CV. KIM
    </p>
    <br>
    <p class="direction has-text-centered is-size-4 is-capitalized">
      "Peluang untuk menjadi pengusaha tanpa harus keluar rumah. Usaha anda ada di genggaman anda"
    </p>
    <br>
    <p class="drawing has-text-centered is-size-3">
      Mahasiswa / Mahasiswi Maupun Wirausaha
    </p>
    <br>
    <p class="drawing has-text-centered is-size-3">
      Saatnya anda hidup mandiri dengan penghasilan sendiri
    </p>
    <b-button class="is-center unique" @click="modalOn">
      DAFTAR SEKARANG
    </b-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: '',
  methods: {
    ...mapMutations(['SET_AGREED_MODAL_ACTIVE']),
    modalOn () {
      this.SET_AGREED_MODAL_ACTIVE(true)
    }
  }
}
</script>

<style scoped>
.direction{
  padding:2%;
  margin: 2%;
  font-family: 'Montserrat', sans-serif;
  color: rgb(255, 255, 255);
  border-style: dashed;
  border-width: 3px;
  transition: 0.5s;
}
.is-margin-9{
  margin: 2%;
}
.drawing{
  font-family: 'Titillium Web', sans-serif;
}
.front{
  background-image: url('/back.jpg');
   background-size: cover;
   width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
  padding: 1% 0px;
}
.shadowed{
  text-shadow: 2px 2px white
}
.kuning{
  font-family: 'Zilla Slab', serif;
  color: greenyellow;
  margin-top: 1%;
  padding-top: 2%;
}
.unique {
  transform: scale(1.5,1.5);
  background-color: #004A7F;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
   display: block;
  margin: 5% auto 5%;
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
}
@-webkit-keyframes glowing {
  0% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
  50% { background-color: #FF0000; -webkit-box-shadow: 0 0 40px #FF0000; }
  100% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
}

@-moz-keyframes glowing {
  0% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
  50% { background-color: #FF0000; -moz-box-shadow: 0 0 40px #FF0000; }
  100% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
}

@-o-keyframes glowing {
  0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
  100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
}

@keyframes glowing {
  0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
  100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
}
</style>
