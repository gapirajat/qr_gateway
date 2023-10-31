import { Formik, Form, ErrorMessage, Field } from "formik";
import upiqr from "upiqr";
import React, { useState } from 'react';;




const App = () => {
  const [imageData, setImageData] = useState(null);
  const initialValues = {
    fname: "",
    sname:"",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  };

  function generateRandom10DigitNumber() {
    const min = Math.pow(10, 9); // Minimum 10-digit number (1000000000)
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number (9999999999)
  
    const random10DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return random10DigitNumber.toString();
  }
  

  

  const onSubmit = (values) => {
    
    console.log(values.fname)
    const random10DigitNumber = generateRandom10DigitNumber();
    console.log(random10DigitNumber);

    upiqr({
      payeeVPA: "rajat9@dbs",
      payeeName: "Rajat Shinde",
      amount: 1,
      transactionNote: random10DigitNumber,

    })
    .then((upi) => {
      // console.log(upi.qr);      // data:image/png;base64,eR0lGODP...
      // console.log(upi.intent);  // upi://pay?pa=bhar4t@upi&pn=Bharat..
      setImageData(upi.qr);
    })
    .catch(err => {
      console.log(err);
    });
  };

  // const validationSchema = Yup.object({
  //   email: Yup.string().required("Email is required").email("Invalid email adress"),
  //   password: Yup.string()
  //   .min(8, 'Password must be at least 8 characters')
  //   .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  //   .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  //   .matches(/[0-9]/, 'Password must contain at least one digit')
  //   .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
  //   .required('Password is required'),
  //   username: Yup.string().max(5).required("Username is required"),
  //   fname: Yup.string().required('Name is required'),
  //   sname:Yup.string().required('Name is required'),
  //   cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // });
  // // const formik = useFormik({
  // //   initialValues: {
  // //     email: "",
  // //     username: "",
  // //     password: "",
  // //   },
  // //   onSubmit: (values) => {
  // //     console.log("onSubmit", values);
  // //   },
  // //   validationSchema: Yup.object({
  // //     email: Yup.string()
  // //       .required("Email is required")
  // //       .email("Invalid email adress"),
  // //     password: Yup.string().required("Password is required"),
  // //     username: Yup.string().required("Username is required"),
  // //   }),
  // // validate: (values) => {
  // //   const errors = {};
  // //   if (!values.email) {
  // //     errors.email = "Email is required";
  // //   }
  // //   if (!values.username) {
  // //     errors.username = "Username is required";
  // //   }
  // //   if (!values.password) {
  // //     errors.password = "Password is required";
  // //   }
  // //   return errors;
  // // },
  // // });
  return (
    <div>
    <div>
      <h1>Register as a Industrialist</h1>


      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        {() => (
          <Form>
              <div>
                <Field name="fname" placeholder="Name" />
                <div className="error">
                  <ErrorMessage name="fname" component="span" />
                </div>
              </div>

            <button type="submit">Submit</button>

          </Form>
        )}
      </Formik>
      {imageData && <img src={imageData} alt="Base64 Image" />}
    </div>
    </div>
  );
};

export default App;