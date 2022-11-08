import React, { useContext, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import {
  VscFile,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscClose,
} from "react-icons/vsc";
import Content from "../components/Contents";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";

function Main() {
  const [selected, setSelected] = useState(null);
  const { setSelectedPost, selectedPost, postData, setOpenPost, openPost } =
    useContext(AppContext);

  const listArr = [
    {
      icon: <VscFile size={22.4} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true} initialExpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);
              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true} initialExpanded={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
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

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
            key={index}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const data = getPostOne(postData, one);

            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝 {data.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();

                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );
                    setOpenPost(openPostFilter);

                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                >
                  <VscClose />
                </span>
              </div>
            );
          })}
        </RightHeader>

        <RightContent selected={selected}>{selectedPost}</RightContent>
      </RightWrap>
    </Wrap>
  );
}

export default Main;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320px - 50px)"};

  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.secondary};

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }

  > div {
    width: 150px;
    min-width: 150px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.secondary};
    user-select: none;
    position: relative;
    cursor: pointer;

    &.selected {
      background-color: ${({ theme }) => theme.color.primary};
    }

    &:not(.selected) > span {
      display: none;
    }

    &:hover > span {
      display: block;
    }
    > span {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
`;
const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  border-left: ${({ theme, selected }) =>
    `${selected ? 2 : 0}px solid ${theme.color.text}`};

  > svg {
    color: ${({ theme, selected }) =>
      `${selected ? "#FFF" : theme.color.text}`};
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
  background-color: ${({ theme }) => theme.color.third};
  min-width: 50px;
`;
const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 10px;

  > p {
    padding-bottom: 15px 0 0 10px;
    color: #7a7a7a;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;
const RightContent = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100%;
  height: calc(100% - 50px);

  > div:first-child {
    display: flex;
    overflow-x: hidden;

    > div {
      width: 150px;
      padding: 10px;
      background-color: ${({ theme }) => theme.color.secondary};

      &.selected {
        background-color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;
