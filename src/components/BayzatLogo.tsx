
interface BayzatLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BayzatLogo({ className = "", width = 120, height = 32 }: BayzatLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/cb33dcd7-16ca-427a-b821-9322f27a6a4c.png" 
        alt="Bayzat" 
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
}
