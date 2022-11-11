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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Search from "./Search";

function Main() {
  const [selected, setSelected] = useState(null);
  const {
    setTheme,
    theme,
    setSelectedPost,
    selectedPost,
    postData,
    setOpenPost,
    openPost,
  } = useContext(AppContext);

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
      content: <Search />,
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
        <div>
          {listArr.map((one, index) => (
            <IconWrap
              selected={selected === index}
              onClick={() => setSelected(selected === index ? null : index)}
              key={index}
            >
              {one.icon}
            </IconWrap>
          ))}
        </div>
        <div>
          <div
            className={theme}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          ></div>
        </div>
      </LeftBar>

      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected]?.path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        <RightHeader visible={openPost.length !== 0 ? true : false}>
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

        <RightContent
          selected={selected}
          visible={openPost.length !== 0 ? true : false}
        >
          {(() => {
            const data = getPostOne(postData, selectedPost);

            return (
              data && (
                <>
                  <p>{data.path}</p>
                  <div>
                    <h1>{data?.title}</h1>
                    <p>
                      <strong>taejun | </strong>
                      {data.data?.date}
                    </p>
                    <div>
                      {data?.data?.tag?.map((one, index) => (
                        <span key={index}>{one}</span>
                      ))}
                    </div>
                    <div className="markdown">
                      <ReactMarkdown
                        children={data.data?.content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={dark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      ></ReactMarkdown>
                    </div>
                  </div>
                </>
              )
            );
          })()}
        </RightContent>
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
  display: ${({ visible }) => (visible ? "flex" : "none")};
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
      `${selected ? "white" : theme.color.text}`};
  }
`;
const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: white;
`;
const LeftBar = styled.div`
  height: 100%;
  width: 50px;
  min-width: 50px;
  background-color: ${({ theme }) => theme.color.third};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  > div:last-child {
    padding-bottom: 30px;
    > div {
      height: 50px;
      width: 30px;
      //border: 1px solid ${({ theme }) => theme.color.text};
      background: ${({ theme }) => theme.color.primary};
      border-radius: 50px;
      position: relative;
      left: 10px;
      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2.5px;
        width: 25px;
        height: 25px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.color.text};
        transition: 0.3s;
      }
      &.light::after {
        top: 24px;
      }
    }
  }
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
  height: ${({ visible }) => (visible ? "calc(100% - 50px)" : "100%")};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  > p {
    width: 100%;
    color: #7a7a7a;
  }

  > div {
    width: 100%;
    max-width: 600px;
    > h1 {
      padding: 10px 0 20px 0;
    }

    > p {
      padding-bottom: 10px;
      color: #7a7a7a;
    }

    > div:nth-child(3) {
      padding: 10px 0px 20px 0;
      > span {
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.selected};
      }
    }

    > div:last-child.markdown {
      h1 {
        color: pink;
        padding: 10px 0 30px 0;
      }
    }

    &.selected {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;
