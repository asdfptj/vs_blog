import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "./Accordion";
import {
  VscFile,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";

const listArr = [
  {
    icon: <VscFile size={22.4} />,
    path: "EXPLORER",
  },
  {
    icon: <VscSearch size={22.4} />,
    path: "SEARCH",
  },
  {
    icon: <VscSourceControl size={22.4} />,
    path: "POSTING LOG",
  },
  {
    icon: <VscDebugAlt size={22.4} />,
    path: "RUN AND DEBUG",
  },
  {
    icon: <VscExtensions size={22.4} />,
    path: "EXTENSIONS",
  },
];
function Main() {
  const [selected, setSelected] = useState(null);

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          <Accordion title="OPEN POSTS">내용ㅋ</Accordion>
        </LeftContent>
      )}
    </Wrap>
  );
}

export default Main;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;
const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: white;
`;
const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background-color: #333333;
`;
const LeftContent = styled.div`
  width: 320px;
  height: 100%;
  background-color: #252526;

  > p {
    padding: 15px 0 0 10px;
    color: #7a7a7a;
  }
`;
