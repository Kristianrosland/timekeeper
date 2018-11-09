import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import moment from 'moment';
import 'moment-duration-format';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    background-color: #282c34;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
`;

const TotalTimeLabel = styled.h1`
  color: white;
  font-size: 10rem;
`;


const Button = styled.button`
  width: 400px;
  height: 100px;
  background-color: ${props => (props.running ? 'red' : 'green')};
  color: white;
  font-size: 400%;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 30px;
`;

const RestartButton = styled.button`
  background-color: gray;
  align-self: flex-end;
  width: 200px;
  height: 70px;
  margin-right: 20px;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 180%;
  text-transform: uppercase;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { time: (24 * 60 * 60), running: false };
  }

  onClick = () => {
    const { running } = this.state;
    if (running) {
      clearInterval(this.timer);
      this.setState({ running: false });
    } else {
      this.timer = setInterval(() => this.setState(prevState => ({
        time: prevState.time - 1,
      })), 1000);
      this.setState({ running: true });
    }
  }

  reset = () => {
    clearInterval(this.timer);
    this.setState({ running: false, time: (24 * 60 * 60) });
  }

  formatTime = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    return duration.format('hh:mm:ss');
  }

  render() {
    const { time, running } = this.state;
    return (
      <React.Fragment>
        <GlobalStyle />
        <Wrapper>
          <RestartButton onClick={this.reset}>
            Restart
          </RestartButton>
          <TotalTimeLabel>
            { this.formatTime(time) }
          </TotalTimeLabel>
          <Button onClick={this.onClick} running={running}>
            {running ? 'Stopp' : 'Start'}
          </Button>
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default App;
