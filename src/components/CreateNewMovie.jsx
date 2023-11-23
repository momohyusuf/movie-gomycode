import React, { useState } from "react";
import { Button, Modal, Input, Rate, message } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import validator from "validator";

const CreateNewMovie = ({ setMyMovies, setRandom, memorizedMovies }) => {
  const [movieInfo, setMovieInfo] = useState({
    id: Math.random(),
    title: "",
    description: "",
    posterUrl: "",
    rating: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  //   a function to handle our input
  const handleInput = (event) => {
    const { id, value } = event.target;
    setMovieInfo((preValue) => {
      return {
        ...preValue,
        [id]: value,
      };
    });
  };
  //   ********************************
  // ***********************************
  const handleRate = (value) => {
    setMovieInfo((preValue) => ({
      ...preValue,
      rating: value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // lets validate all our input before adding to the array

    // validate the posterUrl
    if (!validator.isURL(movieInfo.posterUrl)) {
      messageApi.open({
        type: "error",
        content: "Please provide a valid image address",
      });
      return;
    }

    // validate the Movie title
    if (validator.isEmpty(movieInfo.title)) {
      messageApi.open({
        type: "error",
        content: "Please provide a movie title",
      });
      return;
    }

    // validate the Movie title
    if (movieInfo.rating < 1) {
      messageApi.open({
        type: "error",
        content: "Please rate the movie",
      });
      return;
    }

    // validate the Movie title
    if (validator.isEmpty(movieInfo.description)) {
      messageApi.open({
        type: "error",
        content: "Please provide movie description",
      });
      return;
    }

    messageApi.open({
      type: "success",
      content: "Movie successfully added",
    });

    setMyMovies(() => [movieInfo, ...memorizedMovies.myMemorizedMovies]);

    // to trigger the memorized the value in the use memo in app.jsx
    setRandom(Math.random());
    // ***************************
    // ***************************

    // now reset the input field back to empty values
    setMovieInfo({
      id: Math.random(),
      title: "",
      description: "",
      posterUrl: "",
      rating: 1,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        icon={<VideoCameraAddOutlined />}
        onClick={showModal}
      >
        Add Movie
      </Button>
      <Modal
        title="Add new movie"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contextHolder}

        <div className="space-y-3">
          <Input
            placeholder="Moview poster url"
            id="posterUrl"
            onChange={handleInput}
            value={movieInfo.posterUrl}
          />
          <div>
            <Input
              placeholder="Movie Title"
              id="title"
              onChange={handleInput}
              value={movieInfo.title}
            />

            {/* for rating a movie */}
            <div className="shadow my-4 rounded-md p-2 w-fit">
              <p>Rate Movie</p>
              <Rate
                value={movieInfo.rating}
                onChange={(value) => handleRate(value)}
                defaultValue={1}
              />
            </div>
            {/* ******************* */}
          </div>

          <Input.TextArea
            rows={4}
            id="description"
            onChange={handleInput}
            placeholder="Movie description"
            value={movieInfo.description}
          />
        </div>
      </Modal>
    </>
  );
};
export default CreateNewMovie;
