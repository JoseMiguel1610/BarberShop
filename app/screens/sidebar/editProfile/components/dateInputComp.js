import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

const initDateSelect = new Date()
initDateSelect.setFullYear(2000)
initDateSelect.setMonth(0)
initDateSelect.setDate(1)

const DateInputComp = ({ isModalVisible, date, setDate, closeModal, selectDate }) => {
  return (
    <>
      <Modal isVisible={isModalVisible} onBackButtonPress={() => closeModal()} onBackdropPress={() => closeModal()}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 200 }}>
          <View style={{ width: "100%", position: "relative", height: 40 }}>
            <Icon name='closecircle' color={"#b99a55"} size={40}
              onPress={closeModal} style={{ right: 0, position: "absolute" }}
            />
          </View>
          <View style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
            <DatePicker
              date={date}
              onDateChange={setDate}
              mode="date"
              locale="es_ES"
              maximumDate={new Date()}
            //minimumDate={new Date("01/01/1900")}
            />
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <View style={styles.containerBtn}>
              <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                onPress={selectDate}>
                <View style={{marginVertical: 12}}>
                  <Text style={styles.textbtn}>S E L E C C I O N A R</Text>
                  <Text style={styles.textbtn}>F E C H A</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </>
  )
}

export default DateInputComp

const styles = StyleSheet.create({
  containerBtn: {
    width: 200,
    backgroundColor: "#b99a55",
    marginVertical: 10,
    overflow: "hidden"
  },
  textbtn: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
})
