"use client"
import React, {useState } from "react";
import Faqs from "@/components/Faqs";
import { useRouter } from "next/navigation";


const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6 py-10">
      <div className="max-w-2xl text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
          Do You Have a Question?
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl font-medium mb-2">
          We have answers (well, most of the time! 😉)
        </p>
        <p className="text-gray-400 text-base sm:text-lg">
          Feel free to check out our{" "}
          <span onClick={()=>router.push("https://www.instagram.com/itz_5achin/")} className="text-blue-400 hover:underline cursor-pointer">
            Instagram
          </span>{" "}
          and{" "}
          <span onClick={()=>router.push("https://www.linkedin.com/in/sachin-kumar-9b9439312/")} className="text-blue-400 hover:underline cursor-pointer">
            LinkedIn
          </span>{" "}
          page. If you still can not find what you are looking for, just{" "}
          <span className="font-semibold text-orange-400">Contact Us!</span> 🚀
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-white text-3xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {Faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-white text-lg font-medium">{faq.question}</p>
                <span className="text-gray-400">
                  {openIndex === index ? "➖" : "➕"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-300 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
