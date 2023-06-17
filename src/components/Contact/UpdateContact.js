import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  TextField,
  Grid,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateContact, STATUSES } from "../../store/contactSlice";

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

export const UpdateContact = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.contact);

  //data send for object
  let req;

  //from data
  const onSubmit = (data) => {
    req = {
      id: props.contact.id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
    };
    dispatch(updateContact(req));
    props.onEditUpdateTable();
  };

  // SetValue for input filed
  setValue("id", props.contact.id);
  setValue("name", props.contact.name);
  setValue("mobile", props.contact.mobile);
  setValue("email", props.contact.email);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // close Dialog
  const onClose = () => {
    props.onClose();
  };

  return (
    <div>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        {props.contact.name}  Update
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
              <Button
                variant="contained"
                className="float-end mt-2"
                color="primary"
                disabled={!isDirty || !isValid}
                type="submit"
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                className="me-2 float-end mt-2"
                variant="outlined"
                onClick={onClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </div>
  );
};
