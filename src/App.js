import React, { useState, useEffect } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";

const App = () => {
  const [avatar, setAvatar] = useState(null);
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState(null);
  const notify = () => toast.success("New image is added to the database!");
  //function to list all the files in the storage
  const listFiles = async () => {
    const imagesRef = ref(storage, "images/");
    listAll(imagesRef)
      .then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
          setUrls({
            urlLink: urls,
          });
        });
      })
      .catch((err) => console.log(err));
  };
  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    const imageRef = ref(storage, `images/${avatar.name}`);
    uploadBytes(imageRef, avatar)
      .then((res) => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            notify();
            listFiles();
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    listFiles();
  }, []);
  return (
    <div>
      <h1 className="bg-dark py-5 text-center">
        Image Uploader with react and firebase
      </h1>
      <div className="container d-flex w-75 align-items-center justify-content-between border p-4">
        <div className=" p-3">
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-control"
              onChange={handleChangeImage}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-danger" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <img
          src={!url ? "/no-one.png" : url}
          width="150"
          height="150"
          alt="avatar-to-upload"
        />
      </div>
      <div className="container">
        <h3 className="text-center bg-dark py-3 text-light my-3">
          All files in the firebase storage
        </h3>
        <div className="container">
          <div className="row gx-5 mb-5">
            {urls.urlLink &&
              urls.urlLink.map((item, id) => (
                <Card image={item} listFiles={listFiles} key={id} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default App;
