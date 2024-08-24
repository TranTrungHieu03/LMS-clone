"use client"
import React from 'react';
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/AdminSidebar";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";

const Page = () => {
    return (
        <div>
            <AdminProtected>
                <Heading title={"E-learning"}
                         description={"E-learning is a platform for students to learn and get help from teachers"}
                         keywords={"Programming, MERN, Redux, Machine Learning"}/>
                <div className={"flex min-h-[100vh]"}>
                    <div className={"1500px:w-[16%] w-1/5"}>
                        <AdminSidebar/>
                    </div>
                    <div className={"w-[85%]"}>
                        <DashboardHeader/>
                        <CreateCourse/>
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default Page;