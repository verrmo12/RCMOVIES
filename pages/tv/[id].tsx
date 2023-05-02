import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Container = dynamic(() => import("../../components/container/Container"));

import { addToMyList, removeFromList } from "../../redux/actions/myListAction";
import {
  SetContinueWatching,
  SetCurrentEpisode,
  SetCurrentSeason,
  SetCurrentState,
} from "../../redux/actions/tvShowAction";
import { AnimatePresence, motion } from "framer-motion";
const DetailContainer = dynamic(() => import("../../components/details/DetailContainer"));
const HomeContainer = dynamic(() => import("../../components/container/HomeContainer"));
const axios = require("axios")





function TvEpisode(res: any) {
  const [data, setData] = useState<any>(res.res);
  const [recommended, setRecommended] = useState<any>([]);
  const [sEpisodes, setSEpisodes] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;
  const eps: any = [];
  const [currentSeason, setCurrentSeason] = useState(1);
  const [showSeasons, setShowSeasons] = useState(true);
  const ref = useRef();
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [casts, setCasts] = useState<any>([]);
  const [firstEpName, setFirstEpName] = useState("");

  const { MyList, CurrentState, ContinueWatching } = useSelector(
    (state: any) => state,
  );
  const dispatch = useDispatch();
  const dataState: any = { ep_num: 1, season: 1 };
  CurrentState?.filter((item: any) => {
    if (item.id == id) {
      dataState["ep_num"] = item.episode_number;
      dataState["season"] = item.season_number;
      dataState["ep_name"] = item.episode_name;
      dataState["episode_image"] = item.episode_image;
    }
  });

  useEffect(() => {
    const ce = setCurrentSeason(dataState.season);

    return ce;
  }, []);

  useEffect(() => {
    fetchCasts();
    fetchRecommended();
    fetchSeasonEpisodes();
    setData(res.res)

    const current = MyList?.filter((item: any) => item.id == id);
    current.length > 0 ? setClick(true) : setClick(false);
  }, [id, currentSeason, firstEpName,res]);

  
  const handleIframe = () => {
    if (dataState.length < 1) {
      dataState["ep_name"] = firstEpName;
      dataState["episode_image"] = sEpisodes[0]?.still_path
     
    }
    dispatch(
      SetContinueWatching({
        id: id,
        poster_path: data?.poster_path,
        backdrop_path: dataState?.episode_image || sEpisodes[0].still_path,
        title: data?.name,
        season: dataState?.season || 1,
        episode: dataState?.ep_num || 1,
        episode_name: dataState?.ep_name || sEpisodes[0].name,
        media_type: "tv",
        time: Date.now(),
      }),
    );
  };

  

  const fetchCasts = async () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await axios.get(url);
    let res = req.data;
    setCasts(res.cast);
  };
  const fetchSeasonEpisodes = async () => {
    let url = `https://api.themoviedb.org/3/tv/${id}/season/${currentSeason}?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await axios.get(url);
    let res = req.data;
    setSEpisodes(res.episodes);
    setFirstEpName(res.episodes[0]?.name);
  };

 

  const fetchRecommended = async () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=cfe422613b250f702980a3bbf9e90716`;
    let req = await axios.get(url);
    let res = req.data;
    setRecommended(res.results);
  };

  const last_air = Date.parse(data.last_air_date)

  return (
    <>
      <div className="w-full	relative mx-auto ">
        <DetailContainer {...data} media_type="tv" />
        <div className="max-w-[1720px] mx-auto">
         
            <div>
              
              <div className="flex flex-col-reverse lg:flex-row ">
              <div className="flex flex-col gap-1 w-full  lg:max-w-[300px]">
                  {sEpisodes?.map((ep: any) => (
                    <div
                      key={ep.episode_number}
                      onClick={() => {
                        dispatch(
                          SetCurrentState({
                            id: id,
                            episode_number: ep.episode_number,
                            episode_name: ep.name,
                            season_number: ep.season_number,
                            episode_image: ep.still_path,
                          }),
                        );
                      }}
                    >
                      <h1
                        style={{ color: "white" }}
                        className={`${
                          ep.episode_number === dataState?.ep_num && ep.season_number === dataState?.season
                            ? "bg-[#4815ff]"
                            : "bg-neutral-900"
                        } drop-shadow-xl p-3 overflow-hidden text-ellipsis	whitespace-nowrap	 transition-all font-semibold  cursor-pointer hover:bg-[#4815ff]`}
                      >
                        Ep {ep.episode_number}:{" "}
                        <span className="font-light text-gray-300 italic">
                          {ep.name}
                        </span>
                      </h1>
                    </div>
                  ))}
                </div>
                <iframe
                  onLoadCapture={handleIframe}
                  className=" w-full h-[300px] lg:h-[640px] 2xl:h-[872px] mx-auto"
                  src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${dataState?.season}&e=${dataState?.ep_num}`}
                  allowFullScreen
                ></iframe>
                
              </div>

              <div
                onClick={() => {
                  setShowSeasons(!showSeasons);
                  setIsOpen(!isOpen);
                }}
                className="bg-stone-900 mt-6  w-[120px] rounded-sm ml-2  font-semibold text-center cursor-pointer p-3 flex justify-between items-center hover:bg-neutral-900"
              >
                Seasons
                <span>
                  {showSeasons ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div className="flex flex-col p-1 gap-2 ">
                <AnimatePresence>
                  {showSeasons && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        type: "spring",
                        transition: { duration: 0.1 },
                      }}
                      exit={{
                        scale: 0,
                        transition: { duration: 0.2 },
                      }}
                      className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1  lg:p-2 transition-all 	mx-auto`}
                    >
                      {data?.seasons
                        ?.filter((f: any) => f.name !== "Specials")
                        .map((s: any) => {
                          return  s.air_date != null &&  (

                            <div
                              className={`${
                                s.season_number === dataState?.season
                                  ? "bg-[#4815ff] scale:105"
                                  : "bg-neutral-900"
                              }  cursor-pointer  text-center overflow-hidden text-ellipsis whitespace-nowrap	 rounded-md  hover:bg-[#4815ff] hover:scale-105 transition-all`}
                              key={s.season_number}
                              onClick={() => {
                                setCurrentSeason(s.season_number);
                              }}
                            >
                              <img
                                src={
                                  `https://image.tmdb.org/t/p/original//${s?.poster_path}` ||
                                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                                }
                                className="max-h-[340px] w-full object-cover"
                              />

                              <h1 className="p-2">{s.name}</h1>
                            </div>
                            
                          );
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>

                
                
              </div>
            </div>
          
          <HomeContainer Data={casts} heading="Casts" />

          <Container
            Data={recommended}
            heading="YOU MAY ALSO LIKE"
            place="tvshows"
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let id = context.params.id;
  let url = `https://api.themoviedb.org/3/tv/${id}?api_key=cfe422613b250f702980a3bbf9e90716`;
  let req = await fetch(url);
  let res = await req.json();

  return { props: { res } };
};

export default TvEpisode