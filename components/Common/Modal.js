import React, { useState } from "react";

export default function Modal({ title, data, btnName, link }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      {/* Trigger link */}
      <a
        onClick={toggleModal}
        className="cursor-pointer text-blue-600 hover:underline"
      >
        {link}
      </a>

      {isModalVisible && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>

          {/* Modal */}
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden={!isModalVisible}
            className="fixed inset-x-0 top-0 z-50 flex h-full items-center justify-center overflow-y-auto"
          >
            <div className="relative max-h-full w-full max-w-2xl p-4">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="size-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4 p-4">
                  <div
                    className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 dark:border-gray-600">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {btnName}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
