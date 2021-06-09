import TablePagination from "@material-ui/core/TablePagination";
import { useDispatch } from "react-redux";

const TodoPagination = ({ totalElements, page, size }) => {
  const dispatch = useDispatch();

  // 페이지 번호 바뀔 때 호출 되는 함수
  const handleChangePage = (event, newPage) => {
    dispatch({
      type: "FETCH_TODOLIST_PAGING",
      payload: { page: newPage, size }, // 클릭한 페이지번호, redux state의 페이지 사이즈
    });
  };

  const handleChangeRowsPerPage = (event) => {
    // 10개 -> 25개
    const newSize = parseInt(event.target.value);

    // 페이지의 크기가 바뀌면 첫번째 페이지를 로딩함
    dispatch({
      type: "FETCH_TODOLIST_PAGING",
      payload: { page: 0, size: newSize }, // 첫번째 페이지번호, 클릭한 페이지 사이즈
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

export default TodoPagination;
