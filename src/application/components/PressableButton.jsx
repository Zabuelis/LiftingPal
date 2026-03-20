import { Pressable } from "react-native";

const PressableButton = ({ className, children, ...props }) => {
  return (
    <Pressable
      className={`active:bg-amber-600 justify-center items-center rounded-[5vw] border-gray-300 border-2 bg-amber-500 ${className}`}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default PressableButton;
