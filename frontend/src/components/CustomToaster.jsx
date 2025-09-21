import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#FFFFFF",
          color: "#0033CC",
          border: "1px solid #E2E8F0",
          fontFamily: "Inter, sans-serif",
        },
        success: {
          iconTheme: {
            primary: "#1FAA55",
            secondary: "#FFFFFF",
          },
          style: {
            background: "#F8FAFC",
            color: "#0B0F19",
            border: "1px solid #1FAA55",
            fontFamily: "Inter, sans-serif",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
          style: {
            background: "#FFEDEE",
            color: "#0B0F19",
            border: "1px solid #EF4444",
            fontFamily: "Inter, sans-serif",
          },
        },
        loading: {
          iconTheme: {
            primary: "#3366FF",
            secondary: "#FFFFFF",
          },
          style: {
            background: "#F8FAFC",
            color: "#0B0F19",
            border: "1px solid #3366FF",
            fontFamily: "Inter, sans-serif",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
