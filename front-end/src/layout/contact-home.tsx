"use client";
import TitleSection from "@/components/title-section";
import { HeaderFont3 } from "@/font/font";
import { ContactType } from "@/types/define.type";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ContentContact: ContactType[] = [
  {
    content: "Call to 0865.09.39.09",
    link: "tel:0865093909",
    type: "phone",
    icon: faPhone,
    image: "/contact/phone.jpg",
  },
  {
    content: "Contact with us on Facebook",
    link: "https://www.facebook.com/richson.h264",
    type: "facebook",
    icon: faFacebook,
    image: "/contact/facebook.jpg",
  },
  {
    content: "Follow us on instagram",
    link: "tel:0865093909",
    type: "instagram",
    icon: faInstagram,
    image: "/contact/instagram.jpg",
  },
  {
    content: "Mail to us",
    link: "mailto:nguyenthanhsang60309@gmail.com",
    type: "email",
    icon: faMailBulk,
    image: "/contact/phone.jpg",
  },
];

export default function ContactHome() {
  const [contactActive, setContactActive] = useState<ContactType | null>(null);

  const handleActive = (active: ContactType) => {
    setContactActive(active);
  };

  const variantsImage: Variants = {
    init: {
      translateX: "100%",
      opacity: 0,
    },
    show: {
      translateX: 0,
      opacity: 1,
    },
    exit: {
      translateX: "-100%",
      opacity: 0,
    },
  };

  return (
    <section className="my-10 overflow-hidden lg:px-30">
      <TitleSection title="Contact" />
      <div className={clsx(HeaderFont3.className, "flex flex-row px-5")}>
        <div className="w-4/6 flex flex-col justify-between">
          {ContentContact.map((val, index) => {
            return (
              <div
                onClick={() => handleActive(val)}
                className="cursor-pointer"
                key={`contact-${index}`}
              >
                <h4 className="text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop uppercase hover:text-textsc text-">
                  {val.type}
                  <motion.span
                    animate={
                      contactActive === val
                        ? { opacity: 1, translateX: 0 }
                        : { opacity: 0, translateX: 20 }
                    }
                    className="ml-5 inline-block"
                  >
                    <FontAwesomeIcon icon={val.icon} />
                  </motion.span>
                </h4>
                <motion.div
                  className="ml-10 mt-3 text-card-title-mobile: md:text-card-title-tablet lg:text-card-title-desktop duration-200 hover:text-hover "
                  layout
                >
                  {val === contactActive && (
                    <motion.div
                      initial={{ opacity: 0, translateX: -10 }}
                      animate={{ opacity: 1, translateX: 0 }}
                    >
                      <Link href={val.link}>{val.content}</Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
        <motion.div className="w-2/6" layout>
          <AnimatePresence mode="wait">
            {contactActive && (
              <motion.div
                key={contactActive.type}
                className="w-full aspect-3/4 relative"
                variants={variantsImage}
                initial="init"
                animate="show"
                exit={"exit"}
                transition={{ duration: 0.5 }}
              >
                <Image
                  alt={`Richson ${contactActive.type}`}
                  src={contactActive.image}
                  fill
                />
              </motion.div>
            )}
            {!contactActive && (
              <motion.div
                key={"empty"}
                className="w-full aspect-3/4 relative"
                variants={variantsImage}
                initial="init"
                animate="show"
                exit={"exit"}
                transition={{ duration: 0.5 }}
              >
                <Image
                  alt={`Richson contact default`}
                  src={"/contact/default.jpg"}
                  fill
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
