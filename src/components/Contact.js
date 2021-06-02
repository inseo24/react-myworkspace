import { useRef, useState } from "react";

const Contact = () => {
  const [contactList, setContactList] = useState([]);

  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const tbody = useRef();

  const add = () => {
    setContactList([
      {
        user: input1.current.value,
        number: input2.current.value,
        mail: input3.current.value,
      },
      ...contactList,
    ]);
    input1.current.value = "";
    input2.current.value = "";
    input3.current.value = "";
  };

  const remove = (index) => {
    setContactList(contactList.filter((_, idx) => idx !== index));
  };

  const edit = (index) => {
    setContactList(
      contactList.map((contact, idx) => {
        if (idx === index) {
          contact.isEdit = true;
        }
        return contact;
      })
    );
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

  const save = (index) => {
    console.log(tbody.current.children);
    console.log(tbody.current.children[index]);

    setContactList(
      contactList.map((contact, idx) => {
        if (idx === index) {
          const data = tbody.current.children[index];

          const editInput1 = data.querySelector(".tdUser");
          const editInput2 = data.querySelector(".tdNumber");
          const editInput3 = data.querySelector(".tdMail");

          console.log(editInput1);
          console.log(editInput2);
          console.log(editInput3);

          contact.user = editInput1.value;
          contact.number = editInput2.value;
          contact.mail = editInput3.value;

          delete contact.isEdit;
        }
        return contact;
      })
    );
  };

  return (
    <>
      <div>
        <input type="text" placeholder="이름" ref={input1} />
        <input type="text" placeholder="전화번호" ref={input2} />
        <input type="text" placeholder="이메일" ref={input3} />
        <button onClick={add}>입력</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>이름</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th></th>
            </tr>
          </thead>
          <tbody ref={tbody}>
            {contactList.map((contact, index) => (
              <tr key={index}>
                <td>
                  <button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    삭제
                  </button>
                </td>
                {!contact.isEdit && (
                  <td className={"tdUser"}>{contact.user}</td>
                )}
                {!contact.isEdit && (
                  <td className={"tdNumber"}>{contact.number}</td>
                )}
                {!contact.isEdit && (
                  <td className={"tdMail"}>{contact.mail}</td>
                )}

                {!contact.isEdit && (
                  <button
                    onClick={() => {
                      edit(index);
                    }}
                  >
                    수정
                  </button>
                )}

                {contact.isEdit && (
                  <td>
                    <input
                      type="text"
                      defaultValue={contact.user}
                      className={"tdUser"}
                    ></input>
                  </td>
                )}
                {contact.isEdit && (
                  <td>
                    <input
                      type="text"
                      defaultValue={contact.number}
                      className={"tdNumber"}
                    ></input>
                  </td>
                )}
                {contact.isEdit && (
                  <td>
                    <input
                      type="text"
                      defaultValue={contact.mail}
                      className={"tdMail"}
                    ></input>
                  </td>
                )}

                {contact.isEdit && (
                  <td>
                    <button
                      onClick={() => {
                        save(index);
                      }}
                    >
                      저장
                    </button>
                  </td>
                )}

                {contact.isEdit && (
                  <td>
                    <button
                      onClick={() => {
                        cancel(index);
                      }}
                    >
                      취소
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contact;
