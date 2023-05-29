import loadingMessages from "../utilities/loadingMessages";

interface SqueletonProps {
  blocks?: number;
}

export default function Squeleton({ blocks = 3 }: SqueletonProps) {
  return (
    <>
      <h2 className="font-bold text-xl flex flex-wrap">{loadingMessages()}</h2>
      {Array(blocks).fill(0).map((_, index) => (
        <div key={`squeleton-${index}`} className="w-[450px] h-full bg-white rounded-md drop-shadow-md px-2 py-4">
          <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="flex items-center w-full space-x-2">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[400px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[440px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[360px]">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ))}
    </>
  );
}
