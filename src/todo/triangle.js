import React, {Component} from 'react';
import Alert from 'react-s-alert';
export default class Triangle extends Component{
    constructor(props) {
        super(props);
        this.state={
            a:null,
            b:null,
            c:null
        }
    }
    handleFirstInput = (event) => {
        this.setState({a: event.target.value});
        console.log(event.target.value)
    }
    handleSecondInput = (event) => {
        this.setState({b: event.target.value});
        console.log(event.target.value)
    }
    handleThirdInput = (event) => {
        this.setState({c: event.target.value});
        console.log(event.target.value)
    }

    constructTriangle=(event)=>{
        event.preventDefault()
        if(document.querySelector("#myCanvas")){
            document.querySelector("#myCanvas").remove();
        }
        if(document.querySelector("#isTriangle")){
            document.querySelector("#isTriangle").remove();
        }
        let a = parseFloat(this.state.a);
        let b = parseFloat(this.state.b);
        let c = parseFloat(this.state.c);
        if(a+b<=c || a+c<=b||b+c<=a){
          Alert.error("Not  valid triangle sides")
        }
        else{
            document.querySelector("#canvas").innerHTML='<canvas id="myCanvas" width="500" height="500"/>';
            var canvasElement = document.querySelector("#myCanvas");
            var context = canvasElement.getContext("2d");
            context.beginPath();
            let x3=null;
            let y3 =null;
            x3  = ((a*a)-(b*b)+(c*c))/(2*a);
            let sp = (a + b + c) / 2;
            let aDifference = sp - a;
            let bDiffernece = sp - b;
            let cDifference = sp - c;
            let area = Math.sqrt(sp * aDifference * bDiffernece * cDifference);
            y3 = 2*area/a;
            context.moveTo(0, 0);
            context.lineTo(this.state.a,0);
            context.lineTo(x3, y3);
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = '#666666';
            context.stroke();
            context.fillStyle = "cyan";
            context.fill();
        }
    }
    render() {
        return(
            <div>
            <div style={{justifyContent:'center',display:'flex'}}>
                <form>
                    <label>
                        Side a:
                        <input type="text" name="Enter side a"  onChange={this.handleFirstInput}
                        />
                    </label>
                    <label>
                        Side b:
                        <input type="text" name="Enter side b"  onChange={this.handleSecondInput}
                        />
                    </label>
                    <label>
                        Side c:
                        <input type="text" name="Enter side c"  onChange={this.handleThirdInput}
                        />
                    </label>
                    <input type="submit" value="Submit" onClick={this.constructTriangle} />
                </form>

            </div>
        <div style={{marginTop:'2%',justifyContent:'center',display:'flex'}} id ="canvas">

        </div>
        </div>
        )
    }
}
