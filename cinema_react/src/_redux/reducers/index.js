import {combineReducers} from 'redux'

import UsersReducer from './users.reducer'
import ShowsReducer from './shows.reducer'
import OrderReducer from './order.reducer'
import FilmsReducer from './films.reducer'
import PlacesReducer from './places.reducer'
import ProductsReducer from './products.reducer'

export default combineReducers({
    users: UsersReducer,
    shows: ShowsReducer,
    orders: OrderReducer,
    films: FilmsReducer,
    places: PlacesReducer,
    products: ProductsReducer,
})