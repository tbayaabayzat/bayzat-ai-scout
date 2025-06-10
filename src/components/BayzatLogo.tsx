
interface BayzatLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BayzatLogo({ className = "", width = 120, height = 40 }: BayzatLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/placeholder.svg" 
        alt="Bayzat" 
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}
