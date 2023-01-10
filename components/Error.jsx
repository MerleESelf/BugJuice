import Image from "next/image"
export const Error = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src="/Error.png" height={500} width={500} className="animate-pulse" alt="" />
    </div>
  )
}