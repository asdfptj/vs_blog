import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { VscChromeClose } from "react-icons/vsc";

export default function PostWrap({ path, title, isClose }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(path);

    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }

  return (
    <PostWrapStyled
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      <span
        className={isClose && selectedPost === path ? "visible" : ""}
        isClose={isClose}
        onClick={(e) => {
          e.stopPropagation();
          const openPostFilter = openPost.filter((one) => one !== path);
          setOpenPost(openPostFilter);
          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      >
        <VscChromeClose />
      </span>
      &nbsp;&nbsp; &nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

const PostWrapStyled = styled.div`
  cursor: pointer;
  padding: 5px 0;
  position: relative;
  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }
  &:hover > span {
    display: ${({ isClose }) => (isClose ? "block" : "none")};
  }
  > span {
    display: none;
    top: 8px;
    left: 3px;
    position: absolute;

    &.visible {
      display: block;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  background-color: ${({ selected, theme }) =>
    selected ? `${theme.color.selected}` : ""};
`;
