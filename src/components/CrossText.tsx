interface CrossTextProps {
  text: string;
  className?: string;
}

export default function CrossText({ text, className = '' }: CrossTextProps) {
  return <span className={className}>{text}</span>;
}
