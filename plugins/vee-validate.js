import { extend } from 'vee-validate'
import { required, alpha, max, min, alpha_num as alphanum, numeric, digits, email, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Debe rellenar este campo'
})
extend('confirmed', {
  ...confirmed,
  message: 'las contraseñas deben coincidir'
})

extend('alpha', {
  ...alpha,
  message: 'Solo debe contener letras'
})

extend('min', {
  ...min,
  params: ['length'],
  message: 'Debe tener mas de {length} caracteres'
})
extend('max', {
  ...max,
  params: ['length'],
  message: 'no puede exceder el máximo máximo de {length} caracteres'
})
extend('alpha_num', {
  ...alphanum,
  message: 'solo puede contener letras y números'
})
extend('numeric', {
  ...numeric,
  message: 'solo puede contener números'
})
extend('digits', {
  ...digits,
  params: ['length'],
  message: 'debe tener {length} dígitos'
})
extend('email', {
  ...email,
  message: 'debe ser un correo válido'
})
extend('maxphone', {
  ...max,
  params: ['length'],
  message: 'si es un móvil debe tener {length} dígitos'
})
extend('minphone', {
  ...min,
  params: ['length'],
  message: 'si es un teléfono fijo debe tener {length} dígitos'
})
extend('diferente', {
  validate (value) {
    if (value.length === 7) {
      return false
    } else { return true }
  },
  message: 'no puede tener 7 dígitos'
})
extend('ci', {
  validate (value) {
    if (value.length === 11) {
      return true
    } else { return false }
  },
  message: 'el ci debe tener 12 dígitos'
})
