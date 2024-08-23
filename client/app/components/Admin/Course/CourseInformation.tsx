import React, {FC, useState} from 'react';
import {styles} from "@/app/styles/style";

type Props = {
    active: number,
    setActive: (active: number) => void,
    courseInfo: any,
    setCourseInfo: (courseInfo: any) => void,
}
const CourseInformation: FC<Props> = ({active, setCourseInfo, courseInfo, setActive}) => {
    const [dragging, setDragging] = useState(false)
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({...courseInfo, thumbnail: reader.result})
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDragging(true)
    }
    
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }
    
    const handleDrop = (e: any) => {
        e.preventDefault()
        setDragging(false)
        
        const file = e.dataTransfer?.files?.[0]
        
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setCourseInfo({...courseInfo, thumbnail: reader.result})
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className={"w-[80%] m-auto mt-24"}>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <div>
                    <label htmlFor={""}>
                        Course Name
                    </label>
                    <input
                        name={""}
                        type={"name"}
                        value={courseInfo.name}
                        id={"name"}
                        className={`${styles.input}`}
                        onChange={(e: any) => setCourseInfo({...courseInfo, name: e.target.value})}
                        placeholder={"MERN stack lMS with nextjs"}
                    />
                    <br/>
                    <div className={"mt-5"}>
                        <label htmlFor={""} className={`${styles.label}`}>Description</label>
                        <textarea name={""} id={"description"} value={courseInfo.description} cols={30} rows={8}
                                  placeholder={"Write something amazing..."}
                                  onChange={(e: any) => setCourseInfo({...courseInfo, description: e.target.value})}
                                  className={`${styles.input} !h-min !py-2`}></textarea>
                    </div>
                    <br/>
                    <div className={"w-full flex justify-between"}>
                        <div className={"w-[45%]"}>
                            <label className={`${styles.label}`}>Course Price</label>
                            <input
                                name={""}
                                type={"number"}
                                required={true}
                                value={courseInfo.price}
                                id={"price"}
                                className={`${styles.input}`}
                                onChange={(e: any) => setCourseInfo({...courseInfo, price: e.target.value})}
                                placeholder={"20"}
                            />
                        </div>
                        <div className={"w-[50%]"}>
                            <label className={`${styles.label}`}>Estimated Price (optional)</label>
                            <input
                                name={""}
                                type={"number"}
                                required={true}
                                value={courseInfo.estimatedPrice}
                                id={"estimatedPrice"}
                                className={`${styles.input}`}
                                onChange={(e: any) => setCourseInfo({...courseInfo, estimatedPrice: e.target.value})}
                                placeholder={"79"}
                            />
                        </div>
                    
                    
                    </div>
                    <br/>
                    <div className={""}>
                        <label className={`${styles.label}`}>Course Tags</label>
                        <input
                            name={""}
                            type={"text"}
                            required={true}
                            value={courseInfo.tags}
                            id={"tags"}
                            className={`${styles.input}`}
                            onChange={(e: any) => setCourseInfo({...courseInfo, tags: e.target.value})}
                            placeholder={"MERN, Next 13, Socket io, LMS"}
                        />
                    </div>
                    <div className={"w-full flex justify-between mt-5"}>
                        <div className={"w-[45%]"}>
                            <label className={`${styles.label}`}>Course Level</label>
                            <input
                                name={""}
                                type={"text"}
                                required={true}
                                value={courseInfo.level}
                                id={"level"}
                                className={`${styles.input}`}
                                onChange={(e: any) => setCourseInfo({...courseInfo, level: e.target.value})}
                                placeholder={"Beginner/Intermediate/Expert"}
                            />
                        </div>
                        <div className={"w-[50%]"}>
                            <label className={`${styles.label}`}>Demo Url </label>
                            <input
                                name={""}
                                type={"url"}
                                required={true}
                                value={courseInfo.demoUrl}
                                id={"demoUrl"}
                                className={`${styles.input}`}
                                onChange={(e: any) => setCourseInfo({...courseInfo, demoUrl: e.target.value})}
                                placeholder={"demo.com"}
                            />
                        </div>
                    
                    
                    </div>
                    <br/>
                    <div className={"w-full"}>
                        <input type={"file"} accept={"image/*"} id={"file"} className={"hidden"}
                               onChange={handleFileChange}/>
                        <label htmlFor={"file"}
                               className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center ${
                                   dragging ? "bg-blue-500" : "bg-transparent"
                               }`}
                               onDragOver={handleDragOver}
                               onDragLeave={handleDragLeave}
                               onDrop={handleDrop}>
                            {
                                courseInfo.thumbnail ? (
                                    <img src={courseInfo.thumbnail} alt={""}
                                         className={"max-h-full w-full object-cover"}/>
                                ) : (
                                    <span className={"text-black dark:text-white text-center"}>
                                    Drag and drop your thumbnail here or click to browse
                                </span>
                                )
                            }
                        </label>
                    </div>
                    <br/>
                    <div className={"w-full flex items-center justify-end"}>
                        <input type={"submit"} value={"Next"}
                               className={"w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"}
                        />
                    </div>
                </div>
            </form>
        
        </div>
    );
};

export default CourseInformation;