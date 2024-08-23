import React, {FC, useEffect, useState} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import Link from "next/link";
import {useSelector} from "react-redux";
import {useTheme} from "next-themes";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import avatarDefault from "@/public/avatar.png"
import Image from "next/image";
import "react-pro-sidebar/dist/css/styles.css"
import {
    HomeOutlinedIcon,
    ArrowBackIosIcon,
    ArrowForwardIosIcon,
    PeopleOutlinedIcon,
    ReceiptOutlinedIcon,
    BarCharOutlinedIcon,
    MapOutlinedIcon,
    GroupsIcon,
    OndemandVideoIcon,
    VideoCallIcon,
    WebIcon,
    QuizIcon,
    WysiwygIcon,
    SettingsIcon,
    ManageHistoryIcon,
    ExitToAppIcon
} from "@/app/components/Admin/Icon";

interface ItemProps {
    title: string,
    to: string
    icon: JSX.Element
    selected: string
    setSelected: any
}

const Item: FC<ItemProps> = ({title, to, icon, selected, setSelected}) => {
    return (
        <MenuItem
            active={selected === title}
            icon={icon}
            className={"text-black dark:text-[#e0e0e0] !!font-Nunito"}
            onClick={() => setSelected(title)}
        >
            <Typography className={"!text-sm"}>{title}</Typography>
            <Link href={to}></Link>
        </MenuItem>
    )
}
const AdminSidebar = () => {
    const {user} = useSelector((state: any) => state.auth)
    const [logout, setLogout] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    const [mounted, setMounted] = useState<boolean>(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => setMounted(true), [])
    if (!mounted) {
        return null
    }
    
    const logoutHandler = () => {
        setLogout(true)
    }
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${
                        theme === "dark" ? "#1F2A40 !important" : "#fff !important"
                    }`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                },
                "& .pro-inner-item": {
                    padding: "3px 15px 3px 10px !important",
                    opacity: 1
                },
                "& .pro-menu-item": {
                    color: `${theme === "dark" && "#e0e0e0"}`
                }
            }}
            className={"!bg-white dark:bg-[#e0e0e0] !font-Nunito text-black dark:text-white"}
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: isCollapsed ? "0%" : "16%"
                }}
            >
                <Menu iconShape={"square"}>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon/> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: "#e0e0e0"
                        }}
                    >
                        {
                            !isCollapsed && (
                                <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    ml={"15px"}
                                >
                                    <Link href={"/"}>
                                        <h3 className={"text-2xl uppercase text-black dark:text-white !!font-Nunito"}>
                                            ELearning
                                        </h3>
                                    </Link>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className={"inline-block"}>
                                        <ArrowBackIosIcon className={"text-black dark:text-[#e0e0e0]"}/>
                                    </IconButton>
                                </Box>
                            )}
                    </MenuItem>
                    {
                        !isCollapsed && (
                            <Box mb={"20px"}>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Image
                                        alt={"profile-user"}
                                        width={70}
                                        height={70}
                                        src={user.avatar ? user.avatar.url : avatarDefault}
                                        className={"cursor-pointer !rounded-full !font-Nunito "}
                                        style={{
                                            cursor: "pointer",
                                            border: "3px solid #5b6fe6"
                                        }}
                                    />
                                </Box>
                                <Box textAlign={"center"}>
                                    <Typography
                                        variant={"h4"}
                                        className={"!text-sm text-back dark:text-[#e0e0e0] !font-Nunito"}
                                        sx={{m: "10px 0 0 0"}}>
                                        {user?.name}
                                    </Typography>
                                    <Typography
                                        variant={"h6"}
                                        sx={{m: "10px 0 0 0"}}
                                        className={"!text-sm text-black dark:text-[#4cceac] capitalize"}
                                    >
                                       - {user?.role}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                    
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title={"Dashboard"} to={"/admin"} icon={<HomeOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Typography variant={"h5"} sx={{m: "10px 0 5px 20px"}}
                                    className={"!text-sm text-black dark:text-[#e0e0e0] capitalize !font-[400]"}>
                            {!isCollapsed && "Data"}
                        </Typography>
                        <Item title={"Users"} to={"/admin/users"} icon={<GroupsIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"Invoices"} to={"/admin/invoices"} icon={<ReceiptOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Typography variant={"h5"} sx={{m: "10px 0 5px 20px"}}
                                    className={"!text-sm text-black dark:text-[#e0e0e0] capitalize !font-[400]"}>
                            {!isCollapsed && "Content"}
                        </Typography>
                        <Item title={"Create Course"} to={"/admin/create-course"} icon={<OndemandVideoIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"Live Course"} to={"/admin/live-course"} icon={<VideoCallIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Typography variant={"h5"} sx={{m: "10px 0 5px 20px"}}
                                    className={"!text-sm text-black dark:text-[#e0e0e0] capitalize !font-[400]"}>
                            {!isCollapsed && "Customization"}
                        </Typography>
                        <Item title={"Hero"} to={"/admin/hero"} icon={<WebIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"FAQ"} to={"/admin/faq"} icon={<QuizIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"Categories"} to={"/admin/categories"} icon={<WysiwygIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Typography variant={"h5"} sx={{m: "10px 0 5px 20px"}}
                                    className={"!text-sm text-black dark:text-[#e0e0e0] capitalize !font-[400]"}>
                            {!isCollapsed && "Controllers"}
                        </Typography>
                        <Item title={"Manage Team"} to={"/admin/manage-team"} icon={<PeopleOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Typography variant={"h5"} sx={{m: "10px 0 5px 20px"}}
                                    className={"!text-md text-black dark:text-[#e0e0e0] capitalize !font-[400]"}>
                            {!isCollapsed && "Analytics"}
                        </Typography>
                        <Item title={"Courses Analytics"} to={"/admin/course-analytics"} icon={<BarCharOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"Orders Analytics"} to={"/admin/order-analytics"} icon={<MapOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title={"Users Analytics"} to={"/admin/user-analytics"} icon={<ManageHistoryIcon/>} selected={selected}
                              setSelected={setSelected}/>
                    </Box>
                </Menu>
            </ProSidebar>
        
        </Box>
    );
};

export default AdminSidebar;