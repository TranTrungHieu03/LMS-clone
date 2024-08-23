import React, {FC, useState} from 'react';
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {BsPencil} from "react-icons/bs";
import {styles} from "@/app/styles/style";

type Props = {
    active: number,
    setActive: (active: number) => void,
    courseContentData: any,
    setCourseContentData: (courseContentData: any) => void,
    handleSubmit: any
    
}
const CourseContent: FC<Props> = ({
                                      active,
                                      setActive,
                                      courseContentData,
                                      setCourseContentData,
                                      handleSubmit: handleCourseSubmit
                                  }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    )
    const [activeSection, setActiveSection] = useState(1)
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    const handleCollapseToggle = (index: number) => {
        const updateCollapsed = [...isCollapsed]
        updateCollapsed[index] = !updateCollapsed[index]
        setIsCollapsed(updateCollapsed)
    }
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updateData = [...courseContentData]
        updateData[index].links.splice(linkIndex, 1)
        setCourseContentData(updateData)
    }
    return (
        <div className={"w-4/5 m-auto mt-24 p-3"}>
            <form onSubmit={handleSubmit}>
                {
                    courseContentData.map((courseData: any, index: number) => {
                        const showSectionInput = index === 0 ||
                            courseData.videoSection !== courseContentData[index - 1].videoSection
                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${
                                    showSectionInput ? "mt-10" : "mb-0"
                                }`}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className={"w-full flex items-center"}>
                                                    <input
                                                        type={"text"}
                                                        className={`text-md ${
                                                            courseData.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"
                                                        } cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                        value={courseData.videoSection}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData]
                                                            updateData[index].videoSection = e.target.value
                                                            setCourseContentData(updateData)
                                                        }}
                                                    
                                                    />
                                                    <BsPencil className={"cursor-pointer text-black dark:text-white"}/>
                                                    <br/>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className={"flex w-full items-center justify-between my-0"}>
                                        {
                                            isCollapsed[index] ? (
                                                <>
                                                    {
                                                        courseData.title ? (
                                                            <p className={"text-black dark:text-white"}>{index + 1}. {courseData.title}</p>
                                                        ) : <></>
                                                    }
                                                </>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        <div className={"flex items-center"}>
                                            <AiOutlineDelete
                                                className={`dark:text-white text-md mr-2 text-black ${
                                                    index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                                }`}
                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updateData = [...courseContentData]
                                                        updateData.splice(index, 1)
                                                        setCourseContentData(updateData);
                                                    }
                                                }}/>
                                            <MdOutlineKeyboardArrowDown
                                                fontSize={"large"}
                                                className={"text-black dark:text-white"}
                                                style={{
                                                    transform: isCollapsed[index] ? "rotate[180deg]" : "rotate[0deg]"
                                                }}
                                                onClick={() => handleCollapseToggle(index)}/>
                                        </div>
                                    
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className={"my-3"}>
                                                    <label className={`${styles.label}`}>Video Title</label>
                                                    <input
                                                        type={"text"}
                                                        className={`${styles.input}`}
                                                        value={courseData.title}
                                                        placeholder={"Project Plan ..."}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData]
                                                            updateData[index].videoSection = e.target.value
                                                            setCourseContentData(updateData)
                                                        }}
                                                    
                                                    />
                                                    <div className={"mb-3"}>
                                                        <label className={`${styles.label}`}>Video Url</label>
                                                        <input
                                                            type={"text"}
                                                            className={`${styles.input}`}
                                                            value={courseData.videoUrl}
                                                            placeholder={"url ..."}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData]
                                                                updateData[index].videoUrl = e.target.value
                                                                setCourseContentData(updateData)
                                                            }}
                                                        
                                                        />
                                                    </div>
                                                    <div className={"mb-3"}>
                                                        <label className={`${styles.label}`}>Video Description</label>
                                                        <textarea name={""} id={"description"}
                                                                  value={courseData.description} cols={30} rows={8}
                                                                  placeholder={"Write something amazing..."}
                                                                  onChange={(e) => {
                                                                      const updateData = [...courseContentData]
                                                                      updateData[index].description = e.target.value
                                                                      setCourseContentData(updateData)
                                                                  }}
                                                                  className={`${styles.input} !h-min`}></textarea>
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                    <div>
                                                        {
                                                            courseData.links.map((link: any, linkIndex: number) => (
                                                                <div className={"mb-3 block"} key={linkIndex}>
                                                                    <div
                                                                        className={"w-full flex items-center justify-between"}>
                                                                        <label className={`${styles.label}`}>
                                                                            Link {linkIndex + 1}
                                                                        </label>
                                                                        <AiOutlineDelete
                                                                            className={`${
                                                                                linkIndex === 0 ?
                                                                                    "cursor-no-drop" : "cursor-pointer"
                                                                            } text-black dark:text-white text-md`}
                                                                            onClick={() =>
                                                                                linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}/>
                                                                    </div>
                                                                    <input type={"text"}
                                                                           placeholder={"Source Code ... (Link title)"}
                                                                           value={link.title}
                                                                           className={`${styles.input} mt-6`}
                                                                           onChange={(e) => {
                                                                               const updateData = [...courseContentData]
                                                                               updateData[index].links[linkIndex].title = e.target.value
                                                                               setCourseContentData(updateData)
                                                                           }}/>
                                                                    <input type={"url"}
                                                                           placeholder={"Source Code Url ... (Link URL)"}
                                                                           value={link.url}
                                                                           className={`${styles.input} mt-6`}
                                                                           onChange={(e) => {
                                                                               const updateData = [...courseContentData]
                                                                               updateData[index].links[linkIndex].url = e.target.value
                                                                               setCourseContentData(updateData)
                                                                           }}/>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </form>
        </div>
    );
};

export default CourseContent;