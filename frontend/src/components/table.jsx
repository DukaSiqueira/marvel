import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

const MyTable = ({ headers, rows, onRemove }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header.label}
                className="font-bold bg-red-600 text-white"
                classes={{
                  root: "font-bold bg-red-600 text-white",
                }}
              >
                {header.label}
              </TableCell>
            ))}
            <TableCell
              className="font-bold bg-red-600 text-white"
              align="center"
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell key={header.label} align="left">
                  {row[header.key]}
                </TableCell>
              ))}
              <TableCell align="center" onClick={() => onRemove(row)}>
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MyTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
};

export default MyTable;
