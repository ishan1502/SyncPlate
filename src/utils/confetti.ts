import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#10b981', '#f97316', '#38bdf8', '#fbbf24'],
  });
};
