import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addContact, STATUSES } from "../../store/contactSlice";
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

export const AddContact = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.contact);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: Date.now(),
      name: data.name,
      mobile: data.mobile,
      email: data.email,
    };
    dispatch(addContact(req));
    props.onSaveUpdateTable();
  };

  // Dialog close
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Create New Contact
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <div className="form-group">
            <TextField
              type="text"
              fullWidth
              className="form-control"
              id="name"
              placeholder="Enter YourName"
              {...register("name", {
                required: "Name is Required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "name is invaild",
                },
                minLength: {
                  value: 3,
                  message: "Enter your Minimum 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Enter your Maximum 20 characters",
                },
              })}
            />
            {errors.name && (
              <Grid container alignItems="flex-start">
                <small style={{ color: "red" }}>{errors.name.message}</small>
              </Grid>
            )}
          </div>
          <label htmlFor="mobile">Mobile Number</label>
          <div className="form-group">
            <TextField
              fullWidth
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Enter Your Mobile Number"
              {...register("mobile", {
                required: "Mobile Number is Required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Mobile Number is invaild",
                },

                minLength: {
                  value: 10,
                  message: "Enter your Minimum 10 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Enter your Maximum 12 digits",
                },
              })}
            />
            {errors.mobile && (
              <Grid container alignItems="flex-start">
                <small style={{ color: "red" }}>{errors.mobile.message}</small>{" "}
              </Grid>
            )}
          </div>
          <label htmlFor="email">Email</label>
          <div className="form-group">
            <TextField
              type="text"
              fullWidth
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email is invaild",
                },   
              })}
            />
            {errors.email && (
              <Grid container alignItems="flex-start">
                <small style={{ color: "red" }}>{errors.email.message}</small>
              </Grid>
            )}
          </div>
          <hr />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            spacing={0.5}
          >
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
