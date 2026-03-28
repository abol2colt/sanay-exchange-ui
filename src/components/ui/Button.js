/*
Usage:
Button({label:"Buy", variant:"primary"})
*/

export const Button = ({ label, variant = "primary" }) => {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
    ghost: "bg-gray-800 hover:bg-gray-700",
  };

  return `
    <button class="
      ${styles[variant]}
      px-4
      py-2
      rounded
      text-white
      transition
    ">
      ${label}
    </button>
  `;
};
