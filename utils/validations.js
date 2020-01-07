const required = (propertyType) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v.length > 0 || `You must input a ${propertyType}`
}
const minLength = (propertyType, minLength) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}
const maxLength = (propertyType, maxLength) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

const emailFormat = () => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  // eslint-disable-next-line no-mixed-operators
  return v => v && regex.test(v) || 'Must be a valid email'
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat
}
