import { Notify } from 'quasar'

Notify.setDefaults({
  type: 'positive',
  timeout: 1500,
  textColor: 'white',
  position: 'top',
  actions: [{ icon: 'close', color: 'white', dense: 'dense' }]
})
