import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import avatarDefault from "@/public/avatar.png"
import {styles} from "@/app/styles/style";
import {AiOutlineCamera} from "react-icons/ai";
import {useEditProfileMutation, useUpdateAvatarMutation} from "@/redux/features/user/userApi";
import {useLoadUserQuery} from "@/redux/features/api/apiSlice";
import {toast} from "react-hot-toast";

type ProfileInfoProps = {
    avatar: string | null;
    user: any
}
const ProfileInfo: FC<ProfileInfoProps> = ({avatar, user}) => {
    const [name, setName] = useState(user && user.name)
    const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation()
    const [editProfile, {isSuccess: success, error: updateError}] = useEditProfileMutation()
    
    const [loadUser, setLoadUser] = useState(false)
    const {} = useLoadUserQuery(undefined, {skip: !loadUser})
    const imageHandler = async (e: any) => {
        
        const fileReader = new FileReader()
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result
                updateAvatar(
                    avatar,
                )
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        if (isSuccess || success) {
            setLoadUser(true)
        }
        if (error || updateError) {
            console.log(error)
        }
        if (success){
            toast.success("Updated successfully.")
        }
    }, [isSuccess, error, success, updateError])
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (name !== "") {
            await editProfile({
                email: user.email,
                name
            })
        }
        
    }
    
    return (
        
        <>
            <div className={"w-full flex justify-center"}>
                <div className={"relative"}>
                    <Image src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault} alt={""}
                           className={"w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"}
                           width={120} height={120}/>
                    <input
                        type="file"
                        id={"avatar"}
                        name={""}
                        className={"hidden"}
                        onChange={imageHandler}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                    <label htmlFor={"avatar"}>
                        <div
                            className={"w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer text-white"}>
                            <AiOutlineCamera size={20} className={"z-1"} fill={"#fff"}/></div>
                    </label>
                </div>
            </div>
            <br/>
            <br/>
            <div className={"w-full pl-6 800px:pl-10"}>
                <form onSubmit={handleSubmit}>
                    <div className={"800px:w-1/2 m-auto block pb-4"}>
                        <div className={"w-[100%]"}>
                            <label className={`${styles.label} block pb-2`}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={"w-[100%] pt-2"}>
                            <label className={`${styles.label} block pb-2`}>
                                Email Address
                            </label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                required={true}
                                readOnly={true}
                                value={user.email}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <input
                            className={"w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"}
                            required={true}
                            value={"Update"}
                            type={"submit"}
                        />
                    
                    </div>
                </form>
                <br/>
            
            </div>
        </>
    );
};

export default ProfileInfo;