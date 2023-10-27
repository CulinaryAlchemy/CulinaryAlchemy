import type { OwnerArray } from "@/models"

interface globalConfig {
    team: OwnerArray
}

export const globalConfig: globalConfig = {
    team: [
        {
            name: 'Jes015',
            url: 'https://portfolio-three-chi-27.vercel.app/',
            roles: ['Owner', 'Front-end team']
        },
        {
            name: 'Huilen Solis',
            url: 'https://huilensolis-v2.vercel.app/',
            roles: ['Owner','Back-end team']
        }
    ]
}