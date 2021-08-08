import React, {useRef, useEffect} from 'react';
// WS
import io from "socket.io-client"
// store
import canvasState from '@store/canvasState.js'
import {observer} from 'mobx-react-lite';
// img
import background from '@img/map.png'
// styled
import styled from 'styled-components'


const TagMap = observer(() => {

    const canvasRef = useRef()
    let socket = io.connect("http://localhost:5000");

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        const canvas = canvasState.canvas;        
        const ctx = canvas.getContext("2d");
        socket.on("connect", () => {
            console.log('---','FRONT_END: Соединение успешно установлено'); 
        })
   
        socket.on('transferTagData', (data) => {
            let tags = data.tags;
           
            if(Array.isArray(tags) && tags.length > 0) {
                try {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    tags.map(tag => {
                        console.log('x= ',tag.location[0] * 54, ' y = ',700 - tag.location[1] * 54)
                        ctx.beginPath();
                        ctx.arc((tag.location[0] * 54), 700 - (tag.location[1] * 54), 10, 0, 2*Math.PI);
                        ctx.fillStyle="#ff0000";
                        ctx.fill();
                        ctx.stroke(); // обводка фигуры (контур)
                        ctx.strokeStyle="#000"; // цвет обводки
                        ctx.closePath();
                    })
                } catch(error) {
                    console.log('Error: ', error)
                }
            }            
        })

    }, [])
    
    return (
        <Map>
            <Canvas width={648} height={702} ref={canvasRef}></Canvas>
        </Map>
    );
})

export default TagMap;


const Canvas = styled.canvas`
    position: absolute;
    border: 1px #000 solid;
    background: url(${background}) no-repeat center center;
    background-size: cover;
`


const Map = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`