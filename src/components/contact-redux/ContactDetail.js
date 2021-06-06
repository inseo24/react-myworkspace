import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import Hidden from "@material-ui/core/Hidden";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

import ContactComment from "./ContactComment";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
  },
}));

const ContactDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const history = useHistory();

  // const contact = list.filter((contact) => parseFloat(id) === parseFloat(contact.id))[0];
  // const contactList = useSelector((state) => state.contact);
  // const contact = contactList.filter((contact) => contact.id === parseInt(id))[0];
  const contact = useSelector(
    (state) => state.contact.filter((contact) => contact.id === parseInt(id))[0]
  );
  console.log(contact);

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        <Hidden xsDown>
          <Grid item xs={1} sm={2} md={3} lg={4} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Contact</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Box style={{ padding: "1rem" }}>{contact.name}</Box>
            <Box style={{ display: "flex", direction: "rtl" }}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push("/contacts");
                }}
              >
                목록
              </Button>
            </Box>
          </Paper>
        </Grid>
        {contact.comments && (
          <Paper
            style={{ marginTop: "0.9rem", marginLeft: "0.8rem" }}
            className={classes.paper}
          >
            <List>
              {contact.comments.map((comment, index) => (
                <ContactComment key={index} index={index} comment={comment} />
              ))}
            </List>
          </Paper>
        )}
        <Hidden xsDown>
          <Grid item xs={1} sm={2} md={3} lg={4} />
        </Hidden>
      </Grid>
    </>
  );
};
export default ContactDetail;
