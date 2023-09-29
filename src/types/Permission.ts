export type TPermissions = {
    [key: string]: boolean;
}

export type TRole = {
    name: string;
    permissions: TPermissions;
}