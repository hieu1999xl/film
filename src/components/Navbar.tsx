import Link from "next/link";
import React, { FunctionComponent, useState, useEffect } from "react";
import Image from "next/image";
import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetTicketData } from "../services/movies";

const Navbar = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [valueTicket, setValueTicket] = useState<any>();
  const [tickets, setTickets] = useState<any>();

  const getData = () => {
    useGetTicketData()
      .then((res: any) => {
        setTickets(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue("");
    console.log("clicked the clear icon...");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const newTickket =
      tickets && tickets.filter((i: any) => i.code === searchValue);
    setValueTicket(newTickket);
  }, [open]);
  return (
    <>
      <nav className="content">
        <Link href="/">
          <div className="logo">
            <img src="/logo.png" alt="site logo" width={163} height={68} />
          </div>
        </Link>
        <div className="seach_ticket">
          <FormControl>
            <TextField
              size="small"
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
              value={searchValue}
              className="search_input"
              placeholder="Search Ticket"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button
            className="button_search"
            onClick={handleClickOpen}
            variant="contained"
          >
            Search
          </Button>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your ticket information"}
        </DialogTitle>
        <DialogContent>
          {console.log('valueTicket', valueTicket)
          }
          {valueTicket && valueTicket.length >0
            ? valueTicket &&
              valueTicket.map((i: any) => (
                <>
                  <Grid container spacing={2} xs={12} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      Code: {i.code}
                    </Grid>
                    <Grid item xs={6}>
                      Number Tickets {i.number_tickets}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Name Film: {i.name_firm}
                    </Grid>
                    <Grid item xs={6}>
                      Name Customer: {i.name_customer}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Total Price: {i.total_price}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Total Tickets: {i.total_ticket}{" "}
                    </Grid>
                  </Grid>
                </>
              ))
            : "Your ticket number is incorrect or does not exist, please re-enter the ticket number"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
