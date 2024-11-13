"use client";
import React from "react";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import noUser from "../../assets/noUser.png";

function ImageChange() {
  const { user, revalidateUser } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get images list
    const imagesList = e.target.files;

    // Reset error
    setUploadErr(null);

    // Get user token from my api route
    const tokenResponse = await fetch("/api/token", {
      method: "GET",
      credentials: "include",
    });

    const token: { authorized: boolean; token: string | undefined } =
      await tokenResponse.json();

    // Prepare a fetch call
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    const formdata = new FormData();
    formdata.append("userImage", imagesList ? imagesList[0] : "");
    formdata.append("folder", "userImages");

    // Set updating status for styling purposes
    setIsUpdating(true);

    const imageUploadResponse = await fetch(
      "http://localhost:5000/users/updateImage",
      {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      },
    );

    // If upload was successfull revalidate the user and deactivate update status
    if (imageUploadResponse.ok) {
      revalidateUser();
      setIsUpdating(false);
    } else {
      const result: { msg: string } = await imageUploadResponse.json();
      setUploadErr(result.msg);
    }
  };

  return (
    <>
      <section className="relative mx-auto w-4/5">
        <Image
          src={user?.image.public_url ? user.image.public_url : noUser}
          width={user?.image?.width || undefined}
          height={user?.image?.height || undefined}
          priority
          alt="user image"
          className={`rounded-md ${isUpdating ? "animate-pulse" : ""}`}
        />

        {/* Conditional loading string */}
        {isUpdating && (
          <p className="absolute bottom-1/2 left-1/4 animate-pulse text-3xl font-semibold text-white">
            Loading...
          </p>
        )}

        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageUpload}
        />

        <button
          className="absolute right-4 top-3 rounded-md bg-gray-400 bg-opacity-50 px-2 py-1 font-semibold text-white transition duration-700 hover:bg-opacity-80"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          Change profile image
        </button>
        <h2 className="absolute bottom-10 left-4 text-3xl font-semibold text-white">
          {user?.user_name}
        </h2>
        <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-white">
          {user?.email}
        </h3>
      </section>

      {/* Error String */}
      {uploadErr && (
        <p className="text-center font-semibold text-rose-400">
          Upload error string
        </p>
      )}
    </>
  );
}

export default ImageChange;
