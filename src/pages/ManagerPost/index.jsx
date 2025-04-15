import {
  Alert,
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
} from "@mui/material";
import "./ManagerPost.scss";
import { DeleteForever, EditDocument } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import { useEffect, useState } from "react";

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

export default function ManagerPost() {
  const [postsByAuthorId, setPostsByAuthorId] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const baseApi = BACKEND_URL;

  const navigate = useNavigate();

  const hasToken = !!accessToken;
  useEffect(() => {
    if (!hasToken) navigate("/auth/signup");
  }, [hasToken, navigate]);

  // ✅ Hàm reload lại danh sách
  const onReload = async () => {
    const data = await getPostsByAuthorId();
    setPostsByAuthorId(data);
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
  const getPostsByAuthorId = async () => {
    try {
      const response = await axios.get(
        `${baseApi}/Post/ByAuthor/${accessToken.userId}`
      );
      console.log("Danh sách bài viết theo user:", response.data);
      return response.data; // Trả về để sử dụng nơi khác
    } catch (error) {
      console.error(
        "Lỗi khi lấy bài viết:",
        error.response?.data || error.message
      );
      return []; // Trả mảng rỗng nếu lỗi
    }
  };
  useEffect(() => {
    const fetchPostsByAuthorId = async () => {
      const data = await getPostsByAuthorId();
      setPostsByAuthorId(data);
    };
    fetchPostsByAuthorId();
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

  return (
    <>
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
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsByAuthorId.map((item, index) => {
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
                    {item.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Intl.DateTimeFormat("vi-VN").format(
                      new Date(item.createdAt)
                    )}
                  </StyledTableCell>
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
                    {item.author.userName}
                  </StyledTableCell>
                  <StyledTableCell className="action-wrap" align="right">
                    <Link to={`/admin/update-post/${item.postId}`}>
                      <EditDocument className="edit-icon" />
                    </Link>
                    <span
                      onClick={() => {
                        handleDeletePost(item.postId);
                      }}
                    >
                      <DeleteForever className="delete-icon" />
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
