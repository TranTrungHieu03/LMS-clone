"use client"
import React, {FC, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useFormik} from "formik";
import {styles} from "@/app/styles/style";
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useRegisterMutation} from "@/redux/features/auth/authApi";
import {toast} from "react-hot-toast";

type SignUpProps = {
    setRoute: (route: string) => void;
}
const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email address").required("PLease enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
})
const SignUp: FC<SignUpProps> = ({setRoute}) => {
    const [show, setShow] = useState(false)
    const [register, { data, isSuccess, error}] = useRegisterMutation();
    
    useEffect(()=> {
        if (isSuccess) {
            const message = data.message || "Register successfully."
            toast.success(message)
            setRoute("Verification")
        }
        if (error){
            if ("data" in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
            }
        }
    },[isSuccess, error])
    const formik = useFormik({
        initialValues: {
            email: "", password: "", name: ""
        },
        validationSchema: schema,
        onSubmit: async ({email, password, name}) => {
            const data = {email, name, password}
            await register(data)
            
        }
    })
    const {errors, touched, values, handleChange, handleSubmit} = formik
    
    return (
        <div className={"w-full"}>
            <h1 className={`${styles.title}`}>SignUp with E Learning</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"name"} className={`${styles.label}`}>
                    Name
                </label>
                <input type={"name"} name={"name"} value={values.name} onChange={handleChange} id={"name"}
                       placeholder={"loginname@gmail.com"}
                       className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}/>
                {errors.name && touched.name && (
                    <span className={"text-red-500 pt-2 block"}>{errors.name}</span>
                )}
                <label htmlFor={"email"} className={`${styles.label}`}>
                    Email
                </label>
                <input type={"email"} name={"email"} value={values.email} onChange={handleChange} id={"email"}
                       placeholder={"loginemail@gmail.com"}
                       className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}/>
                {errors.email && touched.email && (
                    <span className={"text-red-500 pt-2 block"}>{errors.email}</span>
                )}
                
                <div className={"w-full mt-5 relative mb-1"}>
                    <label htmlFor={"password"} className={`${styles.label}`}>
                        Password
                    </label>
                    <input type={show ? "password" : "text"} name={"password"} value={values.password}
                           onChange={handleChange}
                           id={"password"}
                           placeholder={"password!@%"}
                           className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}/>
                    
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className={"absolute bottom-3 right-2 x-1 cursor-pointer dark:text-white text-black"}
                            size={20}
                            onClick={() => setShow(true)}/>) : (
                        <AiOutlineEye
                            className={"absolute bottom-3 right-2 x-1 cursor-pointer dark:text-white  text-black"}
                            size={20}
                            onClick={() => setShow(false)}
                        />)
                    }
                </div>
                {errors.password && touched.password && (
                    <span className={"text-red-500 pt-2 block"}>{errors.password}</span>
                )}
                <div className={"w-full mt-5"}>
                    <input type={"submit"} value={"SignUp"} className={`${styles.button}`}/>
                </div>
                <br/>
                <h5 className={"text-center pt-4 font-Nunito text-[14px] text-black dark:text-white"}>Or join with</h5>
                <div className={"flex items-center justify-center my-3"}>
                    <FcGoogle size={30} className={"cursor-pointer mr-2"}/>
                    <AiFillGithub size={30} className={"cursor-pointer ml-2"}/></div>
                <h5 className={"text-center pt-4 text-[14px] text-black dark:text-white"}>Already have an account?<span
                    className={"text-[#2190ff] pl-1 cursor-pointer"}
                    onClick={() => setRoute("Login")}>Login</span></h5>
            
            </form>
        
        </div>
    );
};

export default SignUp;