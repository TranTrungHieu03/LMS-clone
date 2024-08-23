import React, {FC} from 'react';
import {styles} from "@/app/styles/style";
import {AddCircle} from "@mui/icons-material";
import {toast} from "react-hot-toast";

type Props = {
    benefits: { title: string }[]
    setBenefits: (benefits: { title: string }[]) => void
    prerequisites: { title: string }[]
    setPrerequisites: (prerequisites: { title: string }[]) => void
    active: number
    setActive: (active: number) => void
}
const CourseData: FC<Props> = ({benefits, setBenefits, prerequisites, setPrerequisites, active, setActive}) => {
    const handleBenefitChange = (index: number, value: any) => {
        const updateBenefits = [...benefits]
        updateBenefits[index].title = value
        setBenefits(updateBenefits)
    }
    const handleAddBenefit = () => {
        setBenefits([...benefits, {title: ""}])
    }
    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatePrerequisites = [...prerequisites]
        updatePrerequisites[index].title = value
        setPrerequisites(updatePrerequisites)
    }
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, {title: ""}])
    }
    
    const preButton = () => {
        setActive(active - 1)
    }
  
    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1)
        } else {
            toast.error("Please fill the fields for go to next!")
        }
    }
    
    return (
        <div className={"w-4/5 m-auto mt-24 block"}>
            <label className={`${styles.label} text-md`} htmlFor={"email"}>
                What are the benefits fro student in this course?
            </label>
            <br/>
            {
                benefits.map((benefit, index) => (
                    <input type={"text"} key={index} name={"Benefit"}
                           placeholder={"You will be able to build a fullstack app"}
                           required={true}
                           value={benefit.title}
                           className={`${styles.input} my-2`}
                           onChange={(e) => handleBenefitChange(index, e.target.value)}/>
                ))
            }
            <AddCircle
                className={"my-[10px] cursor-pointer w-[30px] text-white"}
                onClick={handleAddBenefit}/>
            <div>
                <label className={`${styles.label} text-md`} htmlFor={"email"}>
                    What are the prerequisite for student in this course?
                </label>
                <br/>
                {
                    prerequisites.map((prerequisite, index) => (
                        <input type={"text"} key={index} name={"Benefit"}
                               placeholder={"You need basic knowledge of MERN stack"}
                               required={true}
                               value={prerequisite.title}
                               className={`${styles.input} my-2`}
                               onChange={(e) => handlePrerequisiteChange(index, e.target.value)}/>
                    ))
                }
                <AddCircle
                    className={"my-[10px] cursor-pointer w-[30px] text-white"}
                    onClick={handleAddPrerequisite}/>
            </div>
            <div className={"w-full flex items-center justify-between"}>
                <div
                    className={"w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8"}
                    onClick={() => preButton()}>Pre
                </div>
                <div
                    className={"w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8"}
                    onClick={() => handleOptions()}>Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;