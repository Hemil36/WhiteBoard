import react from 'react'
import Logo from './logo.png'
export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center absolute " >
      <img
        src={Logo}
        alt="Logo"
        width={120}
        height={120}
        className=" animate-pulse duration-700"
      />
    </div>
  );
};
