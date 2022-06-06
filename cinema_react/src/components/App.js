import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {verifyToken} from '../_redux/actions/users.actions'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Authentication from '../pages/Authentication'
import 'mdbreact/dist/css/mdb.css'
import Main from '../pages/Main'
import ResponsiveAppBar from './Layout/Header'
import {
    PAGE_LOGIN,
    PAGE_MAIN,
    PAGE_ORDERS,
    PAGE_FILMS,
    PAGE_PLACES,
    PAGE_ADMIN_ORDERS,
    PAGE_PRODUCTS
} from '../consts/routes'
import PublicRoute from '../routes/PublicRoute'
import PrivateRoute from '../routes/PrivateRoute'
import RestRoute from '../routes/RestRoute'
import FilmPage from '../pages/FilmPage'
import AdminRoute from '../routes/AdminRoute'
import PlacePage from '../pages/PlacePage'
import OrderPage from '../pages/OrdersPage'
import AdminOrderPage from '../pages/AdminOrdersPage'
import ProductPage from '../pages/ProductsPage'


export const App = () => {
    const dsp = useDispatch()
    useEffect(() => {
        dsp(verifyToken())
    }, [])

    return (
        <>
        <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
                <Route path={PAGE_MAIN} element={<Main />} />
                <Route path={PAGE_FILMS} element={<FilmPage />} />

                <Route path={PAGE_LOGIN} element={<PublicRoute><Authentication /></PublicRoute>} />
                <Route path={PAGE_ORDERS} element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                <Route path={PAGE_ADMIN_ORDERS} element={<PrivateRoute><AdminOrderPage /></PrivateRoute>} />
                <Route path={PAGE_PLACES} element={<AdminRoute><PlacePage /></AdminRoute>} />
                <Route path={PAGE_PRODUCTS} element={<RestRoute><ProductPage /></RestRoute>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}