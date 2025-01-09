"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
// import Loading from "@/components/Loader/Loading";
import ConfigData from "@/config";
import { FaRegCirclePlay } from "react-icons/fa6";

function Testimonails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${ConfigData.blogAPI}/testimonial?_embed&per_page=9&page=${page}`;
      // if (category) {
      //   url += `&categories=${category}`;
      // }

      const response = await fetch(url);
      const result = await response.json();

      if (Array.isArray(result)) {
        setHasMore(result.length === 9);
        setData((prevData) => (page === 1 ? result : [...prevData, ...result]));
      } else {
        console.error("Expected an array but got:", result);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // useEffect(() => {
  //   setPage(1);
  // }, [category]);

  const stripHTMLAndLimit = useCallback((htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 255 ? `${text.substring(0, 255)}...` : text;
  }, []);

  const loadMorePosts = useCallback(() => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  }, [hasMore]);

  const extractYouTubeId = useCallback((url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }, []);

  const renderLoadingSkeleton = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="h-40 w-full bg-gray-300" />
        </div>
      )),
    []
  );

  return (
    <>
      <div className="mt-10 flex min-h-80 flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold text-bl-blue">
          Happy Customers, Happy Stories
        </h1>
        <h3 className="text-bl-blue">Our Satisfied Customers</h3>
      </div>
      <div className="w-full md:flex-row">
        <div className="mx-auto grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3 lg:w-full lg:p-8">
          {loading && page === 1 && renderLoadingSkeleton}

          {data.map((item) => {
            const videoId = item.acf.yt_url ? extractYouTubeId(item.acf.yt_url) : null;
            return (
              <div
                className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <div className="relative">
                
                
                  {videoId && (
                    <Image
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt="YouTube Thumbnail"
                      className="cursor-pointer rounded-t-lg"
                      width={400}
                      height={225}
                      onClick={() => setSelectedVideo(videoId)}
                    />
                  )}
                  {videoId && (
                    <FaRegCirclePlay
                      size={60}
                      color="white"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setSelectedVideo(videoId)}
                    />
                  )}
                </div>

                <div className="p-5">
                  <h5
                    className="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  ></h5>
                  <p
                    className="text-sm text-gray-700 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: stripHTMLAndLimit(item.excerpt.rendered),
                    }}
                  ></p>
                </div>
              </div>
            );
          })}
        </div>

        {!loading && hasMore && (
          <div className="flex justify-center pb-12">
            <button
              onClick={loadMorePosts}
              className="rounded-lg bg-bl-blue px-4 py-2 text-white"
            >
              Load More
            </button>
          </div>
        )}

        {/* {!loading && !hasMore && (
          <div className="text-center text-gray-500">No more posts available</div>
        )} */}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full lg:min-h-[500px] lg:min-w-[800px]"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Testimonails