import { SAVE_LIST_FERTILIZANTES, SAVE_LIST_PRODUCCTION, SAVE_LIST_RIESGO, SAVE_LIST_TIPFERTILIZANTES, SAVE_LIST_TIPRIESGO } from './types'
import React, { useEffect, useState } from 'react'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const AddRegisters = (cantidad, precio, foto, tipoPalta, persona, avatarSource, dateTime) => async (dispatch, getState) => {
    let { ListProduction } = getState().ProductionReducer;
    console.log(ListProduction);
    ListProduction.push({ cantidad, precio, foto, tipoPalta, persona, avatarSource, dateTime })
    dispatch({
        type: SAVE_LIST_PRODUCCTION,
        payload: ListProduction
    })
}

export const AddRegistersFertilizantes = (encargado, tipofer, tipoabo, costofer, costoabo, foto1, foto2) => async (dispatch, getState) => {
    let { ListFertilizantes } = getState().ProductionReducer;
    console.log(ListFertilizantes);
    ListFertilizantes.push({ encargado, tipofer, tipoabo, costofer, costoabo, foto1, foto2 })
    dispatch({
        type: SAVE_LIST_FERTILIZANTES,
        payload: ListFertilizantes
    })
}

export const AddRegistersRiesgo = (encargado, costo, foto1, foto2, foto3) => async (dispatch, getState) => {
    let { ListRiesgo } = getState().ProductionReducer;
    console.log(ListRiesgo);
    ListRiesgo.push({ encargado, costo, foto1, foto2, foto3 })
    dispatch({
        type: SAVE_LIST_RIESGO,
        payload: ListRiesgo
    })
}

export const AddRegistersTipFertilizantes = (nombre, costo, cantidad) => async (dispatch, getState) => {
    let { ListTipFertilizantes } = getState().ProductionReducer;
    console.log(ListTipFertilizantes);
    ListTipFertilizantes.push({ nombre, costo, cantidad })
    dispatch({
        type: SAVE_LIST_TIPFERTILIZANTES,
        payload: ListTipFertilizantes
    })
}

export const AddRegistersTipRiesgo = (nombre, costo, cantidad) => async (dispatch, getState) => {
    let { ListTipRiesgo } = getState().ProductionReducer;
    console.log(ListTipRiesgo);
    ListTipRiesgo.push({ nombre, costo, cantidad })
    dispatch({
        type: SAVE_LIST_TIPRIESGO,
        payload: ListTipRiesgo
    })
}

export const SaveListRegisters= (list) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_LIST_PRODUCCTION,
        payload: list
    })
}

export const SaveListFertilizantes= (list) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_LIST_FERTILIZANTES,
        payload: list
    })
}

export const SaveListRiesgo= (list) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_LIST_RIESGO,
        payload: list
    })
}

export const SaveListTipRiesgo= (list) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_LIST_TIPRIESGO,
        payload: list
    })
}

export const SaveListTipFertilizantes= (list) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_LIST_TIPFERTILIZANTES,
        payload: list
    })
}

