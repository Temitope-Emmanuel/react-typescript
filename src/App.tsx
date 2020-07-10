import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from "./Confirm"
import { render } from '@testing-library/react';

interface IState{
  confirmOpen:boolean;
  confirmMessage:string;
  countDown:number;
  confirmVisible:boolean;
}

class App extends React.Component<{},IState>{
  
  private timer:number = 0;
  private renderCount: number = 0;

  constructor(props:{}){
    super(props);
    this.state = {
      confirmOpen:false,
      confirmMessage:"Please hit the Confirm Button",
      confirmVisible:true,
      countDown:10
    }
  }
  public componentDidMount(){
    this.timer = window.setInterval(() => this.handleTimerTick(),
    1000)
  }
  public componentWillUnmount(){
    clearInterval(this.timer)
  }

  // public static getDerivedStateFromProps(props:{},state:IState){
  //   console.log("getDerivedStataFromProps",props,state)
  //   return null
  // }
  // public getSnapshotBeforeUpdate(prevProps:{},prevState:IState){
  //   this.renderCount++;
  //   console.log("getSnapShotUpdate",prevProps,prevState,{
  //     renderCount:this.renderCount
  //   })
  //   return this.renderCount
  // }
  // public componentDidUpdate(prevProps:{},prevState:IState,snapshot:number){
  //   console.log("ComponentDidUpdate",prevProps,prevState,snapshot,{
  //     renderCount:this.renderCount
  //   })
  // }
  // public shouldComponentUpdate(nextProps:{},nextState:IState){
  //   console.log("ShouldComponentUpdate",nextProps,nextState)
  //   // return true
  //   return false
  // }

  private handleTimerTick(){
    this.setState(
      {
        confirmMessage:`Please hit the Confirm button ${
          this.state.countDown
        } secs to go`,
        countDown:this.state.countDown - 1
      },
      () => {
        if(this.state.countDown <= 0){
          clearInterval(this.timer);
          this.setState({
            confirmMessage:"Too late to Confirm",
            confirmVisible:false
          })
        }
      }
    );
  }

  private handleCancelConfirmClick = () => {
    this.setState(curSt => ({
      confirmMessage:"Take a break, I'm sure you will later",
      confirmOpen:!curSt.confirmOpen
    }))
    clearInterval(this.timer);
  }
  private handleOkConfirmClick = () => {
    this.setState(curSt => ({
      confirmMessage:"Cool, carry on reading",
      confirmOpen:!curSt.confirmOpen
    }))
    clearInterval(this.timer);
  }
  

  public render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Okay Once A Rasta Man Rapid Fire
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {
          this.state.confirmVisible && 
          <button onClick={this.handleOkConfirmClick}>Confirm</button>
        }
        <Confirm
          open={this.state.confirmOpen}
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
          cancelCaption="No Way"
          okCaption="Yes please"
          title="React And TypeScript"
          content="Are You Sure You Want To Learn React And TypeScript"/>
      </div>
    );
  }
}


export default App;
