
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  return (
    <Link to={to} className="p-2 inline-flex items-center">
      <ArrowLeft className="h-6 w-6 text-gray-800" />
    </Link>
  );
};

export default BackButton;
