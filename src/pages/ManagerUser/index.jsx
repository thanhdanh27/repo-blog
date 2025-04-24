import {
  Alert,
  Button,
  Paper,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./ManagerPost.scss";
import { DeleteForever, EditDocument } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td  , &:last-child th": {
    border: 0,
  },
}));

export default function ManagerUser() {
  const [postsByAuthorId, setPostsByAuthorId] = useState([]);
  const [user, setUser] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const baseApi = BACKEND_URL;

  const navigate = useNavigate();

  const hasToken = !!accessToken;
  useEffect(() => {
    if (!hasToken) navigate("/auth/signup");
  }, [hasToken, navigate]);

  // ✅ Hàm reload lại danh sách
  const onReload = async () => {
    const data = await getAllUsers();
    setUser(data);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`${baseApi}/Post/${postId}`);
      console.log("Xoá thành công:");
      onReload();
      setState({ ...state, open: true });

      // 👉 Tự động ẩn sau 3 giây
      setTimeout(() => {
        setState((prev) => ({ ...prev, open: false }));
      }, 2000);
    } catch (error) {
      console.error("Lỗi xoá bài viết:", error.response?.data || error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseApi}/User`);
      // console.log("Danh sách user:", response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error("Lỗi khi lấy user:", error.response?.data || error.message);
      return []; // Trả mảng rỗng nếu lỗi
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setUser(data);
    };
    fetchAllUsers();
  }, []);

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [openDialog, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cập nhật người dùng"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="formProfile">
              <div className="fieldInputProfile">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  // value={formData.userName}
                  // disabled={!isEdit}
                  // onChange={(e) =>
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     userName: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  // value={formData.email}
                  // disabled={!isEdit}
                  // onChange={(e) =>
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     email: e.target.value,
                  //   }))
                  // }
                />

                <LocalizationProvider
                  adapterLocale="vi"
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    // disabled={!isEdit}
                    // value={
                    //   dayjs(formData.dob).isValid() ? dayjs(formData.dob) : null
                    // }
                    // onChange={handleDateChange}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
                <TextField
                  // disabled={!isEdit}
                  id="outlined-basic"
                  label="Role"
                  variant="outlined"
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} autoFocus>
            Cập nhật
          </Button>
          <Button onClick={handleClickClose} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã xóa thành công !
        </Alert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell align="right">Usename</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Ngày sinh</StyledTableCell>
              <StyledTableCell align="right">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((item, index) => {
              return (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      maxWidth: "400px",
                      width: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    align="right"
                  >
                    {item.userName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.email}</StyledTableCell>
                  <StyledTableCell
                    style={{
                      maxWidth: "130px",
                      width: "130px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    align="right"
                  >
                    {item.dob && dayjs(item.dob).isValid()
                      ? dayjs(item.dob).format("DD/MM/YYYY")
                      : "Null"}
                  </StyledTableCell>
                  <StyledTableCell className="action-wrap" align="right">
                    <span onClick={handleClickOpen}>
                      <img
                        style={{ cursor: "pointer" }}
                        src={editIcon}
                        width="20px"
                        height="20px"
                        alt="icon"
                      />
                    </span>

                    <span>
                      <img
                        style={{ cursor: "pointer", marginLeft: "1rem" }}
                        src={deleteIcon}
                        width="20px"
                        height="20px"
                        alt="icon"
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
