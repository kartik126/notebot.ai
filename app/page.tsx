"use client";
import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";
import Image from "next/image";
const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <hr />
      <div className=" h-full w-[95%] mx-auto rounded-md">
        <Editor
          editable={true}
          onChange={() => null}
          initialContent={"# You are great"}
        />
      </div>
    </div>
  );
}
