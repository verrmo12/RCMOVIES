import NavbarItem from "./Navbaritems";

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from "./MobileMenu";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router"


import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../Backdrop";
import Link from "next/link";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { SiBarclays } from "react-icons/si";
import { RiMovieFill } from "react-icons/ri";
import { FaSlackHash } from "react-icons/fa";
import { MdBookmark } from "react-icons/md";
import Search from "./Search";
import { FaBars } from "react-icons/fa";
import GenreMenu from "./GenreMenu";


const TOP_OFFSET = 66;

interface SideBarprops {
  handleSideNav: any;
}
function Sidebar(t: SideBarprops) {

  const [tran, setTran] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [active, setActive] = useState(false);
  const [showMovieCategory, setShowMovieCategory] = useState(false)

   const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

  const movieCategory:any = [
    { name: "Horror", link: "/genre/Horror-27/1" },
    { name: "Action", link: "/genre/Action-28/1" },
    { name: "Comedy", link: "/genre/Comedy-35/1" },
    { name: "Thriller", link: "/genre/Thriller-53/1" },
    { name: "Sci-Fi", link: "/genre/Science-Fiction-878/1" },
    { name: "Crime", link: "/genre/Crime-80/1" },
    { name: "Family", link: "/genre/Family-10751/1" },
    { name: "Anime", link: "/genre/Anime-16/1" },
    { name: "Mystery", link: "/genre/Mystery-9648/1" },
    { name: "Fantasy", link: "/genre/Fantasy-14/1" },
    { name: "Drama", link: "/genre/Drama-18/1" },
    { name: "Adventure", link: "/genre/Adventure-12/1" },
    { name: "Music", link: "/genre/Music-10402/1" },
    { name: "War", link: "/genre/War-10752/1" },
  ]




const handleMovieCategory = (e:any) => {
  e.stopPropagation()
  setShowMovieCategory(!showMovieCategory)


}
  console.log(router.query);
  console.log(router.asPath);
  return (
    <header className={`${scrollPosition > 50 ? "bg-[#111]" : "bg-transparent"}  p-4  fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out  `}>
            <div className={`
            px-4 
            md:px-16 
            py-6 
            flex 
            flex-row 
            items-center 
            transition 
            duration-500 
            `}>
        <img className="h-4 lg:h-7" src="/play.png" alt="Logo" />
        <span>*</span>
        <Link href={`/`}>
          <span className="hidden md:block text-white font-bold text-2xl cursor-pointer">
            RCMOVIES
          </span>
        </Link>

        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative">
             <p className="text-white text-sm">Browse</p>
              <BsChevronDown className="text-white transition" />
               <MobileMenu visible = {showMobileMenu} />
            </div>

            <div
            className="
              flex-row
              ml-8
              gap-7
              hidden
              lg:flex
            ">
             
             <Link href={`/`}>
                <NavbarItem label="Home" />
            </Link>

                
           
               <div  onClick={handleMovieCategory}>
              {" "}
              <NavbarItem label="Category" />{" "}       
            </div>
            
            {showMovieCategory && (


            <motion.div initial={{y:-200}} animate={{y:0}} exit={{opacity:0}} className="grid grid-cols-2 px-2">
            {movieCategory.map((cat:any,index:number) => (
              <Link key={index} href={cat.link}>
              <span className="p-2 cursor-pointer  text-gray-400 hover:text-gray-200">{cat.name}</span>
              </Link>
            ))}
            </motion.div>
            )}
            
                <Link href={`/movies/1`}>
                <NavbarItem label="Movies" />
                </Link>

                <Link href={`/tvshows/1`}>
                <NavbarItem label="Tv-Shows" />
                </Link>

                <Link href={`/topimdb/1`}>
                <NavbarItem label="Top Rated" />
                </Link>

                <Link href={`/movies-list`}>
                <NavbarItem label="My List" />
                </Link>
       

            </div>
            <div className="flex flex-row ml-auto gap-7 items-center">
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                
              </div>
              <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                <BsBell/>
              </div>
              <Search />
            </div>
            </div>
        </header>
  );
}

export default Sidebar;