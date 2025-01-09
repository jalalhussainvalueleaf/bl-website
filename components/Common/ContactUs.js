import React from 'react'
import Link from 'next/link'
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";

export default function ContactUs() {
  return (
    <div className="mx-auto w-11/12 mb-8">
          <h2 className="py-4 text-3xl font-semibold">Contact Us:</h2>
          <p>
            For assistance or more information about personal loans and to
            address concerns, please contact us at info@buddyloan.com.
          </p>

          <div>
            <p className="font-semibold">You Can Connect over :</p>
            <div className="flex w-full gap-2 pt-4">
              <Link href="https://twitter.com/Buddyloan_">
                <RiTwitterXLine
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/buddyloan">
                <FaLinkedinIn
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.facebook.com/buddyloan">
                <FaFacebookF
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.instagram.com/buddyloanofficial/">
                <IoLogoInstagram
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.youtube.com/channel/UCzDF0mUNoPV5Sx7IIL0ATTQ">
                <AiOutlineYoutube
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
            </div>
          </div>
          <div className="my-4 font-semibold">Download App:</div>
          <div className="flex items-center  gap-4">
            <Link
              href="https://play.google.com/store/apps/details?id=com.buddyloan.vls&referrer=utm_source%3DWebsite%26utm_medium%3DDownloadButton"
              className=""
              target="_blank"
            >
              <img src="/images/playstore_btn.png" className="w-40" />
            </Link>
            <Link
              href="https://apps.apple.com/in/app/buddy-loan-personal-loan/id1552911697?utm_medium=DownloadButton&utm_source=SEO&utm_campaign=bl2&la=1"
              className=""
              target="_blank"
            >
              <img src="/images/appstore_btn.png" className="w-40" />
            </Link>
          </div>
        </div>
  )
}
