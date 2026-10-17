interface RocketMarkProps {
  className?: string;
}

export default function RocketMark({ className = "h-8 w-8" }: RocketMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 2c3.4 2.6 5.4 6.6 5.4 10.9v8.6l-2.9 2.4v4.1h-5v-4.1l-2.9-2.4v-8.6C10.6 8.6 12.6 4.6 16 2z" fill="#F4F1EC" />
      <path d="M16 2c3.4 2.6 5.4 6.6 5.4 10.9v2.3H10.6v-2.3C10.6 8.6 12.6 4.6 16 2z" fill="#E05252" />
      <circle cx="16" cy="14.2" r="2.1" fill="#3D6F9E" />
      <path d="M10.6 15.5 7 21.2l3.6-1.2v-4.5zM21.4 15.5l3.6 5.7-3.6-1.2v-4.5z" fill="#E05252" />
      <path d="M14 28.5h4l-.7 2.5h-2.6L14 28.5z" fill="#F0A840" />
    </svg>
  );
}
