import React, {useState} from 'react';
import {ThemeSwitcher} from "@/app/utils/ThemeSwitcher";
import {IoMdNotificationsOutline} from "react-icons/io";

const DashboardHeader = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className={"w-full flex items-center justify-end p-6 fixed top-5 right-0"}>
            <ThemeSwitcher/>
            <div className={"relative cursor-pointer m-2 "}
                 onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline
                    className={"text-2xl cursor-pointer dark:text-white text-black"}></IoMdNotificationsOutline>
                <span
                    className={"absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-sm flex items-center justify-center text-white"}>3</span>
            </div>
            {
                open && (
                    <div className={"w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded"}>
                        
                        <h5 className={"text-center text-md text-black dark:text-white"}>
                            Notifications
                        </h5>
                        <div
                            className={"dark:bg-[#2d3e4ae] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"}>
                            <div className={"w-full flex items-center justify-between p-2"}>
                                <p className={"text-black dark:text-white"}>
                                    New Question Received
                                </p>
                                <p className={"text-black dark:text-white cursor-pointer"}>Mark as read</p>
                            </div>
                            <p className={"px-2 text-black dark:text-white"}>
                                Lorem ispum, dolor set a met consectur ejht dehetr kdj. beauty as a service on the ground
                            </p>
                            <p className={"p-2 text-black dark:text-white text-xs"}>5 days ago</p>
                        </div>
                        <div
                            className={"dark:bg-[#2d3e4ae] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"}>
                            <div className={"w-full flex items-center justify-between p-2"}>
                                <p className={"text-black dark:text-white"}>
                                    New Question Received
                                </p>
                                <p className={"text-black dark:text-white cursor-pointer"}>Mark as read</p>
                            </div>
                            <p className={"px-2 text-black dark:text-white"}>
                                Lorem ispum, dolor set a met consectur ejht dehetr kdj. beauty as a service on the ground
                            </p>
                            <p className={"p-2 text-black dark:text-white text-xs"}>5 days ago</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DashboardHeader;