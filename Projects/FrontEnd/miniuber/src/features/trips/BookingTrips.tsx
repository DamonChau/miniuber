/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAddTripMutation, useGetAllTripsQuery } from "./tripsApi";
import { usersApi, useAddUserMutation } from "../users/usersApi";
import { useAddCustomerMutation, customersApi } from "./customerApi";
import {
  Customers,
  Status,
  Trips,
  UserRole,
  Users,
  TripStatus,
} from "../../models/type";
import { useAppDispatch } from "../../services";
import { v4 as uuidv4 } from "uuid";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BookingTrips = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [customerName, setCustomnerName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [tripFrom, setTripFrom] = useState("");
  const [tripTo, setTripTo] = useState("");
  const dispatch = useAppDispatch();

  const {
    data: trips,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllTripsQuery();
  const [addUser] = useAddUserMutation();
  const [addCustomer] = useAddCustomerMutation();
  const [addTrip] = useAddTripMutation();

  useEffect(() => {
    if (trips) {
      console.log(trips);
    }
  }, [trips]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSave = async () => {
    debugger; // eslint-disable-line no-debugger
    try {
      let user = {} as Users;
      let customer = {} as Customers;

      //find whether users exists
      const result1 = dispatch(
        usersApi.endpoints.getUserByPhoneNo.initiate(phoneNo)
      );
      try {
        user = await result1.unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        result1.unsubscribe();
      }
      //if user not exists add user/customer
      if (!user) {
        user = {} as Users;
        user.id = uuidv4();
        user.phoneNo = phoneNo;
        user.userName = customerName;
        user.status = Status.Active;
        user.userRole = UserRole.Customer;

        user = await addUser(user).unwrap();

        customer = {} as Customers;
        customer.id = uuidv4();
        customer.address = address;
        customer.userId = user.id;
        await addCustomer(customer).unwrap();
      } else {
        // if user exits then get customer
        const result2 = dispatch(
          customersApi.endpoints.getByUserId.initiate(user.id)
        );
        try {
          customer = await result2.unwrap();
        } catch (error) {
          console.log(error);
        } finally {
          result2.unsubscribe();
        }
      }

      //save trips
      const trip = {} as Trips;
      trip.id = uuidv4();
      trip.customerId = customer.id;
      trip.addFrom = tripFrom;
      trip.addTo = tripTo;
      trip.status = TripStatus.Booking;
      await addTrip(trip).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h2>BookingTrips</h2>
      </div>
      <div className="col-md-10 col-md-offset-1">
        <div>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Customer</StyledTableCell>
                      <StyledTableCell align="left">PhoneNo</StyledTableCell>
                      <StyledTableCell>Driver</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="left">Date</StyledTableCell>
                      <StyledTableCell align="left">Finish</StyledTableCell>
                      <StyledTableCell align="left">From</StyledTableCell>
                      <StyledTableCell align="left">To</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trips &&
                      trips
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((trip: any) => (
                          <TableRow key={trip.id}>
                            <TableCell component="th" scope="row">
                              {trip.customer.user.userName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {trip.customer.user.phoneNo}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {trip.driver ? trip.driver.user.userName : ""}
                            </TableCell>
                            <TableCell>{TripStatus[trip.status]}</TableCell>
                            <TableCell align="left">
                              {parseISO(trip.createdDate).toDateString()}
                            </TableCell>
                            <TableCell align="left">
                              {parseISO(trip.finishDate).toDateString()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {trip.addFrom}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {trip.addTo}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={10}
                        count={trips ? (trips?.length as number) : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </div>
      </div>

      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-0">
              <div className="contact-form-area ">
                <div className="input-fields fix  single-sidebar-widget">
                  <h6>Customer Information</h6>
                  <div className="single-field">
                    <input
                      type="text"
                      placeholder="Customer Name"
                      className="name"
                      value={customerName}
                      onChange={(e) => {
                        setCustomnerName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="single-field">
                    <input
                      type="text"
                      placeholder="Customer PhoneNo"
                      className="name"
                      value={phoneNo}
                      onChange={(e) => {
                        setPhoneNo(e.target.value);
                      }}
                    />
                  </div>
                  <div className="single-field">
                    <input
                      type="text"
                      placeholder="Address"
                      className="name"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-md-offset-0 ">
              <div className="contact-form-area ">
                <div className="input-fields fix single-sidebar-widget">
                  <h6>Trip Information</h6>
                  <div className="single-field">
                    <input
                      type="text"
                      placeholder="From"
                      className="name"
                      value={tripFrom}
                      onChange={(e) => {
                        setTripFrom(e.target.value);
                      }}
                    />
                  </div>
                  <div className="single-field">
                    <input
                      type="text"
                      placeholder="To"
                      className="name"
                      value={tripTo}
                      onChange={(e) => {
                        setTripTo(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-btn clear">
              <button type="button" onClick={handleSave}>
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookingTrips;
