import { useState, useRef } from "react";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

const ContactContainer = () => {
  const [contactList, setContactList] = useState([]);

  const name = useRef();
  const tel = useRef();
  const email = useRef();
  const tb = useRef();

  const add = () => {
    setContactList([
      {
        fname: name.current.value,
        phone: tel.current.value,
        mail: email.current.value,
      },
      ...contactList,
    ]);
    name.current.value = "";
    tel.current.value = "";
    email.current.value = "";
  };
  const change = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      add();
    }
  };

  const remove = (index) => {
    const newContactList = contactList.filter((contact, idx) => {
      return idx !== index;
    });

    setContactList(newContactList);
  };

  const save = (index) => {
    setContactList(
      contactList.map((contact, idx) => {
        if (idx === index) {
          const tr = tb.current.children[index];
          const nameEdit = tr.querySelector(".name");
          const phoneEdit = tr.querySelector(".tel");
          const emailEdit = tr.querySelector(".email");
          contact.fname = nameEdit.value;
          contact.phone = phoneEdit.value;
          contact.mail = emailEdit.value;
          delete contact.isEdit;
        }
        return contact;
      })
    );
  };

  return (
    <>
      <ContactForm
        inputName={name}
        inputTel={tel}
        inputEmail={email}
        onAdd={add}
        onChange={change}
      />

      <ContactList
        contactList={contactList}
        tbRef={tb}
        onRemove={remove}
        onSave={save}
      />
    </>
  );
};

export default ContactContainer;
