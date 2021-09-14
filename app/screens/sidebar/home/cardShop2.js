import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingImg from '../../../utils/components/loadingImg';

const CardShop2 = (props) => {
    const { name, category, img } = props
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <Image source={{ uri: img }} style={styles.img} indicator={LoadingImg} />
            <View style={styles.container_description}>
                <Text style={[styles.name, { color: theme.dark ? "#fff" : "black"}]}>{name}</Text>
                <Text style={[styles.category, { color: theme.dark ? "#fff" : "black"}]}>{category}</Text>
                <View style={styles.container_icons}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4].map(e => <Icon name='star-sharp' size={14} color="#ff9300" style={styles.icon} key={e} />)}
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default CardShop2

const styles = StyleSheet.create({
    container: {
        width: 130,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginRight: 20
    },
    img: {
        width: 110,
        height: 100,
        borderRadius: 15,
        alignSelf:"center"
    },
    stars: {
        flexDirection: "row"
    },
    name: {
        fontSize: 10.5,
        fontFamily: "Poppins-Medium",
        textTransform: "uppercase"
    },
    category: {
        fontSize: 10,
        fontFamily: "Poppins-Medium",
        color: "#888888"
    },
    container_icons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})
