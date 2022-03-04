import React from "react";
import { storage } from "./firebase-config";
import { ref, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ image, listFiles }) => {
  const notify = () => toast.success("Image deleted successfully");
  const deleteImage = () => {
    const imageName = image.substring(
      image.indexOf("%") + 3,
      image.indexOf("?")
    );
    const deleteRef = ref(storage, `images/${imageName}`);
    deleteObject(deleteRef)
      .then((res) => {
        notify();
        listFiles();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3">
      <div className="card" style={{ width: "15rem", height: "15rem" }}>
        <img src={image} className="card-img-top img-fluid h-100" alt="..." />
        <div className="card-body bg-dark text-center">
          <button className="btn btn-primary" onClick={deleteImage}>
            delete <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
