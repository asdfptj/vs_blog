import React, { useState } from 'react'
import styled from 'styled-components'
import { VscFiles, VscSearch } from "react-icons/vsc";


const listArr = [
    {
        icon: <VscFiles />,
        path: "post",
    },
    {
        icon: <VscSearch />,
        path: "search",
    },
]

function Main() {
    const [selected, setSelected] = useState(null)

    return (
        <Wrap>
            <LeftBar>
                {listArr.map((one, index) => (
                    <IconWrap
                        selected={selected === index}
                        onClick={() => {
                            setSelected(index)
                        }}
                    >
                        {one.icon}
                    </IconWrap>
                ))}
            </LeftBar>
        </Wrap>
    );
}

export default Main;

const Wrap = styled.div`
    height: 100vh;
    background-color: #252526;
`;
const LeftBar = styled.div`
    width: 50px;
    height: 100%;
    background-color: #333333;
`
const IconWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 0;
    cursor: pointer;

    > svg {
        color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
    }
`;