import { handleActions } from 'redux-actions';
import Type from './actionTypes'


export default handleActions({

    [Type.busADD_BUS_FAIL]: (state=[],action) =>{
        return Object.assign({}, state, {})
    },

    [Type.busADD_BUS_SUCCESS]:(state=[],action) => {
        return Object.assign({}, state, {})
    },
    ["dataGET_ALL_DATA_SUCCESS"]:(state=[],action) => {
      return Object.assign({},state,action.payload.result)
    },
    ["dataGET_ALL_DATA_FAIL"]:(state=[],action) => {
      return state;
    }
},{

});