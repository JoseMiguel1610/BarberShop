import React , { useState }  from 'react'
import LinearGradient  from 'react-native-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'



const Cont_degrade2 = (props) => {

  
    const {col1} =props
    const {col2} =props
 
    const {brad} =  props;
    const {marg_top} =  props;
    const {marg_bot} =props;
    const {marg_l}=props;
    const {marg_r}=props;      
    const {pad} =  props;
    const  {ph} =props;
    const {marg}=props;
    const {elev} =  props;
    const {bc} =  props;
    const {w} =  props;
    const {jus_cont}=props;
    const {flex} = props;
    const {h} =props;
    const {pos}=props
    const {bot} =props
    const {ovf} = props
    
    return (
        // <View style={[styles.card_,{
          
        // }]}>            
            <LinearGradient style={[styles.card_,{
                width:w?w:'100%',
                borderRadius: brad?brad: 12,
                paddingHorizontal:ph,
                flex:flex,
                height: h? h : "auto",
                padding:pad,             
                margin:marg,
                elevation:elev,
                marginBottom:marg_bot,
                overflow:ovf,
                
                }]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={[col1, col2]} >  
                
                {props.children}
                        
            </LinearGradient>
              
        // </View>
    )
}

export default Cont_degrade2


const styles = StyleSheet.create({
  
    card_:{
        // width: (Dimensions.get('window').width ) ,
        width:'auto',
        height:'auto',   
        backgroundColor:'#fff',
        borderRadius:5,
         
    },
    linear_but:{
    
        height:45,
        padding:15,
        backgroundColor: 'red',
        borderRadius:12,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

elevation: 5, 
    },
    text_but:{
        fontSize:20,
        color:'#fff',
        fontWeight: 'bold',

    }
  
})
