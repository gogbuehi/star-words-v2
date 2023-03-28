import {useContext} from "react";
import {StarMathsContext} from "./star-maths/contexts/StarMathsContext";

export const Nav = () => {
  const { setNav } = useContext(StarMathsContext);
  return <div>
    Nav
    <br />
    <a onClick={() => {
      console.log('Setting nav...')
      setNav('Maths');
    }}>Maths</a>
  </div>
}
