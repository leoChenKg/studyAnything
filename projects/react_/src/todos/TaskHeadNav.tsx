import { useEffect, useState } from "react"
import styled from "styled-components"
import CheckBox, { CheckStatus, CheckboxProps } from "./CheckBox"



const TaskHeadNav = styled.nav` 
    height: 3rem;
    border-bottom: 1px solid #ddd;
    display:  none;
    font-size: 0.875rem;


    .check-box-con, .name-con, .create-time-con,.opt-con {
        display: flex;
        align-items: center;
    }

    .check-box-con {
        flex: 0 0 4rem;
        justify-content: center;
    }
    .name-con {
        flex: 1.5 2;
    }
    .create-time-con {
        flex: 1 3;
    }
    .opt-con {
        flex: 0 0 4rem;
    }



    @media (min-width: 768px) {
        & {
            display: flex;
        }
    }
`
const Nav = () => {

    const [state, setState] = useState<CheckStatus>("unchecked")

    useEffect(() => {
        setTimeout(() => {
            setState("partial-checked")
        }, 3000)
    })

    const onChange: CheckboxProps["onChange"] = (status) => {
        console.log(status)
    }
    return <TaskHeadNav>
        <div className="check-box-con">
            <CheckBox onChange={onChange} checkStatus={state} />
        </div>
        <div className="name-con">
            <span>任务名称</span>
        </div>
        <div className="create-time-con">
            <span>创建时间</span>
        </div>
        <div className="opt-con">
            <span>操作</span>
        </div>
    </TaskHeadNav>
}

export default Nav