import { TableHead, TableRow } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ContactItem from "./ContactItem";

const ContactList = ({
  contactList,
  nametableRef,
  numbertableRef,
  mailtableRef,
  tbodyRef,
  onRemove,
  onSave,
  onCancel,
  onEdit,
}) => {
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
        <TableBody ref={tbodyRef}>
          {contactList.map((contact, index) => (
            <ContactItem
              key={index}
              index={index}
              contact={contact}
              onRemove={onRemove}
              onSave={onSave}
              mailtableRef={mailtableRef}
              nametableRef={nametableRef}
              numbertableRef={numbertableRef}
              onCancel={onCancel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactList;
