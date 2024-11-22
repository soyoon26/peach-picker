import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const SelectedMemberDetails = ({ selectedMember }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg p-8 space-y-4 text-center bg-white rounded-lg shadow-md">
      <Image
        src={selectedMember.image}
        alt={selectedMember.name}
        width={150}
        height={150}
        className="object-cover rounded-full"
      />
      <div className="text-2xl font-bold">{selectedMember.name}</div>
      <div className="text-lg text-rose-400">{selectedMember.role}</div>
      <p className="max-w-md text-gray-700">{selectedMember.description}</p>

      <a
        href={selectedMember.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
      >
        <FaGithub size={24} />
        <span>GitHub</span>
      </a>
    </div>
  );
};

export default SelectedMemberDetails;
