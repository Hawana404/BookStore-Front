import axios from "axios";
import React, { useEffect, useState } from "react";

const ModifyPage = () => {
  let bookId = window.location.href;
  bookId = bookId.split("/");
  bookId = bookId[bookId.length - 2];
  const [img, setImg] = useState("");
  const [bookData, setBookData] = useState();
  const [dataChanged, setDataChanged] = useState({
    name: "",
    author: "",
    authorDetails: "",
    price: "",
    genre: "",
    discreption: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (localStorage.getItem("admin") === "false") {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const getBookData = async () => {
      const data = await axios.get(
        `http://localhost:3000/api/v1/books/${bookId}`
      );
      setBookData(data.data.book);
    };
    getBookData();
  }, []);

  const ChangeData = (e, field) => {
    setDataChanged({ ...dataChanged, [field]: e.target.value });

  };
  const dataSubmit = async (field) => {
    await axios.request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      url: `http://localhost:3000/api/v1/user/admin/${bookId}`,
      data: { [field]: dataChanged[field] },
    });
    window.location.reload();
  };

  const dataSubmitImg = async () => {
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PATCH",
        url: `http://localhost:3000/api/v1/user/admin/${bookId}`,
        data: { img },
      })
      .then(alert("Image Changed Successfully"));
  };

  const addImage = async (e) => {
    await convertImg(e.target.files[0]);
  };

  const convertImg = (img) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    }).then((res) => setImg(res));
  };

  return (
    <><head><title>Modifying {bookData?.name}</title></head>
      <div className="lg:w-[70%] md:w-[90%] sm:w-[90%] w-[100%] m-auto bg-white rounded-lg mt-[5%]">
        <h1 className="text-white p-3  text-xl">Modify Book</h1>
        <hr />
        <div className="flex flex-col p-5">
          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Change Image:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <h1>New Image:</h1>
              <input
                onChange={addImage}
                type="file"
                label="Image"
                name="img"
                id="img-upload"
                accept=".jpeg, .png, .jpg"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={dataSubmitImg}
                className="bg-[rgb(49,71,106)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">Change Name: </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <h1>Current Name:</h1>
              <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
                {bookData?.name}
              </h1>
            </div>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>New Name:</label>
              <input
                value={dataChanged.name}
                onChange={(e) => ChangeData(e, "name")}
                className="rounded-sm text-black border border-black p-1 ml-5 w-[18.5%] outline-none"
                type="text"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("name")}
                className="bg-[rgb(49,71,106)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col text-white mt-5">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Change Author:{" "}
            </h1>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <h1 className="text-black">Current Author:</h1>
              <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
                {bookData?.author}
              </h1>
            </div>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>New Author:</label>
              <input
                value={dataChanged.author}
                onChange={(e) => ChangeData(e, "author")}
                className="rounded-sm border border-black text-black p-1 ml-5 w-[18.5%] outline-none"
                type="text"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("author")}
                className="bg-[rgb(49,71,106)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">Change Author Details: </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <h1>Current Details:</h1>
              <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
                {bookData?.authorDetails}
              </h1>
            </div>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>New author details:</label>
              <input
                value={dataChanged.authorDetails}
                onChange={(e) => ChangeData(e, "authorDetails")}
                className="rounded-sm border border-black text-black p-1 ml-5 w-[18.5%] outline-none"
                type="text"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("authorDetails")}
                className="bg-[rgb(49,71,106)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
              Change Price:{" "}
            </h1>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <h1>Current Price:</h1>
              <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
                {bookData?.price} EGP
              </h1>
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <label>New Price:</label>
              <input
                value={dataChanged.price}
                onChange={(e) => ChangeData(e, "price")}
                className="rounded-sm border border-black text-black p-1 ml-5 w-[18.5%] outline-none"
                type="number"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("price")}
                className="bg-[rgb(49,71,106)] text-white active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col text-white mt-5">
            <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
              Change Genre:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <h1>Current Genre:</h1>
              <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
                {bookData?.genre}
              </h1>
            </div>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>New genre:</label>
              <input
                value={dataChanged.genre}
                onChange={(e) => ChangeData(e, "genre")}
                className="rounded-sm border border-black text-black p-1 ml-5 w-[18.5%] outline-none"
                type="text"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("genre")}
                className="bg-[rgb(49,71,106)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex flex-col text-black mt-5">
            <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
              Change discreption:{" "}
            </h1>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <h1>Current discreption:</h1>
              <h1 className="bg-[rgb(49,71,106)] text-white p-2 rounded-sm">
                {bookData?.discreption}
              </h1>
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <label>New discreption:</label>
              <input
                value={dataChanged.discreption}
                onChange={(e) => ChangeData(e, "discreption")}
                className="rounded-sm border border-black text-black p-1 ml-5 w-[18.5%] outline-none"
                type="text"
              />
            </div>
            <div className="w-[90%] self-center flex flex-row items-center gap-5 m-5">
              <button
                onClick={() => dataSubmit("discreption")}
                className="bg-[rgb(49,71,106)] text-white active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[40%] p-2 rounded-sm"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyPage;
