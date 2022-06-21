import React, { Fragment, useState } from 'react'
import { Box, InputLabel, FormControl, Select, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const sample = [
    { date: "04-06-2022", detail: ["Min", "Max", "Avg", "Status"], values: ["50", "100", "60", "#1234"] },
    { date: "05-06-2022", detail: ["Min", "Max", "Avg", "Status"], values: ["4", "4", "4", "4"] },
    { date: "05-06-2022", detail: ["Min", "Max", "Avg", "Status"], values: ["54", "4", "23", "54"] },
];

const IndividualReportForm = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <TextField sx={{ minWidth: 320 }}
                    label="From Date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField sx={{ minWidth: 320 }}
                    label="to date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">AQMI/AQMO</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <Table sx={{ marginTop: 3 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Date</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sample.map((item) => (
                        <Fragment>
                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ width: 40 }} rowSpan={item.detail.length + 1}>
                                    {item.date}
                                </TableCell>
                            </TableRow>
                            {item.detail.map((detail) => (
                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell sx={{ width: 20 }} >{detail}</TableCell>
                                    {
                                        item.values.map((val) => (

                                            <TableCell sx={{ width: 20 }} >{val}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                component="div"
                count={sample.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop={4}
            >
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>
        </>
    )
}

export default IndividualReportForm