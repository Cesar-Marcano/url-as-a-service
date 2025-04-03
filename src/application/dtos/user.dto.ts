export interface UserDTO {
    id: number
    username: string | null
    email: string
    createdAt: Date
    updatedAt: Date
    userType: string
    isEmailConfirmed: boolean
    is2FAEnabled: boolean
}
