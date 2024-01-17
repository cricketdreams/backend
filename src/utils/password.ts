import crypto from 'crypto'

export async function encryptData(data: string): Promise<string> {
  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32)
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encryptedData = cipher.update(data, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  return iv.toString('hex') + encryptedData
}

async function decryptData(encryptedData: string): Promise<string> {
  const algorithm = 'aes-256-cbc'
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32)
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex')

  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decryptedData = decipher.update(encryptedData.slice(32), 'hex', 'utf-8')
  decryptedData += decipher.final('utf-8')

  return decryptedData
}

export const compareData = async (
  data: string,
  encryptData: string
) => {
  const decryptedPassword = await decryptData(encryptData)
  return data === decryptedPassword
}
