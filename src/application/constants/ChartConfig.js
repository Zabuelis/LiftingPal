import { Colors } from "./Colors";

export const ChartConfig = {
  backgroundGradientFrom: Colors.surface,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: Colors.surface,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(212, 130, 10, ${opacity > 0.15 ? 1 : 0.2})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
