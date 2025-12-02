export function SkeletonCard() {
  return (
    <div className="p-4 bg-gradient-to-br from-[#0f1724] to-[#0a0f1a] rounded-xl border border-gray-800/50 max-w-72 min-h-48 min-w-72 relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="h-5 bg-gradient-to-r from-gray-700/80 to-gray-700/40 rounded-lg w-3/4 mb-3 animate-pulse" />
      
      <div className="bg-[#071029]/60 backdrop-blur-sm rounded-xl border border-gray-800/30 h-[150px] flex flex-col items-center justify-center gap-3 p-4">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-600/40 to-gray-700/60 rounded-full animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.15)]" />
        
        <div className="w-full space-y-2">
          <div className="h-2 bg-gradient-to-r from-gray-700/60 to-gray-700/30 rounded-full w-2/3 mx-auto animate-pulse" />
          <div className="h-2 bg-gradient-to-r from-gray-700/60 to-gray-700/30 rounded-full w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}