"use client"
import React, {FC, useState} from 'react';
import SideBarProfile from "@/app/components/Profile/SideBarProfile";
import {useLogoutQuery} from "@/redux/features/auth/authApi";
import {signOut} from "next-auth/react";
import ProfileInfo from "@/app/components/Profile/ProfileInfo";
import ChangePassword from "@/app/components/Profile/ChangePassword";

interface ProfileProps {
    user: any
}

const Profile: FC<ProfileProps> = ({user}) => {
    const [scroll, setScroll] = useState(false)
    const [active, setActive] = useState(1)
    const [avatar, setAvatar] = useState(null)
    const [logout, setLogout] = useState(false)
    const {} = useLogoutQuery(
        undefined, {
            skip: !logout
        }
    )
    const logOutHandler = async () => {
        setLogout(true)
        await signOut()
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
                className={"w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] border-[#000] rounded-[5px] shadow-sm mt-[80px] sticky" +
                    `${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>
                <SideBarProfile user={user} active={active} setActive={setActive} avatar={avatar}
                                logOutHandler={logOutHandler}/>
            
            </div>
            {
                active === 1 &&
                (
                    <div className={"w-full h-full bg-transparent mt-[80px]"}>
                        <ProfileInfo user={user} avatar={avatar}/>
                    </div>
                )
            }
            {
                active === 2 &&
                (
                    <div className={"w-full h-full bg-transparent mt-[80px]"}>
                        <ChangePassword/>
                    </div>
                )
            }
        </div>
    );
};

export default Profile;