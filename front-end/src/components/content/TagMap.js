import React, { useRef, useEffect } from 'react'
// WS
import io from 'socket.io-client'
// img
import background from '@img/map/map.png'
// styled
import styled from 'styled-components'

const TagMap = () => {
    const canvasRef = useRef()

    let socket = io.connect('http://localhost:9000')

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        socket.on('connect', () => {
            console.log('WS: Соединение с сервером установлено')
        })

        socket.on('transferDevicePosition', (data) => {
            if (Array.isArray(data.tags) && data.tags.length > 0) {
                let tags = data.tags
                try {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    tags.forEach((tag) => {
                        if (tag.location) {
                            console.log('X=', tag.location[0] * 54, ' Y=', 700 - tag.location[1] * 54)
                            ctx.beginPath()
                            ctx.arc(tag.location[0] * 54, 700 - tag.location[1] * 54, 10, 0, 2 * Math.PI)
                            ctx.fillStyle = '#ff0000'
                            ctx.fill()
                            ctx.stroke() // обводка фигуры (контур)
                            ctx.strokeStyle = '#000' // цвет обводки
                            ctx.closePath()
                        }
                    })
                } catch (error) {
                    console.log('Error: ', error.message)
                }
            }
        })

        return () => {
            socket.disconnect()
            console.log('WS: Соединение с сервером прервано')
        }
    })

    return (
        <Map>
            <Canvas width={648} height={702} ref={canvasRef}></Canvas>
        </Map>
    )
}

export default TagMap

const Canvas = styled.canvas`
    position: absolute;
    top: 15%;
    border: 1px #000 solid;
    background: url(${background}) no-repeat center center;
    background-size: cover;
`

const Map = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 99vw; */
    /* height: calc(99vh - 80px); */
`
