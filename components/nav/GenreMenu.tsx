import React from 'react';
import NavbarItem from "./Navbaritems";
import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
}

const GenreMenu = () => {
 

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">

                <Link href={`/`}>
                <NavbarItem label="Home" />
                </Link>

                <NavbarItem label="Category" />


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
    </div>
  )
}

export default GenreMenu;