function NewsSkeleton() {
  return (
    <div className="animate-pulse bg-slate-800 rounded-xl overflow-hidden">
      <div className="h-48 bg-slate-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default NewsSkeleton;