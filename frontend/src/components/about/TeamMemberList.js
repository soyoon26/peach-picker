import Image from "next/image";

const TeamMemberList = ({ teamMembers, selectedMember, setSelectedMember }) => {
  return (
    <div className="mb-10 space-x-10 fj">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className={`flex flex-col items-center cursor-pointer ${
            selectedMember.id === member.id ? "text-rose-400" : "text-gray-700"
          }`}
          onClick={() => setSelectedMember(member)}
        >
          <div className="w-24 h-24 overflow-hidden transition-all duration-300 border-4 rounded-full">
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold">{member.name}</div>
            <div className="text-sm">{member.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
