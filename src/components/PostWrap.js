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
      &nbsp;&nbsp;
      <span className={isClose && selectedPost === path ? "visible" : ""}>
        <VscClose />
      </span>
      &nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

export default PostWrap;

const PostWrapStyled = styled.div`
  margin: 5px 0;
  cursor: pointer;

  &:not(.selected):hover {
    background-color: #3c3c3c;
  }

  &.selected {
    background-color: #505050;
  }

  > span {
    display: none;

    &.visible {
      display: block;
    }
  }
`;
