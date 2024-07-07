import LogoMain from "@/Utils/Icons/LogoMain";

export default function LoadingComponent() {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="animate-pulse">
        <LogoMain height={300} width={300} />
      </div>
    </div>
  );
}
