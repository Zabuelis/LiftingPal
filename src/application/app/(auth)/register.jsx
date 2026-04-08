import { View } from "react-native";
import { useRef, useState } from "react";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import ScrollablePage from "../../components/ScrollablePage";
import ThemedText from "../../components/ThemedText";
import PressableButton from "../../components/PressableButton";
import ThemedInput from "../../components/ThemedInput";
import StatusIndicator from "../../components/StatusIndicator";
import AuthenticationLogo from "../../components/GUI/Logos/AuthenticationLogo";
import { useUser } from "../../hooks/useUser";
import ErrorCard from "../../components/GUI/Cards/ErrorCard";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [errors, setErrors] = useState({});
  const pageTop = useRef(0);

  const { register } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [webMessageError, setWebMessageError] = useState(null);

  const validateRegister = () => {
    let errors = {};
    if (!email) errors.email = "Email is required.";
    if (!name) errors.name = "Name is required.";
    if (password.length < 8)
      errors.password = "Password length required: minimum 8 symbols.";
    if (password != password_confirmation)
      errors.password_confirmation = "Passwords must match.";
    if (weight) {
      if (isNaN(weight) || weight < 0) {
        errors.weight =
          "Weight should be a positive number (calculations are only accurate in kg)";
      }
    }
    if (height) {
      if (isNaN(height) || height < 0) {
        errors.height =
          "Height should be a positive number (calculations are only accurate in cm)";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  async function handleSubmit() {
    setWebMessageError(null);
    setIsLoading(true);
    try {
      if (validateRegister()) {
        await register(
          name,
          email,
          password,
          password_confirmation,
          height,
          weight,
        );
        setEmail("");
        setName("");
        setPassword("");
        setPasswordConfirmation("");
        setErrors({});
      }
    } catch (error) {
      setWebMessageError(error.message);
      pageTop.current?.scrollTo({ y: 0, animated: true });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollablePage ref={pageTop}>
      {webMessageError ? <ErrorCard error={webMessageError}></ErrorCard> : null}
      <AuthenticationLogo></AuthenticationLogo>
      <View className="pt-8 px-6">
        <ThemedText className="opacity-65 text-md pb-1">
          EMAIL ADDRESS
        </ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={{ backgroundColor: Colors.surface }}
            className="w-full rounded-[4vw] focus:border-amber-500 h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.email ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.email}
            </ThemedText>
          ) : null}
        </View>
        <ThemedText className="opacity-65 text-md pb-1">NAME</ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            style={{ backgroundColor: Colors.surface }}
            className="w-full rounded-[4vw] focus:border-amber-500 h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.name ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.name}
            </ThemedText>
          ) : null}
        </View>
        <ThemedText className="opacity-65 text-md pb-1">PASSWORD</ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            style={{ backgroundColor: Colors.surface }}
            className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.password ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.password}
            </ThemedText>
          ) : null}
        </View>
        <ThemedText className="opacity-65 text-md pb-1">
          REPEAT PASSWORD
        </ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPasswordConfirmation}
            value={password_confirmation}
            style={{ backgroundColor: Colors.surface }}
            className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.password_confirmation ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.password_confirmation}
            </ThemedText>
          ) : null}
        </View>

        <ThemedText className="opacity-65 text-md pb-1">
          WEIGHT (Optional)
        </ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="70 (KG)"
            inputMode={"decimal"}
            onChangeText={setWeight}
            value={weight}
            style={{ backgroundColor: Colors.surface }}
            className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.weight ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.weight}
            </ThemedText>
          ) : null}
        </View>

        <ThemedText className="opacity-65 text-md pb-1">
          HEIGHT (Optional)
        </ThemedText>
        <View className="flex items-center pb-6">
          <ThemedInput
            placeholder="180 (CM)"
            onChangeText={setHeight}
            inputMode={"decimal"}
            value={height}
            style={{ backgroundColor: Colors.surface }}
            className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.height ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.height}
            </ThemedText>
          ) : null}
        </View>
        <View className="flex items-center">
          <PressableButton onPress={handleSubmit} className="w-full h-20">
            <ThemedText
              bold
              style={{ color: Colors.surface }}
              className="text-xl"
            >
              REGISTER
            </ThemedText>
          </PressableButton>
          <StatusIndicator isLoading={isLoading}></StatusIndicator>
        </View>
      </View>
      <ThemedText className="text-center pt-4 pb-8">
        Already have an accout?
        <Link href="/login" style={{ color: Colors.theme }}>
          {" "}
          Login here.
        </Link>
      </ThemedText>
    </ScrollablePage>
  );
};

export default Register;
