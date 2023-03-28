import {useState} from "react";

export const useNav = () => {
  const [nav, setNav] = useState('Maths');

  return {
    nav,
    setNav
  };
}
