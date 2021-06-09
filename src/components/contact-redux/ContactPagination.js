import TablePagination from "@material-ui/core/TablePagination";
import { useDispatch } from "react-redux";

const ContactPagination = ({ totalElements, page, size }) => {
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch({
      type: "FETCH_CONTACTLIST_PAGING",
      payload: { page: newPage, size }, // 클릭한 페이지번호, redux state의 페이지 사이즈
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value);
    dispatch({
      type: "FETCH_CONTACTLIST_PAGING",
      payload: { page: 0, size: newSize }, // 첫번째 페이지 번호, 클릭한 페이지 사이즈
    });
  };

  return (
    <TablePagination
      component="div"
      count={totalElements} // redux state에 있는 전체 건수
      page={page} // redux state에 있는 현재 페이지 번호
      onChangePage={handleChangePage}
      rowsPerPage={size} // redux state에 있는 현재 페이지 크기
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default ContactPagination;
