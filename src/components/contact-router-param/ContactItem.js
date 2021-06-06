import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { Check } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";

const ContactItem = ({
  index,
  contact,
  onRemove,
  onSave,
  mailtableRef,
  nametableRef,
  numbertableRef,
  onCancel,
}) => {
  const [isEdit, setIsEdit] = useState(contact.isEdit);
  const history = useHistory();

  return (
    <TableRow>
      <TableCell>
        <Button
          onClick={() => {
            onRemove(index);
          }}
        >
          <Check />
        </Button>
      </TableCell>
      {!isEdit && <TableCell>{contact.name}</TableCell>}
      {!isEdit && <TableCell>{contact.number}</TableCell>}
      {!isEdit && <TableCell>{contact.mail}</TableCell>}
      {!isEdit && (
        <TableCell>
          <Button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            edit
          </Button>
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <TextField
            type="text"
            defaultValue={contact.name}
            inputRef={nametableRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <TextField
            type="text"
            defaultValue={contact.number}
            inputRef={numbertableRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <TextField
            type="text"
            defaultValue={contact.mail}
            inputRef={mailtableRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <Button
            onClick={() => {
              onSave(index);
              setIsEdit(false);
            }}
          >
            save
          </Button>{" "}
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <Button
            onClick={() => {
              onCancel(index);
              setIsEdit(false);
            }}
          >
            cancel
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default ContactItem;
