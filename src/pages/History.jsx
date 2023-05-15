import "./History.scss";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Typography } from "@mui/material";
import { PortfolioContext } from "../context/PortfolioContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "white",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#333",
    },
    "&:nth-of-type(even)": {
        backgroundColor: "#222",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    ".MuiTablePagination-root": {
        backgroundColor: "black",
        color: "white",
        ".MuiBox-root": {
            button: {
                color: "white",
                "&:disabled": {
                    color: "#444",
                },
            },
        },
    },
}));

export default function History() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { currentUser } = useContext(AuthContext);
    const { open, profile, getPortfolio } = useContext(PortfolioContext);

    useEffect(() => {
        getPortfolio();
    }, [currentUser]);

    const history = profile?.transactions?.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - history?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div
            className="History"
            style={{ marginLeft: open && window.innerWidth > 800 ? "240px" : "0" }}
        >
            <Typography variant="h4">Transaction History</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Company</StyledTableCell>
                            <StyledTableCell align="right">Symbol</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? history?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : history
                        )?.map((x, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    {x.name}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="right">
                                    {x.symbol}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="right">
                                    {x.quantity}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="right">
                                    {getSymbolFromCurrency(x.currency)} {x.price.toFixed(2)}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="right">
                                    {getSymbolFromCurrency(x.currency)} {x.total.toFixed(2)}
                                </StyledTableCell>
                                <StyledTableCell style={{ width: 160 }} align="right">
                                    {x.action.toUpperCase()}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="right">
                                    {x.date}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={7} />
                            </StyledTableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={7}
                                count={history?.length || 0}
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
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}
