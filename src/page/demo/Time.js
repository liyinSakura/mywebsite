import React from 'react';
import digit from '../containers/time/digit';
import styles from '../../assests/css/time.css';
var vw = 1024,vh = 768,R = 8,MT = 60,ML = 30;
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000)
var curShowTimeSeconds = 0;
var balls = [];
var colors = ['#afdd22','#c9dd22','#db5a6b','#3eede7','#d6ecf0','#b0a4e3','#cca4e3','#edd1d8','#88ada6','#f0c239','#ed5736'];
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeid: '',
            vw: 1024,
            vh: 768,
            R:8,
            MT:60,
            ML: 30,
            curShowTimeSeconds: 0,
            balls: [],
            colors:['#afdd22','#c9dd22','#db5a6b','#3eede7','#d6ecf0','#b0a4e3','#cca4e3','#edd1d8','#88ada6','#f0c239','#ed5736']
        }
    }

    componentDidMount(){

        var canvas = document.getElementById('canvas')
            canvas.width = this.state.vw
            canvas.height = this.state.vh
            var ctx = canvas.getContext('2d');
            curShowTimeSeconds = this.getCurrentShowTimeSeconds()
            this.setState({
                timeid: setInterval(() => {
                    this.renderCtx(ctx)
                }, 1000)
            })
    }
    componentWillUnmount() {
        clearInterval(this.state.timeid);
    }
    getCurrentShowTimeSeconds (){
        var curTime = new Date();
        var ret = endTime.getTime() - curTime.getTime();
        ret = Math.round(ret/1000)

        return ret>=0?ret:0;
    }
    update(){

        // var nextShowTimeSeconds = this.getCurrentShowTimeSeconds();
        //
        // var nextHours = parseInt(nextShowTimeSeconds/3600);
        // var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
        // var nextSeconds = nextShowTimeSeconds%60;
        //
        // var curHours = parseInt(curShowTimeSeconds/3600);
        // var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
        // var curSeconds = curShowTimeSeconds%60;
        //
        // if (nextShowTimeSeconds!=curSeconds) {
        //     if (parseInt(curHours/10)!=parseInt(nextHours/10)) {
        //         this.addBall(ML+0,MT,parseInt(curHours/10))
        //     }
        //     if (parseInt(curHours%10)!=parseInt(nextHours%10)) {
        //         this.addBall(ML+15*(R+1),MT,parseInt(curHours%10))
        //     }
        //     if (parseInt(curMinutes/10)!=parseInt(nextMinutes/10)) {
        //         this.addBall(ML+39*(R+1),MT,parseInt(curMinutes/10))
        //     }
        //     if (parseInt(curMinutes%10)!=parseInt(nextMinutes%10)) {
        //         this.addBall(ML+54*(R+1),MT,parseInt(curMinutes%10))
        //     }
        //     if (parseInt(curSeconds/10)!=parseInt(nextSeconds/10)) {
        //         this.addBall(ML+78*(R+1),MT,parseInt(curSeconds/10))
        //     }
        //     if (parseInt(curSeconds%10)!=parseInt(nextSeconds%10)) {
        //         this.addBall(ML+93*(R+1),MT,parseInt(curSeconds%10))
        //     }
            // curShowTimeSeconds = nextShowTimeSeconds;
        // }
        // this.updateBalls()
    }
    updateBalls() {
        let balls = this.state.balls;
        let vh = this.state.vh;
        let R = this.state.R;
        let vw = this.state.vw;
        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy+=balls[i].g;
            if (balls[i].y>=vh-R) {
                balls[i].y = vh-R;
                balls[i].vy = -balls[i].vy*0.75;
            }
        }
        var cnt = 0;
        for (var i = 0; i < balls.length; i++)
            if (balls[i].x+R>0&&balls[i].x-R<vw)
                balls[cnt++] = balls[i]

        while(balls.length>Math.min(300,cnt)){
            balls.pop()
        }
        console.log(balls.length);
    }
    addBall (x,y,num) {
        let colors = this.state.colors;
        let R = this.state.R;
        let balls = this.state.balls;
        for (var i = 0; i < digit[num].length; i++)
            for (var j = 0; j < digit[num][i].length; j++) {
                if (digit[num][i][j]==1) {
                    var aBall = {
                        x:x + j*2*(R+1) + (R+1),
                        y:y + i*(R+1)*2 + (R+1),
                        g:1.5+Math.random(),
                        vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                        vy:-5,
                        color:colors[Math.floor(Math.random()*colors.length)]
                    }
                    balls.push(aBall)
                }
            }
    }
    renderCtx(ctx) {
        ctx.clearRect(0,0,vw,vh);
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        this.renderDigit(MT,ML,parseInt(hours/10),ctx);
        this.renderDigit(MT+15*(R+1),ML,parseInt(hours%10),ctx);
        this.renderDigit(MT+30*(R+1),ML,10,ctx);
        this.renderDigit(MT+39*(R+1),ML,parseInt(minutes/10),ctx);
        this.renderDigit(MT+54*(R+1),ML,parseInt(minutes%10),ctx);
        this.renderDigit(MT+69*(R+1),ML,10,ctx);
        this.renderDigit(MT+78*(R+1),ML,parseInt(seconds/10),ctx);
        this.renderDigit(MT+93*(R+1),ML,parseInt(seconds%10),ctx);

        for (var i = 0; i < balls.length; i++) {
            ctx.fillStyle=balls[i].color;
            ctx.beginPath();
            ctx.arc(balls[i].x,balls[i].y,R,0,2*Math.PI,true);
            ctx.closePath();
            ctx.fill()
        }
    }
    renderDigit(x,y,num,ctx) {
        ctx.fillStyle = 'rgb(210,147,170)';
        for (var i = 0; i < digit[num].length; i++)
            for (var j = 0; j < digit[num][i].length; j++) {
                if (digit[num][i][j] == 1) {
                    ctx.beginPath();
                    ctx.arc(x + j*2*(R+1) + (R+1),y + i*(R+1)*2 + (R+1),R,0,2*Math.PI);
                    ctx.closePath()
                    ctx.fill()
                }
            }

    }

    render(){
        return (
            <div>
                <canvas id="canvas" className={styles.wrapper}>
                    当前浏览器不支持canvas
                </canvas>
            </div>
        )
    }
}
export default Time;