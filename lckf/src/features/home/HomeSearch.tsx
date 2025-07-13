export default function HomeSearch() {
  return (
    <section className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">나와 닮은 LCK 선수 찾기</h2>
      <p className="text-gray-400 mb-8">
        소환사명을 입력하고 당신의 플레이스타일을 분석해보세요
      </p>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="소환사명을 입력하세요"
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-l text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded transition-colors cursor-pointer">
            입력
          </button>
        </div>
      </div>
    </section>
  );
}
