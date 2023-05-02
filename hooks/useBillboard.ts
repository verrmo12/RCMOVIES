import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";


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