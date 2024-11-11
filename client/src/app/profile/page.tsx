"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext, useRef } from "react";
import noUser from "../../assets/noUser.png";

function page() {
  const { user } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;

    if (image) {
      const formdata = new FormData();
      formdata.append("userImage", image[0]);

      const response = await fetch("http://localhost:5000/images/upload", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      });
      if (response.ok) {
        console.log("IT was really ok");
      }
    }
  };
  return (
    <div className="h-full bg-gray-100 py-6">
      <div className="mx-auto grid w-2/3 rounded-md bg-white p-3">
        <section className="relative mx-auto w-4/5">
          <Image
            src={user?.image.public_url ? user.image.public_url : noUser}
            width={user?.image.width ? user.image.width : 100}
            height={user?.image.height ? user.image.height : 100}
            priority
            alt="user image"
            className="rounded-md"
          />

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
        <section>section 2</section>
      </div>
    </div>
  );
}

export default page;
