import { BsGooglePlay, BsApple } from "react-icons/bs";

export default function AppDownloadLinks() {
  return (
    <div className="md:w-1/2 text-left md:text-right space-y-2">
      <h2 className="text-sm font-medium uppercase tracking-wide">
        Download our mobile app
      </h2>
      <div className="flex justify-start md:justify-end gap-3">
        <a
          href="#"
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
        >
          <BsGooglePlay className="text-xl" />
          <span className="text-xs">Google Play</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded"
        >
          <BsApple className="text-xl" />
          <span className="text-xs">App Store</span>
        </a>
      </div>
    </div>
  );
}
