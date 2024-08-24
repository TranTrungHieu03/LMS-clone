"use client"
import React, {useEffect, useState} from 'react';
import CourseInformation from "@/app/components/Admin/Course/CourseInformation";
import CourseOptions from "@/app/components/Admin/Course/CourseOptions";
import CourseData from "@/app/components/Admin/Course/CourseData";
import CourseContent from "@/app/components/Admin/Course/CourseContent";
import CoursePreview from "@/app/components/Admin/Course/CoursePreview";
import {useCreateCourseMutation} from "@/redux/features/courses/coursesApi";
import {redirect} from "next/navigation";
import {toast} from "react-hot-toast";

const CreateCourse = () => {
        
        const [createCourse, {isSuccess, isLoading, error}] =
            useCreateCourseMutation()
        useEffect(() => {
            if (isSuccess) {
                toast.success("Successfully created!")
                // redirect("/admin/all-courses")
            }
            if (error) {
                if ("data" in error) {
                    const errorData = error?.data as any
                    toast.error(errorData?.message)
                }
            }
            
        }, [isLoading, isSuccess, error]);
        
        const [active, setActive] = useState(0)
        const [courseInfo, setCourseInfo] = useState({
            name: "",
            description: "",
            price: "",
            estimatedPrice: "",
            tags: "",
            level: "",
            demoUrl: "",
            thumbnail: ""
            
        })
        const [benefits, setBenefits] = useState([{title: ""}])
        const [prerequisites, setPrerequisites] = useState([{title: ""}])
        const [courseContentData, setCourseContentData] = useState([{
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }])
        const [courseData, setCourseData] = useState({})
        const handleSubmit = async () => {
            //format benefits array
            const formattedBenefits = benefits.map(benefit => ({title: benefit.title}))
            //format prerequisites array
            const formattedPrerequisites = prerequisites.map(prerequisite => ({title: prerequisite.title}))
            
            //format course content array
            const formattedCourseContentData = courseContentData.map(courseContent => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoSection: courseContent.videoSection,
                links: courseContent.links.map(link => ({
                    title: link.title,
                    url: link.url
                })),
                suggestion: courseContent.suggestion
            }))
            //prepare our data object
            const data = {
                name: courseInfo.name,
                description: courseInfo.description,
                price: courseInfo.price,
                estimatedPrice: courseInfo.estimatedPrice,
                tags: courseInfo.tags,
                level: courseInfo.level,
                thumbnail: courseInfo.thumbnail,
                demoUrl: courseInfo.demoUrl,
                totalVideos: courseContentData.length,
                benefits: formattedBenefits,
                prerequisites: formattedPrerequisites,
                courseContent: formattedCourseContentData
            }
            setCourseData(data)
            
        }
        const handleCourseCreate = async () => {
            const data = courseData
            if (!isLoading) {
                await createCourse(data)
                
            }
        }
        return (
            <div className={"w-full flex min-h-screen"}>
                <div className={"w-[80%]"}>
                    {
                        active === 0
                        && (
                            <CourseInformation
                                active={active}
                                setActive={setActive}
                                courseInfo={courseInfo}
                                setCourseInfo={setCourseInfo}/>
                        )}
                    {
                        active === 1
                        && (
                            <CourseData
                                active={active}
                                setActive={setActive}
                                benefits={benefits}
                                setBenefits={setBenefits}
                                prerequisites={prerequisites}
                                setPrerequisites={setPrerequisites}/>
                        )}
                    
                    {
                        active === 2
                        && (
                            <CourseContent
                                active={active}
                                setActive={setActive}
                                courseContentData={courseContentData}
                                setCourseContentData={setCourseContentData}
                                handleSubmit={handleSubmit}/>
                        )}
                    {
                        active === 3
                        && (
                            <CoursePreview
                                active={active}
                                setActive={setActive}
                                courseData={courseData}
                                handleCourseCreate={handleCourseCreate}/>
                        )}
                </div>
                <div className={"w-[25%] mt-[100px] h-screen z-[-1] top-18 right-0"}>
                    <CourseOptions active={active} setActive={setActive}/>
                </div>
            </div>
        );
    }
;

export default CreateCourse;