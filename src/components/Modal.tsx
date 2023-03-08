import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface ModalProps {
    isModalOpen: boolean
    onClose: () => void
    modalData: any
}

const CapsuleModal: React.FC<ModalProps> = (props) => {
    const { isModalOpen, onClose, modalData } = props
    const { 
        id,
        type,
        status,
        serial,
        launches = [],
        last_update,
        land_landings,
        water_landings,
        reuse_count, } = modalData
    return (
        <div>
            {id && <Modal isOpen={isModalOpen} toggle={onClose} {...props}>
                <ModalHeader toggle={onClose}>{type + " " + serial}</ModalHeader>
                <ModalBody>
                <ul>
                  <li className="mb-1">{launches.length} launches</li>
                  <li className="mb-1">{land_landings} land landings</li>
                  <li className="mb-1">{water_landings} water landings</li>
                  <li className="mb-1">Reused {reuse_count} times</li>
                  {status === "active" ? (
                    <li className="text-emerald-500">Active</li>
                  ) : (
                    <li className="text-rose-500">{status}</li>
                  )}
                </ul>
                <p className="mt-5 opacity-75">{last_update}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>}
        </div>
    );
}

export default CapsuleModal;