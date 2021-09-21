import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Modal from "react-native-modal"

const ModalAllCategories = (props) => {
    const { isModalVisible, toggleModal, onBackButtonPress, subCategorys, indSubcatSelect } = props
    // console.log("newOrderCategories:", newOrderCategories)
    return (
        <Modal isVisible={isModalVisible} style={styles.modal} onBackButtonPress={onBackButtonPress}
            animationIn="slideInDown" animationOut="slideOutUp" >
            <View style={styles.container}>

                <Text style={styles.title}>Subcategorías</Text>
                <View style={styles.container_cats}>
                    {subCategorys.map((e, ind) => (
                        <Pressable style={styles.card_cat} key={e.id} android_ripple={{ color: "#fff" }}
                            onPress={() => {
                                indSubcatSelect(ind)
                                toggleModal()
                            }} >
                            {
                                ind === 0 ? <Image source={e.iconUrl} style={{ width: 40, height: 40 }} />
                                    :
                                    <>
                                        <Image source={e.iconUrl} style={{ width: 40, height: 40 }} />
                                        <Text style={styles.name}>{e.name}</Text>
                                    </>
                            }
                        </Pressable>
                    ))}
                </View>

                <Pressable onPress={() => toggleModal()} android_ripple={{ color: "#ffaf1c" }}>
                    <Text style={styles.close}>
                        Cerrar
                    </Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default ModalAllCategories

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginBottom: 0,
        //marginTop:0,
        height: "100%",
        justifyContent: "flex-start",//Esto hace que el modal se pegue arriba
        marginTop: 5,
    },
    container: {
        backgroundColor: "#f4f4f3",
        width: "100%",
        //borderBottomLeftRadius: 20,
        //borderBottomRightRadius: 20,
        overflow: "hidden",
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20
        //height:500
    },
    close: {
        textAlign: "center",
        color: "#ff4d0e",
        fontSize: 18,
        borderTopColor: "#d3d3d3",
        borderTopWidth: 1,
        paddingVertical: 15,
        fontWeight: "bold"
    },
    title: {
        fontWeight: "bold",
        fontSize: 25
    },
    container_cats: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 20
    },
    card_cat: {
        width: 80,
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    name: {
        fontSize: 9,
        color: "#000",
        textAlign: "center"
    }
})
