import { SizeContext } from "context/SizeContext";
import { useContext } from "react";

export default function CourseIcons({ name }) {
  const { secondBar } = useContext(SizeContext)
  const ICONS = {
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 115.94 90.1"
        className={`fill-primary ${secondBar? "h-3": "h-2"}`}
      >
        <path d="M113.34,6.79,109.15,2.6a8.87,8.87,0,0,0-12.55,0L40.21,59,19.34,38.15a8.87,8.87,0,0,0-12.55,0L2.6,42.34a8.89,8.89,0,0,0,0,12.57L36,88.36a5.9,5.9,0,0,0,8.37,0l68.94-69A8.89,8.89,0,0,0,113.34,6.79Z" />
      </svg>
    ),
    play: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 78.9 105.14"
        className={`fill-primary ${secondBar? "h-3": "h-2"}`}
      >
        <path d="M73.08,42.81l-58.35-40A14.24,14.24,0,0,0,7.06,0C2.7,0,0,3.51,0,9.37V95.78c0,5.86,2.7,9.36,7.05,9.36a14.07,14.07,0,0,0,7.63-2.84l58.38-40c3.76-2.58,5.84-6,5.84-9.77S76.84,45.38,73.08,42.81Z" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-4 fill-primary"
      >
        <path d="M23,11H13V1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H11V23a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13H23a1,1,0,0,0,1-1h0A1,1,0,0,0,23,11Z" />
      </svg>
    ),
    minus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-4 fill-primary"
      >
        <rect y="11" width="24" height="2" rx="1" />
      </svg>
    ),
    back: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        className="h-3 w-3 fill-white"
      >
        <path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z" />
      </svg>
    ),
  };

  return <>{ICONS[name]}</>;
}
