import { TPermissions, TRole } from "@/types/Permission";


export const Roles: TRole[] = [
    {
        name: 'user',
        label: 'Użytkownik',
        permissions: {
            'user': true,
            'admin': false,
        }
    },
    {
        name: 'admin',
        label: 'Administrator',
        permissions: {
            'user': true,
            'admin': true,
        }
    },
]


