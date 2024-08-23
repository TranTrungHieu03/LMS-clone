"use client"
import React, {FC, useState} from 'react';
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Profile from "@/app/components/Profile/Profile";
import {useSelector} from "react-redux";

type Props = {}
const Page: FC<Props> = () => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(5)
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state: any) => state.auth)
    
    return (
        <Protected>
            <Heading title={`${user.name} profile - Elearning`}
                     description={"E-learning is a platform for students to learn and get help from teachers"}
                     keywords={"Programming, MERN, Redux, Machine Learning"}/>
            <Header open={open} setOpen={setOpen}
                    activeItem={activeItem}
                    route={route}
                    setRoute={setRoute}/>
            <Profile user={user}/>
        </Protected>
    );
};

export default Page;