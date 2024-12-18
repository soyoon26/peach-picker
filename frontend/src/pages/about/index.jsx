import React, { useState } from "react";

import profile1 from "../../images/choi.png";
import profile2 from "../../images/Kim.png";
import profile3 from "../../images/doggy.jpg";
import TeamMemberList from "@/components/about/TeamMemberList";
import SelectedMemberDetails from "@/components/about/SelectedMemberDetails";

const teamMembers = [
  {
    id: 1,
    name: "최형우",
    role: "Backend",
    image: profile1,
    github: "https://github.com/maewakka",
    description: `서버의 신`,
  },
  {
    id: 2,
    name: "김지홍",
    role: "Backend",
    image: profile2,
    github: "https://github.com/kjh95044",
    description: `운동하는 건강한 개발자`,
  },
  {
    id: 3,
    name: "박소윤",
    role: "Frontend",
    image: profile3,
    github: "https://github.com/soyoon26",
    description: `사용자 경험과 UI/UX 개선을 위한 웹 및 모바일 애플리케이션의 인터페이스를 설계하고 개발합니다. 사용자 친화적인 인터페이스와 인터랙티브 요소를 구현하여 최고의 사용자 경험을 제공하고자 합니다.`,
  },
];

const Index = () => {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  return (
    <div className="flex flex-col items-center min-h-screen p-10 bg-gradient-to-b from-rose-100 to-rose-200">
      <div className="m-4 text-3xl font-bold">기업 정보</div>
      <div className="mb-10 text-sm font-bold">팀원</div>

      <TeamMemberList
        teamMembers={teamMembers}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />

      <SelectedMemberDetails selectedMember={selectedMember} />
    </div>
  );
};

export default Index;
