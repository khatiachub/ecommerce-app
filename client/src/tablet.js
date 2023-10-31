import { css } from "styled-components";

export const tablet=(props)=>{
    return css`
    @media screen and (max-width: 830px) {
        ${props}
    }
    `
}