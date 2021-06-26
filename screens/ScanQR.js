import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class ScanQR extends Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedFood: '',
        scannedDiet: '',
        scannedCondition: '',
        buttonState: 'normal',
        transactionMessage: ''
      }
    }
    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

      if(buttonState==="Food"){
        this.setState({
          scanned: true,
          scannedFood: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="Diet"){
        this.setState({
          scanned: true,
          scannedDiet: data,
          buttonState: 'normal'
        });
      }
      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }
      
      else if (buttonState === "normal"){
        return(
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
              <Image
                source={require("../assets/splash.png")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>ScaNEat</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Food"
              onChangeText={(text)=>{
                this.setState({
                  scannedFood: text
                })
              }}
              value={this.state.scannedFood}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Food")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput  
              style={styles.inputBox}
              placeholder="Diet"
              onChangeText={(text)=>{
                this.setState({
                  scannedDiet: text
                })
              }}
              value={this.state.scannedDiet}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Diet")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput  
              style={styles.inputBox}
              placeholder="Condition"
              onChangeText={(text)=>{
                this.setState({
                  scannedCondition: text
                })
              }}
              value={this.state.scannedCondition}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("Condition")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            
            
            <Text style={styles.transactionAlert}>{this.state.transactionMessage}</Text>
            <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {

              //THIS WORKS LESGOOOO!!!!, CREATE ARRAYS AND USE THIS METHOD.
              
              // let nintendoGames = ['mario','pokemon','mortal kombat','zelda','tetris'];

              // if(tsd === 'gamer'){
              // if(nintendoGames.some(n => tsf.toLowerCase().includes(n.toLowerCase())))
              //   Alert.alert("these are nintendo games");
              //   else{
              //     Alert.alert("none of these nintendo or other games are in our database");
              //   }
              // }

              var against = 0;
              var tsf = this.state.scannedFood.toLowerCase().trim();
              var tsd = this.state.scannedDiet.toLowerCase().trim();
              var tsc = this.state.scannedCondition.toLowerCase().trim();

              let againstVeg = ['chicken','beef','egg','mayonnaise','mayo','pork'];
              let againstVegan = ['chicken','beef','egg','mayonnaise','mayo','milk','cheese','dairy','curd','butter','pork']
              let againstHindu = ['beef']
              let againstJain = ['potato','onion','garlic','carrot','beetroot','radish','mushrooms','honey','beef','chicken','pork']


              if(tsd === 'vegan' && tsc === ''){
                if(againstVegan.some(n => tsf.toLowerCase().includes(n.toLowerCase())))
                  Alert.alert("There are food(s) against your diet!"),
                  console.log(tsf + ':' + tsd);
                else if (tsf === '') {
                  Alert.alert('No input in field');
                }else{
                  Alert.alert("There are either no foods against your diet or it isn't in our database");
                }
              }

              if(tsd === 'veg' && tsc === ''){
                if(againstVeg.some(n => tsf.toLowerCase().includes(n.toLowerCase())))
                  Alert.alert("There are food(s) against your diet!"),
                  console.log(tsf + ':' + tsd);
                else if (tsf === '') {
                  Alert.alert('No input in field');
                }else{
                  Alert.alert("There are either no foods against your diet or it isn't in our database");
                }
              }
                
              if(tsd === 'hindu' && tsc === ''){
                if(againstHindu.some(n => tsf.toLowerCase().includes(n.toLowerCase())))
                  Alert.alert("There are food(s) against your diet!"),
                  console.log(tsf + ':' + tsd);
                else if (tsf === '') {
                  Alert.alert('No input in field');
                }else{
                  Alert.alert("There are either no foods against your diet or it isn't in our database");
                }
              }

              if(tsd === 'jain' && tsc === ''){
                if(againstJain.some(n => tsf.toLowerCase().includes(n.toLowerCase())))
                  Alert.alert("There are food(s) against your diet!"),
                  console.log(tsf + ':' + tsd);
                else if (tsf === '') {
                  Alert.alert('No input in field');
                }else{
                  Alert.alert("There are either no foods against your diet or it isn't in our database");
                }
              }

              // anything thats not against ANY diet on the list
              if (tsf.includes('salt') || 
                 tsf.includes('dal') || 
                 tsf.includes('cumin') || 
                 tsf.includes('mango') || 
                 tsf.includes('orange') || 
                 tsf.includes('strawberry') || 
                 tsf.includes('grape') || 
                 tsf.includes('sugar') || 
                 tsf.includes('starch') || 
                 tsf.includes('pistachio') || 
                 tsf.includes('dhal') || 
                 tsf.includes('palm oil') || 
                 tsf.includes('maida') || 
                 tsf.includes('refined wheat flour') || 
                 tsf.includes('hibiscus') && 
                 tsc === '') {
                // |
                // v
                against += 0;
                console.log(tsf + ':' + tsd);
              }

              // Thread for conditions :
              if (tsc === 'diabetes') {
                if (tsf.includes('sugar') || tsf.includes('sweetener')) {
                  var diabetesA = true;
                  Alert.alert('Contains : SUGAR');
                  console.log(tsc + ' ' + tsd);
                } else if (tsf === '') {
                  Alert.alert('No input in field');
                } else {
                  diabetesA = false;
                }
                if (diabetesA === false && tsf.includes('sugar')) {
                  against += 0;
                  console.log(tsc + ' ' + tsd);
                }
              }

              // displays number of foods against diet, not needed rn

              // if(against > 0){
              //   Alert.alert('This list IS against your diet! ' + against + ' non-compliant food(s) exists in this list.')
              // }else if(against === 0){
              //   Alert.alert("None of the food(s) in this list are against your diet.")
              // }

            }}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    },
    transactionAlert:{
      margin:10,
      color: 'red'
    }
  });