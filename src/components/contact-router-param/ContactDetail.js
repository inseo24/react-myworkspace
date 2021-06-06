import { useParams } from "react-router";

const ContactDetail = () => {
  const { id } = useParams();

  return <h1>contact detail: {id}</h1>;
};
export default ContactDetail;
