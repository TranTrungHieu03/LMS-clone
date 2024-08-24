import React, {FC} from 'react';
import CoursePlayer from "@/app/components/Admin/Course/CoursePlayer";
import {styles} from "@/app/styles/style";
import Ratings from "@/app/components/Admin/Course/Ratings";
import {IoCheckmarkDoneOutline} from "react-icons/io5";

type Props = {
    active: number,
    setActive: (active: number) => void,
    courseData: any,
    handleCourseCreate: any
}
const CoursePreview: FC<Props> = ({active, setActive, courseData, handleCourseCreate}) => {
    const discountPercentage = (courseData?.estimatedPrice - courseData?.price) * 100 / courseData?.estimatedPrice
    const discountPercentagePrice = discountPercentage.toFixed(0);
    const preButton = () => {
        setActive(active - 1);
    }
    const createCourse = () => {
        handleCourseCreate()
    }
    
    return (
        <div className={"w-[90%] m-auto py-5 mb-5 font-Nunito text-black dark:text-white"}>
            <div className={"w-full relative"}>
                <div className={"w-full mt-10"}>
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}/>
                </div>
            </div>
            <div className={"flex items-center text-black dark:text-white font-Nunito"}>
                <h1 className={"pt-5 text-lg"}>
                    {
                        courseData?.price === 0 ? "Free" : courseData?.price + "$"
                    }
                </h1>
                <h5 className={"pl-3 text-sm mt-2 line-through opacity-80"}>
                    {
                        courseData?.estimatedPrice
                    }$
                </h5>
                <h4 className={"pl-5 pt-4 text-md"}>
                    {
                        discountPercentagePrice
                    }% Off
                </h4>
            </div>
            <div className={"flex items-center"}>
                <div className={`${styles.button} !w-[180px] my-3 !bg-rose-600 cursor-not-allowed`}>
                    Buy Now {courseData?.price}$
                </div>
            </div>
            <div className={"flex items-center"}>
                <input
                    type={"text"}
                    name={""}
                    placeholder={"Discount code..."}
                    className={`${styles.input} 1500px:w-1/2 1100px:w-2/3 ml3 !mt-0`}/>
                <div className={`${styles.button} !w-[120px] my-3 ml-4 cursor-pointer`}>Apply</div>
            </div>
            <div className={"text-black dark:text-white"}>
                <p className={"pb-1"}>. Source code included</p>
                <p className={"pb-1"}>. Full time access</p>
                <p className={"pb-1"}>. Certificate of completion</p>
            </div>
            <div className={"w-full text-black dark:text-white"}>
                <div className={"w-full 800px:pr-5"}>
                    <h1 className={"text-md font-[600]"}>{courseData?.name}</h1>
                    <div className={"flex items-center justify-between pt-3"}>
                        <div className={"flex items-center"}>
                            <Ratings rating={0}/>
                            <h5>0 reviews</h5>
                        </div>
                        <h5>0 Students</h5>
                    </div>
                    <br/>
                    <h1 className={"text-lg font-[600]"}>What you will learn from this course?</h1>
                </div>
            </div>
            {
                courseData?.benefits.map((item: any, index: number) => (
                    <div className={"w-full flex 800px:items-center py-2"} key={index}>
                        <div className={"w-[15px] mr-1"}>
                            <IoCheckmarkDoneOutline size={20}/>
                        </div>
                        <p className={"pl-2"}>{item.title}</p>
                    </div>
                ))
                
            }
            <br/>
            <h1 className={"text-lg font-[600]"}>What are the prerequisites for starting this course?</h1>
            {
                courseData?.prerequisites.map((item: any, index: number) => (
                    <div className={"w-full flex 800px:items-center py-2"} key={index}>
                        <div className={"w-[15px] mr-1"}>
                            <IoCheckmarkDoneOutline size={20}/>
                        </div>
                        <p className={"pl-2"}>{item.title}</p>
                    </div>
                ))
                
            }
            
            <br/>
            <br/>
            <div className={"w-full"}>
                <h1 className={"text-lg font-[600]"}>Course Detail</h1>
                {courseData.description}
            </div>
            <br/>
            <br/>
            <div className={"w-full flex items-center justify-between"}>
                <div
                    className={"w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8"}
                    onClick={() => preButton()}>Pre
                </div>
                <div
                    className={"w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"}
                    onClick={() => createCourse()}>Create
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;