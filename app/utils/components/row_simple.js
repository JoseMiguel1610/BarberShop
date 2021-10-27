import React , { useState }  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'



const Row_simple = (props) => {  
      
    const {jus_cont} =props;
    const {alitems } =props
    const {pad_top} =props;
    const {pad_bot} =props;
    const {pad_h} =props;
    const {pad_end} =props;
    const {mar_bot}=props;
    const {mar_top}=props;
    const { margin } = props;
    const {mar_l}=props;
    const {w} = props;
    const {bc} =props; 
    const {flex} =props;
    const {z}=props;
    const {top} = props;
    const {h} = props;


    return (
        <View  style={[styles.rows,{
        justifyContent:(jus_cont!=null)?jus_cont : "space-between",
        paddingTop:pad_top,
        alignItems: alitems,
        paddingBottom:pad_bot,
        paddingEnd:pad_end,
        paddingHorizontal:pad_h,
        marginBottom:mar_bot,
        marginTop:mar_top,
        marginLeft:mar_l,
        margin: margin,
        width:w,
        height: h,
        backgroundColor:bc,
        flex:flex,
        zIndex:z,
        top:top,
        
        }]}>
              {props.children}
        </View>
    )
}

export default Row_simple


const styles = StyleSheet.create({
    rows:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',       
        alignContent:'center',
    },
  
 
  
})
