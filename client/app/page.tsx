"use client"
import React, {FC, useState} from "react";
import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Route/Hero";

interface Props {
}

const page: FC<Props> = () => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    return (<div>
        <Heading title={"E-learning"}
                 description={"E-learning is a platform for students to learn and get help from teachers"}
                 keywords={"Programming, MERN, Redux, Machine Learning"}/>
        <Header open={open} setOpen={setOpen}
                activeItem={activeItem}/>
        <Hero/>
    </div>)
}
export default page