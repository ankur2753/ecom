import React from 'react'
import '../css/Loader.css'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IReduxState } from '../constants/interfaces'

const Loader: React.FC = () => {
    const show = useSelector((state: IReduxState) => state.Loader)
    return (
        <Modal
            show={show}
            keyboard={false}
            backdrop="static"
        >
            <div className="body">
                <div className="loader-container">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </Modal>
    )
}

export default Loader