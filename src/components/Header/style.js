import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: #20295F;
    display: flex;
    border-bottom: 5px solid #EE6B26
`

export const LeftSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    img {
        width: 130px;
        height: 60px
    }
`

export const RightSide = styled.div`


    a {
        color: #03030B;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;

        &:hover {
            color: #2da77a;
            transition: 0.5s;
        }
    }
`