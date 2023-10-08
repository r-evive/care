import { TPermissions, TRole } from "@/types/Permission";


export const Roles: TRole[] = [
    {
        name: 'user',
        permissions: {
            'user': true,
            'admin': false,
        }
    },
    {
        name: 'admin',
        permissions: {
            'user': true,
            'admin': true,
        }
    }
]


