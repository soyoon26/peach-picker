import people from "../../images/people.jpg";
import game from "../../images/game.jpg";
import diversity from "../../images/diversity.jpg";
import justice from "../../images/justice.jpg";
import link from "../../images/link.jpg";
import Article from "@/components/brandstory/Article";
import ScrollToTopButton from "@/components/brandstory/ScrollToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen p-6 space-y-20 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
      <Article
        title="피치피커의 비전"
        description="피치피커는 공정하고 즐거운 추첨 문화를 만들어가는 플랫폼입니다. 누구나 쉽게 참여할 수 있고, 모든 과정이 투명하게 공개되는 추첨을 제공합니다."
        imageSrc={justice}
        altText="justice"
      />
      <Article
        title="피치피커의 새로움"
        description="도전과 혁신으로 추첨의 새로운 경험을 드립니다. 기술과 창의력을 결합하여 사용자들에게 즐겁고 흥미로운 추첨 기회를 제공합니다. 독특하고 다양한 방법으로 추첨의 재미를 더합니다."
        imageSrc={game}
        altText="game"
      />
      <Article
        title="피치피커의 가치"
        description="사회적 가치를 지킬 수 있는 여러 선택지를 제안합니다. 기부 추첨, 공익 캠페인과 같은 사회적 책임을 다하는 활동을 통해 더 나은 세상을 만들어갑니다. 참여할 때마다 작은 변화를 만들어가는 힘을 느껴보세요."
        imageSrc={people}
        altText="people"
      />
      <Article
        title="피치피커의 다양성"
        description="나만의 취향에 따라 고를 수 있는 다양함을 제공합니다. 여러 가지 상품, 테마, 참여 방법을 통해 사용자들은 자신만의 독특한 추첨 경험을 만들어갈 수 있습니다."
        imageSrc={diversity}
        altText="diversity"
      />
      <Article
        title="피치피커의 커뮤니티"
        description="피치피커는 사용자들 간의 연결을 중요하게 생각합니다. 커뮤니티 이벤트, 사용자 피드백 반영, 경험 공유 등을 통해 모두가 함께 만들어가는 플랫폼을 지향합니다."
        imageSrc={link}
        altText="link"
      />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
