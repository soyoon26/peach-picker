import { motion } from "framer-motion";
import Image from "next/image";

const Article = ({ title, description, imageSrc, altText }) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={fadeInVariants}
      className="p-8 space-y-4 transition-transform duration-500 ease-in-out transform bg-white rounded-lg shadow-lg hover:scale-105"
    >
      <div className="mb-4 text-3xl font-bold text-center text-gray-800">
        {title}
      </div>
      <div className="fj">
        <Image
          src={imageSrc}
          width={700}
          height={500}
          alt={altText}
          className="rounded-md"
        />
      </div>
      <div className="text-lg text-center text-gray-600">{description}</div>
    </motion.article>
  );
};

export default Article;
