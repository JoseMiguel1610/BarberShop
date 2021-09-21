import React, { useState } from 'react'
import { Image as ImageNormal } from "react-native"
import LoadingImg from './loadingImg'
import FastImage from 'react-native-fast-image';
import { validURL } from '../validation';

const ImgErr = ({ uri, style, resizeMode, loading }) => {
    const [errorPhoto, setErrorPhoto] = useState(false)
    const [loadingState, setLoadingState] = useState(true)
    uri = validURL(uri) && uri
    return (
        !errorPhoto && uri ? (
            <>
                <FastImage
                    style={style}
                    source={{
                        uri,
                        //headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={resizeMode === "contain" ? FastImage.resizeMode.contain : resizeMode === "stretch" ? FastImage.resizeMode.stretch : FastImage.resizeMode.cover}
                    onError={() => setErrorPhoto(true)} onLoad={() => setLoadingState(false)}
                />
                {
                    loadingState && loading && <LoadingImg style={style} />//falta mejorar para q el with y height sean los requeridos
                }
            </>
        ) :
            (
                <ImageNormal source={require("../../../assets/error-img.png")} resizeMode={resizeMode || "cover"}
                    style={style} />
            )
    )
}



export default ImgErr
