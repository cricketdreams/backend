import { Roles, USER_CODE } from '../ts/type'

export const getUserType = (userCode: string): Roles => {
  const userInitial = userCode.slice(0, 2)
  const userType = USER_CODE[userInitial as keyof typeof USER_CODE]
  return userType
}
