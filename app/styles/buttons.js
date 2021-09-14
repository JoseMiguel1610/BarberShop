import {StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from './colors';

export const buttons = StyleSheet.create({  
    primary: {                         
      flex: 1,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20
    },
    secondary:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    login:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width:250,
        alignItems:'center',
    },
    buttonPrimary:{
        backgroundColor: Colors.colorPrimary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width:250,
        alignItems:'center',
    },
    but_nar:{
      backgroundColor: Colors.colorPrimary,
    }
  })

//   import { styles, buttons } from './component/styles'          ❶
  
//  <View style={styles.container}>                               ❷
//    <TouchableHighlight style={buttons.primary} />              ❸
//      ...
//    </TouchableHighlight>
//  </View>