"use client"
import React, {useState} from 'react';
import CourseInformation from "@/app/components/Admin/Course/CourseInformation";
import CourseOptions from "@/app/components/Admin/Course/CourseOptions";
import CourseData from "@/app/components/Admin/Course/CourseData";
import CourseContent from "@/app/components/Admin/Course/CourseContent";

const CreateCourse = () => {
    const [active, setActive] = useState(2)
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
    const handleSubmit = async () => {}
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
            </div>
            <div className={"w-[20%] mt-[100px] h-screen z-[-1] top-18 right-0"}>
                <CourseOptions active={active} setActive={setActive}/>
            </div>
        </div>
    );
};

export default CreateCourse;