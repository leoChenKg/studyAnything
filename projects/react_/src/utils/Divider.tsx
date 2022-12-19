import { FC } from 'react'
import styled from 'styled-components'

const DividerEle = styled.div`
    width:100%;
    border-top: 1px solid #9e9e9e4a;
    margin:16px 0;
`
const Divider: FC = () => {
    return <DividerEle></DividerEle>
}
export default Divider