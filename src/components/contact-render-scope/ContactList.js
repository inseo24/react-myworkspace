import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ContactItem from "./ContactItem";

const ContactList = ({ contactList, tbRef, onRemove, onSave }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>이름</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody ref={tbRef}>
            {contactList.map((contact, index) => (
              <ContactItem
                key={index}
                index={index}
                contact={contact}
                onRemove={onRemove}
                onSave={onSave}
              ></ContactItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactList;
