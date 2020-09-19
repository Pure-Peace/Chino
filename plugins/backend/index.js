import resources from './resources'

export default ({ $axios }, inject) => {
  inject('backend', resources($axios))
}
