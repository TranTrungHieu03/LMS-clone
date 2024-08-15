import React from 'react';
import Image from "next/image";
import {BiSearch} from "react-icons/bi";
import Link from "next/link";

const Hero = () => {
    return (
        <div className={"w-full 1000px:flex items-center gap-40 px-10"}>
            <div
                className={"absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-full px-40"}></div>
            <div
                className={"1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end  1000px:pt-0 z-10"}>
                <Image src={require("../../../public/banner.png")} alt={""}
                       className={"object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"}/>
            </div>
            <div
                className={"1000px:w-[60%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[150px]"}>
                <h2 className={"dark:text-white text-[#00000c7] text-[30px] w-full 1000px:text-[70px] font-[700] font-Nunito py-2 1000px:leading-[75px]"}>
                    Improve Your Online Learning Experience Better Instantly
                </h2>
                <br/>
                <p className={"dark:text-[#edfff4] text-[#00000ac] font-[600] text-[16px] 1500px:!w-[55%] 1100px:!w-[78%] "}>
                    We have 40k+ Online Courses & 500k+ Online Registered student. Find your desired Course from
                    there.
                </p>
                <br/>
                <br/>
                <div className={"1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative"}>
                    <input type={"search"} placeholder={"Search Courses..."}
                           className={"bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] dark:placeholder:font-[600] rounded-[5px] p-2 w-full h-full outline-none"}/>
                    <div
                        className={"absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"}>
                        <BiSearch size={30} className={"text-white"}/></div>
                </div>
                <br/>
                <br/>
                <div className={"1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center "}>
                    <Image
                        src={require("../../../public/avatar.png")}
                        alt={""} className={"rounded-full object-cover bg-sky-50 dark:bg-slate-50 w-12 h-12"}/>
                    <Image
                        
                        src={require("../../../public/avatar.png")}
                        alt={""}
                        className={"rounded-full ml-[-20px] object-cover bg-sky-50 dark:bg-slate-50 w-12 h-12"}/>
                    <Image
                        src={require("../../../public/avatar.png")}
                        alt={""} className={"rounded-full ml-[-20px] w-12 h-12 bg-sky-50 dark:bg-slate-50"}/>
                    <p className={"dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[16px] font-[600]"}>500K+
                        People already trusted us.</p>
                    <Link href={"/courses"} className={"dark:text-[#46e265] text-[crimson]"}>View Courses</Link>
                </div>
            </div>
        </div>
    
    );
};

export default Hero;