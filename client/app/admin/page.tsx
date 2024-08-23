"use client"
import React from 'react';
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHero from "@/app/components/Admin/DashboardHero";

const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading title={"E-learning"}
                         description={"E-learning is a platform for students to learn and get help from teachers"}
                         keywords={"Programming, MERN, Redux, Machine Learning"}/>
                <div className={"flex h-[200vh]"}>
                    <div className={"1500px:w-[16%] w-1/5"}>
                        <AdminSidebar/>
                    </div>
                    <div className={"w-[85%]"}>
                    <DashboardHero/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default Page;