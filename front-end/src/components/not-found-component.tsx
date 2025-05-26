export default function NotFoundComponent({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-auto text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6 uppercase">NOT FOUND {name}</p>
    </div>
  );
}
