import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { List, ListItem, StyleSheet, Text, View, TextInput, FlatList, Button, ScrollView, Alert } from 'react-native';

const Stack = createStackNavigator();
export default class App extends React.Component {
  render () {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SearchBar} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = 
    {
      search : null,
      err : "Search For A Movie!"
    }

    }

  SubmitSearch = () => {
    let text = this.state.search
    let page = 1
    const results = []
    let dog = `http://www.omdbapi.com/iron`
    console.log(dog)
    while (page != 0)
    {

    fetch(`http://www.omdbapi.com/?s=${text}&apikey=ba21e071`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      totalResults = responseJson["totalResults"] - page * 10
      if (totalResults > 0)
      {
        page++
        results.push(responseJson)
      }
      else
      {
        page = 0
        if(responseJson["Response"] != "False")
        {
          results.push(responseJson)
          this.props.navigation.push("Results", results)
        }
      

        else
        {
          console.log("hi")
          this.setState({
            err : responseJson["Error"]
          })
          Alert.alert(
            "Alert Title",
            "My Alert Msg",
          );
        }
    }
    })
  }
  }

  HandleSearch = (text) => {
    this.setState({
      search:text
    })
  }
  render() {
    return(
  
  <View style={styles.container}>
    <Text>{this.state.err}</Text>
    <TextInput onChangeText={this.HandleSearch} onSubmitEditing={this.SubmitSearch} placeholder="lol"></TextInput>
    <Button>onPress={() => this.props.navigation.navigate('Results')}</Button>
  </View>
    )}
}

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = 
    {

    }

    }

    render() {
      return(
      <View>
      <Text>{this.props.route.params.Title}</Text>
      </View>
      )
    }
}

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = 
    {

    }

    }

    handleDetail(id) {
      fetch(`http://www.omdbapi.com/?i={id}&apikey=ba21e071`)
      .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.props.navigation.push("Details", responseJson)
    }
    )
  }
  render() {
    console.log("lol")
    console.log(this.props.route.params)
    return (
    <FlatList data={this.props.route.params["Search"]}
    keyExtractor={item => item.imdbID}
      renderItem={({ item }) => (
        <View>
        <Text>
          Title:{item.Title}
        </Text>
        <Button onPress={() => {
           fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=ba21e071`)
           .then((response) => response.json())
         .then((responseJson) => {
           console.log(responseJson)
           this.props.navigation.push("Details", responseJson)})}}>Find Out More!</Button>
        </View>
      )}/>




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
