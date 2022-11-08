import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { VscClose } from "react-icons/vsc";

function PostWrap({ path, title, isClose }) {
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
        onClick={(e) => {
          e.stopPropagation();

          const openPostFilter = openPost.filter((one) => one !== path);
          setOpenPost(openPostFilter);

          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      >
        <VscClose />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

export default PostWrap;

const PostWrapStyled = styled.div`
  margin: 5px 0;
  cursor: pointer;
  position: relative;

  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }

  &:hover > span {
    display: block;
  }

  > span {
    position: absolute;
    top: 1px;
    left: 5px;
    display: none;

    &.visible {
      display: block;
    }
  }
`;
