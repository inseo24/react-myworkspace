import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const ContactItem = ({ index, contact, onRemove, onSave }) => {
  const [isEdit, setIsEdit] = useState(contact.isEdit);
  return (
    <TableRow>
      <TableCell>
        <Button
          onClick={() => {
            onRemove(index);
          }}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
      <TableCell>
        {!isEdit && <span>{contact.fname}</span>}
        {isEdit && (
          <TextField
            type="text"
            defaultValue={contact.fname}
            inputProps={{ className: "name" }}
          ></TextField>
        )}
      </TableCell>

      <TableCell>
        {!isEdit && <span>{contact.phone}</span>}
        {isEdit && (
          <TextField
            type="text"
            defaultValue={contact.phone}
            inputProps={{ className: "tel" }}
          ></TextField>
        )}
      </TableCell>

      <TableCell>
        {!isEdit && <span>{contact.mail}</span>}
        {isEdit && (
          <TextField
            type="text"
            defaultValue={contact.mail}
            inputProps={{ className: "email" }}
          ></TextField>
        )}
      </TableCell>
      <TableCell>
        {!isEdit && (
          <Button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            edit
          </Button>
        )}
        {isEdit && (
          <Button
            onClick={() => {
              onSave(index);
              setIsEdit(false);
            }}
          >
            save
          </Button>
        )}
        {isEdit && (
          <Button
            onClick={() => {
              setIsEdit(false);
            }}
          >
            cancel
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ContactItem;
