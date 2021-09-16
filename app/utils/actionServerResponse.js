import { Alert } from 'react-native';

export function actionByError(error, navigation) {
    error.response ? console.warn(error.response) : console.warn(error)
    if (error.response) {
        if (error.response.status === 401) {
            return Alert.alert(
                "Su sesión expiró",
                "Vuelva a iniciar sesión",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate('SideLogout')
                    }
                ]
            )
        } else {
            return Alert.alert(
                "Error",
                error.response.data.description || "Ocurrió un error, inténtelo más tarde.",
                [
                    {
                        text: "Ok"
                    }
                ], { cancelable: true }
            )
        }

    } else {
        return Alert.alert(
            "Error",
            "Ups! hay un problema, inténtelo más tarde.",
            [
                {
                    text: "Ok"
                }
            ], { cancelable: true }
        )
    }
}

export function actionByLoginError(error) {
    error.response ? console.log(error.response) : console.log(error)
    Alert.alert(
        "Error",
        error.response ? error.response.data.description || "Ocurrió un error, inténtelo más tarde." : "Sin respuesta del servidor, inténtelo más tarde.",
        [{ text: "Aceptar", style: "default" }]
    )
}