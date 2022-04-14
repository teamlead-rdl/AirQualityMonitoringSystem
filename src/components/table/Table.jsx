import "./table.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";
import FaceIcon from '@mui/icons-material/TagFaces';

const List = () => {
  const rows = [
    {
      id: "+91-8992312133",
      role: "Admin",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      user: "Virat Kohli",
      date: "1 March",
      empId: "RDL-001",
      email: "test@email.com",
      status: "Verified",
    },
    {
      id: "+91-9972313330",
      role: "Manager",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      user: "Rohit Sharma",
      date: "1 March",
      empId: "RDL-002",
      email: "testEmail@email.com",
      status: "Pending",
    },
    {
      id: "+91-9977684039",
      role: "Manager",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      user: "Jasprit Bumrah",
      date: "2 March",
      empId: "RDL-005",
      email: "someEmail@email.com",
      status: "Pending",
    },
    {
      id: "+91-9683057633",
      role: "User",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      user: "Ravichandran Ashwin",
      date: "3 March",
      empId: "RDL-009",
      email: "emailSome@email.com",
      status: "Blocked",
    },
    {
      id: "+91-7469305824",
      role: "User",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      user: "Harold Carol",
      date: "4 March",
      empId: "RDL-003",
      email: "testSome@account.com",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Date Added</TableCell>
            <TableCell className="tableCell">Users</TableCell>
            <TableCell className="tableCell">Role</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Employee ID</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.user}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.role}</TableCell>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.empId}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">
                {row.status === "Verified" && 
                <Chip variant="outlined" 
                      color="success"
                      label={row.status}
                      icon={<FaceIcon />} />
                }
                {row.status === "Pending" && 
                <Chip variant="outlined" 
                      color="warning"
                      label={row.status}
                      icon={<FaceIcon />} />
                }
                {row.status === "Blocked" && 
                <Chip 
                      color="error"
                      label={row.status}
                      icon={<FaceIcon />} />
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
