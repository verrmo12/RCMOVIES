import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Sidebar from "./nav/Sidebar";
import { FaPlay } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToMyList, removeFromList } from "../redux/actions/myListAction";
import Link from "next/link";

function timeConvert(n: any) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m.";
}


const settings = {
  dots: false,
 
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed:700,
  autoplaySpeed: 7000,
  pauseOnHover: false,
  arrows: false,
};

interface HeaderProps {
  Data: [];
}

function Header(props: HeaderProps) {
  const [data, setData] = useState<any>([]);
  const { MyList } = useSelector((state: any) => state);
  const router = useRouter();

  const [notification, setNotification] = useState(false);

  const dispatch = useDispatch();

console.log(MyList)
  return (
    <>
      <Slider {...settings} className=" overflow-hidden">
        {props.Data?.map((item: any) => {
          const current = MyList.filter((item: any) => item.id === item?.id);
          let t = current.filter((f: any) => f.id == item.id);

          return (
            <div key={item.id}  className="">
              <div
                className="head"
                style={{
                  background: `linear-gradient(to right, rgb(6, 6, 6) 15%, transparent 100%), url(https://image.tmdb.org/t/p/original//${item?.backdrop_path}) `,
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                }}
              >
                <div className="flex flex-col pl-4 w-full lg:w-2/5	z-50 justify-center relative items-start gap-4 h-full">
                  <h1 className="text-2xl lg:text-4xl font-black w-1/2 lg:w-full">
                    {item.title || item.name}
                  </h1>
                  <div className="text-[#b3b3b3] font-normal flex gap-3 ">
                  <span className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {item?.first_air_date?.split("-")[0] ||
                      item?.release_date?.split("-")[0]}
                  </span>
                  <span className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                      {timeConvert(item?.runtime)}
                    </span> 
              
                 
                </div>
                  <p className="text-stone-400">{item.overview}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/movie/${item.id}`)}
                      className="px-3 py-2 lg:px-4 lg:py-3 text-sm bg-[#2229] text-gray-200 rounded-sm font-semibold flex drop-shadow-2xl  items-center gap-2 hover:text-black hover:bg-gray-200 hover:scale-105 transition-all  easeInOut"
                    >
                      <FaPlay size={14} />
                    </button>
                    {t.length > 0 ? (
                      <button
                        onClick={() => dispatch(removeFromList(item.id))}
                        className="bg-zinc-900
                        cursor-pointer
                        rounded-md
                        py-1 md:py-2
                        px-2 md:px-4
                        w-auto
                        text-xs lg:text-lg
                        font-semibold
                        flex
                        flex-row
                        items-center
                       
                        transition"
                      >
                        <IoMdRemove size={18} />
                        <span>REMOVE FROM LIST</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(
                            addToMyList({
                              id: item.id,
                              title: item.title,
                              poster_path: item.poster_path,
                              overview: item.overview,
                              media_type: item.media_type,
                              backdrop_path : item.backdrop_path,
                            }),
                          );
                        }}
                        className=" cursor-pointer
                        group/item
                        w-6
                        h-6
                        lg:w-10
                        lg:h-10
                        border-white
                        border-2
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:border-neutral-300"
                      >
                        <IoMdAdd size={18} />
                        <span></span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default Header;
