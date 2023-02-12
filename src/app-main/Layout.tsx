import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <TopMenuItem>
            <Link to="/">Times Table</Link>
          </TopMenuItem>
          <TopMenuItem>
            <Link to="/addition">Addition</Link>
          </TopMenuItem>
          <TopMenuItem>
            <Link to="/multiplication">Multiplication</Link>
          </TopMenuItem>
          <TopMenuItem>
            <Link to="/division">Division</Link>
          </TopMenuItem>
          <TopMenuItem>
            <Link to="/giraffe">Giraffe, Pelly, & Me</Link>
          </TopMenuItem>
          {/*<TopMenuItem>*/}
          {/*  <Link to="/words">Tricky Words</Link>*/}
          {/*</TopMenuItem>*/}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;

const TopMenuItem = styled.li`
  display: inline-flex;
  padding: 10px;
  border: solid 3px #282c34;
  border-radius: 5px;
  color: #61dafb;
  background-color: lightgrey;
  margin: 5px;
`;
