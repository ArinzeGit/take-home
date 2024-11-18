//Generic Toggle button for reveal/hide feature

interface ToggleButtonProps {
  isActive: boolean; // Determines the current state of the button
  onToggle: () => void; // Function to call when toggled
  activeLabel: string; // Label when the button is active
  inactiveLabel: string; // Label when the button is inactive
  className?: string; // Optional custom styling
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  onToggle,
  activeLabel,
  inactiveLabel,
  className = "",
}) => {
  return (
    <button
      onClick={onToggle}
      className={`transition-colors hover:bg-gray-800 bg-black text-white text-sm rounded px-3 py-1 ${className}`}
    >
      {isActive ? activeLabel : inactiveLabel}
    </button>
  );
};
