import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import Header from '../components/header'
import ItemStore from './itemStore'
import { useSelector } from 'react-redux'
import SpinnerModal from '../../../../utils/components/spinnerModal'
import MapShops from '../components/mapShops'
import axios from 'axios'
import { Config } from '../../../../configuration/config'
import { actionByError } from '../../../../utils/actionServerResponse'

const Estilitas = (props) => {
    const { navigation, route: { params } } = props
    console.log("params props:", params);
    const { id, iD_SERVICIO, precio } = params
    const [selectOption, setSelectOption] = useState(0)
    const [stores, setStores] = useState(null)
    const [loading, setLoading] = useState(false)
    const [indSubcat, setIndSubcat] = useState(0)
    const [storeSearch, setStoreSearch] = useState([])
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [focus, setFocus] = useState(true)
    const nameCategory = "Estilistas"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const url_data = Config.URL_SERVER + "/Estilistas/"

    const estilistas = [
        {id: 1, nameStore: "Pepito", nameSubcategory: "fade"},
        {id: 2, nameStore: "Pepito", nameSubcategory: "fade"},
        {id: 3 ,nameStore: "Pepito", nameSubcategory: "fade"},
    ]

    useEffect(()=>{
        async function getEstilistas() {
            setLoading(true)
            try {
                const res = await axios.get(url_data + id, { headers: { "authorization": `Bearer ${Token}` } });
                console.log("Resultado de servicios: ", res.data.objModel);
                setStores(res.data.objModel)
                setLoading(false)
            }
            catch (error) {
                setLoading(false)
                actionByError(error, navigation)
            }
        }
        getEstilistas()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header nameCategory={nameCategory} subCategorys={estilistas} indSubcatSelect={(ind) => indSubcatSelect(ind)} indSubcat={indSubcat}
                 />

            <View style={styles.container}>
                    {
                        stores ?
                            (
                                !selectOption ?

                                    (stores.length > 0 ? <FlatList
                                        data={stores}
                                        style={{ paddingHorizontal: "7%" }}
                                        renderItem={({ item }) => <ItemStore {...item} iD_SERVICIO={iD_SERVICIO} precio={precio} />}
                                        keyExtractor={(item) => item.dni}
                                    /> :
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        </View>)
                                    :
                                    focus && <MapShops stores={stores} setSelectOption={setSelectOption} />
                            )
                            :
                            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", flex: 1 }}>
                                <ActivityIndicator size="large" color="#df9063" />
                            </View>
                    }
                {/*   <Image source={require("../../../../../../assets/nohaytiendas.png")}
                                    style={{ width: "100%", height: 160 }} resizeMode="contain" /> */}
            </View>
            <SpinnerModal loading={loading} text="Cargando estilistas" />
        </View>
    )
}

export default Estilitas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:0,
        // backgroundColor:'red'
    },

})
