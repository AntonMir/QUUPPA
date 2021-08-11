import React from 'react'
// components
import TagMap from '@content/TagMap.js'
// img
import background from '@img/welcome/welcome_background.png'
/// styled
import styled from 'styled-components'

const Content = () => {
    return (
        <ContentStyle>
            <TagMap />
        </ContentStyle>
    )
}

export default Content

const ContentStyle = styled.div`
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    height: calc(100vh - 80px);
`
