import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import {Colors} from '../styles/colors';

export const FontColor = StyleSheet.create({  
    textButton: {                         
      color: '#868686',
      fontWeight: 'bold',
    },
    textButtonSecondary: {                         
      color: '#000',
      textTransform: 'uppercase',
      textAlign:'center',
      alignContent:'center'
    },
    textLinkPrimary:{
      color: '#ee710c',
      fontWeight: 'bold',
      textAlign:'center',
      alignContent:'center'
      
    },
     textButtonPrimary:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize:12,
      textTransform:'uppercase'
    },
    subtitle:{
      fontSize:20,
      color: Colors.background,

    },
    ///
    font_h1:{
      fontWeight: 'bold',
      fontSize:12,
    }
  });