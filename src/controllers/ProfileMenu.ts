import connectDatabase from "@/lib/mongodb";
import { ProfileMenu, TProfileMenu } from "@/models/ProfileMenu";


export const GetProfileMenu = async (): Promise<TProfileMenu[]> => {
    let sortedMenu = ProfileMenu.sort((a, b) => {
        if(a.order == b.order){
            return a.label.localeCompare(b.label);
        }
        return a.order - b.order;
    });

    return sortedMenu;
}