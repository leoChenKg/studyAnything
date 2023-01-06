import styled from "styled-components"

const Main = styled.main`
    display: flex;
    height: calc(100% - 128px) ;
   

    & > article {
        height: 100%;
        overflow: hidden auto ;
        flex: 1;
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
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

  

    @media (any-hover:hover) {

        & > article {

            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-track {
                background: transparent;
                display: none;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 3px;
                background-color: #ccc;
                display: none;
            }

            &:hover {
                &::-webkit-scrollbar-track {
                    display: block;
                }
                &::-webkit-scrollbar-thumb {
                    display: block;
                }
            }
        }
        
    }

    @media (min-width: 768px) {
        & {
            /* padding: 0 10px 0 16px; */
            /* padding: 0 8px 0 8px; */
        }
        &.show-details {
            article {
                flex: 0 0 12rem;

                ul {
                    li {
                        border-radius: 0;

                        &::after {
                            left: 0;
                            right: 0;
                        }

                    }
                    .check-box-con,.create-time-con, .opt-con {
                        display: none;
                    }
                   .center-con {
                       padding: 0 0 0 6px;
                   }
                }
            }

            aside {
                flex: 1;
                border-left: 1px solid #ddd;
                position: unset ;
                width: unset;
                height: unset;
            }
        }
    }


    @media (min-width: 992px) {
        &.show-details { 
            article {
                flex: 0 0 20rem;

                ul {
                    .center-con {
                        flex-direction: column;
                        justify-content: center;

                        .name-con {
                            flex: unset
                        }   

                        .create-time-con {
                            flex: unset;
                            display: flex;
                            font-size: .8rem;
                            color: #aaa;
                        }
                    }
   
                }
            }
        }
        
    }

`
export default Main