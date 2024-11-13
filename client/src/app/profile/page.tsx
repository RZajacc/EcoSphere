import ImageChange from "@/_components/user/ImageChange";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User profiles",
};

function page() {
  return (
    <div className="h-full bg-gray-100 py-6">
      <div className="mx-auto grid w-2/3 rounded-md bg-white p-3 md:w-1/2 lg:w-1/3">
        {/* User image section */}
        <ImageChange />

        {/* User data section */}
        <section>section 2</section>
      </div>
    </div>
  );
}

export default page;
