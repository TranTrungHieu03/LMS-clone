import React, {FC} from 'react';
import Link from "next/link";

export const navItemsData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "/faq"
    }
]
type NavItemProps = {
    activeItem: number
    isMobile: boolean
}
const NavItem: FC<NavItemProps> = ({activeItem, isMobile}) => {
    return (
        <>
            <div className={"hidden 800px:flex"}>
                {
                    navItemsData && navItemsData.map((item, index) => (
                        <Link href={`${item.url}`} key={index} passHref>
                        <span
                            className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Nunito font-[400] `}>
                            {item.name}
                        </span>
                        </Link>
                    ))
                }
            </div>
            {isMobile && (
                <div className={"800px:hidden mt-5"}>
                    
                    {navItemsData && navItemsData.map((item, index) => (
                        <Link href={`${item.url}`} key={index} passHref>
                        <span
                            className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Nunito font-[400] `}>
                            {item.name}
                        </span>
                        </Link>
                    ))}
                
                </div>
            )}
        </>
    );
};

export default NavItem;