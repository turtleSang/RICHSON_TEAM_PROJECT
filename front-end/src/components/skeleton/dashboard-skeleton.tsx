export default function DashboardSkeleton() {
  return (
    <section className="flex flex-row justify-between gap-1">
      <div className="w-2/12 h-[100vh] bg-background-item p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-20 w-20 bg-background rounded-full mx-auto"></div>
          <div className="h-10 bg-background rounded" />
          <div className="h-8 bg-background rounded" />
          <div className="h-8 bg-background rounded" />
          <div className="h-8 bg-background rounded" />
          <div className="h-8 bg-background rounded" />
        </div>
      </div>
      <div className="w-10/12 h-[100vh] overflow-y-auto p-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-background-item rounded w-3/4" />
          <div className="h-6 bg-background-item rounded w-full" />
          <div className="h-6 bg-background-item rounded w-full" />
          <div className="h-6 bg-background-item rounded w-5/6" />
          <div className="h-96 bg-background-item rounded" />
        </div>
      </div>
    </section>
  );
}
