import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import { IReduxState } from '../constants/interfaces'
import { LOGIN } from '../constants/links'

const RestrictedRoute: React.FC<{ GivenElemnt: JSX.Element, path: string }> = ({ GivenElemnt, path }) => {
    const id = useSelector((state: IReduxState) => state.UserId)
    if (id === null) {
        return <Navigate to={LOGIN.to} />
    }
    return (
        <Route path={path} element={GivenElemnt} />
    )
}

export default RestrictedRoute