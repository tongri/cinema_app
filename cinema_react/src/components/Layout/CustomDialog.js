import {Dialog, DialogContent, DialogTitle} from '@mui/material'

export const CustomDialog = ({ children, isDialogOpen, setDialog, title }) => {
    return (
        <Dialog open={isDialogOpen} onClose={setDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}