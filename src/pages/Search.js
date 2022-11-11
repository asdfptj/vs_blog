import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData } = useContext(AppContext);
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Techhhhhh",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
  ]);

  useEffect(() => {
    const tempArr = [];

    searchTagFnc(postData);

    function searchTagFnc(nowPostDataArr) {
      nowPostDataArr.map((nowPostData) => {
        if (nowPostData.type === "post") {
          nowPostData.data.tag?.map((tag) => {
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);

            if (tempTarget) {
              tempTarget.count += 1;
            } else {
              tempArr.push({
                tegTitle: tag,
                count: 1,
                postArr: [],
              });
            }
          });
        } else {
          nowPostData.children && searchTagFnc(nowPostData.children);
        }
      });
    }
    setTagData([]);
  }, [postData]);

  return (
    <Accordion title="Tags" initialExpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag key={index}>
            {one.tagTitle} <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

export default Search;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.third};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  > span {
    color: red;
  }
`;
