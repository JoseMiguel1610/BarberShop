import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Search_box = (props) => {

    const [newSearch, setNewSearch] = useState("");
    const {bc}=props;
    const {col_text} =props;
    const {place} =props;
    const {onChange}= props
    const {w} =props;
    const {h} =props;
    


    return (
        <View style={[styles.container,{
        width:w,
        height:h,
        
        }]}>
            <View style={[styles.card_input,{backgroundColor:bc}]}>
            
            <Icon  style={styles.icon} name='search' size={20} color={col_text}/>
            {/* <Text>|</Text> */}

                <TextInput style={styles.input} placeholder={place} placeholderTextColor={col_text}
                     onChangeText={text => onChange(text) }    />
            </View>
        </View>
    )
}

export default Search_box

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        marginTop:10,
    },
    card_input: {
        width: '100%',
        height: 40,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        borderRadius:19,
        paddingHorizontal:20
    },
    input:{
        fontSize:12
    }
})
