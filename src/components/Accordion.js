import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

function Accordion({ title, children, isBord, initialExpanded }) {
  const [expanded, setExpanded] = useState(initialExpanded || false);

  return (
    <>
      <AccordionWrap
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? <VscChevronDown /> : <VscChevronRight />}

        <span>{isBord ? <strong>{title}</strong> : title}</span>
      </AccordionWrap>
      <AccordionContentWrap expanded={expanded}>
        {children}
      </AccordionContentWrap>
    </>
  );
}

export default Accordion;

const AccordionWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  padding: 5px 0px;

  > span {
    padding-left: 5px;
    user-select: none;
  }
`;

const AccordionContentWrap = styled.div`
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  overflow: hidden;
  transition: ${({ expanded }) =>
    expanded ? "max-height 0.25s ease-in" : "max-height 0.1s ease-out"};

  user-select: none;
  margin-bottom: 5px;
  margin-left: 15px;
`;
