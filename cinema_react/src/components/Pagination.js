import React from "react";

import {PAGE_SIZE} from '../utils/constants'
import {Button} from '@mui/material'
import { MDBFooter } from 'mdb-react-ui-kit'


const PaginationPage = ({ total, size, page, pageChanger }) => {
    const totalPages = Math.ceil(total / PAGE_SIZE)
    return (
        <MDBFooter className='text-center'>
        <Button disabled={!(page > 1)} onClick={() => pageChanger(page-1)} variant="contained">Prev</Button>
            {
                page > 1 && <Button onClick={() => pageChanger(page-1)} variant="contained">1</Button>
            }
            {
                page > 2 &&
                <>
                    <Button onClick={() => pageChanger(page - 1)} variant="contained">{ page - 1 }</Button>
                    <Button onClick={() => pageChanger(1)} variant="contained">...</Button>
                </>
            }
            <Button variant="contained" color="warning">{ page }</Button>
            {
                page + 1 <= totalPages &&
                <Button onClick={() => pageChanger(page+1)} variant="contained">{ page + 1 }</Button>
            }
            {
                page + 1 < totalPages &&
                <Button onClick={() => pageChanger(totalPages)} variant="contained">...</Button>
            }
            <Button disabled={!(page + 1 <= totalPages)}
                    onClick={() => pageChanger(page + 1)} variant="contained">Next</Button>
        </MDBFooter>
    )
}

// const PaginationPage = ({ total, size, page, pageChanger }) => {
//     const totalPages = Math.ceil(total / PAGE_SIZE)
//     return (
//         <MDBRow>
//             <MDBCol>
//                 <MDBPagination className="mb-5">
//                     {
//                         page > 1 &&
//                         <MDBPageItem>
//                             <MDBPageNav aria-label="Previous">
//                                 <span aria-hidden="true" onClick={() => pageChanger(page-1)}>Previous</span>
//                             </MDBPageNav>
//                         </MDBPageItem>
//                     }
//                     {
//                         page > 2 &&
//                         <MDBPageItem>
//                             <MDBPageNav onClick={() => pageChanger(1)}>
//                                 ...
//                             </MDBPageNav>
//                         </MDBPageItem>
//                     }
//                         {
//                             page > 1 &&
//                             <MDBPageItem>
//                                 <MDBPageNav onClick={() => pageChanger(page - 1)}>
//                                     { page - 1 }
//                                 </MDBPageNav>
//                             </MDBPageItem>
//                         }
//                     <MDBPageItem>
//                         <MDBPageNav>{ page }</MDBPageNav>
//                     </MDBPageItem>
//                     {
//                         page + 1 <= totalPages &&
//                         <MDBPageItem>
//                             <MDBPageNav onClick={() => pageChanger(page+1)}>{ page + 1 }</MDBPageNav>
//                         </MDBPageItem>
//                     }
//                     {
//                         page + 1 < totalPages &&
//                         <MDBPageItem>
//                             <MDBPageNav onClick={() => pageChanger(totalPages)}>...</MDBPageNav>
//                         </MDBPageItem>
//                     }
//                     {
//                         page + 1 <= totalPages &&
//                         <MDBPageItem>
//                             <MDBPageNav aria-label="Previous">
//                                 <span aria-hidden="true" onClick={() => pageChanger(page + 1)}>Next</span>
//                             </MDBPageNav>
//                         </MDBPageItem>
//                     }
//                 </MDBPagination>
//             </MDBCol>
//         </MDBRow>
//     )
// }

export default PaginationPage;