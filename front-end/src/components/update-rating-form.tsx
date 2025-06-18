import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faPlus,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationProps } from "./notification-component";
import axios from "axios";
import Loader from "./loader";

export default function UpdateRatingForm({
  handleNotification,
  ratingOld,
  projectId,
}: {
  projectId: number;
  ratingOld: number;
  handleNotification: (notification: NotificationProps) => void;
}) {
  const [rating, setRating] = useState<number>(ratingOld);
  const [isUpload, setIsUpload] = useState(false);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);
    if (!isNaN(val)) {
      setRating(val);
    }
  };

  const handleChange = () => {
    const newRating = Number(rating.toFixed(2));
    if (newRating > 9.9) {
      setRating(9.9);
    } else if (newRating <= 0.1) {
      setRating(0.1);
    }
  };

  const handleMinus = () => {
    const ratingMinus = Number((rating - 1).toFixed(2));
    if (ratingMinus < 0.1) {
      setRating(0.1);
    } else {
      setRating(ratingMinus);
    }
  };

  const handlePlus = () => {
    const ratingPlus = Number((rating + 1).toFixed(2));
    if (ratingPlus > 9.9) {
      setRating(9.9);
    } else {
      setRating(ratingPlus);
    }
  };

  const handleRest = () => {
    setRating(ratingOld);
  };

  const handleSubmit = async () => {
    setIsUpload(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/rating`;
    const data = {
      id: Number(projectId),
      rating,
    };
    try {
      const res = await axios.put(url, data, { withCredentials: true });
      const mess = res.data as string;
      handleNotification({ mess, type: "success" });
    } catch (error) {
      console.error(error);
      handleNotification({ mess: "Server Error", type: "error" });
    }
    setIsUpload(false);
  };

  return (
    <form className="relative p-3">
      {isUpload && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-row justify-center items-center rounded-md">
          <Loader />
        </div>
      )}
      <label className="bg-background/50 rounded-2xl inline-block" htmlFor="">
        <p className="text-center">Rating</p>
        <span
          onClick={handleMinus}
          className="cursor-pointer inline-block w-10 h-10 leading-10 text-center rounded-full hover:bg-background"
        >
          <FontAwesomeIcon icon={faMinus} />
        </span>
        <input
          className="text-center inline-block w-10 focus-visible:outline-0"
          type="number"
          step="any"
          value={rating}
          onInput={handleInput}
          onBlur={handleChange}
        />
        <span
          onClick={handlePlus}
          className="cursor-pointer inline-block  w-10 h-10 leading-10 text-center rounded-full hover:bg-background"
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </label>
      <div className="flex flex-row justify-evenly items-center mt-3">
        <span
          onClick={handleSubmit}
          className="rounded-xl inline-block w-10 h-10 leading-10 text-center bg-green-500 cursor-pointer hover:bg-hover duration-200"
        >
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span
          onClick={handleRest}
          className="rounded-xl inline-block w-10 h-10 leading-10 text-center bg-red-500 cursor-pointer hover:bg-hover duration-200"
        >
          <FontAwesomeIcon icon={faRefresh} />
        </span>
      </div>
    </form>
  );
}
