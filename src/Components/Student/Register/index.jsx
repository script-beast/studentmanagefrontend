import React from "react";
import "./Styles.css";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import studentURL from "../../../Apis/Student.url";

const Index = () => {
  const { register, handleSubmit, setValue } = useForm();

  // name, phone, email, password, userpdf

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userPdf", data.userpdf[0]);

    fetch(studentURL + "register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) toast.error(data.error);
        else toast.success(data.success);
        // clear form
        setValue("name", "");
        setValue("phone", "");
        setValue("email", "");
        setValue("password", "");
        setValue("userpdf", "");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="sturegpage">
      <div className="container">
        <div className="text">Contact us Form</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="input-data">
              <input type="text" required {...register("name")} />
              <div className="underline"></div>
              <label htmlFor=""> Name</label>
            </div>
            <div className="input-data">
              <input type="text" required {...register("phone")} />
              <div className="underline"></div>
              <label htmlFor="">Phone Number</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input type="text" required {...register("email")} />
              <div className="underline"></div>
              <label htmlFor="">Email Address</label>
            </div>
            <div className="input-data">
              <input type="password" required {...register("password")} />
              <div className="underline"></div>
              <label htmlFor="">Password</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data uploadarea">
              <input
                type="file"
                className="mybtn btn-green"
                {...register("userpdf")}
                placeholder="Upload your CV"
                required
              />
              <label htmlFor="">Upload your CV</label>
            </div>
          </div>
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="submit" />
            </div>
          </div>
        </form>
      </div>

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register("name")} />
        <input type="text" placeholder="Phone" {...register("phone")} />
        <input type="text" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input type="file" {...register("userpdf")} />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Index;
