"use client";
import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentImageUrlAtom } from "@/store/atoms/atoms";
const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});
export default function Home() {
  const currentImageUrl = useRecoilValue(currentImageUrlAtom);
  const [renderEditor, setRenderEditor] = useState(false);

  useEffect(() => {
    if (currentImageUrl) {
      setRenderEditor(true);
    }
  }, [currentImageUrl]);
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />

        {renderEditor && (
          <div className=" h-full w-[95%] mx-auto rounded-md">
            <Editor
              editable={true}
              onChange={() => null}
              initialContent={"# You are great"}
            />
          </div>
        )}

        {!renderEditor && (
          <div className="h-[calc(100vh-4rem)] flex justify-center items-center flex-col gap-4">
            {/* <h1 className="text-2xl font-bold">Notebot</h1> */}
            <Hero />
            {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                Learn
              </a>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
                />
                Examples
              </a>
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="https://nextjs.org/icons/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                Go to nextjs.org →
              </a>
            </footer> */}
          </div>
        )}
      </div>
    </>
  );
}
