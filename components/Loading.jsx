import Image from "next/image"
export const Loading = () => {
  return (
    <div className="absolute flex flex-col items-center w-full h-full">
      <Image src="/Bug Juice copy 2.png" height={500} width={500} className="z-20 animate-pulse" alt="" />
    </div>
  )
}