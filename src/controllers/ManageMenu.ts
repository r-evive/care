import connectDatabase from "@/lib/mongodb";
import { ManageMenu, TManageMenu } from "@/models/ManageMenu";


export const GetManageMenu = async (): Promise<TManageMenu[]> => {
    let sortedMenu = ManageMenu.sort((a, b) => {
        if(a.order == b.order){
            return a.label.localeCompare(b.label);
        }
        return a.order - b.order;
    });

    return sortedMenu;
}