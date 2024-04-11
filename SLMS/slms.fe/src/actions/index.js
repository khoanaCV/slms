import * as types from '../constants/index'

//DEMO CODE
export const status = () => {
    return {
        type: types.TOOGLE_STATUS,
    }
}

export const sort = (sort) => {
    return {
        type: types.SORT,
        sort
    }
}

//CODE HERE