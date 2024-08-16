"use client"
import React, {FC, useState} from 'react';
import SideBarProfile from "@/app/components/Profile/SideBarProfile";

interface ProfileProps {
    user: any
}

const Profile: FC<ProfileProps> = ({user}) => {
    const [scroll, setScroll] = useState(false)
    const [active, setActive] = useState(1)
    const [avatar, setAvatar] = useState(null)
    
    const logOutHandler = async () => {
    
    }
    
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        });
    }
    return (
        <div className={"w-[85%] flex mx-auto"}>
            <div
                className={"w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border border-[#ffff1d] rounded-[5px] shadow-sm mt-[80px] sticky" +
                    `${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
                <SideBarProfile user={user} active={active} setActive={setActive} avatar={avatar}
                                logOutHandler={logOutHandler}/>
            </div>
        </div>
    );
};

export default Profile;