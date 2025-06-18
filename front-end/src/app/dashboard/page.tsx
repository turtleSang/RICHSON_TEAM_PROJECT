export default async function PageDashBoard() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-background-item shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-text">Welcome, Admin!</h1>
        <p className="mt-4 text-textsc">
          You have successfully accessed the admin dashboard.
        </p>
      </div>
    </div>
  );
}
