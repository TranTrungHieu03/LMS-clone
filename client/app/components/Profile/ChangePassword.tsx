import React, {useEffect, useState} from 'react';
import {styles} from "@/app/styles/style";
import {useChangePasswordMutation} from "@/redux/features/user/userApi";
import {toast} from "react-hot-toast";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [changePassword, {isSuccess, error}] = useChangePasswordMutation()
    const passwordChangeHandler = async (e: any) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            toast.error("Password is mismatch.")
        } else {
            await changePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            })
        }
        
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Change password successfully")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error.data as any;
                toast.error(errorData.message)
                console.log(error)
            }
            
        }
    }, [isSuccess, error]);
    return (
        <div className={"w-full pl-7 px-2 800px:px-5 800px:pl-2"}>
            <h1 className={"block text-[25px] 800px:text-[30px] text-center font-[500] text-black dark:text-white pb-2"}>Change
                Password</h1>
            <div className={"w-full"}>
                <form onSubmit={passwordChangeHandler}
                      aria-required className={"flex flex-col items-center text-black dark:text-white"}>
                    <div className={"w-[100%] 800px:w-[60%] mt-5 "}>
                        <label className={"block pb-2"}>Old password</label>
                        <input
                            type="password"
                            onChange={e => setOldPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                            required
                            value={oldPassword}/>
                    </div>
                    <div className={"w-[100%] 800px:w-[60%] mt-2"}>
                        <label className={"block pb-2"}>New password</label>
                        <input
                            type="password"
                            onChange={e => setNewPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                            required
                            value={newPassword}/>
                    </div>
                    <div className={"w-[100%] 800px:w-[60%] mt-2"}>
                        <label className={"block pb-2"}>Confirm password</label>
                        <input
                            type="password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                            required
                            value={confirmPassword}/>
                        <input type={"submit"} value={"Update"} required
                               className={"w-[95%] h-[40px] border border-[#37a39a] text-black dark:text-white rounded mt-8 cursor-pointer"}/>
                    </div>
                
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;