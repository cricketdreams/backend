import z from 'zod'

export const updateAgentValidator = z.object({
  agentCode: z.string().min(8, { message: 'Agent code is required' }),
  newName: z.string().min(3, { message: 'New name is required' }),
  newReference: z.string(),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
  newMobile: z.string().min(10, {
    message: 'Mobile number should be 10 digits long'
  }),
  flatShare: z.boolean(),
  casinoPlay: z.boolean(),
  newMatchCommission: z.number(),
  newSessionCommission: z.number(),
  newCasinoCommission: z.number()
})

export const updateMasterValidator = z.object({
  masterCode: z.string().min(8, { message: 'Master code is required' }),
  newName: z.string().min(3, { message: 'New name is required' }),
  newReference: z.string(),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
  newMobile: z.string().min(10, {
    message: 'Mobile number should be 10 digits long'
  }),
  flatShare: z.boolean(),
  casinoPlay: z.boolean(),
  masterShare: z.number(),
  masterCasinoShare: z.number(),
  masterMobileShare: z.number(),
  newMatchCommission: z.number(),
  newSessionCommission: z.number(),
  newCasinoCommission: z.number()
})

export const updateSubadminValidator = z.object({
  subadminCode: z.string().min(8, { message: 'Subadmin code is required' }),
  newName: z.string().min(3, { message: 'New name is required' }),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
  newMobile: z.string().min(10, {
    message: 'Mobile number should be 10 digits long'
  }),
  flatShare: z.boolean(),
  casinoPlay: z.boolean(),
  subadminShare: z.number(),
  subadminCasinoShare: z.number(),
  subadminMobileShare: z.number(),
  newMatchCommission: z.number(),
  newSessionCommission: z.number(),
  newCasinoCommission: z.number()
})

export const updateSuperagentValidator = z.object({
  superagentCode: z.string().min(8, { message: 'Superagent code is required' }),
  newName: z.string().min(3, { message: 'New name is required' }),
  newReference: z.string(),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
  newMobile: z.string().min(10, {
    message: 'Mobile number should be 10 digits long'
  }),
  flatShare: z.boolean(),
  casinoPlay: z.boolean(),
  superagentShare: z.number(),
  superagentCasinoShare: z.number(),
  newMatchCommission: z.number(),
  newSessionCommission: z.number(),
  newCasinoCommission: z.number()
})

export const updateClientValidator = z.object({
  clientCode: z.string().min(8, { message: 'Client code is required' }),
  newName: z.string().min(3, { message: 'New name is required' }),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters long' }),
  newMobile: z.string().min(10, {
    message: 'Mobile number should be 10 digits long'
  }),
  casinoPlay: z.boolean(),
  newMatchCommission: z.number(),
  newSessionCommission: z.number(),
  newMobileCommission: z.number(),
  newCasinoCommission: z.number()
})
