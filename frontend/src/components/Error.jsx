import { useRouteError } from "react-router-dom";

const Error = () => {
  const defaultError = useRouteError();
  console.error(defaultError);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Sorry, something went wrong.
      </p>
      <p className="text-sm text-gray-500 italic">
        {defaultError.statusText || defaultError.message}
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default Error;
