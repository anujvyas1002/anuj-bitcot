/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, STATUSES } from "../../store/contactSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  Button,
  Input
} from "@mui/material";
import { AddContact } from "./AddContact";
import { UpdateContact } from "./UpdateContact";
import RemoveContact from "./RemoveContact";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ViewDetails } from "./ViewDetails";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 450,
  },
}));

export const ContactTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //state for open add contact  Dialog
  const [isAdd, setAdd] = useState(false);

  //state for open remove Contact ConfirmBox
  const [isRemove, setRemove] = useState(false);

  //state for open edit Contact  Dialog
  const [isEdit, setEdit] = useState(false);

  
  //state for open details Contact  Dialog
  const [isDetails, setDetails] = useState(false);

  //Contact data
  const [contact, setContacts] = useState([]);

  
  // handle for search Data 
  const [searchApiData, setSearchApiData] = useState();

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [contactData, setContactData] = useState([]);


  const dispatch = useDispatch();
  const { contacts, status } = useSelector((state) => state.contact);

  
  // handle for filter value
  const [filterVal, setFilterVal] = useState();

  // setContactData(contacts);
  console.log(contacts);
  console.log(contact);
  

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  if (status === STATUSES.IDLE) {
    setTimeout(() => {
      setContactData(contacts);
      setSearchApiData(contacts);
    },);
  }

  //on click of add Contact
  const openAddForm = () => {
    setAdd(true);
  };

  //close add new Contact  Dialog
  const onCloseForm = () => {
    setAdd(false);
  };

  //refresh table after save
  const onSaveUpdateTable = () => {
    setAdd(false);
    dispatch(fetchContacts());
  };

  //after edit refresh table
  const onEditUpdateTable = () => {
    setEdit(false);
    dispatch(fetchContacts());
  };

  //on click of remove Contact ConfirmBox open
  const openConfirmBox = (contact) => {
    setRemove(true);
    setContacts(contact);
  };

  //close ConfirmBox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove Contact
  const onRemoveContact = () => {
    setRemove(false);
    dispatch(fetchContacts());
  };

  //on click of add Contact
  const openEditForm = (contact) => {
    setContacts(contact);
    setEdit(true);
  };

  const openContactDetails = (contact) =>{
    setContacts(contact);
    setDetails(true);
  }

  const onCloseDetailsBox = () => {
    setDetails(false);
  };

  //close edit Dialog
  const onCloseEdit = () => {
    setEdit(false);
  };

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }


  const handleFilter = (e) => {
    if (e.target.value === "") { 
      setContactData(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        return (
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.mobile.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      console.log(filterResult);
      setContactData([]);
      setContactData(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <>
      <div>
         {/* Searching input box */}
        

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          
          <Button
            sx={{ mt: "10px" }}
            style={{marginRight:'75%'}}
            variant="contained"
            onClick={openAddForm}
            color="primary"
            data-testid="addContactBtn"
          >
            Add Contact
          </Button>
          <div style={{float: 'right', marginTop:'10px'}}>
          <Input
            placeholder="Search"
            value={filterVal || ""}
            onChange={(e) => handleFilter(e)}
          />
          <Button>
            <SearchOutlinedIcon />
          </Button>
        </div>
        </Grid>

        <BootstrapDialog
          onClose={onCloseForm}
          aria-labelledby="customized-dialog-title"
          open={isAdd}
        >
          <AddContact
            onSaveUpdateTable={onSaveUpdateTable}
            onClose={onCloseForm}
          ></AddContact>
        </BootstrapDialog>
        <BootstrapDialog
          onClose={onCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={isEdit}
        >
          <UpdateContact
            onEditUpdateTable={onEditUpdateTable}
            onClose={onCloseEdit}
            contact={contact}
          ></UpdateContact>
        </BootstrapDialog>

        <BootstrapDialog
          onClose={onCloseDetailsBox}
          aria-labelledby="customized-dialog-title"
          open={isDetails}
        >
          <ViewDetails
           onClose={onCloseDetailsBox}
           contact={contact}
          >
          </ViewDetails>
      
         
        </BootstrapDialog>
      

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveContact
            onRemoveContact={onRemoveContact}
            onClose={onCloseConfirmBox}
            contact={contact}
          ></RemoveContact>
        </Dialog>

        <hr />
        {/* table */}
        <Paper sx={{ width: "100%", mb: 0 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className="table table-striped table-hover"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contactData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact) => (
                    <TableRow
                      key={contact.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.mobile}</TableCell>
                      <TableCell>{contact.email}</TableCell>

                      <TableCell>
                         <Fab style={{marginRight:'5px'}} size="small" color="" aria-label="edit">
                          <VisibilityIcon  onClick={() => openContactDetails(contact)}/>
                        </Fab>
                      
                          <Fab style={{marginRight:'5px'}} size="small" color="secondary" aria-label="edit">
                          <EditIcon onClick={() => openEditForm(contact)} />
                        </Fab>
                

                        <Fab size="small" color="error" aria-label="remove">
                          <DeleteIcon
                            onClick={() => openConfirmBox(contact)}
                          />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contactData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};
