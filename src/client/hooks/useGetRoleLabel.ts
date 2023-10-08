import { Roles } from "@/models/Permissions"

export const useGetRoleLabel = (roleName: string | undefined):string => {
    if(!roleName)
        roleName = 'user';
    return Roles.find((role) => role.name === roleName)?.label || 'Użytkownik';
}