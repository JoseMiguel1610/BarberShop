import React , { useState }  from 'react'
import LinearGradient  from 'react-native-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native'



const Cont_card_color_pressable = (props) => {  
      const {brad} =  props;
      const {alignSelf} = props;
      const {marg_top} =  props;
      const {marg_bot} =props;
      const {marg_l}=props;
      const {marg_r}=props;      
      const {pad} =  props;
      const {pad_bot} =  props; 
      const { alitems } = props;     
      const {ph} =props;
      const {marg}=props;
      const {elev} =  props;
      const {bc} =  props;
      const {w} =  props;
      const {jus_cont}=props;
      const {flex} = props;
      const {h} =props;
      const {pos}=props
      const {bot} =props
      const {z} =props;
      const { onTouchEnd } = props;


    //   const {wid} =  props;



    return (
        // <View style={styles.card_}>   
        <View style={[styles.card_,{
            backgroundColor:bc,
            borderRadius:brad,
            marginTop:marg_top,
            marginLeft:marg_l,
            marginRight:marg_r,
            padding:pad,
            paddingBottom:pad_bot,
            paddingHorizontal:ph,
            margin:marg,
            elevation:elev,
            marginBottom:marg_bot,
            width:w?w:'auto',
            height:h,
            alignItems: alitems,
            alignSelf: alignSelf,
            justifyContent:jus_cont,
            flex:flex,
            position:pos,
            bottom:bot,
            zIndex:z,
         }]} onTouchEnd={onTouchEnd}>            
                {props.children}
        </View>
    )
}

export default Cont_card_color_pressable


const styles = StyleSheet.create({
    card_:{
        // width: (Dimensions.get('window').width ) ,
        width:'auto',
        height:'auto',   
        backgroundColor:'#fff',
        borderRadius:5,
        elevation:10,     
    },
    text_but:{
        fontSize:20,
        color:'#fff',
        fontWeight: 'bold',

    }
  
});
