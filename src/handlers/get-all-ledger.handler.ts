import { User } from '../ts/interfaces'
import { Roles } from '../ts/type'
import { getAllUsersHandler } from './user/get-all-users.handler'

export const getAllLedgerHandler = async (
  code: string,
  requestedUsersRole: Roles
) => {
  const allUser = await getAllUsersHandler(code, requestedUsersRole)
  console.log(allUser[requestedUsersRole])
}
