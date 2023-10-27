export interface TeamMember {
    name: string
    roles: RoleArray
    url: string
}

export type OwnerArray = TeamMember[]

export type Role = typeof roles[keyof typeof roles]

export type RoleArray = Role[]

const roles = {
    owner: 'Owner',
    backEnd: 'Back-end team',
    frontEnd: 'Front-end team',
} as const