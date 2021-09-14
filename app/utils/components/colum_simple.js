import React , { useState }  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'



const Colum_simple = (props) => {  
    // const {pad_end} =props;

 const {alitems} =props;
 const {jus_cont} =props;
 const {tav}=props;
 const {w} =props;
 const {pad_st} =props;
 const {pad_end} =props;
 const {pad_top} =props;
 const {pad_bot} =props;
 
 const {flex} =props;
 const {bc} = props;
 const {top} =props


    return (
        <View style={[styles.col,{ alignItems:alitems,
        justifyContent:jus_cont,
        textAlignVertical: tav,
        paddingStart:pad_st,
        paddingEnd:pad_end, 
        paddingTop:pad_top,
        paddingBottom:pad_bot,
        width:w,
        flex:flex,
        backgroundColor:bc,
        top:top,
        }]}>
              {props.children}
        </View>
    )
}

export default Colum_simple


const styles = StyleSheet.create({
    col:{
        // width:'100%',
        flexDirection:'column',
        justifyContent:'space-between',       
        alignContent:'center',
        // backgroundColor:'red'
    },
  
 
  
})
