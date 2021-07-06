import {
  makeStyles,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "./ContactItem";

import ContactPagination from "./ContactPagination";

const ContactList = () => {
  // useSelector는 redux store의 state를 선택함
  // useSelector((state)) <- 안의 state는 전체state를 의미
  // => state.하위state : 선택하고 싶은 하위 state를 써줌.
  // 하위 state가 return
  // const 하위state변수 = useSelector((전체state) =>  하위state)

  // select: 현재 state를 조회하고 변경을 감지, state가 변경되면 컴포넌트를 업데이트함.
  const data = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    container: {
      maxHeight: 520,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_CONTACTLIST_PAGING" });
  }, [dispatch]);

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>이름</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>메일</TableCell>
              <TableCell>메모</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.content.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContactPagination
        totalElements={data.totalElements}
        page={data.page}
        size={data.size}
      />
    </div>
  );
};

export default ContactList;
