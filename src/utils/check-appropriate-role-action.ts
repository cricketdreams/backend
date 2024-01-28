import { AUTHORIZED_ROLES, type Roles } from '../ts/type'

export const checkAppropriateRoleAction = ({
  parentType,
  childType
}: {
  parentType: Roles
  childType: Roles
}) => {
  return AUTHORIZED_ROLES[parentType].includes(childType)
}
