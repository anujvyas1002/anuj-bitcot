import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  DialogContent,
  DialogTitle,
  Card,
} from "@mui/material";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const ViewDetails = (props) => {
  // close Dialog
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        {props.contact.name} details
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Card style = {{padding:'1%'}}>
            <h5>Name: {props.contact.name} </h5>
            <h5>Mobile Number: {props.contact.mobile}</h5>
            <h5>Email : {props.contact.email}</h5>
        </Card>  
      </DialogContent>
    </div>
  );
};
