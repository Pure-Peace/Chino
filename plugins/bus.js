import Vue from 'vue'

// global bus
export default (context, inject) => {
  inject('bus', new Vue({
    data () {
      return {
      }
    }
  }))
}
