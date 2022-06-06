import {Box, Modal} from '@mui/material'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalForm = ({ backDropOpen, setBackDropOpen, children }) => {
    return (
        <Modal
            open={backDropOpen}
            onClose={() => setBackDropOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form">
                { children }
            </Box>
        </Modal>
    )
}

export default ModalForm