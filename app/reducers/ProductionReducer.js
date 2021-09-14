import { SAVE_LIST_FERTILIZANTES, SAVE_LIST_PRODUCCTION, SAVE_LIST_RIESGO, SAVE_LIST_TIPFERTILIZANTES, SAVE_LIST_TIPRIESGO } from '../actions/types'
import { storeListFertilizantes, storeListRegisters, storeListRiesgo, storeListTipFertilizantes, storeListTipRiesgo } from '../utils/AsyncStore';

const INIT_STATE = {
    ListProduction: [],
    ListFertilizantes: [],
    ListTipFertilizantes: [],
    ListRiesgo: [],
    ListTipRiesgo: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SAVE_LIST_PRODUCCTION:
            async function save() {
                await storeListRegisters(action.payload)
            }
            save()
            return { ...state, ListProduction: action.payload };

        case SAVE_LIST_FERTILIZANTES:
            async function save1() {
                await storeListFertilizantes(action.payload)
            }
            save1()
            return { ...state, ListFertilizantes: action.payload };

        case SAVE_LIST_RIESGO:
            async function save2() {
                await storeListRiesgo(action.payload)
            }
            save2()
            return { ...state, ListRiesgo: action.payload };

        case SAVE_LIST_TIPRIESGO:
            async function save3() {
                await storeListTipRiesgo(action.payload)
            }
            save3()
            return { ...state, ListTipRiesgo: action.payload };

        case SAVE_LIST_TIPFERTILIZANTES:
            async function save4() {
                await storeListTipFertilizantes(action.payload)
            }
            save4()
            return { ...state, ListTipFertilizantes: action.payload };

        default: return { ...state };
    }
}