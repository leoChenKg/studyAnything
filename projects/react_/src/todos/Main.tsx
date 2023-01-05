import styled from "styled-components"

const Main = styled.main`
    flex: 1;
    display: flex;
    overflow-y: auto;
    padding: 0 .5rem;

    & > article {
        flex: 1;
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);

        ul {
            height: calc(100% - 4rem);
        }
    }
    & > aside {
        overflow-x: hidden;
        overflow-y: auto;
        flex: 0;
        background: #eee;
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    &.show-details > aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }


    @media (min-width: 768px) {
        & {
            padding: 0 1rem;
        }
        &.show-details > aside {
            flex: 1;
            border-left: 1px solid #ddd;
            position: unset ;
            width: unset;
            height: unset;
        }
    }

`
export default Main