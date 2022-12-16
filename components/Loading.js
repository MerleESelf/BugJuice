import Image from "next/image"
export const Loading = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src="/Bug Juice copy 2.png" height={500} width={500} className="absolute z-20 animate-pulse" alt="" />
    </div>
  )
}