import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface ModalProp {
    show: boolean,
    onHide: () => void,
    heading: string,
    onSave: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode
}

function CenterModal(props: ModalProp) {
    return <Modal
        show={props.show}
        size="lg"
        centered
    >
        <Modal.Header onHide={props.onHide} closeButton >
            <Modal.Title id="contained-modal-title-vcenter">
                {props.heading}
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={props.onSave}>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button type='submit'>save</Button>
            </Modal.Footer>
        </form>
    </Modal>

}

export default CenterModal