import { FC } from "react"
import styled from "styled-components"
import CheckBox, { CheckStatus, CheckboxProps } from "./CheckBox"



const TaskHeadNav = styled('nav')` 
    height: 3rem;
    color: #666;
    font-size: 0.875rem;
    position: sticky;
    top: 0;
    z-index: 9;
    display:  flex;
    border-bottom: 1px solid #eee;
    background-color: #fff;


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
`
interface NavProps {
    checkStatus: CheckStatus,
    checkChange: (checked: boolean) => void
}
const Nav: FC<Partial<NavProps>> = (props) => {

    const { checkStatus, checkChange } = props

    const onChange: CheckboxProps["onChange"] = (status) => {
        if (checkChange) {
            checkChange(status)
        }
    }
    return <TaskHeadNav>
        <div className="check-box-con">
            <CheckBox checkStatus={checkStatus} onChange={onChange} />
        </div>
        <div className="name-con">
            <span>名称</span>
        </div>
        <div className="create-time-con">
            <span>时间</span>
        </div>
        <div className="opt-con">
            <span>操作</span>
        </div>
    </TaskHeadNav>
}

export default Nav