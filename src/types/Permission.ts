export type TPermissions = {
    [key: string]: boolean;
}

export type TRole = {
    name: string;
    label: string;
    permissions: TPermissions;
}