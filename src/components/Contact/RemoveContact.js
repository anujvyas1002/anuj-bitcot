import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { removeContact, STATUSES } from "../../store/contactSlice";

const RemoveContact = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.contact);

  // Delete Contact Delete Api Call
  const deleteContact = (id) => {
    dispatch(removeContact(id));
    props.onRemoveContact();
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //close ConfirmBox
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      {/* conformation Box */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete{" "}
          <b>
            {props.contact.name} 
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => deleteContact(props.contact.id)}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default RemoveContact;
