import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  const [user, setUser] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const baseApi = BACKEND_URL;
  const [role, setRole] = useState([]);
  const [roleSelected, setRoleSelected] = useState("");

  const getRole = async () => {
    try {
      const response = await axios.get(`${baseApi}/Role`);
      // console.log("Danh sách user:", response.data);

      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error("Lỗi khi lấy user:", error.response?.data || error.message);
      return []; // Trả mảng rỗng nếu lỗi
    }
  };

  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    dob: null,
    role: [],
    newPassword: "",
  });

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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${baseApi}/User/${userId}`);
      console.log("Xoá user thành công:");
      onReload();
      setState3(!state3);
    } catch (error) {
      console.error("Lỗi xoá user:", error.response?.data || error.message);
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

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${baseApi}/User/${id}`);
      // console.log("Thông tin user:", response.data);
      const userData = response.data;
      // console.log(userData.role);
      setFormData({
        userId: userData.userId,
        userName: userData.userName || "",
        email: userData.email || "",
        avatarURL: userData.avatarURL,
        dob: userData.dob,
        role: userData.role,
      });
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
    const fetchRole = async () => {
      const data = await getRole();
      setRole(data);
    };
    fetchAllUsers();
    fetchRole();
  }, []);

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [openDialog, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    getUserById(id);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setState2(!state2);
  };

  const handleClose3 = () => {
    setState3(!state3);
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date.format("YYYY-MM-DD"),
    });
  };

  const handleChangeRole = (event) => {
    const selectedRoleId = event.target.value; // Đây là `roleId` đã chọn
    setRoleSelected(selectedRoleId);
    const selectedRoleObj = role.find((r) => r.roleId === selectedRoleId); // Tìm role object tương ứng

    if (selectedRoleObj) {
      setFormData((prev) => ({
        ...prev,
        role: [selectedRoleObj], // Cập nhật lại formData với role object
      }));
    }
  };

  const handleSaveInfo = async () => {
    if (roleSelected !== "") {
      try {
        const response = await axios.post(`${baseApi}/User/AddRoleToUser`, {
          userId: formData.userId,
          roleId: roleSelected,
        });

        console.log("Cập nhật role thành công:", response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật role user:", error);
      }
    }

    try {
      const response = await axios.put(
        `${baseApi}/User`, // ví dụ API của bạn
        formData
      );
      onReload();
      console.log("Cập nhật user thành công:", response.data);
      setState({ ...state, open: true });
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.post(`${baseApi}/Auth/RenewPassword`, {
        userId: formData.userId,
        newPassword: formData.newPassword,
      });
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
      }));
      setState2(!state2);
      console.log("Cập nhật pass mới thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật pass mới:", error);
    }
  };
  console.log("render");

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        key="snackbar-sucess"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã cập nhật user thành công !
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state2}
        onClose={handleClose2}
        autoHideDuration={2000}
        key="snackbar-sucessNewPassword"
      >
        <Alert
          onClose={handleClose2}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã cập nhật mật khẩu mới thành công !
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state3}
        onClose={handleClose3}
        autoHideDuration={2000}
        key="snackbar-sucessDelete"
      >
        <Alert
          onClose={handleClose3}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã xóa user thành công !
        </Alert>
      </Snackbar>

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
            <div style={{ marginTop: "20px" }} className="formProfile">
              <div className="fieldInputProfile">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  value={formData.userName}
                  // disabled={!isEdit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }))
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  // disabled={!isEdit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />

                <LocalizationProvider
                  adapterLocale="vi"
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    value={
                      dayjs(formData.dob).isValid() ? dayjs(formData.dob) : null
                    }
                    onChange={handleDateChange}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>

                <FormControl sx={{ width: "212px" }}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      formData.role.length > 0 ? formData.role[0].roleId : ""
                    }
                    label="Role"
                    onChange={handleChangeRole}
                    renderValue={(selected) => {
                      const selectedRole = role.find(
                        (r) => r.roleId === selected
                      );
                      return selectedRole ? selectedRole.roleName : "";
                    }}
                  >
                    {role.map((item) => (
                      <MenuItem key={item.roleId} value={item.roleId}>
                        {item.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
                onClick={() => {
                  handleSaveInfo();
                }}
                style={{ marginTop: "1rem" }}
                size="large"
                variant="contained"
              >
                Lưu thay đổi
              </Button>
            </div>
            <div
              style={{ marginTop: "3rem", border: "none" }}
              className="formProfile"
            >
              <div className="fieldInputProfile">
                <TextField
                  id="outlined-basic"
                  label="UserId"
                  variant="outlined"
                  value={formData.userId}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Mật khẩu mới"
                  variant="outlined"
                  value={formData.newPassword}
                  // disabled={!isEdit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                style={{ marginTop: "1rem" }}
                size="large"
                variant="contained"
                onClick={() => {
                  handleUpdatePassword();
                }}
              >
                Cấp lại mật khẩu
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClickClose} autoFocus>
            Cập nhật
          </Button> */}
          <Button onClick={handleClickClose} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar
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
      </Snackbar> */}
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
                    <span
                      onClick={() => {
                        handleClickOpen(item.userId);
                      }}
                    >
                      <img
                        style={{ cursor: "pointer" }}
                        src={editIcon}
                        width="20px"
                        height="20px"
                        alt="icon"
                      />
                    </span>

                    <span
                      onClick={() => {
                        handleDeleteUser(item.userId);
                      }}
                    >
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
