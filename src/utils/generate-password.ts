import { CONST } from '../constants'

export function generatePassword(): string {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'

  let password = ''

  for (let i = 0; i < CONST.maxAlphabets; i++) {
    const randomIndex = Math.floor(Math.random() * alphabets.length)
    password += alphabets.charAt(randomIndex)
  }

  for (let i = 0; i < CONST.passwordLength - CONST.maxAlphabets; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    password += numbers.charAt(randomIndex)
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')

  return process.env.NODE_ENV === 'development' ? '12345678' : password
}
