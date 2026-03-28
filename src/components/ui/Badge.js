export const Badge = ({ text, type }) => {
  const styles = {
    up: "text-green-400",
    down: "text-red-400",
  };

  return `
    <span class="${styles[type]} font-mono">
      ${text}
    </span>
  `;
};
