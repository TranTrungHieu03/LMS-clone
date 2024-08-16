import React, {FC} from 'react';
import Image from "next/image";
import avatarDefault from "@/public/avatar.png"

type Props = {
    user: any,
    active: number
    setActive: (value: number) => void
    avatar: string | null
    logOutHandler: any
}
const SideBarProfile: FC<Props> = ({user, active, setActive, avatar, logOutHandler}) => {
    return (
        <div className={"w-full"}>
            <div className={"w-full flex items-center px-3 py-4 cursor-pointer" +
                `${active === 1 ? "dark:bg-slate-900 bg-white" : "bg-transparent"}`}
                 onClick={() => setActive(1)}
            >
                <Image src={user.avatar || avatar ? user.avatar || avatar : avatarDefault} alt={""}
                       className={"w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"}/>
                <h5 className={" pl-2 800px:block hidden text-black dark:text-white"}>My Account</h5>
            </div>
        
        </div>
    );
};

export default SideBarProfile;