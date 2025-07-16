import Link from "next/link";

export default function HomeFeatures() {
  const features = [
    {
      title: "플레이스타일 분석",
      description: "당신의 게임 데이터를 기반으로 플레이 성향을 분석합니다",
      href: "/playstyle",
    },
    {
      title: "LCK 선수 추천",
      description: "분석 결과를 바탕으로 가장 유사한 LCK 선수를 추천합니다",
      href: "/lckplayers",
    },
    {
      title: "커뮤니티",
      description: "다른 유저들과 추천 결과를 공유하고 의견을 나눠보세요",
      href: "/posts",
    },
  ];

  return (
    <section className="flex justify-center">
      <div className="flex gap-6 max-w-5xl">
        {features.map((feature, index) => (
          <Link
            key={index}
            href={feature.href ?? "#"}
            className="flex-1 bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors cursor-pointer block"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
