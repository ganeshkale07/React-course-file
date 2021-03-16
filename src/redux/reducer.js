import { DISHES } from '../shared/dishes.js';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';

export const initialState = {
      dishes :DISHES,
      promotions : PROMOTIONS,
      leaders:LEADERS,
      comments:COMMENTS
};

export const Reducer = (state= initialState ,action ) =>{//state= initialstate when application render first time state should not empty
    return state

};