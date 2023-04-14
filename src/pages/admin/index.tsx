import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { useGetMovies, useDeleteMovie, useGetMovie } from "../../services/movies";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton,   Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper, } from "@mui/material";
const Admin = () => {
  const [movies, setMovies] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const [idItem, setIdItem] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const getData = () => {
    setIsLoading(true)
    useGetMovie().then((res: any)=> {
      setMovies(res.data.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log('err', err);
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteAction = (id: any) => {
    setIsOpen(true)
    setIdItem(id)
  }
  const removeItem = () => {
    useDeleteMovie(idItem).then((res) => {
      getData()
    })
    .catch((err)=> {
      console.log('err', err);
    }) 
  }
  if (movies) {
    return (
      <>
      <Head>
        <title>Admin</title>
      </Head>
      <Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Language</TableCell>
                <TableCell align="left">Run times</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Ticket Cost</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies &&
                movies.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.language}</TableCell>
                    <TableCell align="left">{row.runtimes}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.ticketCost}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteAction(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={movies.total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
      </Container>
      <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableEscapeKeyDown={true}
    >
      <DialogTitle>
        {" "}
        <Typography variant="h4">Delete</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Are you sure you want to delete this item?
        </Typography>
        <Typography variant="subtitle2">
          You can't undo this operation
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} variant="contained">No</Button>
        <Button onClick={() => removeItem()} variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      onClose={() => setIsOpenCreate(false)}
      open={isOpenCreate}
      disableEscapeKeyDown={true}
    >
      <DialogTitle>
        {" "}
        <Typography variant="h4">Delete</Typography>
      </DialogTitle>
      <DialogContent>
            
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpenCreate(false)} variant="contained">No</Button>
        <Button onClick={() => removeItem()} variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
      </>
    );
  } else if (isLoading) {
    return <>Loading Movies...</>;
  } else {
    return <>No Movies To Watch...</>;
  }
};

export default Admin;
