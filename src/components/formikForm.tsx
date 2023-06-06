import {
  Formik,
  FormikProps,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
  };

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.message) {
      errors.message = "Required";
    }
    return errors;
  };

  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Grid container>
      <Grid item sm={3} xs={false}></Grid>
      <Grid item sm={6} xs={12}>
        <Paper>
          <Box m={5} p={3}>
            <Typography variant="h5">Basic Formik Contact Form</Typography>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {(props: FormikProps<FormValues>) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="name" />}
                    error={props.errors.name && props.touched.name}
                    required
                  />

                  <Field
                    as={TextField}
                    label="Email"
                    type="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="email" />}
                    error={props.errors.email && props.touched.email}
                    required
                  />

                  <Field
                    as={TextField}
                    label="Message"
                    name="message"
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    multiline
                    rows={4}
                    helperText={<ErrorMessage name="confirmPassword" />}
                    error={props.errors.message && props.touched.message}
                    required
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={3} xs={false}></Grid>
    </Grid>
  );
};

export default ContactForm;
