export default function ({ store }) {
  store.dispatch('users/loadAll')
}
