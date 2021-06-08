import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { Check } from "@material-ui/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const ContactItem = ({ contact }) => {
  const [isEdit, setIsEdit] = useState(contact.isEdit);
  const history = useHistory();

  const dispatch = useDispatch();
  const inputNameRef = useRef();
  const inputNumberRef = useRef();
  const inputMailRef = useRef();

  const remove = (id) => {
    dispatch({ type: "REMOVE_CONTACT", payload: id });
  };

  const save = (id) => {
    const name = inputNameRef.current.value;
    const number = inputNumberRef.current.value;
    const mail = inputMailRef.current.value;
    dispatch({ type: "MODIFY_CONTACT", payload: { id, name, number, mail } });
  };

  const cancel = (id) => {
    dispatch({ type: "CANCEL_CONTACT", payload: id });
  };

  return (
    <TableRow>
      <TableCell>
        <Button
          onClick={() => {
            remove(contact.id);
          }}
        >
          <Check style={{ cursor: "pointer" }} />
        </Button>
      </TableCell>
      {!isEdit && (
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/contacts/${contact.id}`);
          }}
        >
          {contact.name}
        </TableCell>
      )}
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
            inputRef={inputNameRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <TextField
            type="text"
            defaultValue={contact.number}
            inputRef={inputNumberRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <TextField
            type="text"
            defaultValue={contact.mail}
            inputRef={inputMailRef}
          />
        </TableCell>
      )}
      {isEdit && (
        <TableCell>
          <Button
            onClick={() => {
              save(contact.id);
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
              cancel(contact.id);
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
