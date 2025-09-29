'use client';

import { SocialIcon } from 'react-social-icons';
import {
  Music,
  Radio,
  Users,
  Heart,
  MapPin,
  Award,
  Mail,
  Phone,
  Send,
  HelpCircle,
  MessageCircle,
  Play,
  Headphones,
  ExternalLink,
  Clock,
  Star,
  Zap,
  Crown,
  Sparkles,
  Check,
  ArrowRight,
  Volume2,
  Mic,
  Briefcase,
  BarChart2,
  Settings,
  AlertTriangle,
  ArrowLeft,
  Home,
  User,
  Calendar,
  X,
} from 'lucide-react';

const iconMap = {
  music: Music,
  radio: Radio,
  users: Users,
  heart: Heart,
  mapPin: MapPin,
  award: Award,
  mail: Mail,
  phone: Phone,
  send: Send,
  helpCircle: HelpCircle,
  messageCircle: MessageCircle,
  play: Play,
  headphones: Headphones,
  externalLink: ExternalLink,
  clock: Clock,
  star: Star,
  zap: Zap,
  crown: Crown,
  sparkles: Sparkles,
  check: Check,
  arrowRight: ArrowRight,
  volume2: Volume2,
  mic: Mic,
  briefcase: Briefcase,
  barChart2: BarChart2,
  settings: Settings,
  alertTriangle: AlertTriangle,
  arrowLeft: ArrowLeft,
  home: Home,
  user: User,
  calendar: Calendar,
  x: X,
};

const socialIconNames = [
  'tiktok',
  'spotify',
  'facebook',
  'twitter',
  'instagram',
  'youtube',
];

const DynamicIcon = ({ name, ...props }) => {
  if (name === 'mixcloud') {
    return (
      <img
        src="data:image/png;base64,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"
       alt="Mixcloud Icon"
       {...props}
     />
   );
  }

  if (socialIconNames.includes(name)) {
    return <SocialIcon {...props} />;
  }

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null; // O puedes devolver un ícono por defecto, ej: <HelpCircle {...props} />
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
