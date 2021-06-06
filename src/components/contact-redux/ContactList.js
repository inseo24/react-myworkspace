import { TableHead, TableRow } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const ContactList = () => {
  // useSelector는 redux store의 state를 선택함
  // useSelector((state)) <- 안의 state는 전체state를 의미
  // => state.하위state : 선택하고 싶은 하위 state를 써줌.
  // 하위 state가 return
  // const 하위state변수 = useSelector((전체state) =>  하위state)

  // select: 현재 state를 조회하고 변경을 감지, state가 변경되면 컴포넌트를 업데이트함.
  const contactList = useSelector((state) => state.contact);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>이름</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>메일</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactList.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactList;
