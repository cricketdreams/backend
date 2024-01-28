import { CONST } from '../config'

export function generatePassword(): string {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'

  let password = ''

  for (let i = 0; i < CONST.maxAlphabets; i++) {
    const randomIndex = Math.floor(Math.random() * alphabets.length)
    password += alphabets.charAt(randomIndex)
  }

  for (let i = 0; i < CONST.passwordLendth - CONST.maxAlphabets; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    password += numbers.charAt(randomIndex)
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')

  return password
}
