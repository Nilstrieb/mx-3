import React from "react";
import { Band } from "./Types";
import { Button, Modal } from "react-bootstrap";

interface Props {
    onClose: () => void;
    band: Band;
}

const ModalBand = ({ band, onClose }: Props) => {
    return (
        <div>
            <Modal show={true}>
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                </Modal.Footer>
                <Modal.Header>{band.name}</Modal.Header>
                <Modal.Body>
                    <img width="400" src={band.url_for_image_original} alt={band.name} />
                    {band.biographies.map((bio) => (
                        <div key={bio.lang}>{bio.description}</div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalBand;
