import { useState, useRef } from "react";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import { list } from "./data";

const ContactContainer = () => {
  const [contactList, setContactList] = useState(list);

  const inputName = useRef();
  const inputNumber = useRef();
  const inputMail = useRef();
  const tbody = useRef();
  const nameValueRef = useRef();
  const numberValueRef = useRef();
  const mailValueRef = useRef();

  const add = () => {
    setContactList([
      {
        name: inputName.current.value,
        number: inputNumber.current.value,
        mail: inputMail.current.value,
      },
      ...contactList,
    ]);
    inputName.current.value = "";
    inputNumber.current.value = "";
    inputMail.current.value = "";
  };

  const change = (event) => {
    if (event.charCode === 13) {
      add();
    }
  };

  const cancel = (index) => {
    setContactList(
      contactList.map((contact, idx) => {
        if (idx === index) {
          delete contact.isEdit;
        }
        return contact;
      })
    );
  };

  const remove = (index) => {
    setContactList(contactList.filter((contact, idx) => idx !== index));
  };

  const save = (index) => {
    setContactList(
      contactList.map((contact, idx) => {
        if (idx === index) {
          contact.name = nameValueRef.current.value;
          contact.number = numberValueRef.current.value;
          contact.mail = mailValueRef.current.value;

          delete contact.isEdit;
        }
        return contact;
      })
    );
  };

  return (
    <>
      <ContactForm
        inputNameRef={inputName}
        inputNumberRef={inputNumber}
        inputMailRef={inputMail}
        onAdd={add}
        onChange={change}
      />
      <ContactList
        contactList={contactList}
        nametableRef={nameValueRef}
        numbertableRef={numberValueRef}
        mailtableRef={mailValueRef}
        onChange={change}
        tbodyRef={tbody}
        onRemove={remove}
        onSave={save}
        onCancel={cancel}
      />
    </>
  );
};

export default ContactContainer;
// 코멘트 추가
