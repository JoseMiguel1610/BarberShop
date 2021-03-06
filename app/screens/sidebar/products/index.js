import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native'
import Header from './components/header'
import ItemStore from './components/itemStore'
import Options from './components/options'
import { useSelector } from 'react-redux'
import SpinnerModal from '../../../utils/components/spinnerModal'
import MapShops from './components/mapShops'
import axios from 'axios'
import { Config } from '../../../configuration/config'
import { actionByError } from '../../../utils/actionServerResponse'

const Shops = (props) => {
    const { navigation, route: { params } } = props
    const {nameCategory, id} = params
    console.log("Propiedades:", id);
    const [selectOption, setSelectOption] = useState(0)
    const [stores, setStores] = useState(null)
    const [loading, setLoading] = useState(false)
    const [indSubcat, setIndSubcat] = useState(0)
    const [storeSearch, setStoreSearch] = useState([])
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [focus, setFocus] = useState(true)
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const url_data = Config.URL_SERVER + "/Categorias/servicios/"
    console.log(Token);

    const subCategorys = [
        {id: 1, name: "asdf", iconUrl: "https://conceptodefinicion.de/wp-content/uploads/2014/05/Imagen-2.jpg"},
        {id: 2, name: "asdfgh", iconUrl: "https://conceptodefinicion.de/wp-content/uploads/2014/05/Imagen-2.jpg"}
    ]

    useEffect(() => {
        console.log("SErvicooooos");
        async function getServicios() {

            try {
                const res = await axios.get(url_data + id, { headers: { "authorization": `Bearer ${Token}` } });
                console.log("Resultado de servicios: ", res.data.objModel);
                setStores(res.data.objModel)
            }
            catch (error) {
                actionByError(error, navigation)
            }
        }
        getServicios()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header nameCategory={nameCategory} subCategorys={subCategorys} indSubcatSelect={(ind) => indSubcatSelect(ind)} indSubcat={indSubcat}
                 />

            <View style={styles.container}>
                {!searchEnabled ? <>
                    {
                        stores ?
                            (
                                !selectOption ?

                                    (stores.length > 0 ? <FlatList
                                        data={stores}
                                        style={{ paddingHorizontal: "5%" }}
                                        renderItem={({ item }) => <ItemStore {...item} subCategorys={subCategorys} id={id} />}
                                        keyExtractor={(item) => item.iD_SERVICIO.toString()}
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
                </>
                    :
                    <>
                        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold", marginVertical: 10 }}>B??squeda</Text>
                        <FlatList
                            data={storeSearch}
                            style={{ paddingHorizontal: 0 , }}
                            renderItem={({ item }) => <ItemStore {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </>
                }
                {/*   <Image source={require("../../../../../../assets/nohaytiendas.png")}
                                    style={{ width: "100%", height: 160 }} resizeMode="contain" /> */}
            </View>
            <SpinnerModal loading={loading} text="Cargando tiendas" />
        </View>
    )
}

export default Shops

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:0,
        // backgroundColor:'red'
    },

})
