import React from 'react';
import {vibrate} from './utils'
import { Keyboard, StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Timer></Timer>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

class Timer extends React.Component {

  constructor() {
    super();
    this.state = {"timeStart" : 0, "time" : 0 , "on" : false, "break" : false, "lengthB" : 61, "lengthT" : 61, "start" : "Start Timer", "stoptime" : 0, "stop" : "Pause Timer", "disabled" : true, "disable" : true};
  }
  startTimer = () => {
    if (this.state.on != true)
    {
      this.setState ({
        on : true,
        timeStart : Date.now(),
        start : "Reset Timer",
        disabled : false,
        break : false
      })

    }

    else
    {
      this.setState ({
        on : false,
        timeStart : Date.now(),
        start : "Start Timer",
        stop : "Pause Timer", 
        disabled : true,
        break : false
      })
    }
  } 
  componentDidMount() {
    this.interval = 
      setInterval(() => {
        let on = false
        let time = 0
        if (this.state.break) 
        {
          time = (60 * this.state.lengthB ) -  (this.state.time - this.state.timeStart) / 1000
        }
        else
        {
          time = (60 * this.state.lengthT ) -  (this.state.time - this.state.timeStart) / 1000
        }
        if (time <= 0)
        {
          if (this.state.break === false && this.state.on)
          {

            this.setState ({
              on : true,
              timeStart : Date.now(),
              start : "Reset Timer",
              disabled : false,
              break : true
      })
        }

        else if (this.state.on)
        {
          this.setState ({
            on : false,
            timeStart : Date.now(),
            start : "Start Timer",
            stop : "Pause Timer", 
            disabled : true
        })
        }
        }

        else 
        {
        this.setState ({
        time : Date.now(),
      })
    }
    }, 10)
}

calcMinutes(){
  let time = 0
  if (this.state.stop === "Continue Timer")
  {
    if (this.state.break) 
    {
      time = (60 * this.state.lengthB ) -  (this.state.stoptime - this.state.timeStart) / 1000
    }
    else
    {
      time = (60 * this.state.lengthT ) -  (this.state.stoptime - this.state.timeStart) / 1000
    }
    let strung = "" + Math.floor(time / 60)
    return strung.concat(" Minutes")
  }

  else if (this.state.on)
  {
    if (this.state.break) 
    {
      time = (60 * this.state.lengthB ) -  (this.state.time - this.state.timeStart) / 1000
    }
    else
    {
      time = (60 * this.state.lengthT ) -  (this.state.time - this.state.timeStart) / 1000
    }
    if (time <= 0)
    {
      vibrate()
    }
    let strung = "" + Math.floor(time / 60)
    return strung.concat(" Minutes")
  }
  
  else 
  {
    return null
  }
}

calcSeconds(){

  if (this.state.stop === "Continue Timer")
  {
    if (this.state.break) 
    {
      time = (60 * this.state.lengthB ) -  (this.state.stoptime - this.state.timeStart) / 1000
    }
    else
    {
      time = (60 * this.state.lengthT ) -  (this.state.stoptime - this.state.timeStart) / 1000
    }
    let minutes = Math.floor(time / 60)
    let strung = "" + (time - ((minutes) * 60)).toFixed(3)
    return strung.concat(" Seconds")
  }
  else if (this.state.on)
  {
    if (this.state.break) 
    {
      time = (60 * this.state.lengthB ) -  (this.state.time - this.state.timeStart) / 1000
    }
    else
    {
      time = (60 * this.state.lengthT ) -  (this.state.time - this.state.timeStart) / 1000
    }
    if (time <= 0)
    {
      vibrate()
      this.set
      return null
    }
    let minutes = Math.floor(time / 60)
    let strung = "" + (time - ((minutes) * 60)).toFixed(3)
    return strung.concat(" Seconds")
  }
  
  else 
  {
    return null
  }
}

set = () => {
  if (this.state.break) 
    {
      time = (60 * this.state.lengthB ) -  (this.state.time - this.state.timeStart) / 1000
    }
    else
    {
      time = (60 * this.state.lengthT ) -  (this.state.time - this.state.timeStart) / 1000
    }
  if (time <= 0)
  {

  this.setState ({
    on : false,
    timeStart : Date.now(),
    start : "Start Timer",
    stop : "Pause Timer", 
    disabled : true
  })
}
}


  getTimerL = (text) => {
    text = parseInt(text)
    this.setState({
      lengthT : text
    })
    console.log(text)
    console.log(this.state.lengthT)
      // still be able to type at start as both are ints
      if (text <= 60  && this.state.lengthB <= 60)
      {
        this.setState({
          disable : false
        })
      }


      else 
      {
        this.setState({
          disable : true
        })
      }
    }


  getBreak = (text) => {
    if (text)
    {

    text = parseInt(text)
    this.setState({
      lengthB : text
    })
    console.log(text)
    if (text <= 60  && this.state.lengthT <= 60)
      {
        this.setState({
          disable : false
        })
      }

      else 
      {
        this.setState({
          disable : true
        })
      }
    }

    else 
      {
        this.setState({
          disable : true
        })
      }

  }

  stopTimer = () => {
    if (this.state.stop === "Pause Timer")
    {
    this.setState({
      stop : "Continue Timer",
      stoptime : this.state.time
    })
    }

    else 
    {
      this.setState({
        stop : "Pause Timer",
        time : this.state.stoptime,
        timeStart : this.state.timeStart + (this.state.time - this.state.stoptime)
      })
    }

  }

render() {
  return(
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


    <View>
      <Button title = {this.state.start} onPress = {this.startTimer} disabled={this.state.disable}>Start Timer</Button>
      <Button title = {this.state.stop} onPress = {this.stopTimer} disabled={this.state.disabled}></Button>
      <View>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom:10 }}
      onChangeText = {this.getTimerL}
      placeholder=" Study Break"
      keyboardType={"numeric"}
      editable={!this.state.on}
      />
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom:10  }}
      onChangeText = {this.getBreak}
      placeholder=" Break Length"
      keyboardType={"numeric"}
      editable={!this.state.on}
      />
      </View>
        <Text>{this.calcMinutes()} {this.calcSeconds()}</Text>
    </View>
    </TouchableWithoutFeedback>
  )
}
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
