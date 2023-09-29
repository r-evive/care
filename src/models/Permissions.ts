import { TPermissions, TRole } from "@/types/Permission";

export const UserRole:TRole = {
    name: 'user',
    permissions: {
        'user': true,
        'admin': false,
    }
}

export const AdminRole:TRole = {
    name: 'admin',
    permissions: {
        'user': true,
        'admin': true,
    }
}


